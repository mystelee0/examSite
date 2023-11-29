import axios from "axios";
import { useEffect, useState } from "react";
import { Route, useNavigate, useOutletContext } from "react-router-dom";

function MyExam() {

    const [exams, setExams] = useState([]);
    const context = useOutletContext()
    const navigate=useNavigate();
    useEffect(() => {
        axios.get('http://localhost:8080/user/myexam/' + context.id, { withCredentials: true })
            .then((data) => {
                console.log(data.data);
                setExams(data.data);
            })
    }, [])

    const showcandid=(exam_id)=>{
        navigate('/score',{state:{exam_id}})
    }
    
    return (
        <div>
            출제한 시험정보
            {
                exams.length === 0 ?
                    <p>로딩중</p> :
                    
                    exams.map((v, i) => {
                        let info=JSON.parse(v.testInfo);
                        return(
                        <div key={i} onClick={()=>{showcandid(v.exam_id)}}>
                            {info.testname}
                            {info.date}
                        </div>
                        )
                    })
            }
        </div>
    )
}

export default MyExam;