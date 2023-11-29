import { useEffect, useRef, useState } from "react";
import styled from "styled-components";


const ImageBox=styled.div`
    
    display:flex;
    align-items:center;
    justify-content:center;
    width:100%;
    height:500px;
    background-color:white;
    
    img{
        height:90%;
        width:90%;
        object-fit:contain;
    }
    button{
        align-self:flex-start;
        margin-top:5%;
    }
    @media only screen and (max-width:900px){
        img{
            width:90%;
        }
    }
`
function UploadImage({copy,setContents,reset}){

    const inputRef=useRef();// input type file 참조
    const imgRef=useRef();
    const [imageUrl,setImageUrl]=useState('')// 화면에 보여줄 이미지URL
    const [uploadExist,setUploadExist]=useState(false) //true일 경우 x버튼 보이기
    //div태그를 누르면 이미지 업로드창
    const onClick=()=>{
        if(uploadExist===true) return;
        inputRef.current.click();
    }

    //리셋
    useEffect(()=>{
        removeThumbnail();
    },[reset])

    //currentView 바뀌었을 경우
    useEffect(()=>{
        if(copy.file=='') {
            setImageUrl('')
            setUploadExist(false);
            setContents((prev)=>{
                return {...prev,['file']:''}
            })
            return;
        }
        else {
            let url=URL.createObjectURL(copy.file);
            setImageUrl(url);
            setUploadExist(true);
            setContents((prev)=>{
                return {...prev,['file']:copy.file}
            })
        }
    },[copy])
    
    useEffect(()=>{//이미지 없을때는 img태그 안보이게
        if(!uploadExist)
            imgRef.current.style.display='none';
        else imgRef.current.style.display='';
    })
    
    //input에 직접 파일이 올라가면 실행 
    //미리보기를 위해 이미지url만드는 과정
    const onChange=(e)=>{
        let file;
        if(e.target.files){
            file=e.target.files[0];
            let url=URL.createObjectURL(file);
            setImageUrl(url);
            setUploadExist(true);
            setContents((prev)=>{
                return {...prev,['file']:file}
            })
        }
    }

    const removeThumbnail=()=>{
        console.log(inputRef.current.value);//파일의 path가 뜬다.
        inputRef.current.value="";
        setContents((prev)=>{
            return {...prev,['file']:""}
        })
        setImageUrl(null);
        setUploadExist(false);
    }


    return (
        <div id="uploadImageComponent">
            <ImageBox id='image_upload_button'  onClick={onClick}>
                
                <img id="image_thumbnail" ref={imgRef}src={imageUrl} alt=""></img>
                {
                uploadExist?<button onClick={removeThumbnail}>X</button>:<h1>이미지 첨부</h1>
            }
            </ImageBox>
            
            <input type="file" hidden ref={inputRef} onChange={onChange}></input>
        </div>
    )
}

export default UploadImage;