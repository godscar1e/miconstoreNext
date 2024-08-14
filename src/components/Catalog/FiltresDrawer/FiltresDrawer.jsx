// FiltresDrawer.jsx
import React, { useState } from 'react'
import Drawer from 'rc-drawer'
import 'rc-drawer/assets/index.css'
import motionProps from './motion'
import './assets/button.scss'
import Filtres from '../Filtres/Filtres'

export default function FiltresDrawer({ onFiltersChange }) {
	const [open, setOpen] = useState(false)
	const onTouchEnd = () => {
		setOpen(false)
	}
	const onSwitch = () => {
		setOpen(c => !c)
	}

	const handleFiltersChange = (filters) => {
		onFiltersChange(filters) // Передаем фильтры в родительский компонент
	}

	return (
		<div>
			<Drawer
				open={open}
				onClose={onTouchEnd}
				afterOpenChange={(c) => {
					console.log('transitionEnd: ', c)
				}}
				placement="left"
				width="300px"
				{...motionProps}
			>
				<div className="filtres-container">
					<Filtres onFiltersChange={handleFiltersChange} />
				</div>
			</Drawer>
			<div>
				<button onClick={onSwitch} className="filtres-button">
					Filtres
				</button>
			</div>
		</div>
	)
}
