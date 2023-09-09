package com.spothound.user.Impl;

import com.spothound.pojo.User;
import com.spothound.user.UserService;
import com.spothound.user.UserMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;


@Service
public class UserServiceImpl implements UserService {
    @Autowired
    private UserMapper userMapper;
    public boolean isValidPassword(String password) {
        return  password.matches("^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)[a-zA-Z\\d]{8,}$");
    }
    public boolean isValidEmail(String email) {
        String[] parts = email.split("@");
        return parts.length == 2;
    }

    @Override
    public boolean signUp(User user) {
        if(userMapper.userCheck(user.getUserName())==0 && userMapper.userCheck(user.getEmail())==0 && isValidPassword(user.getPassword())&&isValidEmail(user.getEmail())){
            userMapper.insertUser(user);
            return true;
        }
        return false;
    }
    @Override
    public boolean login(String userName, String password) {
            return userMapper.loginCheck(userName,password)!=0;
    }
    @Override
    public User getUser(String userName) {
        return userMapper.getUser(userName);
    }
    @Override
    public void deleteUser(Integer userId) {
      userMapper.deleteUser(userId);
    }
    @Override
    public boolean updatePassword(String password, String user) {
        if(isValidPassword(password)) {
            userMapper.updatePassword(password, user);
            return true;
        }
        return false;
    }
    @Override
    public String getEmail(String user) {
        return userMapper.getEmail(user);
    }
    @Override
    public boolean userCheck(String user) {
        return userMapper.userCheck(user) == 0;
    }
    }


