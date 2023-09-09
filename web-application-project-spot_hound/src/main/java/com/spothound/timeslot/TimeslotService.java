package com.spothound.timeslot;

import com.spothound.pojo.Timeslot;

import java.util.List;

public interface TimeslotService {
    List<Timeslot> getById(Integer id);
    boolean delete(Integer id);
    List<Timeslot> getAll();
//    boolean isValidTimeSlot(LocalDateTime startTime, LocalDateTime endTime);
    boolean insert(Timeslot timeslot);
    boolean update(List<Timeslot> times);

}
