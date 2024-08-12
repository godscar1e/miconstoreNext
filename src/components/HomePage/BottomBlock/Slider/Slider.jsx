import React from "react"
import Slider from "react-slick"
import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"

import Image from 'next/image'
import styles from "./Slider.module.scss"



import { Rasa } from "next/font/google"
const rasa = Rasa({
	subsets: ["latin"],
	weight: '300'
})

export default function SlickSlider() {
	const settings = {
		dots: false,
		infinite: true,
		speed: 500,
		slidesToShow: 3,
		slidesToScroll: 3,
		autoplay: true,
		speed: 500,
		autoplaySpeed: 5000,
		cssEase: "linear"
	}

	const goodsInfo = [
		{
			name: 'Lorem ipsum west indian collection ',
			image: '/images/IMAGE.png',
			oldprice: '$159',
			price: '$89',
		},
		{
			name: 'Lorem ipsum west indian collection ',
			image: '/images/IMAGE.png',
			oldprice: '$200',
			price: '$99',
		},
		{
			name: 'Lorem ipsum west indian collection ',
			image: '/images/IMAGE.png',
			oldprice: '$189',
			price: '$89',
		}
	]
	return (
		<div className={styles["slider-container"]}>
			<Slider {...settings}>
				{goodsInfo.map((item, index) => (
					<div key={index} className={styles.slideWrapper}>
						<div key={index} className={styles.slide}>
							<Image
								src={item.image}
								alt={item.name}
								width={187}
								height={187}
							// layout="responsive"
							/>

							<h3 className={styles.name}>{item.name}</h3>
							<p className={`${rasa.className} ${styles.oldprice}`}>
								{item.oldprice}
							</p>
							<button className={styles.checkoutBtn}>
								<Image src='/icons/item-cart.svg' width={10} height={10} />
								<p className={styles.checkoutLabel}>Checkout</p>
								<div className={`${rasa.className} ${styles.price}`}>
									{item.price}
								</div>
							</button>

						</div>
					</div>
				))}
			</Slider>
		</div>
	)
}
