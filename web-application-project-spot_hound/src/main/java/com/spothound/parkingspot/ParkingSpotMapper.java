package com.spothound.parkingspot;

import com.spothound.pojo.ParkingSpot;
import org.apache.ibatis.annotations.*;

import java.util.List;

@Mapper
public interface ParkingSpotMapper {
    @Select("select * from parkingspot where user_id = #{userId}")
    List<ParkingSpot> getParkingSpotByUserId(Integer userId);
    @Update("update parkingspot set address = #{address}, latitude = #{latitude}, longitude= #{longitude}, image_url= #{imageUrl}, description= #{description}, spot_type = #{spotType},last_updated_time = NOW(), is_verified = false, is_valid= false where spot_id = #{spotId}")
    void updateSpot(ParkingSpot parkingSpot);
    @Delete("delete from parkingspot where spot_id = #{spotId}")
    void deleteSpot(Integer spotId);
    @Insert("insert into parkingspot(user_id, address, latitude, longitude, image_url,description, spot_type,created_time,last_updated_time,is_verified,is_valid) values (#{userId}, #{address}, #{latitude}, #{longitude}, #{imageUrl}, #{description},#{spotType},NOW(),NOW(),0,0)")
    void insertSpot(ParkingSpot parkingSpot);
    @Select("select * from parkingspot where is_valid = true and spot_type = #{spotType}")
    List<ParkingSpot> getSpot(String spotType);

    @Select("select* from parkingspot where spot_id=#{spotId}")
    ParkingSpot getSpotBySpotId(Integer spotId);
}
