package com.spothound.pojo;


import lombok.Data;

import java.time.LocalDateTime;

@Data
public class ParkingSpot {
    private Integer spotId;
    private Integer userId;
    private String address;
    private Double latitude;
    private Double longitude;
    private String imageUrl;
    private String description;
    private SpotType spotType;
    private LocalDateTime createdTime;
    private LocalDateTime lastUpdatedTime;
    private Integer isVerified;
    private Integer isValid;

    public ParkingSpot(Integer spotId, Integer userId, String address, Double latitude, Double longitude, String imageUrl, String description, SpotType spotType, LocalDateTime createdTime, LocalDateTime lastUpdatedTime, Integer isVerified, Integer isValid) {
        this.spotId = spotId;
        this.userId = userId;
        this.address = address;
        this.latitude = latitude;
        this.longitude = longitude;
        this.imageUrl = imageUrl;
        this.description = description;
        this.spotType = spotType;
        this.createdTime = createdTime;
        this.lastUpdatedTime = lastUpdatedTime;
        this.isVerified = isVerified;
        this.isValid = isValid;
    }
}
