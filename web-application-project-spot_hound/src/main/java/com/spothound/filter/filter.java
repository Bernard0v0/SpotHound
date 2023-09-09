package com.spothound.filter;

import com.alibaba.fastjson.JSONObject;
import com.spothound.pojo.Result;
import com.spothound.utils.JwtUtils;
import jakarta.servlet.*;
import jakarta.servlet.annotation.WebFilter;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.util.StringUtils;


import java.io.IOException;


@WebFilter (urlPatterns = "/*")
public class filter implements Filter {
    @Override
    public void init(FilterConfig filterConfig) throws ServletException {
        Filter.super.init(filterConfig);
    }

    @Override
    public void doFilter(ServletRequest servletRequest, ServletResponse servletResponse, FilterChain filterChain) throws IOException, ServletException {
    HttpServletResponse response = (HttpServletResponse) servletResponse;
    HttpServletRequest request = (HttpServletRequest) servletRequest;
    String url = request.getRequestURL().toString();
    if(url.contains("login") || url.contains("sign_up")|| url.contains("forget_password")){
        filterChain.doFilter(servletRequest, servletResponse);
        return;
    }
    String jwt = request.getHeader("token");
    if (!StringUtils.hasLength(jwt)) {
        Result error = Result.error("NOT_LOGIN");
        String notLogin = JSONObject.toJSONString(error);
        response.getWriter().write(notLogin);
        return;
    }
    try{
        JwtUtils.parseJWT(jwt);
    }
    catch (Exception e) {
        Result error = Result.error("NOT_LOGIN");
        String notLogin = JSONObject.toJSONString(error);
        response.getWriter().write(notLogin);
        return;
    }
        filterChain.doFilter(servletRequest, servletResponse);
    }

    @Override
    public void destroy() {
        Filter.super.destroy();
    }
}
