import axios from "axios";
import { useEffect, useState } from "react";

function InputScore({testid,ans,id}){

    const [score,setScore]=useState(Array(Object.keys(ans).length).fill(0));
    const [sum,setSum]=useState(0);

    
    useEffect(()=>{
        console.log("실행")
        let s=0;
        for(let num in score){
            s+=parseInt(score[num],10);
        }
        setSum(s);
    },[score])

    const onchange=(e)=>{
        let copy=[...score];
        if(e.target.value=='')
            copy[e.target.name]=0;
        else copy[e.target.name]=e.target.value;

        console.log(copy);
        setScore(copy);
    }

    const submitScore=()=>{
        console.log(" "+testid+" "+id+" "+sum)
        let body={exam_id:testid,user_id:id,result:sum}

        axios.post('http://localhost:8080/savescore',null,{params:body})
        .then((data)=>{
            if(data.data==='success')
                alert("전송 완료");
        })
        .catch((e)=>{
            alert(e);
        })
    }
    return (
        <>
        {
            Object.keys(ans).map((v,i)=>{
                return(
                <tr>
                    <td>{ans[v]}</td>
                    <td><input type="number" name={i} onChange={onchange}></input></td>
                </tr>
                
                );
            })
        }

        <tr>
            <td>총점 : </td>
            <td>{sum}</td>
            <td><button onClick={submitScore}>제출</button></td>
        </tr>
        </>
        
    )
}

export default InputScore;