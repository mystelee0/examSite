package com.example.ExamSite.Service;

import com.example.ExamSite.Repository.Repository;
import com.example.ExamSite.TestObject;
import com.example.ExamSite.User;
import jakarta.servlet.http.HttpServletRequest;
import org.json.JSONArray;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.util.UUID;

@Service
public class UploadExamService {

    Repository db;

    public UploadExamService(Repository db){this.db=db;}

    //이미지 저장 경로
    @Value("${file.dir}")
    private String fileDir;

    public TestObject uploadExam(HttpServletRequest request, String json, MultipartFile files[]) throws IOException {
        JSONObject result=new JSONObject(json);
        JSONObject testInfo=result.getJSONObject("testInfo");
        JSONArray examArr=result.getJSONArray("examArr");

        saveFiles(files, examArr);

        //비밀번호
        String pw=testInfo.getString("pw")!=null? testInfo.getString("pw"):"";
        //정답저장
        JSONArray answerArr=new JSONArray();
        for(int i=0;i<examArr.length();i++){
            //정답 저장
            String value=examArr.getJSONObject(i).getString("answer");
            JSONObject answer=new JSONObject();
            answer.put("answer",value);
            answerArr.put(answer);
            //기존 내용 초기화
            examArr.getJSONObject(i).put("answer","");
        }

        User user=(User) request.getSession(false).getAttribute("user");

        TestObject testObject=
                db.setExam(new TestObject(
                        user.getId(),testInfo.toString(),examArr.toString(),answerArr.toString(),pw)
                );

        return testObject;
    }

    private void saveFiles(MultipartFile[] files, JSONArray examArr) throws IOException {
        //파일저장
        String ext;
        String uuid;
        String newFileName;
        int index;
        //파일개수
        int findex=0;

        for (int i = 0; i < examArr.length(); i++) {
            if(examArr.getJSONObject(i).get("file")!="") {
                //이미지 새이름 생성
                index = files[findex].getOriginalFilename().lastIndexOf(".");
                ext = files[findex].getOriginalFilename().substring(index + 1);
                uuid = UUID.randomUUID().toString();
                newFileName = uuid + "." + ext;

                //저장
                files[findex].transferTo(new File(fileDir + newFileName));
                // json file value 수정
                examArr.getJSONObject(i).put("file", newFileName);
                findex++;
            }
        }
    }
}
