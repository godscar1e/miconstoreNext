import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import React from "react";
import Slider from "react-slick";
import Image from "next/image";
import styles from "./Swiper.module.scss";
import styled from 'styled-components';
const PrevArrow = ({ onClick }) => {
    return (
        <div className={styles.arrowPrev} onClick={onClick}>
            <Image src="/icons/arrowleft.svg" alt="" width={15} height={25} />
        </div>
    );
};

const NextArrow = ({ onClick }) => {
    return (
        <div className={styles.arrowNext} onClick={onClick}>
            <Image src="/icons/arrowright.svg" alt="" width={15} height={25} />
        </div>
    );
};

const StyledSlider = styled(Slider)`

.sliderContainer {
    max-width: 1320px;
    width: 100%;
    margin: 30px auto 0 auto;
    position: relative;
    overflow: hidden;
}
  .slick-slide {
    display: flex;
    justify-content: center;
    width: 360px !important;
    // width: 100% !important;
    margin-top: -11px;
    height: 285px;
    font-size: 1.2em;
    text-align: center;
    padding: 25px 25px;
    box-sizing: border-box;
    border-radius: 25px;
    transition: transform 0.3s ease;
    background-color: #A4BFD9;
}
    .slick-slide  h3 {
        font-size: 30px;
        font-weight: 400;
        line-height: 34.09px;
        text-align: center;
        color: #16354D;
    }
    .slick-slide p {
        margin-top: 30px;
        font-family: Inter;
        font-size: 14px;
        font-weight: 300;
        line-height: 16.94px;
        text-align: center;
    }
    .slick-center h3{
        font-size: 36px;
        font-weight: 400;
        line-height: 40.9px;
        text-align: center;
        color: #16354D;
    }
    .slick-center p {
        font-family: Inter;
        font-size: 18px;
        font-weight: 300;
        line-height: 21.78px;
        text-align: center;
        color: #16354D;

    }
    .slick-track {
        display: flex;
        gap: 30px;
        align-items: end;
    }
    .slick-center {
       width: 420px !important;
       margin-top: 0px;
       height: 332px;
    }
    .slick-center > div {
        width: 420px !important;
        padding: 5px 30px;
        height: 332px;
    }
`;

const SimpleSlider = () => {
    const settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 3,
        focusOnSelect: true,
        centerMode: true,
        centerPadding: "0px",
        adaptiveHeight: true,
        swipeToSlide: false,
        prevArrow: <PrevArrow />,
        nextArrow: <NextArrow />,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 3,
                    infinite: true,
                    dots: true
                }
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 2,
                    initialSlide: 2
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }
        ]
    };

    return (
        <div className={styles.sliderContainer} >
            <StyledSlider {...settings} style={{ maxWidth: '1320px', width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '45px' }}>
                <div className={styles.slide}>
                    <h3>Анастасия</h3>
                    <p>Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. </p>
                </div>
                <div className={styles.slide}>
                    <h3>Анастасия</h3>
                    <p>Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. </p>
                </div>
                <div className={styles.slide}>
                    <h3>Анастасия</h3>
                    <p>Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. </p>
                </div>
                <div className={styles.slide}>
                    <h3>Анастасия</h3>
                    <p>Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. </p>
                </div>
                <div className={styles.slide}>
                    <h3>Анастасия</h3>
                    <p>Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. </p>
                </div>
                <div className={styles.slide}>
                    <h3>Анастасия</h3>
                    <p>Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. </p>
                </div>
            </StyledSlider>
        </div>
    );
};

export default SimpleSlider;
