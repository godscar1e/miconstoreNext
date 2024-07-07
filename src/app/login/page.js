import React from "react";
import Link from "next/link";
import LoginForm from "@/components/Login/LoginForm";
import Header from "@/components/Header";
import styles from "../styles/FormStyles.module.scss";
import SocialLogins from "@/components/Login/SocialLogin";

const Login = () => {
    return (
        <div className={styles.wrapper}>
            <Header />
            <div className={styles.container}>
                <h2 className={styles.title}>Вход в аккаунт</h2>
                <Link href="/register" className={styles.link}>Нет аккаунта?</Link>
                <LoginForm />
                <SocialLogins />
            </div>
        </div>
    );
};

export default Login;
