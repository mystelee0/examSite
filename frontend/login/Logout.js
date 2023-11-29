import axios from "axios";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Logout({setIsLogin}){

    const navigate=useNavigate();
    useEffect(()=>{
        axios.get("http://localhost:8080/logout",{
        withCredentials:true
    })
    .then((data)=>{
        console.log(data.data);
        if(data.data=="success"){
            setIsLogin(false);
            alert("로그아웃 되었습니다."); 
            navigate("/");
        }
        else if(data.data=="fail")
            alert("실패");
    })
    .catch((err)=>{
        alert('오류발생',err);
    })
    },[])
    
}

export default Logout;