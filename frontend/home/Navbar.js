import 'bootstrap/dist/css/bootstrap.min.css';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { useEffect, useRef } from 'react';

const Header=styled.header`
  height:80px;
  position:fixed;
  display:flex;
  align-items:center;
  top:0px;
  max-width:1400px;
  width:100%;
  z-index:2;
  @media only all and (max-width:900px){
    width:100%;
    flex-direction:column;
    justify-content:center;
    Nav {
      margin:0;
      width:100%;
    }
    Nav li {
      margin:0 5px;
      width:20%;
    }
    Nav li a{
      padding:6px 5px;
      font-size:90%;
    }
    H1 {
      font-size:140%;
      margin:0 auto;
    }
  }
`
const Nav=styled.nav`
  font-size:20px;
  margin-left:auto;
  margin-right:30px;
  width:45%;
  ul {
    list-style-type:none;
    white-space:nowrap;
  }
  li {
    float:left;
    margin:0 20px;
  }
  li a {
    padding:6px 15px;
    text-decoration:none;
    color:white;
  }
  .login {
    margin:0;
  }
  #navhome {
    border:1px solid white;
    border-radius:5px;
  }
  
`
const H1=styled.h1`
  margin-left:30px;
  color:white;
`
function BootstrapNavbar({ isLogin, user }) {

  const navigate = useNavigate();

  const header=useRef(<Header></Header>);
  useEffect(()=>{
    window.addEventListener('scroll',handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  },[])

  const handleScroll=()=>{
    if(window.scrollY>80){
      header.current.style.setProperty('background-color','#ff9500');
    }
    else
      header.current.style.setProperty('background-color','');
  }
  return (
    <Header ref={header}>
      <H1 onClick={()=>{navigate('/')}}>ExamSite</H1>
      <Nav>
        <ul>
          <li> <a id='navhome' href="#" onClick={()=>{navigate('/')}}>Home</a> </li>
          <li> <a href="#" onClick={()=>{navigate('/create')}}>Making</a> </li>
          <li> <a href="#" onClick={()=>{navigate('/list')}}>Testing</a></li>
          {
            isLogin?
            <>
            <li className='login'><a href="#" onClick={()=>{navigate('/user')}}>{user.name}<span> 님</span></a></li>
            <li className='login'> <a href="#" onClick={()=>{navigate('/logout')}}>Sign Out</a> </li>
            </>:
            <li className='login'> <a href="#" onClick={()=>{navigate('/login')}}>Sign In</a> </li>
          }
        </ul>
        
      </Nav>
    </Header>
  );
}

export default BootstrapNavbar;