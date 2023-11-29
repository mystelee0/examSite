import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import axios from "axios";

function LoginCallback({setIsLogin,setUser}){

    const [searchParams,setSearchParams]=useSearchParams();
    const navigate=useNavigate();

    useEffect(()=>{
        let state=searchParams.get("state");
        let code=searchParams.get("code");

        axios.get(`http://localhost:8080/naverlogin?code=${code}&state=${state}`,{
            withCredentials:true
        })
        .then((data)=>{
            if(data.data!=null){
                alert("로그인 완료");
                console.log("결과값 :",data.data);
                setUser(data.data);
                setIsLogin(true);
                navigate("/");
            }
            else {
                alert("이미 로그인된 사용자입니다.");
                navigate("/login");
            }
        })
    },[])

    return(
        <>
            로그인 처리중
        </>
    )
}

export default LoginCallback;