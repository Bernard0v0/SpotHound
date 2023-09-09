package com.spothound.timeslot.Impl;

import com.spothound.booking.BookingMapper;
import com.spothound.pojo.Booking;
import com.spothound.pojo.Timeslot;
import com.spothound.timeslot.TimeslotService;
import com.spothound.timeslot.TimeslotMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.Duration;
import java.time.LocalDateTime;
import java.util.List;



@Service
public class TimeslotServiceImpl implements TimeslotService {
    @Autowired
    private TimeslotMapper timeslotMapper;
    @Autowired
    private BookingMapper bookingMapper;
    public boolean isValidTimeSlot(LocalDateTime startTime, LocalDateTime endTime,Integer spotId){
        List<Timeslot> list = timeslotMapper.getBySpotId(spotId);
        List<Booking> bookings = bookingMapper.getBookingBySpotId(spotId);
        if(!list.isEmpty()) {
            for (Timeslot timeslot : list) {
                if ((startTime.isAfter(timeslot.getStartTime()) && startTime.isBefore(timeslot.getEndTime())) || (endTime.isAfter(timeslot.getStartTime()) && endTime.isBefore(timeslot.getEndTime())) || endTime.isEqual(timeslot.getStartTime()) || startTime.isEqual( timeslot.getEndTime())) {
                    return false;
                }
            }
        }
        return true;
    }
    public boolean isValidSlot(LocalDateTime startTime, LocalDateTime endTime,Integer spotId){
        List<Booking> bookings = bookingMapper.getBookingBySpotId(spotId);
        if(!bookings.isEmpty()){
            for(Booking booking : bookings){
                        if((booking.getStartTime().isAfter(startTime)||booking.getStartTime().isEqual(startTime)) && (booking.getEndTime().isBefore(endTime))||booking.getEndTime().isEqual(endTime)){
                            return false;
                        }
                    }
                }
        return true;
    }
    @Override
    public List<Timeslot> getById(Integer id){
        List<Timeslot> temp = timeslotMapper.getBySpotId(id);
        if(!temp.isEmpty()) {
            for (Timeslot timeslot : temp) {
                LocalDateTime currentTime = LocalDateTime.now();
                if (timeslot.getEndTime().isBefore(currentTime)) {
                    timeslotMapper.delete(timeslot.getTimeSlotId());
                }
            }
        }
        return timeslotMapper.getBySpotId(id);
    }
    @Override
    public boolean delete(Integer timeSlotId){
        Timeslot timeslot = timeslotMapper.getBySlotId(timeSlotId);
        if(isValidSlot(timeslot.getStartTime(),timeslot.getEndTime(),timeslot.getSpotId())){
        timeslotMapper.delete(timeSlotId);
        return true;
        }
        return false;
    }
    @Override
    public List<Timeslot> getAll(){
        return timeslotMapper.getAll();
    }

    @Override
    public boolean insert(Timeslot timeslot){
        if(isValidTimeSlot(timeslot.getStartTime(),timeslot.getEndTime(),timeslot.getSpotId())){
            timeslotMapper.insert(timeslot);
            return true;
        }
        return false;
    }

    public void insertWithId(Timeslot timeslot){
        timeslotMapper.insertWithId(timeslot);
    }
    public boolean update(List<Timeslot> timeslots){
        Timeslot formertimeslot = timeslots.get(0);
        Timeslot currenttimeslot = timeslots.get(1);
        if(!delete(formertimeslot.getTimeSlotId())){
            return false;
        }

        if(isValidTimeSlot(currenttimeslot.getStartTime(),currenttimeslot.getEndTime(),currenttimeslot.getSpotId())){
            insertWithId(currenttimeslot);
            return true;
        }
        insertWithId(formertimeslot);
        return false;
    }
}
