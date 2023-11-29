package com.example.ExamSite.Repository;

import com.example.ExamSite.TestObject;
import com.example.ExamSite.User;
import com.example.ExamSite.UserAnswer;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.support.GeneratedKeyHolder;
import org.springframework.jdbc.support.KeyHolder;

import javax.sql.DataSource;
import java.sql.PreparedStatement;
import java.util.HashMap;
import java.util.List;
import java.util.Map;


public class H2db implements Repository{

    private final JdbcTemplate template;
    public H2db(DataSource dataSource){
        this.template=new JdbcTemplate(dataSource);
    }

    @Override
    public List<TestObject> getExamList() {
        String sql="select exam_id,test_info from exams";

        return template.query(sql,
                (resultSet,rowNum)->{
                    TestObject testObject=new TestObject();
                    testObject.setExam_id(resultSet.getLong("exam_id"));
                    testObject.setTestInfo(resultSet.getString("test_info"));
                    return testObject;
                });
    }

    @Override
    public List getExamListById(long id) {
        String sql="select exam_id,test_info from exams where user_id=?";

        return template.query(sql,
                (resultSet,rowNum)->{
                    TestObject testObject=new TestObject();
                    testObject.setExam_id(resultSet.getLong("exam_id"));
                    testObject.setTestInfo(resultSet.getString("test_info"));
                    return testObject;
                },id);
    }

    @Override
    public TestObject getExamById(long id) {
        String sql="select * from exams where exam_id=?";

        return template.queryForObject(sql,
                (resultSet,rowNum)->{
                    TestObject copy=new TestObject();
                    copy.setExam_id(resultSet.getLong("exam_id"));
                    copy.setTestInfo(resultSet.getString("test_info"));
                    copy.setExamArr(resultSet.getString("exam_arr"));
                    copy.setPw(resultSet.getString("pw"));
                    return copy;
                },id);
    }

    @Override
    public TestObject setExam(TestObject testObject) {

        String sql="insert into exams(user_id,exam_arr,test_info,answer_arr,pw) values(?,?,?,?,?)";
        KeyHolder keyHolder=new GeneratedKeyHolder();
        template.update(connection->{
            //자동 증가 키
            PreparedStatement ps= connection.prepareStatement(sql,new String[]{"exam_id"});
            ps.setLong(1,testObject.getUser_id());
            ps.setString(2,testObject.getExamArr());
            ps.setString(3,testObject.getTestInfo());
            ps.setString(4,testObject.getAnswer());
            ps.setString(5,testObject.getPw());
            return ps;
        },keyHolder);

        long key=keyHolder.getKey().longValue();
        testObject.setExam_id(key);
        return testObject;
    }

    @Override
    public User setUser(User user) {
        String sql="insert into users(sns_id,name,email,mobile) values(?,?,?,?)";
        KeyHolder keyHolder=new GeneratedKeyHolder();
        template.update(connection->{
            //자동 증가 키
            PreparedStatement ps= connection.prepareStatement(sql,new String[]{"id"});
            ps.setString(1,user.getSns_id());
            ps.setString(2,user.getName());
            ps.setString(3,user.getEmail());
            ps.setString(4,user.getMobile());
            return ps;
        },keyHolder);

        long key=keyHolder.getKey().longValue();
        user.setId(key);
        return user;
    }

    @Override
    public User getUser(User user) {
        String sql="select * from users where sns_id= ?";
        User copy;
        try{
            copy=template.queryForObject(sql,
                    (resultSet,rowNum)->{
                        User newcopy=new User();
                        newcopy.setId(resultSet.getLong("id"));
                        newcopy.setSns_id(resultSet.getString("sns_id"));
                        newcopy.setName(resultSet.getString("name"));
                        newcopy.setEmail(resultSet.getString("email"));
                        newcopy.setMobile(resultSet.getString("mobile"));
                        return newcopy;
                    },user.getSns_id());

            return copy;
        }catch(EmptyResultDataAccessException e){
            return null;
        }
    }

    @Override
    public void setUserAnswer(long exam_id, long id, String userAnswer) {
        String sql="insert into exam_cand values(?,?,?)";
        template.update(sql,exam_id,id,userAnswer);
    }

    @Override
    public List<UserAnswer> getUserAnswer(long exam_id) {
        String sql="select * from exam_cand where exam_id=?";

        return template.query(sql,
                (resultSet,rowNum)->{
            UserAnswer dto=new UserAnswer();
            dto.setId(resultSet.getLong("user_id"));
            dto.setAnswer(resultSet.getString("answer"));
            return dto;
        },exam_id);
    }

    @Override
    public void saveScore(long exam_id, long id, int score) {
        String sql="insert into exam_result values(?,?,?)";

        template.update(sql,exam_id,id,score);
    }

    @Override
    public List<Map<String,Object>> getScore(long id) {
        String sql="SELECT e.test_info, er.result " +
                "FROM exams e " +
                "INNER JOIN exam_result er ON e.exam_id = er.test_id " +
                "WHERE er.user_id = ?";

        return template.query(sql,
                (resultSet,rowNum)->{
                    Map<String,Object> map=new HashMap<>();
                    map.put("test_info",resultSet.getString("test_info"));
                    map.put("result",resultSet.getInt("result"));
                    return map;
                },id);
    }
}
