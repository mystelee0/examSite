import { useEffect } from "react";
import styled from "styled-components";

const StyledDiv=styled.div`
    background-color:white;
    box-shadow:3px 3px 15px;
    width:40%;
    min-height:60vh;
    height:auto;
    margin:0;
    margin-right:20px;
    h1 {
        text-align:center;
        margin:30px;
    }
    ul{
        list-style-type:none;
    }
    li{
        padding:10px 10px;
    }
    span{
        display:inline-block;
        width:30%;
    }
    input{
        width:60%;
        border:none;
        border-bottom:1px solid gray;
    }
    textarea{
        resize:none;
        width:60%;
        height:100px;
        margin:
    }
    #span-info{
        position:relative;
        bottom:80px;
    }

    @media only screen and (max-width:900px){
        width:95%;
        //flex:13;
        padding:10px 3px;
        margin:0;
        margin-bottom:20px;
    }
`


function TestSetting({testInfo,setTestInfo}){

    const onChange=(e)=>{
        setTestInfo((prev)=>{
            return {
                ...prev,
                [e.target.name]:e.target.value
            }
        })
    }
    useEffect(()=>{
        setTestInfo({
            name:'',
            testname:'',
            date:'',
            time:'',
            hour:'',
            info:'',
            pw:''
        })
    },[])
    let {name, testname, date, time, hour, info, pw}=testInfo;
    return (
        <StyledDiv>
            <ul>
                <h1>시험 설정 리스트</h1>
                <li><span>출제자</span>
                <input className="input" name="name"value={name} onChange={onChange} placeholder="출제자 이름"></input></li>

                <li><span>시험명</span>
                <input name="testname"value={testname}onChange={onChange} placeholder="시험 이름 ex) OO학교 중간시험"></input></li>
                
                
                <li><span>날짜</span>
                <input name="date"value={date}onChange={onChange} type="date"></input></li>
                
                <li><span>시간</span> 
                <input name="time"value={time}onChange={onChange} type="time"></input></li>

                <li><span>시간제한</span>
                <input type="number" name="hour"value={hour}onChange={onChange} min={1} max={200}></input></li>

                <li><span id="span-info">시험정보</span>
                <textarea id="info" name="info"value={info}onChange={onChange} placeholder="설명 입력란"></textarea></li>

                <li id="pw"><span>비밀번호</span>
                <input type="text" name="pw"value={pw}onChange={onChange}></input></li>
            </ul>      
        </StyledDiv>
    )
}

export default TestSetting;