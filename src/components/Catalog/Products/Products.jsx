// Products.jsx
'use client'
import { useProducts } from '@/app/context/ProductContext'
import { Rasa } from "next/font/google"
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import styles from './Products.module.scss'

const rasa = Rasa({
	subsets: ["latin"],
	weight: '300'
})

export default function Products({ activeFilters, searchTerm }) {
	const products = useProducts()
	const [filteredData, setFilteredData] = React.useState([])

	React.useEffect(() => {
		let filtered = products

		if (activeFilters.type) {
			filtered = filtered.filter(product => product.productType === activeFilters.type)
		}

		if (activeFilters.color) {
			filtered = filtered.filter(product => product.productColor === activeFilters.color)
		}

		if (activeFilters.size) {
			filtered = filtered.filter(product => product.productSize === activeFilters.size)
		}

		if (activeFilters.priceRange) {
			const [minPrice, maxPrice] = activeFilters.priceRange
			filtered = filtered.filter(product =>
				product.discountedPrice >= minPrice && product.discountedPrice <= maxPrice
			)
		}

		if (searchTerm) {
			filtered = filtered.filter(product =>
				product.productName.toLowerCase().includes(searchTerm.toLowerCase())
			)
		}

		setFilteredData(filtered)
	}, [activeFilters, products, searchTerm])

	const handleProductClick = (product) => {
		localStorage.setItem('selectedProduct', JSON.stringify(product))
	}

	return (
		<div className={styles.goodsContainer}>
			{filteredData.map(product => (
				<Link
					key={product._id}
					href={{
						pathname: `/catalog/${encodeURIComponent(product.productName.replace(/ /g, '_').toLowerCase())}`,
					}}
					onClick={() => handleProductClick(product)}
					className={styles.card}
				>
					<div className={styles.cardContent}>
						<Image
							src={product.image}
							alt={product.productName}
							width={187}
							height={187}
						/>
						<h3 className={styles.name}>{product.productName}</h3>
						<p className={`${rasa.className} ${styles.oldprice}`}>
							${product.price}
						</p>
						<button className={styles.checkoutBtn}>
							<Image src='/icons/item-cart.svg' width={10} height={10} alt='cart' />
							<p className={styles.checkoutLabel}>Checkout</p>
							<div className={`${rasa.className} ${styles.price}`}>
								${product.discountedPrice}
							</div>
						</button>
					</div>
				</Link>
			))}
		</div>
	)
}
