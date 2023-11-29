import styled from "styled-components";

const StyledDiv=styled.div`//높이를 맞추기 위한 빈박스
    height:80px;
    width:100%;
`

function EmptyBox(){
    return <StyledDiv></StyledDiv>
}

export default EmptyBox;