package com.example.ExamSite.Controller.UserInfo;

import com.example.ExamSite.Repository.Repository;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class StoreResult {

    Repository db;

    public StoreResult(Repository db) {
        this.db = db;
    }

    @PostMapping("/savescore")
    String storeResult(
            @RequestParam long exam_id,
            @RequestParam long user_id,
            @RequestParam int result
    ){

        db.saveScore(exam_id,user_id,result);

        return "success";

    }
}
