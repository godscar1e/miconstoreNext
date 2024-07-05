// src/pages/login.js

import React from "react";
import Link from "next/link";
import LoginForm from "@/components/Login/LoginForm"; 

const Login = () => {
    return (
        <div>
            <Link href="/register">Don't have an account?</Link>
            <div>Login</div>
            <LoginForm />
        </div>
    );
};

export default Login;
