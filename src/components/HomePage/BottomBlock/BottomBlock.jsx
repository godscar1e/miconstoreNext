'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import styles from './BottomBlock.module.scss'
import SlickSlider from './Slider/Slider'

import { Unna } from "next/font/google"
const unna = Unna({
	subsets: ["latin"],
	weight: '400'
})

export default function BottomBlock() {
	const [currentIndex, setCurrentIndex] = useState(0)
	const intervalTime = 15000

	const slides = [
		{
			imgSrc: '/images/newsslider/newsimg2.png',
			text: 'Saturday festival in Micon. Discount 50%',
			alt: 'slide'
		},
		{
			imgSrc: '/images/newsslider/newsimg1.png',
			text: 'Concert in Central Park. Free entry!',
			alt: 'slide'
		},
	]

	useEffect(() => {
		const nextSlide = () => {
			setCurrentIndex((prevIndex) => (prevIndex + 1) % slides.length)
		}

		const intervalId = setInterval(nextSlide, intervalTime)

		return () => clearInterval(intervalId)
	}, [slides.length])

	const handleSlideClick = () => {
		setCurrentIndex((currentIndex + 1) % slides.length)
	}

	const getNextIndex = () => {
		return (currentIndex + 1) % slides.length
	}

	return (
		<section className={styles.bottomblock}>
			<div className={styles.container}>
				<div className={styles.mostpopular}>
					<div className={styles.label}>
						<div className={`${styles.cirle1} ${styles.cirle}`}></div>
						<div className={`${styles.cirle2} ${styles.cirle}`}></div>
						<p className={styles.text}>MOST POPULAR</p>
						<div className={`${styles.cirle3} ${styles.cirle}`}></div>
						<div className={`${styles.cirle4} ${styles.cirle}`}></div>
					</div>
					<SlickSlider />
				</div>
				<div className={styles.recentnews}>
					<div className={styles.secondaryblock}>
						<div className={styles.selectedBlock}>
							<div className={styles.slide}>
								<Link href="/newspage">
									<Image
										src={slides[currentIndex].imgSrc}
										alt={slides[currentIndex].alt}
										width={434}
										height={217}
									/>
								</Link>
								<p className={`${unna.className} ${styles.slideText}`}>
									{slides[currentIndex].text}
								</p>
							</div>
						</div>
						<div className={styles.sliderBlockContainer}>
							<p className={styles.newslabel}>RECENT NEWS</p>
							<div className={styles.slider}>
								<div
									className={styles.sliderSlide}
									onClick={handleSlideClick}
								>
									<Image
										src={slides[getNextIndex()].imgSrc}
										width={317}
										height={158}
										alt="slide"
									/>
									<p className={[unna.className, styles.slideText].join(' ')}>
										{slides[getNextIndex()].text}
									</p>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>
	)
}
