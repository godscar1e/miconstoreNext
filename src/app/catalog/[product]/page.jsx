'use client'

import React, { useEffect, useState } from 'react'
import ProductSlider from '@/components/Catalog/Products/ProductSlider/ProductSlider'
import { Rasa } from "next/font/google"
import RatingStars from '@/components/RatingStars/RatingStars'
import styles from './ProductPage.module.scss'
import Image from 'next/image'
import Nav from '@/components/Catalog/Products/Product/Nav/Nav'

const rasa = Rasa({
	subsets: ["latin"],
	weight: '300'
})

export default function ProductPage() {
	const [productData, setProductData] = useState(null)
	const [currentRating] = useState(4)
	const [isHidden, setHidden] = useState(false)

	useEffect(() => {
		const savedProduct = localStorage.getItem('selectedProduct')
		if (savedProduct) {
			setProductData(JSON.parse(savedProduct))
		}

		const handleScroll = () => {
			const priceSection = document.querySelector(`.${styles.priceSection}`)
			if (priceSection) {
				const sectionTop = priceSection.getBoundingClientRect().top
				// Скрываем фиксированный блок, если пользователь прокрутил до начала priceSection
				if (sectionTop <= window.innerHeight) {
					setHidden(true)
				} else {
					setHidden(false)
				}
			}
		}

		window.addEventListener('scroll', handleScroll)
		return () => {
			window.removeEventListener('scroll', handleScroll)
		}
	}, [])

	if (!productData) {
		return <p>Loading...</p>
	}

	return (
		<main className={styles.main}>
			<div className={styles.container}>
				<div className={styles.body}>
					<Nav className='nav4small' productName={productData.productName || ''} />
					<div className={styles.slider}>
						<ProductSlider />
					</div>
					<div className={styles.productInfo}>
						<Nav className='navigation' productName={productData.productName || ''} />
						<div className={styles.nameSection}>
							<p className={styles.name}>
								{productData?.productName}
							</p>
							<div className={styles.characteristics}>
								{productData.productType} / {productData.productColor} / {productData.productSize}
							</div>
							<div className={styles.rating}>
								<RatingStars rating={currentRating} editable={false} />
								<p>(15 reviews)</p>
							</div>
						</div>
						<div className={styles.priceSection}>
							<div className={styles.priceBlock}>
								<p className={`${rasa.className} ${styles.oldprice}`}>$ {productData.price}</p>
								<p className={`${rasa.className} ${styles.price}`}>$ {productData.discountedPrice}</p>
							</div>
							<div className={styles.buttonsBlock}>
								<button className={styles.addToBagBtn}>
									<Image src='/icons/item-cart.svg' width={16} height={16} alt='cart' />
									ADD TO BAG
								</button>
								<div className={styles.paymentsMethods}>
									<p>Payment method:</p>
									<div className={styles.methodsIcons}>
										<Image
											src='/icons/payment-methods/paypal.svg'
											width={25}
											height={25}
											alt='paypal'
										/>
										<Image
											src='/icons/payment-methods/applepay.svg'
											width={47}
											height={25}
											alt='applepay'
										/>
										<Image
											src='/icons/payment-methods/visamaster.svg'
											width={87}
											height={25}
											alt='visa&mastercard'
										/>
									</div>
								</div>
							</div>
						</div>
						{/* Фиксированный блок цены */}
						<div className={`${styles.stickyPriceSection} ${isHidden ? styles.hidden : ''}`}>
							<div className={styles.priceBlock}>
								<p className={`${rasa.className} ${styles.oldprice}`}>$ {productData.price}</p>
								<p className={`${rasa.className} ${styles.price}`}>$ {productData.discountedPrice}</p>
							</div>
							<div className={styles.buttonsBlock}>
								<button className={styles.addToBagBtn}>
									<Image src='/icons/item-cart.svg' width={10} height={10} alt='cart' />
									ADD TO CART
								</button>
							</div>
						</div>
						<div className={styles.sellerSection}>
							<p>Seller:
								<span> Micon</span>
							</p>
							<Image
								src='/icons/LOGO.svg'
								width={80}
								height={30}
								alt='logo'
							/>
						</div>
						<div className={styles.additionalInfoSection}>
							<div className={styles.delivery}>
								<p>Delivery throughout: <span> Europe</span></p>
							</div>
							<div className={styles.payment}>
								<p>Choice of payment system: <span> Visa</span></p>
							</div>
						</div>
					</div>
				</div>
			</div>
		</main>
	)
}
