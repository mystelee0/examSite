import { useEffect, useRef, useState } from "react";
import styled from "styled-components";

const StyledDiv=styled.div`
    background-color:white;
    margin:20px 0;
    width:100%;
    height:300px;
    outline:none;
`

function DivEditor({copy,setContents,reset}){

    const divBox=useRef()
    //리셋
    useEffect(()=>{
        divBox.current.innerText="";
    },[reset])

    //currentView 변경시
    useEffect(()=>{
        divBox.current.innerHTML=copy.text;
        setContents((prev)=>{
            return {...prev,['text']:divBox.current.innerHTML}
        })
    },[copy])


    const onInput=()=>{
        console.log(divBox.current.innerHTML);
        setContents((prev)=>{
            return {...prev,['text']:divBox.current.innerHTML}
        })
    }
    const temp_style={//임시 스타일 지정 나중에 지울것
        
    }

    return (
        <StyledDiv contentEditable 
        id="div_editor" 
        ref={divBox} 
        onInput={onInput}
        >
        </StyledDiv>
        
    )
}

export default DivEditor;