package com.spothound.verification;

import com.spothound.pojo.Result;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin(origins = "http://localhost:7070")
public class VerificationController {
    @Autowired
    private VerificationService verificationService;
    @GetMapping("/api/verify")
    public Result verify(){
        if (verificationService.getNotVerifiedParkingSpots().isEmpty()){
            return Result.error("No parking spots need to be verified");
        }
        return Result.success(verificationService.getNotVerifiedParkingSpots());
    }
    @PostMapping("/api/verify_success/{spotId}")
    public Result verifySuccess(@PathVariable Integer spotId){
        verificationService.verifySuccess(spotId);
        return Result.success();
    }
    @PutMapping("/api/verify_fail/{spotId}")
    public Result verifyFail(@PathVariable Integer spotId){
        verificationService.verifyFail(spotId);
        return Result.success();
    }

}
