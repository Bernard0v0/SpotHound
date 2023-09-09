package com.spothound.user;

import com.spothound.pojo.User;
import org.apache.ibatis.annotations.*;
@Mapper
public interface UserMapper {
    @Select("select COUNT(*) from User where (user_name=#{userName} or email = #{userName}) and password=#{password}")
    int loginCheck(String userName, String password);
    @Select("select * from User where user_name=#{userName} or email = #{userName}")
    User getUser(String userName);
    @Select("select count(*) from User where user_name=#{user} or email = #{user}")
    int userCheck(String user);
    @Insert("insert into User(user_name,password,email) values(#{userName},#{password},#{email})")
    void insertUser(User user);
    @Delete("delete from User where user_id = #{userId}")
    void deleteUser(int userId);
    @Update("update User set password=#{password} where user_name=#{user} or email = #{user}")
    void updatePassword(String password, String user);
    @Select("select email from User where user_name=#{user} or email = #{user}")
    String getEmail(String user);


}
