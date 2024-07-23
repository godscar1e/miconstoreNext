'use client'

import React, { useState } from 'react';
import 'react-phone-number-input/style.css';
import { useRouter } from "next/navigation";
import styles from "./RegisterForm.module.scss";
import formStyles from "../../app/styles/_form.module.scss";
import axios from "axios";

import PhoneInputMask from './PhoneInput';

export default function RegisterForm() {
    const router = useRouter();

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        surname: '',
        password: '',
        phone: '',
        repeatPassword: '',
    });

    const [errors, setErrors] = useState({});

    const validate = () => {
        const newErrors = {};

        if (!formData.name) newErrors.name = "*Name is required";
        if (!formData.email) {
            newErrors.email = "*Email is required";
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = "*Email is invalid";
        }
        if (!formData.surname) newErrors.surname = "*Surname is required";

        if (!formData.password) {
            newErrors.password = "*Password is required";
        } else {
            const passwordErrors = [];
            if (formData.password.length < 8) {
                passwordErrors.push("*Минимум 8 символов");
            }
            if (!/[A-Z]/.test(formData.password)) {
                passwordErrors.push("*Букву в верхнем регистре");
            }
            if (!/[a-z]/.test(formData.password)) {
                passwordErrors.push("*Одну строчную букву");
            }
            if (!/\d/.test(formData.password)) {
                passwordErrors.push("*Одну цифру");
            }
            if (passwordErrors.length > 0) {
                newErrors.password = `Пароль должен содержать:\n${passwordErrors.join("\n")}`;
            }
        }

        if (!formData.phone) {
            // newErrors.phone = "*Phone number is required";
        } else if (!/^\d+$/.test(formData.phone.replace(/\D/g, ''))) {
            newErrors.phone = "*Phone number is invalid";
        }

        if (formData.password !== formData.repeatPassword) {
            newErrors.repeatPassword = "*Passwords do not match";
        }

        return newErrors;
    };

    const handleChange = (event) => {
        const { name, value } = event.target;

        // Restrict name and surname to letters only
        if (name === 'name' || name === 'surname') {
            if (!/^[a-zA-Zа-яА-Я]*$/.test(value)) {
                return;
            }
        }

        setFormData({ ...formData, [name]: value });
    };

    async function handleSubmit(event) {
        event.preventDefault();

        const newErrors = validate();
        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        const { repeatPassword, ...dataWithoutRepeatPassword } = formData;

        try {
            const response = await axios.post('/api/register', dataWithoutRepeatPassword);

            if (response.status === 201) {
                router.push('/login');
            } else {
                console.error("Registration failed:", response.statusText);
            }
        } catch (error) {
            console.error("Error during registration:", error.message);
        }
    }

    return (
        <>
            <form className={styles.form} onSubmit={handleSubmit}>
                <div className={styles.formContainer}>
                    <div className={formStyles.inputGroup}>
                        <label className={formStyles.label}>Имя</label>
                        <input type="text" name="name" id="name" value={formData.name} onChange={handleChange} required />
                        {errors.name && <p className={formStyles.error}>{errors.name}</p>}
                    </div>
                    <div className={formStyles.inputGroup}>
                        <label className={formStyles.label}>Эл. адрес</label>
                        <input type="email" name="email" id="email" value={formData.email} onChange={handleChange} required />
                        {errors.email && <p className={formStyles.error}>{errors.email}</p>}
                    </div>
                    <div className={formStyles.inputGroup}>
                        <label className={formStyles.label}>Фамилия</label>
                        <input type="text" name="surname" id="surname" value={formData.surname} onChange={handleChange} required />
                        {errors.surname && <p className={formStyles.error}>{errors.surname}</p>}
                    </div>
                    <div className={formStyles.inputGroup}>
                        <label className={formStyles.label}>Пароль</label>
                        <input type="password" name="password" id="password" value={formData.password} onChange={handleChange} required />
                        {errors.password && <p className={`${formStyles.error} ${formStyles.passError}`} style={{ whiteSpace: 'pre-wrap' }}>{errors.password}</p>}
                    </div>
                    <div className={formStyles.inputGroup}>
                        <label className={formStyles.label}>Номер телефона</label>
                        <PhoneInputMask />
                        {errors.phone && <p className={formStyles.error}>{errors.phone}</p>}
                    </div>
                    <div className={formStyles.inputGroup}>
                        <label className={formStyles.label}>Подтвердите пароль</label>
                        <input type="password" name="repeatPassword" id="repeatPassword" value={formData.repeatPassword} onChange={handleChange} required />
                        {errors.repeatPassword && <p className={formStyles.error}>{errors.repeatPassword}</p>}
                    </div>
                </div>
                <button type="submit">Зарегистрироваться</button>
            </form>
        </>
    );
}
