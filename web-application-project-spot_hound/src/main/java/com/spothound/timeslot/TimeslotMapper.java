package com.spothound.timeslot;

import com.spothound.pojo.Timeslot;
import org.apache.ibatis.annotations.*;


import java.util.List;

@Mapper
public interface TimeslotMapper {
    @Select("select * from timeSlot")
    List<Timeslot> getAll();
    @Delete("delete from timeSlot where time_slot_id=#{timeSlotId}")
    boolean delete(Integer timeSlotId);
    @Insert("insert into timeSlot(spot_id,start_time,end_time,price_per_quarter) values(#{spotId},#{startTime},#{endTime},#{pricePerQuarter})")
    void insert(Timeslot timeslot);
    @Insert("insert into timeSlot(time_slot_id,spot_id,start_time,end_time,price_per_quarter) values(#{timeSlotId},#{spotId},#{startTime},#{endTime},#{pricePerQuarter})")
    void insertWithId(Timeslot timeslot);
    @Select("select * from timeSlot where spot_id=#{spotId}")
    List<Timeslot> getBySpotId(Integer spotId);
    @Select("select * from timeSlot where time_slot_id=#{timeSlotId}")
    Timeslot getBySlotId(Integer timeSlotId);
}
