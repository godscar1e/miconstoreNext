'use client'
import React, { useState } from 'react'
import { useRouter } from "next/navigation"
import axios from "axios"
import { validatePassword } from '@/utils/validatePassword'
import styles from './SignUpForm.module.scss' // Подключите ваш CSS-модуль



export default function SignUpForm() {
	const router = useRouter()
	const [errors, setErrors] = useState({})

	const [formData, setFormData] = useState({
		name: '',
		email: '',
		surname: '',
		password: '',
		phone: '',
		repeatPassword: '',
	})
	const handleChange = (event) => {
		const { name, value } = event.target

		// Restrict name and surname to letters only
		if (name === 'name' || name === 'surname') {
			if (!/^[a-zA-Zа-яА-Я]*$/.test(value)) {
				return
			}
		}

		setFormData({ ...formData, [name]: value })
	}
	const validate = () => {
		const newErrors = {}

		if (!formData.name) newErrors.name = "*Name is required"
		if (!formData.email) {
			newErrors.email = "*Email is required"
		} else if (!/\S+@\S+\.\S+/.test(formData.email)) {
			newErrors.email = "*Email is invalid"
		}
		if (!formData.surname) newErrors.surname = "*Surname is required"

		if (!formData.password) {
			newErrors.password = "*Password is required"
		} else {
			const passwordErrors = validatePassword(formData.password)
			if (passwordErrors.length > 0) {
				newErrors.password = `Password must contain:\n${passwordErrors.join("\n")}`
			}
		}

		if (!formData.phone) {
			// newErrors.phone = "*Phone number is required";
		} else if (!/^\d+$/.test(formData.phone.replace(/\D/g, ''))) {
			newErrors.phone = "*Phone number is invalid"
		}

		if (formData.password !== formData.repeatPassword) {
			newErrors.repeatPassword = "*Passwords do not match"
		}

		return newErrors
	}
	async function handleSubmit(event) {
		event.preventDefault()

		const newErrors = validate()
		if (Object.keys(newErrors).length > 0) {
			setErrors(newErrors)
			return
		}

		const { repeatPassword, ...dataWithoutRepeatPassword } = formData

		try {
			const response = await axios.post('/api/signup', dataWithoutRepeatPassword)

			if (response.status === 201) {
				// notify()
				setTimeout(() => {
					router.push('/signin')
				}, 3000)
			} else {
				console.error("Registration failed:", response.statusText)
			}
		} catch (error) {
			console.error("Error during registration:", error.message)
		}
	}

	return (
		<form className={styles.form} onSubmit={handleSubmit}>
			<div className={styles.formContainer}>
				<div className={styles.formGroup}>
					<label htmlFor="name">Name:</label>
					<input
						type="text"
						id="name"
						name="name"
						placeholder="Enter your name"
						value={formData.name} onChange={handleChange}
						required
					/>
					{errors.name && <p className={styles.error}>{errors.name}</p>}
				</div>
				<div className={styles.formGroup}>
					<label htmlFor="surname">Surname:</label>
					<input
						type="text"
						id="surname"
						name="surname"
						placeholder="Enter your surname"
						value={formData.surname} onChange={handleChange}
						required
					/>
					{errors.surname && <p className={styles.error}>{errors.surname}</p>}
				</div>
				<div className={styles.formGroup}>
					<label htmlFor="phone">Phone Number:</label>
					<input
						type="tel"
						id="phone"
						name="phone"
						placeholder="Enter your phone number"
						value={formData.phone} onChange={handleChange}
						required
					/>
					{errors.phone && <p className={styles.error}>{errors.phone}</p>}
				</div>
				<div className={styles.formGroup}>
					<label htmlFor="email">Email:</label>
					<input
						type="email"
						id="email"
						name="email"
						placeholder="Enter your email"
						value={formData.email} onChange={handleChange}
						required
					/>
					{errors.email && <p className={styles.error}>{errors.email}</p>}
				</div>
				<div className={styles.formGroup}>
					<label htmlFor="password">Password:</label>
					<input
						type="password"
						id="password"
						name="password"
						placeholder="Enter your password"
						value={formData.password} onChange={handleChange}
						required
					/>
					{errors.password && <p className={`${styles.error} ${styles.passError}`} style={{ whiteSpace: 'pre-wrap' }}>{errors.password}</p>}
				</div>
				<div className={styles.formGroup}>
					<label htmlFor="repeatPassword">Confirm Password:</label>
					<input
						type="password"
						id="repeatPassword"
						name="repeatPassword"
						placeholder="Confirm your password"
						value={formData.repeatPassword} onChange={handleChange}
						required
					/>
					{errors.repeatPassword && <p className={styles.error}>{errors.repeatPassword}</p>}
				</div>
			</div>
			<button type="submit">Sign Up</button>
		</form>
	)
}
