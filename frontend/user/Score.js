import axios from "axios";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import InputScore from "./InputScore";

function Score(){

    const location=useLocation();
    const [answer,setAnswer]=useState([]);
    
    
    useEffect(()=>{
        axios.get('http://localhost:8080/candid/'+location.state.exam_id)
        .then((data)=>{
            console.log(data.data);
            setAnswer(data.data);
        })
    },[])

    
    return (
        <div>
            채점공간
            {location.state.exam_id}
            <table>
                <thead>
                    <tr>
                        <th>정답</th>
                        <th>점수</th>
                    </tr>
                </thead>
                <tbody>
                {
                    answer.length===0?
                    <tr></tr>:
                    answer.map((v,i)=>{
                        let ans=JSON.parse(v.answer);
                        let id=v.id;
                        
                        return (
                            <InputScore testid={location.state.exam_id} ans={ans} id={id}/>
                        )
                    })
                }
            
                </tbody>
            </table>
            
        </div>
    )
}

export default Score;