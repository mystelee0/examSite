package com.example.ExamSite.Controller.ExamManager;

import com.example.ExamSite.Repository.Repository;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class CandidList {

    Repository db;

    public CandidList(Repository db) {
        this.db = db;
    }

    @GetMapping("/candid/{exam_id}")
    List candidList(
            @PathVariable Long exam_id
    ){
        return db.getUserAnswer(exam_id);
    }
}
