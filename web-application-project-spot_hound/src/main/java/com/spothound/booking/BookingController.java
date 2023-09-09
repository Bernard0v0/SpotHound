package com.spothound.booking;

import com.spothound.pojo.Booking;
import com.spothound.pojo.Result;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin(origins = "http://localhost:7070")
public class BookingController {
    @Autowired
    private BookingService bookingService;
    @PostMapping("/api/booking")
    public Result booking(@RequestBody Booking booking) {
         Integer referenceId = bookingService.createBooking(booking);
         return Result.success(referenceId);
    }
    @DeleteMapping("/api/booking/{referenceId}")
    public Result deleteBooking(@PathVariable Integer referenceId) {
        if(bookingService.deleteBooking(referenceId)){
            return Result.success();
        }
        return Result.error("Booking already started");
    }
    @GetMapping("/api/lessorbooking_history/{lessorId}")
    public Result lessorBookingHistory(@PathVariable Integer lessorId) {
        if (bookingService.getLessorBookingHistory(lessorId).isEmpty()){
            return Result.error("No booking history found");
        }
        return Result.success(bookingService.getLessorBookingHistory(lessorId));
    }
    @GetMapping("/api/leasebooking_history/{leaseId}")
    public Result leaseBookingHistory(@PathVariable Integer leaseId) {
        if (bookingService.getLeaseBookingHistory(leaseId).isEmpty()){
            return Result.error("No booking history found");
        }
        return Result.success(bookingService.getLeaseBookingHistory(leaseId));
    }
    @GetMapping("/api/leasebooking_current/{leaseId}")
    public Result leaseBookingCurrent(@PathVariable Integer leaseId) {
        if (bookingService.getLeaseCurrentBooking(leaseId).isEmpty()){
            return Result.error("No current or future booking found");}
        return Result.success(bookingService.getLeaseCurrentBooking(leaseId));
    }
    @GetMapping("/api/lessorbooking_current/{lessorId}")
    public Result lessorBookingCurrent(@PathVariable Integer lessorId) {
        if (bookingService.getLessorCurrentBooking(lessorId).isEmpty()){
            return Result.error("No current or future booking found");}
        return Result.success(bookingService.getLessorCurrentBooking(lessorId));
    }
    @GetMapping("/api/getbooking/{userId}")
    public Result getBooking(@PathVariable Integer userId) {
        if (bookingService.getBooking(userId).isEmpty()){
            return Result.error("No booking found");}
        return Result.success(bookingService.getBooking(userId));
    }
}
