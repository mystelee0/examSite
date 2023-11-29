package com.example.ExamSite.Controller.ExamManager;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;

@RestController
public class GetImage {

    @Value("${file.dir}")
    private String fileDir;

    @GetMapping("/images")
    byte[] getImage(
            @RequestParam String name
        ) throws IOException {

        File file=new File(fileDir+name);
        FileInputStream fin=new FileInputStream(file);
        byte[] bytes=new byte[(int)file.length()];

        fin.read(bytes);

        return bytes;

    }
}
