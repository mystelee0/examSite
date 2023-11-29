package com.example.ExamSite;

public class User {
    long id;
    String sns_id;
    String name;
    String email;
    String mobile;

    public User(){

    }

    public User(String sns_id,String name, String email, String mobile) {
        this.sns_id=sns_id;
        this.name = name;
        this.email = email;
        this.mobile = mobile;

    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getSns_id() {
        return sns_id;
    }

    public void setSns_id(String sns_id) {
        this.sns_id = sns_id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getMobile() {
        return mobile;
    }

    public void setMobile(String mobile) {
        this.mobile = mobile;
    }

    @Override
    public String toString() {
        return "User{" +
                "name='" + name + '\'' +
                ", email='" + email + '\'' +
                ", mobile='" + mobile + '\'' +
                '}';
    }
}
