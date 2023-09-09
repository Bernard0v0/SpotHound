package com.spothound.autorun;

import com.spothound.pojo.Timeslot;
import com.spothound.timeslot.Impl.TimeslotServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.ApplicationArguments;
import org.springframework.boot.ApplicationRunner;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;
import java.util.List;

@Component
public class autorun implements ApplicationRunner {
    //autorun after the service starts running
    //delete all timeslots that are expired
    @Autowired TimeslotServiceImpl timeslotService;
    @Override
    public void run(ApplicationArguments args) throws Exception {
        List<Timeslot> list = timeslotService.getAll();
        if(list!=null) {
            for (Timeslot timeslot : list) {
                LocalDateTime currentTime = LocalDateTime.now();
                if (timeslot.getEndTime().isBefore(currentTime)) {
                    timeslotService.delete(timeslot.getTimeSlotId());
                }
            }
        }
    }
}