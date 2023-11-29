package com.example.ExamSite.Service;

import com.example.ExamSite.User;
import org.json.JSONObject;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.util.UriComponentsBuilder;

import java.math.BigInteger;
import java.net.URI;
import java.security.SecureRandom;


@Service
public class LoginService {
    public String generateState() {
        SecureRandom random = new SecureRandom();
        return new BigInteger(130, random).toString(32);
    }

    public User naverLogin(String code,String state){

        //url 만들고 클라이언트에 get요청
        URI uri = UriComponentsBuilder
                .fromUriString("https://nid.naver.com/oauth2.0/token")
                .path("")
                .queryParam("client_id", "Pjqbiev3Yf6VA664uaFp")
                .queryParam("client_secret", "GuP17lGYuX")
                .queryParam("state", state)
                .queryParam("code", code)
                .queryParam("grant_type", "authorization_code")
                .encode()
                .build()
                .toUri();

        //요청보내기
        RestTemplate restTemplate = new RestTemplate();
        ResponseEntity<String> responseEntity = restTemplate.getForEntity(uri, String.class);

        //json 파싱
        JSONObject json = new JSONObject(responseEntity.getBody());
        String access_token = json.getString("access_token");
        String refresh_token = json.getString("refresh_token");

        System.out.println("access token : " + access_token);

        //프로필 정보 가져오기
        HttpHeaders headers = new HttpHeaders();
        headers.add("Authorization", "Bearer " + access_token);
        HttpEntity<String> entity = new HttpEntity<>(headers);

        ResponseEntity<String> profile = restTemplate.exchange("https://openapi.naver.com/v1/nid/me", HttpMethod.GET, entity, String.class);

        //프로필정보 출력
        System.out.println(profile.getBody().toString());
        JSONObject result = new JSONObject(profile.getBody());
        JSONObject response = result.getJSONObject("response");


        User user=new User(
                response.getString("id"),
                response.getString("name"),
                response.getString("email"),
                response.getString("mobile")
        );

        return user;
    }
}
