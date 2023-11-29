import axios from "axios";
import { useEffect, useState } from "react";
import Modal from "./Modal";
import EmptyBox from "../EmptyBox";
import styled from "styled-components";


const Box=styled.div`
    
    //border:1px solid black;
    //margin 상쇄때문에 생긴 현상이었다. 
    //div의 border를 주거나 무언가 내용이 있어야한다
    height:80vh;
    width:100%;
    content:'g';
    background-color:white;
    h2{
        width:80%;
        margin:0 auto;
        padding-top:10px;
    }
    table {
        //position:relative;
        //top:20px;
        
        border:1px solid black;
        width:80%;
        margin:5px auto;
        
        thead{
            border-bottom:4px solid gray;
            th{
                text-align:left;
                padding:0.35em;
                font-size:1.25em;
                color:gray;
            }
        }
        tbody{
            tr{
            border-bottom:2px solid gray;
                td{
                    padding:0.75em 0.4em;
                    
                }
            }
        }
    }
    
`
const Table=styled.table`
    
`
function ShowTable({setExam,isLogin,user}){

    const [arr,setArr]=useState([
        
    ]);
    const [id,setId]=useState(0);
    const [visible,setVisible]=useState(false);
    //모든 testInfo 가져와서 배열에 집어넣어야함
    useEffect(()=>{
        axios.get("http://localhost:8080/exams")
        .then((data)=>{
           setArr(data.data);
           console.log(data.data);
        })
        .catch(()=>{
            alert("목록을 불러오지 못했습니다.");
        })
    },[])
    
    const inputPw=(params,e)=>{
        //비밀번호 입력화면 보이게 하고
        setId(params);
        setVisible(true);
    }
    
    return (
        <>
        <EmptyBox></EmptyBox>
        <Box>
            <h2>목록</h2>
            <Table>
                <thead>
                <tr>
                    <th>작성자</th>
                    <th>시험명</th>
                    <th>시간</th>
                </tr>
                </thead>
                <tbody>
                {
                    arr.map((v,i)=>{
                        let info=JSON.parse(v.testInfo);
                        return(
                        <tr key={i}>
                            <td>{info.name}</td>
                            <td>{info.testname}</td>
                            <td>{info.date+" "+info.time}</td>
                            <td><a href="#" onClick={()=>{inputPw(v.exam_id)}}>응시하기 id: {v.exam_id}</a></td>
                        </tr>
                        );
                    })
                }
                </tbody>
                
            </Table>
            <Modal id={id} visible={visible} setExam={setExam} isLogin={isLogin} user={user}/>
        </Box>
        </>
    )
}

export default ShowTable;