package com.example.ExamSite.Controller.UserInfo;


import com.example.ExamSite.Repository.Repository;
import com.example.ExamSite.TestObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class UserInfo {

    Repository db;

    @Autowired
    public UserInfo(Repository db) {
        this.db = db;
    }

    @GetMapping("/user/myexam/{id}")
    List<TestObject> myexam(
            @PathVariable("id") String id
    ){

        List<TestObject> list=db.getExamListById(Long.valueOf(id));
        return list;
    }
}

