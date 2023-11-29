import { useOutletContext } from "react-router-dom";

function UserInfo(){

    //outlet에서 props를 넘겨받기 위한 hook
    const context=useOutletContext();
    
    return(
        <div>
            유저 정보 창
            {context.name}
            {context.email}
            {context.mobile}
        </div>
    )
}

export default UserInfo;