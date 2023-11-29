package com.example.ExamSite.Controller.ExamManager;

import com.example.ExamSite.Repository.Repository;
import com.example.ExamSite.TestObject;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class ExamList {

    Repository db;

    public ExamList(Repository db) {
        this.db = db;
    }

    @GetMapping("/exams")
    List<TestObject> showList(){

        List<TestObject> list=db.getExamList();

        return list;
    }

}
