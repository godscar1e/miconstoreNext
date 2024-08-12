// context/ProductContext.js
import React, { createContext, useState, useContext } from 'react'

const ProductCx = createContext()

export function ProductProvider({ children }) {
	const [productData, setProductData] = useState(null)

	return (
		<ProductCx.Provider value={{ productData, setProductData }}>
			{children}
		</ProductCx.Provider>
	)
}

export function useProduct() {
	return useContext(ProductCx)
}
