"use client"

import styles from './LoginForm.module.scss'

import { doCredentialLogin } from "@/app/actions"
import { useState } from "react"
import { useRouter } from "next/navigation"

export default function LoginForm() {
	const router = useRouter()
	const [error, setError] = useState("")
	async function onSubmit(event) {
		event.preventDefault()
		try {
			const formData = new FormData(event.currentTarget)

			const response = await doCredentialLogin(formData)
			if (!!response.error) {
				console.error(response.error)
				setError(response.error.message)
			} else {
				router.push("/")
			}
		} catch (e) {
			console.error(e)
			setError("Check your Credentials")
		}
	}
	return (
		<form className={styles.form} >
			<div>
				<label htmlFor="email">Email:</label>
				<input
					type="email"
					id="email"
					name="email"
					placeholder="Enter your email"
					required
				/>
			</div>
			<div>
				<label htmlFor="password">Password:</label>
				<input
					type="password"
					id="password"
					name="password"
					placeholder="Enter your password"
					required
				/>
			</div>
			<button type="submit">Login</button>
		</form>
	)
}
