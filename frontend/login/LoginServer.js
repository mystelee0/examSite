import { useEffect, useState } from "react";
import axios from "axios";
import EmptyBox from "../EmptyBox";
import styled from "styled-components";

const StyledMain=styled.main`
    display:flex;
    justify-content:center;
    align-items:center;
    background-color:white;
    height:50vh;
`
const Section=styled.section`
    border:1px solid black;
    padding:10px;
`
function LoginServer(){

    const [naverLoginUrl,setNaverLoginUrl]=useState("");
    let ClientId="Pjqbiev3Yf6VA664uaFp";
    let redirectUrl="http://localhost:3000/callback"
    
    //서버로부터 state값을 받아온다
    useEffect(()=>{
        axios.get("http://localhost:8080/state",{withCredentials:true})
        .then((result)=>{
            console.log("received state : ",result.data);
            setNaverLoginUrl(`https://nid.naver.com/oauth2.0/authorize?client_id=${ClientId}&response_type=code&redirect_uri=${redirectUrl}&state=${result.data}`);
        })
        .catch(()=>{
            console.log("state 요청 실패");
        })
    },[])


    return(
        <>
        <EmptyBox></EmptyBox>
        
        <StyledMain>
        
            <Section>
            <p>SNS 계정으로 로그인</p>
            <div>
            <a href={naverLoginUrl} >
                <img src="https://static.nid.naver.com/oauth/big_g.PNG" width={320} /> 
            </a>
            </div>
            </Section>
        
        </StyledMain>
        
        </>
    )
    
}

export default LoginServer;