import styled from "styled-components";


const ArrayDiv=styled.div`
    flex:4;
    height:900px;
    margin:0 20px;
    background-color:white;
    @media only screen and (max-width:900px){
        width:80%;
        margin:20px 20px;
    }
`
const Box=styled.div`
    display:flex;
    align-items:center;
    background-color:#cccccc;
    margin:10px auto;
    height:50px;
    width:90%;
    &:hover{
        cursor:pointer;
    }
`
const Number=styled.div`
    flex:1;
    font-size:20px;
    margin-left:15px;
`
const Text=styled.div`
    flex:3;
    overflow:hidden;
    text-overflow: ellipsis; 
    white-space: nowrap;
    height:25px;
    
    `
const Del=styled.div`
    flex:1;
    display:flex;
    justify-content:center;
    align-items:center;
    height:90%;
    p{
        margin:0;
    }
    &:hover{
        box-shadow:0 0 0 3px red;
    }
`
function ArrayMap({examArr,setExamArr,currentView,setCurrentView}){

    const ChangeCurrentView=(e)=>{
        setCurrentView(e.target.accessKey)
    }
    const removeQuestion=(e)=>{
        let index=e.target.getAttribute('accessKey');
        console.log(index);
        if(index==currentView)
            setCurrentView(-1);
        examArr.splice(index,1)
        setExamArr([...examArr]);
    }
    return (
        <ArrayDiv>
            {
            examArr.map((v,i)=>{
                return (
                    <Box key={i}>
                        <Number>{i+1}번</Number>
                        <Text accessKey={i} onClick={ChangeCurrentView}>{examArr[i].text} </Text>
                        
                        <Del accessKey={i} onClick={removeQuestion}><p>삭제X</p></Del>
                    </Box>
                )
            })
        }
        </ArrayDiv>
            
    );

}

export default ArrayMap;