import { useEffect, useState } from "react";
import DivEditor from "./input/DivEditor";
import UploadImage from "./input/UploadImage";
import Choice from "./input/Choice";
import SaveContents from "./save/SaveContents";
import styled from "styled-components";

const Box=styled.div`
flex:8;
margin:0 20px 0 0;
@media only screen and (max-width:900px){
    flex:8;
    width:90%;
    margin:0;
}
`
function CreateQuestion({examArr,setExamArr,currentView,setCurrentView}){
  
    let OriginContents={
        file:"",
        text:"",
        type:"answer",
        choices:"",
        answer:""
        }
    const [reset,setReset]=useState(false);
    const [copy,setCopy]=useState(OriginContents);
    const [contents,setContents]=useState(OriginContents);

    // 현재 페이지가 바뀔경우
    useEffect(()=>{
        if(currentView==-1) setCopy({...OriginContents});
        else{
            setCopy(examArr[currentView])
        }
    },[currentView])
    
    const resetView=()=>{
        setCurrentView(-1);
        setReset(!reset);
    }
    return (
        <Box>
            <UploadImage copy={copy} setContents={setContents} reset={reset}  />
            <DivEditor copy={copy} setContents={setContents} reset={reset}  />
            <Choice copy={copy} setContents={setContents} reset={reset}  />
            {/*<button onClick={saveAll}>저장</button>*/}
            <SaveContents contents={contents} setContents={setContents}examArr={examArr} setExamArr={setExamArr} 
             currentView={currentView} resetView={resetView}
            >컴포넌트저장</SaveContents>
            <button onClick={resetView}>새로만들기</button>
        </Box>
    );
}

export default CreateQuestion;