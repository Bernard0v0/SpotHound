package com.spothound.user;

import com.spothound.pojo.Result;
import com.spothound.pojo.User;
import com.spothound.utils.JwtUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@CrossOrigin(origins = "http://localhost:7070")
public class UserController {
    @Autowired
    private UserService userService;

    @PostMapping("/api/login")
    public Result login(String user, String password) {
        if (userService.login(user, password)) {
            User thisuser = userService.getUser(user);
            Map<String, Object> claims = new HashMap<>();
            claims.put("userId", thisuser.getUserId());
            claims.put("userName", thisuser.getUserName());
            String jwt = JwtUtils.generateJwt(claims);
            return Result.success(jwt);
        }
        return Result.error("username/email/password incorrect");
    }

    @PostMapping("/api/sign_up")
    public Result register(@RequestBody User user) {
        if (userService.signUp(user)) {
            return Result.success();
        }
        return Result.error("Username existed/password invalid");
    }

    @PostMapping("/api/change_password")
    public Result changePassword(String userName, String formerPassword, String newPassword) {
        if (userService.login(userName, formerPassword)) {
            if(userService.updatePassword(newPassword, userName)){
                return Result.success();
            }
            else{
                return Result.error("New password invalid");
            }
        }
        return Result.error("Former password incorrect");
    }

    @PutMapping("/api/forget_password")
    public Result forgetPassword(String password, String user) {
        if (!userService.userCheck(user)) {
            return Result.error("username/email incorrect");
        } else {
            String email = userService.getEmail(user);
            //ignore the email verification process
        }
        userService.updatePassword(password, user);
        return Result.success();
    }

    @DeleteMapping("/api/remove_account/{userId}")
    public Result removeAccount(@PathVariable("userId") Integer userId) {
        userService.deleteUser(userId);
        return Result.success();
    }
}
