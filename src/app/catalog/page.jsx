'use client'

import Filtres from '@/components/Catalog/Filtres/Filtres'
import { useState } from 'react'
import styles from './Catalog.module.scss'
// const TopFiltres = dynamic(() => import('@/components/Catalog/TopFiltres/TopFiltres'), { ssr: false })
import Products from '@/components/Catalog/Products/Products'
import TopFiltres from '@/components/Catalog/TopFiltres/TopFiltres'

import { ProductProvider } from '@/app/context/ProductContext'

export default function Catalog() {
	const [activeFilters, setActiveFilters] = useState({})
	const [searchTerm, setSearchTerm] = useState('')

	const handleFiltersChange = (filters) => {
		setActiveFilters(filters)
	}

	const handleSearchChange = (term) => {
		setSearchTerm(term)
	}

	return (
		<div className={styles.container}>
			<div className={styles.main}>
				<Filtres onFiltersChange={handleFiltersChange} />
				<div className={styles.rightSide}>
					<TopFiltres onSearchChange={handleSearchChange} />
					<ProductProvider>
						<Products activeFilters={activeFilters} searchTerm={searchTerm} />
					</ProductProvider>
				</div>
			</div>
		</div>
	)
}
