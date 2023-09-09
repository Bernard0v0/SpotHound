package com.spothound.parkingspot.Impl;

import com.google.maps.DirectionsApi;
import com.google.maps.DirectionsApiRequest;
import com.google.maps.GeoApiContext;
import com.google.maps.errors.ApiException;
import com.google.maps.model.DirectionsResult;
import com.google.maps.model.DirectionsRoute;
import com.google.maps.model.LatLng;
import com.google.maps.model.TravelMode;
import com.spothound.booking.BookingMapper;
import com.spothound.parkingspot.ParkingSpotMapper;
import com.spothound.parkingspot.ParkingSpotService;
import com.spothound.pojo.*;
import com.spothound.timeslot.TimeslotMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.time.Duration;
import java.time.Instant;
import java.time.LocalDateTime;
import java.time.ZoneOffset;
import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;


@Service
public class ParkingSpotServiceImpl implements ParkingSpotService {
    @Autowired
    private ParkingSpotMapper parkingSpotMapper;
    @Autowired
    private BookingMapper bookingMapper;
    @Autowired
    private TimeslotMapper timeslotMapper;

    @Override
    public List<ParkingSpot> getParkingSpotByUserId(Integer userId) {
        return parkingSpotMapper.getParkingSpotByUserId(userId);
    }

    @Override
    public void updateSpot(ParkingSpot parkingSpot) {
        parkingSpotMapper.updateSpot(parkingSpot);
    }

    @Override
    public void deleteSpot(Integer spotId) {
        parkingSpotMapper.deleteSpot(spotId);
    }

    @Override
    public void insertSpot(ParkingSpot parkingSpot) {
        parkingSpotMapper.insertSpot(parkingSpot);
    }
    public static double getDistance(double latitude1, double longitude1, double latitude2, double longitude2) throws IOException, InterruptedException, ApiException {
        GeoApiContext context = new GeoApiContext.Builder()
                .apiKey("AIzaSyDxc_xS8FibeTmGtymZVVWY2K1EjjKBglE")
                .build();
        LatLng origin = new LatLng(latitude1, longitude1);
        LatLng destination = new LatLng(latitude2, longitude2);

        DirectionsApiRequest request = DirectionsApi.newRequest(context)
                .mode(TravelMode.WALKING)
                .origin(origin)
                .destination(destination);
        DirectionsResult result = request.await();
        DirectionsRoute route = result.routes[0];
        return route.legs[0].distance.inMeters;

    }
    public List<AvailableTimeslot> getAvailableTimeslot(Integer spotId) {
        List<Timeslot> timeslots = timeslotMapper.getBySpotId(spotId);
        if(timeslots.isEmpty()){
            return null;
        }
        List<Booking> bookings = bookingMapper.getBookingBySpotId(spotId);
        if(bookings.isEmpty()){
            List<AvailableTimeslot> availableTimeslots = new ArrayList<>();
            for(Timeslot timeslot:timeslots){
                availableTimeslots.add(new AvailableTimeslot(timeslot.getStartTime(),timeslot.getEndTime()));
            }
            return availableTimeslots;
        }
        else{
            List<LocalDateTime> timeList = new ArrayList<>();
            for(Booking booking:bookings){
                timeList.add(booking.getStartTime());
                timeList.add(booking.getEndTime());
            }
            for(Timeslot timeslot:timeslots){
                timeList.add(timeslot.getStartTime());
                timeList.add(timeslot.getEndTime());
            }
            List<LocalDateTime> sortedDateTimeList = timeList.stream()
                    .sorted(Comparator.naturalOrder())
                    .toList();
            List<AvailableTimeslot> availableTimeslots = new ArrayList<>();
            for(int i=0;i<sortedDateTimeList.size()-1;i+=2){
                LocalDateTime currentDateTime = sortedDateTimeList.get(i);
                LocalDateTime nextDateTime = sortedDateTimeList.get(i+1);
                if(currentDateTime != nextDateTime){
                    availableTimeslots.add(new AvailableTimeslot(currentDateTime,nextDateTime));
                }
            }
            return availableTimeslots;
        }
    }
    @Override
    public List<SearchResult>getSpot(Integer userId,double latitude, double longitude, LocalDateTime startTime, LocalDateTime endTime,String spotType,String orderType) {
        List<ParkingSpot> parkingSpots = parkingSpotMapper.getSpot(spotType);
        List<SearchResult> searchResults = new ArrayList<>();
        List<SearchResult> sortedSearchResults = null;
        if (!parkingSpots.isEmpty()) {
            for (ParkingSpot parkingSpot : parkingSpots) {
                if(parkingSpot.getUserId().equals(userId)) {
                    continue;
                }
                try {
                    if (getDistance(latitude, longitude, parkingSpot.getLatitude(), parkingSpot.getLongitude()) < 10000) {
                        if (getAvailableTimeslot(parkingSpot.getSpotId()) != null) {
                            List<AvailableTimeslot> availableTimeslots = getAvailableTimeslot(parkingSpot.getSpotId());
                            System.out.println(availableTimeslots);
                            for (AvailableTimeslot availableTimeslot : availableTimeslots) {
                                if ((startTime.isAfter(availableTimeslot.getStartTime())||startTime.isEqual(availableTimeslot.getStartTime())) && (endTime.isBefore(availableTimeslot.getEndTime())||endTime.isEqual(availableTimeslot.getEndTime()))) {
                                    List<Timeslot> timeslots = timeslotMapper.getBySpotId(parkingSpot.getSpotId());
                                    double price_per_quarter = 0;
                                    for (Timeslot timeslot : timeslots) {
                                        if ((startTime.isAfter(timeslot.getStartTime())||startTime.isEqual(timeslot.getStartTime())) && (endTime.isBefore(timeslot.getEndTime())||endTime.isEqual(timeslot.getEndTime()))) {
                                            price_per_quarter = timeslot.getPricePerQuarter();
                                            break;
                                        }
                                    }
                                    Instant startInstant = startTime.toInstant(ZoneOffset.UTC);
                                    Instant endInstant = endTime.toInstant(ZoneOffset.UTC);
                                    Duration duration = Duration.between(startInstant, endInstant);
                                    long minutes = duration.toMinutes();
                                    int quarters = (int) Math.ceil((double) minutes / 15);
                                    double totalPrice = quarters * price_per_quarter;
                                    searchResults.add(new SearchResult(parkingSpot.getSpotId(), parkingSpot.getUserId(), parkingSpot.getAddress(), parkingSpot.getImageUrl(), parkingSpot.getDescription(), parkingSpot.getSpotType(), getDistance(latitude, longitude, parkingSpot.getLatitude(), parkingSpot.getLongitude()), totalPrice));
                                }
                            }
                        }
                    }
                } catch (IOException | InterruptedException | ApiException e) {;
                    return null;
                }
            }
            if (orderType.equals("distance")) {
                sortedSearchResults = searchResults.stream()
                        .sorted(Comparator.comparing(SearchResult::getDistance))
                        .toList();
            }
            else {
                sortedSearchResults = searchResults.stream()
                      .sorted(Comparator.comparing(SearchResult::getTotalPrice))
                      .toList();
            }
        }
        return sortedSearchResults;
    }
}
