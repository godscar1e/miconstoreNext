'use client'
import React, { useState, useEffect } from 'react'
import { Rasa } from "next/font/google"
import styles from '../ProductPage.module.scss'
import Image from 'next/image'
import featuresStyles from './ProductFeatures.module.scss'
import ProductSlider from '@/components/Catalog/Products/ProductSlider/ProductSlider'
import Nav from '@/components/Catalog/Products/Product/Nav/Nav'

const rasa = Rasa({
	subsets: ["latin"],
	weight: '300'
})


export default function ProductFeatures() {
	const [productData, setProductData] = useState(null)

	useEffect(() => {
		const savedProduct = localStorage.getItem('selectedProduct')
		if (savedProduct) {
			setProductData(JSON.parse(savedProduct))
		}
	}, [])

	if (!productData) {
		return <p>Loading...</p>
	}

	return (
		<main className={styles.main}>
			<div className={styles.container}>
				<div className={styles.body}>
					<div className={styles.slider}>
						<ProductSlider />
					</div>
					<div className={styles.productInfo}>
						<Nav productName={productData.productName || ''} />
						<div className={featuresStyles.featuresSection}>
							<h2>{productData.productName}</h2>
							<div className={featuresStyles.lists}>
								<ul className={featuresStyles.list}>
									<li className={featuresStyles.listItem}>
										Size
									</li>
									<li className={featuresStyles.listItem}>
										Quantity, pcs
									</li>
									<li className={featuresStyles.listItem}>
										Filler composition
									</li>
									<li className={featuresStyles.listItem}>
										Fabric type
									</li>
									<li className={featuresStyles.listItem}>
										Color
									</li>
								</ul>
								<ul className={featuresStyles.list}>
									<li className={featuresStyles.listItem2}>
										Size
									</li>
									<li className={featuresStyles.listItem2}>
										Quantity, pcs
									</li>
									<li className={featuresStyles.listItem2}>
										Filler composition
									</li>
									<li className={featuresStyles.listItem2}>
										Fabric type
									</li>
									<li className={featuresStyles.listItem2}>
										Color
									</li>
								</ul>
							</div>
						</div>
						<div className={featuresStyles.priceSection}>
							<div className={featuresStyles.priceContainer}>
								<p className={`${rasa.className} 
								${featuresStyles.price}`}>
									$ {productData.discountedPrice}
								</p>
								<p className={`${rasa.className} 
								${featuresStyles.oldprice}`}>
									$ {productData.price}
								</p>
							</div>
							<div className={featuresStyles.buttonsContainer}>
								<button className={featuresStyles.addToBagBtn}>
									<Image
										src='/icons/item-cart.svg'
										width={16}
										height={16}
										alt='cart'
										className={featuresStyles.icon}
									/>
									<Image
										src='/icons/cartwhitebig.svg'
										width={16}
										height={16}
										alt='cart white'
										className={`${featuresStyles.icon} ${featuresStyles.iconHover}`}
									/>
									ADD TO BAG
								</button>
								<button className={featuresStyles.buyInCredit}>
									BUY IN CREDIT
								</button>
							</div>
						</div>
					</div>
				</div>
			</div>
		</main>
	)
}
