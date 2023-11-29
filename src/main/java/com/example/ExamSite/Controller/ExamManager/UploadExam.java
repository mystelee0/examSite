package com.example.ExamSite.Controller.ExamManager;

import com.example.ExamSite.Service.UploadExamService;
import com.example.ExamSite.TestObject;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

@RestController
public class UploadExam {


    /*Repository db;

    //이미지 저장 경로
    //@Value("${file.dir}")
    //private String fileDir;
*/
    UploadExamService service;
    //생성자
    public UploadExam(UploadExamService service){
        this.service=service;
    }

    @PostMapping("/exams")
    public String uploadExam(
            HttpServletRequest request,
            @RequestParam(required = false) MultipartFile files[],
            @RequestParam String json
            ) throws IOException {

        if(request.getSession(false)==null)
            return "fail no session";

        TestObject obj=service.uploadExam(request,json,files);

        /*JSONObject result=new JSONObject(json);
        JSONObject testInfo=result.getJSONObject("testInfo");
        JSONArray examArr=result.getJSONArray("examArr");

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
*/
    return "success";

/* 이미지를 그대로 보내는 예제
        byte[] fileContent=new byte[(int) files[0].getSize()];
        InputStream fis =files[0].getInputStream();
        fis.read(fileContent);
        fis.close();
        return ResponseEntity.ok()
                .body(fileContent);
*/


    }
}
