package com.example.ExamSite.Controller.login;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpSession;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.net.http.HttpRequest;

@RestController
public class Logout {

    @GetMapping("/logout")
    String logout(HttpServletRequest request){
        HttpSession session=request.getSession(false);
        if(session==null)
            return "fail";
        session.invalidate();
        return "success";
    }

}
