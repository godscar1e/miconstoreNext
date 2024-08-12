
import dynamic from 'next/dynamic'
import { Inter } from "next/font/google"
import styles from './AdminLayout.module.scss'

const inter = Inter({ subsets: ["latin"] })

import { SessionProvider, useSession } from 'next-auth/react'

const Sidebar = dynamic(() => import('@/components/AdminPanel/Sidebar/Sidebar'), { ssr: false })

import { dbConnect } from "@/lib/mongo"

export default async function AdminLayout({ children, session }) {
	const conn = await dbConnect()
	return (
		<div className={inter.className}>
			<SessionProvider session={session}>
				<div className={styles.adminContainer}>
					<Sidebar className={styles.sidebar} />
					{/* <Header className={styles.adminHeader} /> */}
					<main className={styles.content}>
						{children}
					</main>
				</div>
			</SessionProvider>
		</div>
	)
}
