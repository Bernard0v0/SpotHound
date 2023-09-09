package com.spothound.user;

import com.spothound.pojo.User;



public interface UserService {
    boolean signUp(User user);
    boolean login(String userName, String password);
    User getUser(String userName);
    void deleteUser(Integer userId);
    boolean updatePassword(String password, String user);
    String getEmail(String user);
    boolean userCheck(String user);
}
