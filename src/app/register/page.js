import React from "react";
import RegisterForm from "../../components/Register/RegisterForm";

import Link from "next/link";

const Register = () => {
    return (
        <div>
            <Link href="login">Already have an account?</Link>
            <div>Register</div>
            <RegisterForm />
        </div>
    );
};

export default Register;
