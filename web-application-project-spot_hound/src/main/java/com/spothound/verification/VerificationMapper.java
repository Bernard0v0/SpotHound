package com.spothound.verification;

import com.spothound.pojo.ParkingSpot;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Select;
import org.apache.ibatis.annotations.Update;

import java.util.List;

@Mapper
public interface VerificationMapper {
    @Select("select * from parkingspot where is_verified =false order by last_updated_time")
    List<ParkingSpot> getNotVerifiedParkingSpots();
    @Update("update parkingspot set is_verified = true, is_valid = true where spot_id = #{spotId}")
    void verifySuccess(int spotId);
    @Update("update parkingspot set is_verified = true, is_valid = false where spot_id = #{spotId}")
    void verifyFail(int spotId);
}
