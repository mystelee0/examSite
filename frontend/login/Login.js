import { useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
function Login(){

    const navigate=useNavigate();
/**
 * js sdk를 이용한 방식이다
 * 콜백url을 서버로 바꿀 시 access_toekn을 받아올 수 없다.
 * 파라미터 구분자가 ?로 뒤에 파라미터가 와야되는데
 * 파라미터 구분자가 #으로 뒤의 파라미터를 얻을 수 없기때문이다.
 */
    const {naver}=window;
    let naverLogin = new naver.LoginWithNaverId({
        clientId: "Pjqbiev3Yf6VA664uaFp",
        callbackUrl: "http://localhost:3000/login",
        isPopup:false,
        loginButton:{color:"green",type:3,height:60}
    });
    useEffect(()=>{
        naverLogin.init();
    },[])
    

    
    return(
        <div>
            로그인화면
            <div id="naverIdLogin"><a id="naverIdLogin_loginButton" href="#" role="button"><img src="https://static.nid.naver.com/oauth/big_g.PNG" width={320}/></a></div>

            <div><button onClick={()=>{
                naverLogin.getLoginStatus((status)=>{
                    if(status){
                        alert(status+naverLogin.user.getName()+naverLogin.user.getEmail()+naverLogin.user.getMobile());
                        console.log(naverLogin);
                        console.log(naverLogin.accessToken.accessToken);
                    }
                    else alert(status);
                })
                
            }}>로그인상태확인</button></div>

            <button onClick={()=>{
                naverLogin.logout();
                navigate("/");
            }}>로그아웃</button>

            <button onClick={()=>{
                let CLIENT_ID='Pjqbiev3Yf6VA664uaFp'
                let CLIENT_SECRET=''
                let ACCESS_TOKEN=encodeURI(naverLogin.accessToken.accessToken);
                let str=`https://nid.naver.com/oauth2.0/token?&client_id=${CLIENT_ID}&client_secret=${CLIENT_SECRET}&access_token=${ACCESS_TOKEN}&service_provider=NAVER&grant_type=delete`
                window.location.href=str;
            }}>연동해제</button>
        </div>
    )
}

export default Login;