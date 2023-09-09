package com.spothound.pojo;


import lombok.Data;


import java.util.List;

@Data


public class SearchResult {
    private Integer spotId;
    private Integer userId;
    private String address;
    private String imageUrl;
    private String description;
    private SpotType spotType;
    private double distance;
    private double totalPrice;


    public SearchResult(Integer spotId, Integer userId, String address, String imageUrl, String description, SpotType spotType, double distance, double totalPrice) {
        this.spotId = spotId;
        this.userId = userId;
        this.address = address;
        this.imageUrl = imageUrl;
        this.description = description;
        this.spotType = spotType;
        this.distance = distance;
        this.totalPrice = totalPrice;

    }
}
