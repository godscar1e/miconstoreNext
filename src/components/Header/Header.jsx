'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import styles from './Header.module.scss'
import SessionLogger from "@/components/SessionLogger"

export default function Header() {
	const [session, setSession] = useState(null)
	const [isAuthenticated, setIsAuthenticated] = useState(false)

	const handleSessionChange = (sessionData) => {
		setSession(sessionData)
		setIsAuthenticated(!!sessionData?.user)
	}

	return (
		<>
			<SessionLogger onSessionChange={handleSessionChange} />
			<header className={styles.header}>
				<div className={styles.container}>
					<div className={styles.body}>
						<div className={styles.email}>
							<a href='mailto:storemicon@gmail.com' className={styles.emailLink}>storemicon@gmail.com</a>
						</div>
						<Link className={styles.logo} href='/'>
							<Image className={styles.logoImage} src='/icons/LOGO.svg' width={104} height={28} alt='logo' />
						</Link>
						<div className={styles.navigation}>
							<Image src='/icons/header/cart.svg' width={30} height={30} />
							<Image src='/icons/header/profile.svg' width={24} height={30} />
						</div>
					</div>
				</div>
			</header>
		</>
	)
}
