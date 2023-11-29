package com.example.ExamSite.Repository;

import com.example.ExamSite.TestObject;
import com.example.ExamSite.User;

import java.util.List;


public interface Repository {

    List getExamList();
    List getExamListById(long id);
    TestObject getExamById(long id);

    TestObject setExam(TestObject testObject);

    User setUser(User user);
    User getUser(User user);

    void setUserAnswer(long exam_id,long id,String userAnswer);
    List getUserAnswer(long exam_id);

    void saveScore(long exam_id,long id,int score);
    List getScore(long id);
}
