'use client'
import React, { useState } from 'react'
import Slider from 'rc-slider'
import 'rc-slider/assets/index.css'
import styles from './Filtres.module.scss'

export default function Filtres({ onFiltersChange }) {
	const [priceOpen, setPriceOpen] = useState(true)
	const [filtresOpen, setFiltresOpen] = useState(true)
	const [range, setRange] = useState([0, 100])
	const [activeType, setActiveType] = useState(null)
	const [activeColor, setActiveColor] = useState(null)
	const [activeSize, setActiveSize] = useState(null)

	const handlePriceToggle = () => {
		setPriceOpen(!priceOpen)
	}

	const handleChange = (newRange) => {
		setRange(newRange)
		onFiltersChange({
			type: activeType,
			color: activeColor,
			size: activeSize,
			priceRange: newRange
		})
	}

	const colorShades = {
		white: ['#FEFFFF'],
		black: ['#000000'],
		orange: ['#D67606'],
		red: ['#CE1919'],
		blue: ['#008FB7']
	}

	const handleFilterClick = (filterCategory, filterItem) => {
		let newFilters = {
			type: activeType,
			color: activeColor,
			size: activeSize,
			priceRange: range
		}

		switch (filterCategory) {
			case 'Type':
				newFilters.type = filterItem === activeType ? null : filterItem
				setActiveType(newFilters.type)
				break
			case 'Color':
				newFilters.color = filterItem === activeColor ? null : filterItem
				setActiveColor(newFilters.color)
				break
			case 'Size':
				newFilters.size = filterItem === activeSize ? null : filterItem
				setActiveSize(newFilters.size)
				break
			default:
				break
		}

		// Передаем обновленные фильтры в родительский компонент
		onFiltersChange(newFilters)
	}

	const filtresInfo = [
		{
			Type: [
				"Orthopedic", "Wecolflyed", "Ex-Vision", "Dakimakura"
			]
		},
		{
			Color: [
				'white', 'black', 'orange', 'red', 'blue'
			]
		},
		{
			Size: [
				'Small', 'Medium', 'Large'
			]
		}
	]

	const sliderStyles = {
		trackStyle: { backgroundColor: "#777777", height: 2 },
		railStyle: { backgroundColor: "transparent", height: 2 },
		handleStyle: {
			borderColor: "#B1A084",
			height: 16,
			width: 16,
			marginTop: -7,
			backgroundColor: "#B1A084",
			boxShadow: 'none',
		}
	}

	return (
		<div className={styles.filtres}>
			<div className={styles.priceFiltre}>
				<details className={styles.customDetails} open={priceOpen} onClick={handlePriceToggle}>
					<summary>PRICE</summary>
					<div>
						<Slider
							className={styles.slider}
							range
							value={range}
							onChange={handleChange}
							allowCross={false}
							{...sliderStyles}
						/>
						<div className={styles.values}>
							<div className={styles.value}>
								from
								<div className={styles.rangeNum}>{range[0]}</div>
							</div>
							<div className={styles.value}>
								to
								<div className={styles.rangeNum}>{range[1]}</div>
							</div>
						</div>
					</div>
				</details>
			</div>

			<div className={styles.mainFiltres}>
				<details className={styles.customDetails} open={filtresOpen}>
					<summary>FILTRES</summary>
					<div className={styles.goodsFiltres}>
						{filtresInfo.map((filtre, index) => {
							const filterKey = Object.keys(filtre)[0]
							return (
								<div key={index} className={styles.filtre}>
									<h3>{filterKey}</h3>
									<div className={styles.buttonsContainer}>
										{filtre[filterKey].map((type, i) => (
											<div
												key={i}
												className={`${styles.filtreItem} ${filterKey === 'Size' ? styles.sizeButton : ''} ${filterKey === 'Color' ? styles.colorItem : ''} ${(filterKey === 'Type' && activeType === type) ||
													(filterKey === 'Color' && activeColor === type) ||
													(filterKey === 'Size' && activeSize === type)
													? styles.active
													: ''
													}`}
												onClick={() => handleFilterClick(filterKey, type)}
											>
												{filterKey === 'Color' ? (
													<div className={styles.colorContainer}>
														{colorShades[type].map((shade, idx) => (
															<div
																key={idx}
																className={styles.colorCircle}
																style={{ backgroundColor: shade }}
															>
																<div className={styles.ellipse}></div>
															</div>
														))}
													</div>
												) : (
													type
												)}
											</div>
										))}
									</div>
								</div>
							)
						})}
					</div>
				</details>
			</div>
		</div>
	)
}
