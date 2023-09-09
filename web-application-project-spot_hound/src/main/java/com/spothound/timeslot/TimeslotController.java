package com.spothound.timeslot;

import com.spothound.pojo.Result;
import com.spothound.pojo.Timeslot;
import com.spothound.timeslot.Impl.TimeslotServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:7070")
public class TimeslotController {
    @Autowired
    TimeslotServiceImpl timeslotService;
    @PostMapping("/api/timeslot")
    public Result createAvailableTimeslot(@RequestBody Timeslot timeslot){
        if (timeslotService.insert(timeslot)) {
            return Result.success();
        }
        return Result.error("Overlap with existed timeslot");
    }
    @PutMapping("/api/timeslot")
    public Result updateAvailableTimeslot(@RequestBody List<Timeslot> timeslot){
        if (timeslotService.update(timeslot)) {
            return Result.success();
        }
        return Result.error("Overlap with existed timeslot/ Already have booking in current timeslot");
    }
    @DeleteMapping("/api/timeslot/{timeSlotId}")
    public Result deleteAvailableTimeslot(@PathVariable Integer timeSlotId){
        if(timeslotService.delete(timeSlotId)) {
            return Result.success();
        }
        return Result.error("Booking(s) already in the timeslot");
    }
    @GetMapping("/api/timeslot/{spotId}")
    public Result getAvailableTimeslot(@PathVariable Integer spotId){
        if (timeslotService.getById(spotId).isEmpty()) {
            return Result.error("No available timeslot created in this spot");
        }
        return Result.success(timeslotService.getById(spotId));
    }
}
