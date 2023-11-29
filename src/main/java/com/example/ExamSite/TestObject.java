package com.example.ExamSite;

public class TestObject {
    long exam_id;
    long user_id;
    String testInfo;
    String examArr;
    String answer;
    String pw;

    public TestObject(){}

    public TestObject(long user_id, String testInfo, String examArr,String answer,String pw) {
        this.user_id=user_id;
        this.testInfo = testInfo;
        this.examArr = examArr;
        this.answer=answer;
        this.pw=pw;
    }

    public long getExam_id() {
        return exam_id;
    }

    public void setExam_id(long exam_id) {
        this.exam_id = exam_id;
    }

    public long getUser_id() {
        return user_id;
    }

    public void setUser_id(long user_id) {
        this.user_id = user_id;
    }

    public String getTestInfo() {
        return testInfo;
    }

    public void setTestInfo(String testInfo) {
        this.testInfo = testInfo;
    }

    public String getExamArr() {
        return examArr;
    }

    public void setExamArr(String examArr) {
        this.examArr = examArr;
    }

    public String getAnswer() {
        return answer;
    }

    public void setAnswer(String answer) {
        this.answer = answer;
    }

    public String getPw() {
        return pw;
    }

    public void setPw(String pw) {
        this.pw = pw;
    }
}
