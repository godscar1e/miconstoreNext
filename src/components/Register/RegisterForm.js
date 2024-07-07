'use client'

import { useRouter } from "next/navigation";

import styles from "./RegisterForm.module.scss";
import formStyles from "../../app/styles/_form.module.scss";

export default function RegisterForm() {
    const router = useRouter();

    async function handleSubmit(event) {
        event.preventDefault();

        try {
            const formData = new FormData(event.currentTarget);

            const name = formData.get('name');
            const email = formData.get('email');
            const surname = formData.get('surname');
            const password = formData.get('password');
            const phone = formData.get('phone');
            const repeatPassword = formData.get('repeatpassword');

            if (password !== repeatPassword) {
                alert("Passwords do not match!");
                return;
            }

            const userData = {
                name,
                email,
                surname,
                password,
                phone,
            };

            console.log("Data to be sent:", userData);
            const response = await fetch('/api/register', {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(userData)
            });

            if (response.status === 201) {
                router.push('/login');
            } else {
                console.error("Registration failed:", response.statusText);
            }
        } catch (e) {
            console.error(e.message);
        }
    }

    return (
        <>
            <form className={styles.form} onSubmit={handleSubmit}>
                <div className={styles.formContainer}>

                    <div className={formStyles.inputGroup}>
                        <label className={formStyles.label}>Имя</label>
                        <input type="text" name="name" id="name" required />
                    </div>
                    <div className={formStyles.inputGroup}>
                        <label className={formStyles.label}>Эл. адрес</label>
                        <input type="email" name="email" id="email" required />
                    </div>
                    <div className={formStyles.inputGroup}>
                        <label className={formStyles.label}>Фамилия</label>
                        <input type="text" name="surname" id="surname" required />
                    </div>
                    <div className={formStyles.inputGroup}>
                        <label className={formStyles.label}>Пароль</label>
                        <input type="password" name="password" id="password" required />
                    </div>
                    <div className={formStyles.inputGroup}>
                        <label className={formStyles.label}>Номер телефона</label>
                        <input type="text" name="phone" id="phone" required />
                    </div>
                    <div className={formStyles.inputGroup}>
                        <label className={formStyles.label}>Подтвердите пароль</label>
                        <input type="password" name="repeatpassword" id="repeatpassword" required />
                    </div>
                </div>
                <button type="submit">Зарегистрироваться</button>
            </form >
        </>
    );
}
