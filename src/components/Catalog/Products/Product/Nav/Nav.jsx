'use client'

import { useRouter } from 'next/navigation'
import styles from './Nav.module.scss'
import Link from 'next/link'

export default function Nav({ className, productName }) {

	const router = useRouter()
	const formattedProductName = encodeURIComponent(productName.trim().replace(/ /g, '_').toLowerCase())

	const currentPath = typeof window !== 'undefined' ? window.location.pathname : ''

	const isActive = (path) => {
		if (!currentPath) return false
		return currentPath === path
	}

	const isActiveParent = (path) => {
		if (!currentPath) return false
		return currentPath.startsWith(path) && currentPath === path
	}

	// Динамически определяем класс
	const dynamicClass = styles[className] || ''

	return (
		<div className={dynamicClass}>
			<div className={styles.topnav}>
				<Link
					href={`/catalog/${formattedProductName}`}
					className={`${styles.navbtn} ${isActiveParent(`/catalog/${formattedProductName}`) ? styles.active : ''}`}
				>
					All about the product
				</Link>
				<div className="line1"></div>
				<Link
					href={`/catalog/${formattedProductName}/features`}
					className={`${styles.navbtn} ${isActive(`/catalog/${formattedProductName}/features`) ? styles.active : ''}`}
				>
					Features
				</Link>
				<div className="line2"></div>
				<Link
					href={`/catalog/${formattedProductName}/reviews`}
					className={`${styles.navbtn} ${isActive(`/catalog/${formattedProductName}/reviews`) ? styles.active : ''}`}
				>
					Reviews
				</Link>
				<div className="line3"></div>
				<Link
					href={`/catalog/${formattedProductName}/photo-video`}
					className={`${styles.navbtn} ${isActive(`/catalog/${formattedProductName}/photo-video`) ? styles.active : ''}`}
				>
					Photo | Video
				</Link>
			</div>
		</div>
	)
}
