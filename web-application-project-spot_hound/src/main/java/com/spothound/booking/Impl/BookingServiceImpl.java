package com.spothound.booking.Impl;

import com.spothound.booking.BookingMapper;
import com.spothound.booking.BookingService;
import com.spothound.pojo.Booking;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class BookingServiceImpl implements BookingService {
    @Autowired
    private BookingMapper bookingMapper;

    @Override
    public Integer createBooking(Booking booking) {
        bookingMapper.createBooking(booking);
        return booking.getReferenceId();
    }

    @Override
    public List<Booking> getLessorBookingHistory(Integer lessorId) {

        return bookingMapper.getLessorBookingHistory(lessorId);
    }

    @Override
    public List<Booking> getLeaseBookingHistory(Integer leaseId) {
        return bookingMapper.getLeaseBookingHistory(leaseId);
    }

    @Override
    public List<Booking> getLessorCurrentBooking(Integer lessorId) {

        return bookingMapper.getLessorCurrentBooking(lessorId);
    }

    @Override
    public List<Booking> getLeaseCurrentBooking(Integer leaseId) {

        return bookingMapper.getLeaseCurrentBooking(leaseId);
    }

    @Override
    public boolean deleteBooking(Integer referenceId) {
        Booking booking = bookingMapper.getBookingByRefId(referenceId);
        if(booking.getStartTime().isBefore((LocalDateTime.now()))||booking.getStartTime().isEqual(LocalDateTime.now())){
            return false;
        }
        bookingMapper.deleteBooking(referenceId);
        return true;
    }
    @Override
    public List<Booking> getBooking(Integer userId) {
        return bookingMapper.getBooking(userId);
    }
}
