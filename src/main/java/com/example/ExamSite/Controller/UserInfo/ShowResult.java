package com.example.ExamSite.Controller.UserInfo;

import com.example.ExamSite.Repository.Repository;
import com.example.ExamSite.User;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class ShowResult {

    Repository db;

    public ShowResult(Repository db) {
        this.db = db;
    }

    @GetMapping("/exam_result")
    List showResult(
            HttpServletRequest req
    ){
        User user=(User)req.getSession().getAttribute("user");
        System.out.println(user.getId());
        return db.getScore(user.getId());
    }
}
