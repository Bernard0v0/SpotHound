package com.spothound.parkingspot;

import com.google.maps.errors.ApiException;
import com.spothound.pojo.ParkingSpot;
import com.spothound.pojo.SearchResult;

import java.io.IOException;
import java.time.LocalDateTime;
import java.util.List;

public interface ParkingSpotService {
    List<ParkingSpot> getParkingSpotByUserId(Integer userId);
    void updateSpot(ParkingSpot parkingSpot);
    void deleteSpot(Integer spotId);
    void insertSpot(ParkingSpot parkingSpot);
    List<SearchResult> getSpot(Integer userId,double latitude, double longitude, LocalDateTime startTime, LocalDateTime endTime,String spotType,String orderType) throws IOException, InterruptedException, ApiException;
}
