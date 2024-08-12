'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import Select from 'react-select'
import styles from './TopFiltres.module.scss'

const options = [
	{ value: 'popularity', label: 'Popularity' },
	{ value: 'featured', label: 'Featured' },
	{ value: 'vanilla', label: 'Vanilla' },
]

export default function TopFiltres({ onSearchChange }) {
	const [selectedOption, setSelectedOption] = useState(options[0])
	const [searchTerm, setSearchTerm] = useState('')

	const handleSearchChange = (event) => {
		const value = event.target.value
		setSearchTerm(value)
		onSearchChange(value)
	}

	return (
		<div className={styles.topFiltres}>
			<div className={styles.search}>
				<input
					type="text"
					placeholder="Search..."
					value={searchTerm}
					onChange={handleSearchChange}
				></input>
				<Image src='/icons/search-icon.svg' width={20} height={20} />
			</div>

			<Select
				value={selectedOption}
				onChange={setSelectedOption}
				options={options}
				className={styles.select}
				styles={{
					control: (baseStyles, state) => ({
						...baseStyles,
						border: '1px solid #D9D9D9',
						borderRadius: '0',
						borderTopRightRadius: '5px',
						boxShadow: 'none',
						padding: '0 15px'
					}),
					dropdownIndicator: (baseStyles) => ({
						...baseStyles,
						color: '#B1A084',
					}),
					indicatorSeparator: () => ({
						display: 'none',
					}),
				}}
				isSearchable={false}
			/>
		</div>
	)
}
