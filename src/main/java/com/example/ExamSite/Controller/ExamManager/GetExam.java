package com.example.ExamSite.Controller.ExamManager;

import com.example.ExamSite.Repository.Repository;
import com.example.ExamSite.TestObject;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class GetExam {

    Repository db;

    public GetExam(Repository db) {
        this.db = db;
    }

    @PostMapping("/exam/{id}")
    TestObject requestExam(
            HttpServletRequest req,
            @PathVariable long id,
            @RequestParam String pw

        ){

        TestObject testObject=db.getExamById(id);
        if(pw.equals(testObject.getPw()))
            return testObject;
        else return null;

    }
}
