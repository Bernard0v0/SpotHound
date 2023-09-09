package com.spothound.parkingspot;

import com.google.maps.errors.ApiException;
import com.spothound.pojo.ParkingSpot;
import com.spothound.pojo.Result;
import com.spothound.pojo.SearchResult;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.time.LocalDateTime;
import java.util.List;


@RestController
@CrossOrigin(origins = "http://localhost:7070")
public class ParkingSpotController {
    @Autowired
    private ParkingSpotService parkingSpotService;
    @GetMapping("/api/parkingspot/{userId}")
    public Result getParkingSpotByUserId(@PathVariable Integer userId) {
        if(parkingSpotService.getParkingSpotByUserId(userId).isEmpty()) {
            return Result.error("No parking spot created");
        }
        return Result.success(parkingSpotService.getParkingSpotByUserId(userId));
    }
    @PutMapping("/api/parkingspot")
    public Result updateParkingSpot(@RequestBody ParkingSpot parkingSpot) {
        parkingSpotService.updateSpot(parkingSpot);
        return Result.success();
    }
    @DeleteMapping("/api/parkingspot/{spotId}")
    public Result deleteParkingSpot(@PathVariable Integer spotId) {
        parkingSpotService.deleteSpot(spotId);
        return Result.success();
    }
    @PostMapping("/api/parkingspot")
    public Result addParkingSpot(@RequestBody ParkingSpot parkingSpot) {
        parkingSpotService.insertSpot(parkingSpot);
        return Result.success();
    }
    @PostMapping("/api/spot/{orderType}")
    public Result getSpot(Integer userId,Double latitude, Double longitude, @DateTimeFormat(pattern = "yyyy-MM-dd HH:mm:ss") LocalDateTime startTime, @DateTimeFormat(pattern = "yyyy-MM-dd HH:mm:ss")LocalDateTime endTime, String spotType,@PathVariable String orderType ) {
        try {
            List<SearchResult> parkingSpotList= parkingSpotService.getSpot(userId,latitude, longitude, startTime, endTime,spotType,orderType);
            if(parkingSpotList==null||parkingSpotList.isEmpty()) {
                return Result.error("No parking spot found or close to you");
            }
            return Result.success(parkingSpotList);
        } catch (IOException | InterruptedException | ApiException e) {
            return Result.error("something went wrong...");
        }

    }
}
