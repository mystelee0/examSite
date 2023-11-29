package com.example.ExamSite.Controller.ExamManager;

import com.example.ExamSite.Repository.Repository;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.web.bind.annotation.*;

@RestController
public class SaveUserAnswer {

    Repository db;

    public SaveUserAnswer(Repository db) {
        this.db = db;
    }

    @PostMapping("/submitanswer")
    String saveAnswer(
            HttpServletRequest request,
            @RequestParam long id,
            @RequestParam long exam_id,
            @RequestParam String userAnswer
    ){
        db.setUserAnswer(exam_id,id,userAnswer);

        return "success";
    }
}

