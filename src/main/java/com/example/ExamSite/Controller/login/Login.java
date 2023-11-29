package com.example.ExamSite.Controller.login;


import com.example.ExamSite.Service.LoginService;
import com.example.ExamSite.Repository.Repository;
import com.example.ExamSite.User;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class Login {

    LoginService loginService;

    Repository db;

    @Autowired
    public Login(LoginService loginService, Repository db) {
        this.loginService = loginService;
        this.db = db;
    }

    //state값 반환
    @GetMapping("/state")
    public String getState(HttpServletRequest request){

        HttpSession session=request.getSession(false);
        //세션이 이미 있다면 state만들지 않고 종료
        if(session!=null)
            return null;

        //state값 요청
        String state=loginService.generateState();

        // 세션 또는 별도의 저장 공간에 상태 토큰을 저장
        request.getSession().setAttribute("state",state);

        //state 출력
        System.out.println("create state : "+request.getSession(false).getAttribute("state"));

        return state;
    }


    //access token을 받기위한 code를 받아온다.
    //리액트 loginserver 컴포넌트에서 요청.
    @GetMapping("/naverlogin")
    public User naverlogin(
            @RequestParam("code") String code,
            @RequestParam("state") String state,
            HttpServletRequest request
    ) {
        HttpSession session=request.getSession(false);
        if(session.getAttribute("user")!=null)
            return (User) session.getAttribute("user");

        //네이버 로그인 후 상용자 정보 반환
        User user=loginService.naverLogin(code,state);

        //디비 검색 후 존재하지 않던 유저면 디비에 저장
        User dbuser=db.getUser(user);
        if(dbuser==null)
            dbuser=db.setUser(user);

        //세션 저장
        request.getSession().setAttribute("user",dbuser);

        return dbuser;
    }
}
