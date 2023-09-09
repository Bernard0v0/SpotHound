package com.spothound.booking;

import com.spothound.pojo.Booking;

import java.util.List;

public interface BookingService {
    Integer createBooking(Booking booking);
    List<Booking> getLessorBookingHistory(Integer lessorId);
    List<Booking> getLeaseBookingHistory(Integer leaseId);
    List<Booking>  getLessorCurrentBooking(Integer lessorId);
    List<Booking>  getLeaseCurrentBooking(Integer leaseId);
    boolean deleteBooking(Integer referenceId);
    List<Booking> getBooking(Integer userId);


}
