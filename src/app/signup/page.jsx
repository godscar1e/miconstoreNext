import SignUpForm from '@/components/SignUp/SignUpForm'
import styles from './SignUp.module.scss'
import Link from 'next/link'

export default function SignUpPage() {
	return (
		<div className={styles.container}>
			<h3 className={styles.title}>Create account</h3>
			<Link href="/signin">
				Already have an account?
			</Link>
			<SignUpForm />
		</div >
	)
}
