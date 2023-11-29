import { useEffect, useState } from "react";
import styled from "styled-components";

const Box=styled.div`
    [name*=input] {
        border:none;
        border-bottom:1px solid gray;
        width:80%;
    }
    input {
        margin:5px 0;
        padding:10px;
    }
    [type=radio]{
        margin-left:5px;
        margin-right:10px;
    }
`

function Choice({copy,setContents,reset}){

    const [type,setType]=useState('')
    const [visible,setVisible]=useState(false)
    const [answer,setAnswer]=useState('');
    const [inputs,setInputs]=useState({
        input1:'',
        input2:'',
        input3:'',
        input4:''
    })

    let {input1,input2,input3,input4}=inputs;

    //currentView 변경시
    useEffect(()=>{
        if(copy.choices==''&&copy.answer=='') {
            setType('answer');
            return; //주관식
        }
        else { //객관식
            setType(copy.type);
            setInputs({...copy.choices});
            setAnswer(copy.answer);
            setContents((prev)=>{
                return {...prev,['choices']:inputs,['answer']:answer}
            })
        }
    },[copy])

    //리셋
    useEffect(()=>{
        setInputs({
            input1:'',
            input2:'',
            input3:'',
            input4:''
        });
        setAnswer('');
        setType('answer');
    },[reset])


    //각각의 지문 저장
    const onChange=(e)=>{
        let name=e.target.name;
        let value=e.target.value;
        setInputs({
            ...inputs,
            [name]:value
        });
    }
    useEffect(()=>{
        setContents((prev)=>{
            return {...prev,['choices']:inputs}
        })
    },[inputs])

    //정답체크 저장
    const inputAnswer=(e)=>{
        setAnswer(e.target.value);
    }
    useEffect(()=>{
        setContents((prev)=>{
            return {...prev,['answer']:answer}
        })
    },[answer])

    

    //주관식,객관식 선택창
    const chooseForm=()=>{
        setVisible(!visible);
    }
    const selectType=(e)=>{
            setType(e.target.value);
            setInputs({
                input1:'',
                input2:'',
                input3:'',
                input4:''
            })
            setAnswer('');
            setContents((prev)=>{
                return {...prev,['type']:e.target.value}
            })
    }

    return (
        <Box>
            <button onClick={chooseForm}>선택지</button>
            {
                visible?
                <ol>
                    <li><input type="radio" name="type" value='answer' 
                    onChange={selectType} checked={type==='answer'}></input>
                    <label>주관식</label></li>
                    <li><input type="radio" name="type" value='choice' 
                    onChange={selectType} checked={type==='choice'}></input>
                    <label>객관식</label></li>
                </ol>
                :null
            }
            {
                type==='answer'?null:
                    (
                    <div>
                        <label htmlFor={1}>1. </label>
                        <input type="radio" name="answer" onChange={inputAnswer} checked={answer==1} value={1}></input>
                        <label htmlFor={1}></label>
                        <input name="input1" value={input1||''} onChange={onChange} placeholder="선택지" ></input><br></br>
                        <label htmlFor={2}>2. </label>
                        <input type="radio" name="answer" onChange={inputAnswer} checked={answer==2} value={2}></input>
                        <label htmlFor={2}></label>
                        <input name="input2" value={input2||''} onChange={onChange}placeholder="선택지" ></input><br></br>
                        <label htmlFor={3}>3.</label>
                        <input type="radio" name="answer" onChange={inputAnswer} checked={answer==3} value={3}></input>
                        <label htmlFor={3}></label>
                        <input name="input3" value={input3||''} onChange={onChange}placeholder="선택지" ></input><br></br>
                        <label htmlFor={4}>4.</label>
                        <input type="radio" name="answer" onChange={inputAnswer} checked={answer==4}value={4}></input>
                        <label htmlFor={4}></label>
                        <input name="input4" value={input4||''} onChange={onChange}placeholder="선택지" ></input><br></br>
                        
                    </div>
                    )
            }
                
        </Box>
    )
}

export default Choice;