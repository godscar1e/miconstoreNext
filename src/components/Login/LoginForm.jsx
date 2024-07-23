"use client";

import { doCredentialLogin } from "@/app/actions";
import { useState } from "react";
import { useRouter } from "next/navigation";

import styles from "./LoginForm.module.scss";
import formStyles from "../../app/styles/_form.module.scss";

export default function LoginForm() {
    const router = useRouter();
    const [error, setError] = useState("");

    async function onSubmit(event) {
        event.preventDefault();
        try {
            const formData = new FormData(event.currentTarget);

            const response = await doCredentialLogin(formData);
            if (!!response.error) {
                console.error(response.error);
                setError(response.error.message);
            } else {
                router.push("/");
            }
        } catch (e) {
            console.error(e);
            setError("Check your Credentials");
        }
    }
    return (
        <>
            <div>{error}</div>
            <form className={styles.form} onSubmit={onSubmit}>
                <div className={styles.loginFormContainer}>
                    <div className={formStyles.inputGroup}>
                        <label className={formStyles.label} htmlFor="email">Эл. адрес</label>
                        <input type="email" name="email" id="email" required />
                    </div>
                    <div className={formStyles.inputGroup}>
                        <label className={formStyles.label} htmlFor="password">Пароль</label>
                        <input type="password" name="password" id="password" required />
                    </div>
                    <button type="submit">Войти</button>
                </div>
            </form >

        </>
    );
};


