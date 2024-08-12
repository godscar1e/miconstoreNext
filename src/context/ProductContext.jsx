// context/ProductContext.jsx
'use client'
import React, { createContext, useContext, useState, useEffect } from 'react'

const ProductContext = createContext()

export function ProductProvider({ children }) {
	const [products, setProducts] = useState(() => {
		// Попробуйте получить данные из Local Storage при инициализации
		const localData = localStorage.getItem('products')
		return localData ? JSON.parse(localData) : []
	})

	useEffect(() => {
		async function fetchProducts() {
			try {
				const response = await fetch('/api/products')
				if (!response.ok) {
					throw new Error('Network response was not ok')
				}
				const products = await response.json()
				localStorage.setItem('products', JSON.stringify(products)) // Сохраните данные в Local Storage
				setProducts(products)
			} catch (error) {
				console.error('Failed to fetch products:', error)
			}
		}

		if (products.length === 0) {
			fetchProducts()
		}
	}, [products])

	return (
		<ProductContext.Provider value={products}>
			{children}
		</ProductContext.Provider>
	)
}

export function useProducts() {
	return useContext(ProductContext)
}
