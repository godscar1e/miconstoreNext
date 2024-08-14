import React, { useState, useEffect } from "react"
import Slider from "react-slick"
import "slick-carousel/slick/slick.css"
import Image from "next/image"
import styles from "./ProductSlider.module.scss"

export default function ProductSlider() {
	const imagePaths = [
		"/images/newsslider/newsimg1.png",
		"/images/IMAGE.png",
		"/images/bacground-image.jpg",
		"/images/IMAGE.png",
	]

	const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth < 1101)
	const [currentSlide, setCurrentSlide] = useState(0)

	useEffect(() => {
		const handleResize = () => {
			setIsSmallScreen(window.innerWidth < 1101)
		}

		window.addEventListener("resize", handleResize)
		return () => {
			window.removeEventListener("resize", handleResize)
		}
	}, [])

	const sliderSettings = {
		customPaging: function (i) {
			if (isSmallScreen) {
				return (
					<button
						className={`${styles.paginationDot} ${currentSlide === i ? styles.customActive : ""}`}
						aria-label={`Slide ${i + 1}`}
					/>
				)
			} else {
				return (
					<a href="#">
						<Image
							src={imagePaths[i]}
							width={100}
							height={100}
							alt={`Slide ${i + 1}`}
							className={styles.paginationImage}
						/>
					</a>
				)
			}
		},
		dots: true,
		dotsClass: `${styles.slickDots}`,
		infinite: true,
		speed: 500,
		slidesToShow: 1,
		slidesToScroll: 1,
		arrows: false,
		beforeChange: (current, next) => {
			setCurrentSlide(next)
		},
	}

	return (
		<div className={styles.sliderContainer}>
			<Slider {...sliderSettings}>
				{imagePaths.map((path, index) => (
					<div key={index}>
						<Image
							className={styles.activeSlide}
							src={path}
							width={490}
							height={490}
							alt={`Slide ${index + 1}`}
							sizes="(max-width: 1100px) 100vw, (max-width: 480px) 200px, 490px"
						/>
					</div>
				))}
			</Slider>
		</div>
	)
}
