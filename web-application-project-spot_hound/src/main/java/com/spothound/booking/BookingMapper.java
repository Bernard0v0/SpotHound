package com.spothound.booking;

import com.spothound.pojo.Booking;
import org.apache.ibatis.annotations.*;

import java.util.List;

@Mapper
public interface BookingMapper {
    @Insert("insert into booking(spot_id, spot_address,lessor_id, lease_id,start_time,end_time,total_price,created_time) values(#{spotId},#{spotAddress},#{lessorId},#{leaseId},#{startTime},#{endTime},#{totalPrice},NOW())")
    @Options(useGeneratedKeys = true,keyProperty = "referenceId",keyColumn = "reference_id")
    void createBooking(Booking booking);
    @Select("select * from booking where lessor_id=#{lessorId} and end_time<NOW()")
    List<Booking> getLessorBookingHistory(Integer lessorId);
    @Select("select * from booking where lease_id=#{leaseId} and end_time<NOW()")
    List<Booking> getLeaseBookingHistory(Integer leaseId);
    @Select("select * from booking where lessor_id=#{lessorId} and end_time>NOW()")
    List<Booking>  getLessorCurrentBooking(Integer lessorId);
    @Select("select * from booking where lease_id=#{leaseId} and end_time>NOW()")
    List<Booking>  getLeaseCurrentBooking(Integer leaseId);
    @Delete("delete from booking where reference_id=#{referenceId}")
    void deleteBooking(Integer referenceId);
    @Select("select * from booking where spot_id=#{spotId}")
    List<Booking> getBookingBySpotId(Integer spotId);
    @Select("select * from booking where reference_id=#{referenceId}")
    Booking getBookingByRefId(Integer referenceId);
    @Select("select * from booking where (lessor_id=#{userId} or lease_id=#{userId}) and end_time>NOW()")
    List<Booking> getBooking(Integer userId);
}
