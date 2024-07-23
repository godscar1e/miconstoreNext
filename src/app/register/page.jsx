import React from "react";
import RegisterForm from "@/components/Register/RegisterForm";
import Link from "next/link";
import Header from "@/components/Header/Header";

import styles from "../styles/FormStyles.module.scss";

const Register = () => {
    return (
        <div className={styles.wrapper}>
            <Header />
            <div className={styles.container}>
                <h2 className={styles.title}>Регистрация нового аккаунта</h2>
                <Link href="login" className={styles.link}>Уже имеется аккаунт?</Link>
                <RegisterForm />
            </div>
        </div>
    );
};

export default Register;
