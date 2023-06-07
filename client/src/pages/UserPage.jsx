import React from "react";
import '../styles/Auth.css';
import Header from "../components/Header";
import UserAuth from "../components/UserAuth";

import Login from "../components/Login";
import SignUp from "../components/SignUpForm";



function UserPage(){
    return (
        <div>
            <Login />
        </div>
    )
}

export default UserPage;