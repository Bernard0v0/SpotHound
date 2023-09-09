package com.spothound.verification;

import com.spothound.pojo.ParkingSpot;

import java.util.List;

public interface VerificationService {
    List<ParkingSpot> getNotVerifiedParkingSpots();
    void verifySuccess(int spotId);
    void verifyFail(int spotId);
}
