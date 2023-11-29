import { Children, useEffect } from "react";

function SaveContents({contents,setContents,examArr,setExamArr,
    currentView,children,resetView}){

    let OriginContents={
        file:"",
        text:"",
        type:"answer",
        choices:"",
        answer:""
        }
        
    //배열에 저장,리셋
    const saveAll=()=>{
        let begin=[],end=[];
    if(currentView!==-1){
        begin=examArr.slice(0,currentView);
        end=examArr.slice(currentView+1,);
    }
        if(contents.file===''&&contents.text===''){
            alert("이미지나 텍스트를 입력해주세요");
            return;
        }
        if(currentView!==-1){
            setExamArr([...begin,contents,...end]);
        }
        else{// -1
            setExamArr([...examArr,contents]);
        }
        console.log('contents : ',contents);
        
        setContents(OriginContents);
        resetView();
    }
    
    return (
        <button onClick={saveAll}>{children}</button>
    )
}

export default SaveContents