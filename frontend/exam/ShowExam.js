import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

//시험보여주는 곳
function ShowExam({exam,user}){

    const [arr,setArr]=useState([{
        file:'', text:'', type:'', choices:{input1:'',input2:'',input3:'',input4:''}
    }]);
    const [index,setIndex]=useState(0);
    const [url,setURL]=useState('');
    const [checked,setChecked]=useState({});

    const navigate=useNavigate();

    useEffect(()=>{
        console.log(JSON.parse(exam.examArr));
        setArr(JSON.parse(exam.examArr));
    },[])

    useEffect(()=>{
        //2023/10/14수정 체크안한 문제 처리
        let len=arr.length;
        let obj={};
        for(let i=0;i<len;i++){
            obj.i="";
        }
        setChecked(obj);
    },[arr])

    useEffect(()=>{
        console.log(arr[index].file)
        console.log(index);
        if(arr[index].file!=""){
            axios.get("http://localhost:8080/images?name="+arr[index].file,
            {responseType:'blob'})
            .then((data)=>{
                setURL(URL.createObjectURL(data.data));
            })
        }
        else {
            setURL('');
            console.log()
        }
    },[arr,index])

    const changeIndex=(i)=>{
        setIndex(i);
    }

    const answerChange=(e)=>{
        setChecked({
            ...checked,
            [index]:e.target.value
        })
    }

    const answerSubmit=()=>{
        console.log(checked);
        let body={userAnswer:JSON.stringify(checked),id:user.id,exam_id:exam.exam_id}
        
        axios.post('http://localhost:8080/submitanswer',null,
        {withCredentials:true,params:body})
        .then((data)=>{
            if(data.data=='success'){
                alert('제출 완료')
                navigate('/list')
            }
            else alert(data.data);
        })
        .catch((err)=>{
            alert(err);
        })
    }
    return (
        <div>
            <div>{
                arr.map((v,i)=>{
                    return (<div key={i} onClick={ ()=>{changeIndex(i)} }>{i}번 문제</div>);
                })
                }</div>
            <div>
                <img src={url}></img>
                <div >
                    <div>
                    {arr[index].text}
                    </div>
                    {
                        arr[index].type==="answer"?
                        <input type="textarea" onChange={answerChange} value={checked[index]}></input>:
                        <div>
                        <input type="radio" name="answer" value={1} checked={checked[index]==1} onChange={answerChange}></input>{arr[index].choices.input1}
                        <input type="radio" name="answer" value={2} checked={checked[index]==2} onChange={answerChange}></input>{arr[index].choices.input2}
                        <input type="radio" name="answer" value={3} checked={checked[index]==3} onChange={answerChange}></input>{arr[index].choices.input3}
                        <input type="radio" name="answer" value={4} checked={checked[index]==4} onChange={answerChange}></input>{arr[index].choices.input4}
                        </div>
                    }
                    
                    
                </div>
            </div>
            <div>
                {
                    index>0?<button onClick={()=>{setIndex(index-1)}}>이전문제</button>:null
                }
                {
                    index<arr.length-1?<button onClick={()=>{setIndex(index+1)}}>다음문제</button>:null
                }
            </div>

            <div><button onClick={answerSubmit}>최종제출</button></div>
        </div>
    );
}

export default ShowExam;