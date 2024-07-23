"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import axios from "axios";
import styles from "./ChangePass.module.scss";
import formStyles from "../../app/styles/_form.module.scss";

export default function ChangePassForm() {
    const { session } = useSession();
    // const { data: session } = useSession();
    const [user, setUser] = useState(() => {
        // Попытка получить данные пользователя из localStorage
        const storedUser = localStorage.getItem("user");
        return storedUser ? JSON.parse(storedUser) : session?.user || null;
    });

    useEffect(() => {
        if (session?.user) {
            localStorage.setItem("user", JSON.stringify(session.user));
        }
    }, [session, user]);

    const onSubmit = async (e) => {
        e.preventDefault();

        const newpass = e.target.newpass.value;
        const confirmedpass = e.target.confirmedpass.value;

        if (newpass !== confirmedpass) {
            alert("Passwords do not match!");
            return;
        }
        console.log(user?.id, newpass);
        try {
            const response = await axios.post("/api/changePassword", {
                userId: user?.id,
                newPassword: newpass,
            });

            console.log(response.data); // Log the response from the server
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <>
            <form className={styles.form} onSubmit={onSubmit}>
                <div className={styles.changepassFormContainer}>
                    <div className={formStyles.inputGroup}>
                        <label className={formStyles.label} htmlFor="newpass">Новый пароль</label>
                        <input type="password" name="newpass" id="newpass" required />
                    </div>
                    <div className={formStyles.inputGroup}>
                        <label className={formStyles.label} htmlFor="confirmedpass">Подтвердите новый пароль</label>
                        <input type="password" name="confirmedpass" id="confirmedpass" required />
                    </div>
                    <button type="submit">Подтвердить смену пароля</button>
                </div>
            </form>
        </>
    );
}
