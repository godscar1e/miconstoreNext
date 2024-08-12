'use client'
import React, { useState } from 'react'
import Link from 'next/link'
import { FaHome, FaUser, FaBox, FaStore, FaCog, FaPlus, FaSignOutAlt } from 'react-icons/fa'
import styles from './Sidebar.module.scss'

import Logout from '@/components/Logout/Logout'


export default function Sidebar() {
	const [activeLink, setActiveLink] = useState('dashboard')

	const handleLinkClick = (link) => {
		setActiveLink(link)
	}

	const links = [
		{ name: 'dashboard', icon: <FaHome /> },
		{ name: 'users', icon: <FaUser /> },
		{ name: 'orders', icon: <FaBox /> },
		{ name: 'products', icon: <FaStore /> },
		{ name: 'add', icon: <FaPlus /> },
		{ name: 'settings', icon: <FaCog /> },
	]

	return (
		<div className={styles.sidebar}>
			<h2 className={styles.sidebarTitle}>Admin Panel</h2>
			<ul>
				{links.map(({ name, icon }) => (
					<li key={name}>
						<Link
							href={`/dashboard${name === 'dashboard' ? '' : `/${name}`}`}
							className={activeLink === name ? styles.active : ''}
							onClick={() => handleLinkClick(name)}
						>
							<span className={styles.icon}>{icon}</span>
							<span className={styles.linkText}>
								{name.charAt(0).toUpperCase() + name.slice(1)}
							</span>
						</Link>
					</li>
				))}
				<li>
					<div className={styles.linkText}>
						<FaSignOutAlt className={styles.icon} />
						<Logout className={styles.logoutButton} />
					</div>
				</li>
			</ul>
		</div>
	)
}
