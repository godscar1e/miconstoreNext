import LoginForm from '@/components/Login/LoginForm'
import styles from './LoginPage.module.scss'

import Link from 'next/link'

export default function LoginPage() {
	return (
		<div className={styles.container}>
			<h3 className={styles.title}>Sign in</h3>
			<Link href="/signup">Do not have an account?</Link>
			<LoginForm />
		</div >
	)
}
