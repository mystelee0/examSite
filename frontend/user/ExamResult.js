import { useEffect, useState } from "react";
import axios from "axios";
function ExamResult(){

    const [data,setData]=useState([]);
    useEffect(()=>{
        axios.get('http://localhost:8080/exam_result',{withCredentials:true})
        .then((data)=>{
            console.log(data.data);
            setData(data.data);
        })
    },[])
    return (
        <div>
            시험응시 결과
            {
                data.map((v,i)=>{
                    let info=JSON.parse(v.test_info);
                    return (
                        <div>
                            {info.testname} 결과 : {v.result}
                        </div>
                    )
                })
            }
            
        </div>
    )
}

export default ExamResult;