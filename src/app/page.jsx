import styles from './page.module.scss'
import TopBlock from '@/components/HomePage/TopBlock/TopBlock'
import BottomBlock from '@/components/HomePage/BottomBlock/BottomBlock'
import { redirect } from 'next/navigation'
import { auth } from '@/auth/auth'

const Home = async () => {

	// const session = await auth()
	// if (!session.user) redirect('/signin')
	return (
		<main className={styles.main}>
			<div className={styles.container}>
				<div className={styles.body}>
					<TopBlock />
					<BottomBlock />
				</div>
				{/* <h1>{session?.user?.name}</h1> */}
			</div>
		</main>
	)
}
export default Home
