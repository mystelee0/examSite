import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const HomeDiv=styled.div`
width:1400px;
    height:200vh;
    margin:0 auto;
background-image:url('orangeBackground0.png');
background-repeat:no-repeat;
background-size:cover;

@media only all and (max-width:900px){
    width:100%;
    H1 {
        font-size:140%;
    }
}
`

const Welcome = styled.div`
        
        text-align:center;
        height:100vh;
    `;
const H1 = styled.h1`
        position:relative;
        word-break:keep-all;
        padding:10px 0;
        top:350px;
        font-size:50px;
        font-weight:bold;
        color:white;
        opacity:0;
        animation-name:showh1;
        animation-delay:0.7s;
        animation-duration:1s;
        animation-fill-mode: forwards;
        @keyframes showh1 {
            from{opacity:0; transform:translate(0,15px);}
            to{opacity:1; transform:translate(0,0);}
        }
    `
const Box = styled.div`
        text-align:center;
        height:100vh;
        display:flex;
        justify-content:center;
        background-color:#feab37;
    `
const StyledLink = styled(Link)`
        height:200px;
        width:400px;
        margin:40px 20px;
        display:flex;
        justify-content:center;
        align-items:center;
        background-color:white;
        text-decoration:none;
        border-radius:10px;
        box-shadow : 2px 2px 5px;
        font-size:40px;
        color:black;

        opacity:0;
        animation-duration:1s;
        animation-fill-mode:forwards;
        @keyframes example{
            from{opacity:0;}
            to{opacity:1;}
        }
    `
function Home() {
    
    const ref=useRef([])
    useEffect(()=>{
        let observer=new IntersectionObserver(callback,{threshold:1});
        ref.current.forEach((e)=>{
            observer.observe(e);
        })
    },[])

    const callback=(e)=>{
        e.forEach((el)=>{
            if(el.isIntersecting)
            el.target.style.animationName='example';
        })     
    }
    
    return (
        <HomeDiv>
            <Welcome>
                <H1>지식과 함께하는 여정에 환영합니다!</H1>
                <H1>온라인 테스트 여기서 함께하세요 :)</H1>
            </Welcome>
            <Box>  
            <StyledLink ref={el=>ref.current[0]=el} to="/create">출제하기</StyledLink>
            <StyledLink ref={el=>ref.current[1]=el} to="/list">응시하기</StyledLink>
            </Box>
        </HomeDiv>
    );
}

export default Home;