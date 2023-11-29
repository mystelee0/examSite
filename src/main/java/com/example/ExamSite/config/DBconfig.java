package com.example.ExamSite.config;

import com.example.ExamSite.Repository.H2db;
import com.example.ExamSite.Repository.Repository;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import javax.sql.DataSource;

@Configuration
public class DBconfig {

    private final DataSource dataSource;

    public DBconfig(DataSource dataSource) {
        this.dataSource = dataSource;
    }

    @Bean
    public Repository repository(){
        return new H2db(dataSource);
    }
}
