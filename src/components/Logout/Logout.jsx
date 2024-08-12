import React from "react"
import { confirmAlert } from "react-confirm-alert"
import "react-confirm-alert/src/react-confirm-alert.css" // Import css
import { doLogout } from "@/app/actions"
import styles from "./Logout.module.scss"

export default function Logout() {
	const handleLogout = async () => {
		await doLogout()
		localStorage.removeItem('user')
		localStorage.removeItem('session')
	}

	const confirmLogout = (event) => {
		event.preventDefault()
		confirmAlert({
			customUI: ({ onClose }) => {
				return (
					<div className={styles.customAlert}>
						<h1>Подтвердите выход</h1>
						<p>Вы действительно хотите выйти?</p>
						<div className={styles.buttonContainer}>
							<button
								className={styles.confirmButton}
								onClick={() => {
									handleLogout()
									onClose()
								}}
							>
								Да
							</button>
							<button
								className={styles.cancelButton}
								onClick={onClose}
							>
								Нет
							</button>
						</div>
					</div>
				)
			},
		})
	}
	return (
		<form onSubmit={confirmLogout}>
			<button className={styles.logoutBtn} type="submit">
				Logout
			</button>
		</form>
	)
}
