import React from "react"
import Slider from "react-slick"
import "slick-carousel/slick/slick.css"
import Image from 'next/image'
import styles from './ProductSlider.module.scss'

export default function ProductSlider() {
	const imagePaths = [
		"/images/newsslider/newsimg1.png",
		"/images/IMAGE.png",
		"/images/bacground-image.jpg",
		"/images/IMAGE.png",
	]

	const sliderSettings = {
		customPaging: function (i) {
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
		},
		dots: true,
		dotsClass: `${styles.slickDots} slick-thumb`,
		infinite: true,
		speed: 500,
		slidesToShow: 1,
		slidesToScroll: 1,
		arrows: false, // Отключение стрелок
	}

	return (
		<div className={styles.sliderContainer}>
			<Slider {...sliderSettings}>
				{imagePaths.map((path, index) => (
					<div key={index}>
						<Image className={styles.activeSlide} src={path} width={490} height={490} alt={`Slide ${index + 1}`} />
					</div>
				))}
			</Slider>
		</div>
	)
}
