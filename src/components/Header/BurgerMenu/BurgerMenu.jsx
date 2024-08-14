import React, { useState, useEffect } from "react"
import { createRoot } from 'react-dom/client'
import { Menu, SubMenu, Item } from "burger-menu"
import 'burger-menu/lib/index.css'
import Hamburger from 'hamburger-react'
import Link from 'next/link'
export default function BurgerMenu() {
	const [isOpen, setIsOpen] = useState(false)
	const [isVisible, setIsVisible] = useState(window.innerWidth < 1200)

	useEffect(() => {
		const handleResize = () => {
			setIsVisible(window.innerWidth < 1200)
		}

		handleResize() // Проверка сразу при монтировании

		window.addEventListener('resize', handleResize)

		// Cleanup listener on unmount
		return () => {
			window.removeEventListener('resize', handleResize)
		}
	}, [])

	const burgerBtnStyle = {
		display: isVisible ? 'block' : 'none',
	}

	return (
		<>
			<Hamburger
				toggled={isOpen}
				onClick={() => setIsOpen(!isOpen)}
				toggle={setIsOpen}
				size={20}
				style={burgerBtnStyle}

			/>
			<Menu className="burger-menu" isOpen={isOpen} selectedKey={'entry'} onClose={() => setIsOpen(false)}>
				<Link href='/catalog' passHref>
					<Item itemKey={'catalog'} text={'Catalog'} />
				</Link>
				<Link href='/user' passHref>
					<Item itemKey={'user'} text={'User Center'} />
				</Link>
				<SubMenu title="Union Management">
					<Link href='/notice' passHref>
						<Item itemKey={'notice'} text={'Announcement'} />
					</Link>
					<Link href='/union' passHref>
						<Item itemKey={'union'} text={'Union Inquiries'} />
					</Link>
					<Link href='/entry' passHref>
						<Item itemKey={'entry'} text={'Entry information'} />
					</Link>
				</SubMenu>
			</Menu>

		</>
	)
}
