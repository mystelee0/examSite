import { useState } from "react";
import ArrayMap from "./dataCollector/ArrayMap";
import CreateQuestion from "./CreateQuestion";
import TestSetting from "./setting/TestSetting";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import styled from "styled-components";
import EmptyBox from "../EmptyBox";

const MakeWrapper=styled.div`
    position:relative;
    min-height:100vh;
    height:auto;
    width:100%;
    padding:30px 0;
    z-index:1;
    
`
const BackNForward = styled.div`
    display:inline-block;
    flex:1;
    margin:0 20px 0 0;
    box-sizing:border-box;
    button{
        background-color:white;
        border:none;
        height:60px;
        width:80px;
    }
    
`
const Wrapper = styled.div`
    display:flex;
    margin:80px 0;
    //width:100%;
    justify-content:center;
    flex-wrap:nowrap;
    @media only screen and (max-width:900px){
        flex-direction:column;
        align-items:center;
    }
`
const UploadExamButton=styled.div`
    //position:absolute;
    position:relative;
    //top:10px;
    right:10px;
    
    button {
        width:80px;
        height:60px;
        font-size:20px;
        border:1px solid black;
        background-color:white;
    }

`

function CreateTest() {

    const [page, setPage] = useState(true);
    const [currentView, setCurrentView] = useState(-1);
    const [examArr, setExamArr] = useState([]);
    const [testInfo, setTestInfo] = useState({});

    const [url, setUrl] = useState('');

    const navigate = useNavigate();

    const changePage = () => {
        setPage(!page);
        //console.log(testInfo);
    }

    const uploadTest = () => {
        if (examArr.length == 0) alert("no questions");
        else {
            let formData = new FormData();

            for (let i = 0; i < examArr.length; i++)
                formData.append("files", examArr[i].file);

            formData.append("json", JSON.stringify({ testInfo: testInfo, examArr: examArr }))
            axios.post("http://localhost:8080/exams",
                formData
                , {
                    headers: { "Content-Type": "multipart/form-data" },
                    withCredentials: true
                })
                .then((data) => {
                    console.log(data.data);
                    if (data.data === "success") {
                        alert("전송 완료");
                        navigate("/");
                    }

                })
        }
    }
    return (
        <>
        <EmptyBox></EmptyBox>
        <MakeWrapper>
            
            {
                page ?
                    <Wrapper>
                        <div style={{flex:'1'}}></div>
                        <TestSetting testInfo={testInfo} setTestInfo={setTestInfo} />
                        <BackNForward><button onClick={changePage} >다음</button></BackNForward>
                    </Wrapper> :
                    <Wrapper>
                        <ArrayMap examArr={examArr} setExamArr={setExamArr} currentView={currentView} setCurrentView={setCurrentView} />
                        <CreateQuestion examArr={examArr} setExamArr={setExamArr} currentView={currentView} setCurrentView={setCurrentView} />
                        <BackNForward><button onClick={changePage} >뒤로</button></BackNForward>

                        <UploadExamButton><button onClick={uploadTest}>등록</button></UploadExamButton>
                    </Wrapper>
            }

            

        </MakeWrapper>
        </>
    )
}

export default CreateTest;