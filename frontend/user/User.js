import { Link, Outlet } from "react-router-dom";

function User({user}){

    return (
        <div id="user_page">
            <div id="user_sidebar">
            <div>
                <Link to="info">유저정보</Link>
            </div>
            <div>
                <Link to="myexam">출제한 시험</Link>
            </div>
            <div>
                <Link to="examresult">시험결과</Link>
            </div>
            </div>
            {/* context는 outlet에 해당하는 컴포넌트에게 값을 넘겨주는 역할*/}
            <Outlet context={user}></Outlet>
        </div>
    )
}

export default User;