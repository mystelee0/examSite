
import {Routes,Route, Link} from 'react-router-dom';
import Home from './home/Home.js';
//import Login from './login/Login.js'
import CreateTest from './create/CreateTest.js';
import LoginServer from './login/LoginServer.js';
import LoginCallback from './login/LoginCallback.js';
import ShowTable from './list/ShowTable.js';
import Logout from './login/Logout.js';
import { useState } from 'react';
import ShowExam from './exam/ShowExam.js';
import BootstrapNavbar from './home/Navbar.js';
import User from './user/User.js';
import MyExam from './user/MyExam.js';
import ExamResult from './user/ExamResult.js';
import UserInfo from './user/UserInfo.js';
import Score from './user/Score.js';
import styled from 'styled-components';

function App() {

  const [isLogin,setIsLogin]=useState(false);
  const [user,setUser]=useState('');
  const [exam,setExam]=useState("");
  
  const StyledDiv=styled.div`
  max-width:1400px;
  margin:0 auto;
  background-image:url('orangeBackground0.png');
  background-repeat:no-repeat;
  background-size:cover;
  //background-color:#ff9500;
  @media only all and (max-width: 900px) {
      width:100%;
  }
  `
  const StyledFooter=styled.footer`
  height:200px;
  width:100%;
  //padding:80px 0;
  margin:0 auto;
  background-color:#434343;
  position:relative;
  
  color:white;
    * {
      position:relative;
      top:10px;
      width:400px;
      margin:0 auto;
    }
  `
  return (
    <>
    
    <StyledDiv className="aApp">
    
      <BootstrapNavbar isLogin={isLogin} user={user}/>
      
      <Routes>
        <Route path="/" element={<Home isLogin={isLogin} user={user}/>}></Route>
        <Route path='/login' element={<LoginServer/>}></Route>
        <Route path='/callback' element={<LoginCallback setIsLogin={setIsLogin} setUser={setUser}/>}></Route>
        <Route path='/logout' element={<Logout setIsLogin={setIsLogin}/>}></Route>
        <Route path="/create" element={<CreateTest/>}></Route>
        
        <Route path="/list" element={<ShowTable setExam={setExam} isLogin={isLogin} />}></Route>
        <Route path="/exam" element={<ShowExam exam={exam} user={user}/>}></Route>

        <Route path="/user" element={<User user={user}/>}>
          <Route path='info' element={<UserInfo/>}></Route>
          <Route path='myexam' element={<MyExam/>} ></Route>
          <Route path="examresult" element={<ExamResult/>} ></Route>
        </Route>
        <Route path='/score' element={<Score/>}></Route>
      </Routes>
    
      <StyledFooter>
      <p>Copyright 2023. MINSEONG. All rights reserved.</p>
      <address>주소 : 경기도 부천시 상동</address>
      <address>전화번호 : 010-1111-2222</address>
      <address>이메일 : abcdefg@gmail.com</address>
      </StyledFooter>
    </StyledDiv>
    
    </>
  );
}

export default App;
