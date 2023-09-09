package com.spothound.pojo;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Data;

import java.time.LocalDateTime;

@Data
public class Booking {
    private Integer referenceId;
    private Integer spotId;
    private String spotAddress;
    private Integer lessorId;
    private Integer leaseId;
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss")
    private LocalDateTime startTime;
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss")
    private LocalDateTime endTime;
    private double totalPrice;
    private LocalDateTime createdTime;

}
