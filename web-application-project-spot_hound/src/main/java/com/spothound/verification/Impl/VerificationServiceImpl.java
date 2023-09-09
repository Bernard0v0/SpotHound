package com.spothound.verification.Impl;


import com.spothound.pojo.ParkingSpot;
import com.spothound.verification.VerificationService;
import com.spothound.verification.VerificationMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class VerificationServiceImpl implements VerificationService {
    @Autowired
    private VerificationMapper verificationMapper;
    @Override
    public List<ParkingSpot> getNotVerifiedParkingSpots(){

        return verificationMapper.getNotVerifiedParkingSpots();
    }
    @Override
    public void verifySuccess(int spotId){
        verificationMapper.verifySuccess(spotId);
    }
    @Override
    public void verifyFail(int spotId){
        verificationMapper.verifyFail(spotId);
    }
}
