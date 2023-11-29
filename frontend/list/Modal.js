import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const Box=styled.div`
    position:absolute;
    background-color:#f0f0f0;
    width:100%;
    height:100%;
    top:80px;
`
function Modal({id,setExam,isLogin,visible,user}){

    const [input,setInput]=useState("");

    const navigate=useNavigate();

    const onChange=(e)=>{
        setInput(e.target.value);
    }

    const requestExam=()=>{
        
        if(!isLogin)
            alert("로그인해주세요");
        else {
            //id와 비밀번호로 post요청하고 결과로 잘 받았으면 
            //setExam에 받은 시험 저장 후시험보는 주소로 navigate
            let body={pw:input};
            
            axios.post("http://localhost:8080/exam/"+id,null,{withCredentials:true,responseType:'json',params:body})
            .then((data)=>{
                if(data.data==null)
                    alert("올바르지 않은 비밀번호");
                else{
                    console.log(data.data);
                    setExam(data.data);
                    navigate("/exam");
                }
                    
            })
        }
        
    }

    return (
        <>
        {
            visible?
            <Box id="inputPw">
            비밀번호 입력 : <input onChange={onChange} value={input}></input>
            <button onClick={requestExam}>확인</button>
            </Box>:
            null
        }
        </>
        
        
    )
}

export default Modal;