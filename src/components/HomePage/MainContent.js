"use client"

import "@/app/styles/_vars.scss";
import "@/app/styles/globals.scss";
import styles from "./MainContent.module.scss";
import Image from 'next/image';
import { useState } from 'react';

import ProgramBlock from './ProgramBlock';
import Swiper from '@/components/Slider/Swiper';
import AdditionalServices from '@/components/HomePage/AdditionalServicesBlock/AdditionalServices';
import TripsBlock from '@/components/HomePage/TripsBlock/TripsBlock';

const MainContent = () => {
    const [activeProgram, setActiveProgram] = useState(0);
    const [expandedIndex, setExpandedIndex] = useState(null);

    const toggleText = (index) => {
        setExpandedIndex(expandedIndex === index ? null : index);
    };
    const questions = [
        { type: 'consultation', text: 'Lorem ipsum...', extra: 'Here is the additional text...' },
        { type: 'manual-therapy', text: 'Lorem ipsum...', extra: 'Here is the additional text...' },
    ];

    return (
        <main className={styles.main}>
            <div className={styles.container}>
                <div className={styles.bg}>
                    <div className={styles.body}>
                        <div className={styles.mainleftblock}>
                            <h1>ПРОФЕССИЯ НУМЕРОЛОГ</h1>
                            <div className={styles.caption}>
                                <p>
                                    Освойте востребаванную и высокооплачеваемую профессию астролога и начните зарабатывать
                                    уже с первого обучения
                                </p>
                            </div>
                            <div className={styles.mainblockbtns}>
                                <button className={styles.register_btn}>ЗАРЕГИСТРИРОВАТЬСЯ</button>
                            </div>
                        </div>
                        <div className={styles.rightsideimage}>
                            <Image src="/images/bgwoman.png" alt="bgwoman33" width={690} height={932} />
                        </div>
                    </div>
                </div>

                <div className={styles.forwhoblock}>
                    <h1 className={styles.forwhoblock__label}>
                        ДЛЯ КОГО ЭТОТ КУРС
                    </h1>
                    <div className={styles.gridtable}>
                        {[
                            { src: '/images/Rectangle 5 (1).png', title: 'Девушкам', text: 'Lorem ipsum...' },
                            { src: '/images/Rectangle 77 (1).png', title: 'Мужчинам', text: 'Lorem ipsum...' },
                            { src: '/images/Rectangle 78.png', title: 'Психологам', text: 'Lorem ipsum...' },
                            { src: '/images/Rectangle 79.png', title: 'Мамам и папам', text: 'Lorem ipsum...' },
                        ].map((item, index) => (
                            <div className={styles.gridtable__item} key={index}>
                                <Image src={item.src} alt="" width={300} height={300} />
                                <div className={styles.content__overlay}>
                                    <h3>{item.title}</h3>
                                    <p>{item.text}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <ProgramBlock />

                <div className={styles.questionblock} id="questionblock">
                    <h2 className={styles.questionblock__label}>
                        ВОПРОСЫ
                    </h2>
                    <div className={styles.questbtns}>
                        <button className={styles.consultbtn}>Консультации</button>
                        <button className={styles.manualtherapybtn}>Мануальная терапия</button>
                    </div>
                    <ul className={styles.questionlist}>
                        {questions.map((item, index) => (
                            <li
                                key={index}
                                className={`${styles.question} ${styles[item.type]} ${expandedIndex === index ? styles.expanded : ''}`}
                                onClick={() => toggleText(index)}
                            >
                                {item.text}
                                <span className={styles.extraText}>{item.extra}</span>
                            </li>
                        ))}
                    </ul>
                </div>

                <div className={styles.feedbacksblock} id="feedbacksblock">
                    <h2 className={styles.feedbacksblock__label}>
                        ОТЗЫВЫ О КУРСЕ
                    </h2>
                    <Swiper />
                </div>

                <div className={styles.rateblock} id="rateblock">
                    <h2 className={styles.label}>ТАРИФЫ</h2>
                    <div className={styles.rates}>
                        {[
                            { label: 'Базовый', priceOld: '500$', priceNew: '400$', items: ['Записи лекций курса', 'Проверка заданий кураторами', 'Сертификат о том, что курс прослушан', 'Доступ 2 месяца с момента старта курса'] },
                            { label: 'Основной', priceOld: '500$', priceNew: '400$', items: ['Записи лекций курса', 'Проверка заданий кураторами', 'Сертификат о том, что курс прослушан', 'Доступ 2 месяца с момента старта курса'] },
                            { label: 'Индивидуальный', priceOld: '500$', priceNew: '400$', items: ['Записи лекций курса', 'Проверка заданий кураторами', 'Сертификат о том, что курс прослушан', 'Доступ 2 месяца с момента старта курса'] },
                        ].map((rate, index) => (
                            <div key={index} className={styles.rate}>
                                <h3 className={styles.label}>{rate.label}</h3>
                                <div className={styles.container}>
                                    <ul className={styles.rateList}>
                                        {rate.items.map((item, itemIndex) => (
                                            <li key={itemIndex} className={styles.rateItem}>{item}</li>
                                        ))}
                                    </ul>
                                </div>
                                <div className={styles.priceContainer}>
                                    <div className={styles.oldprice}>{rate.priceOld}</div>
                                    <div className={styles.newprice}>{rate.priceNew}</div>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className={styles.contactbtnContainer}>
                        <button className={styles.contactsBtn}>
                            КОНТАКТЫ
                        </button>
                    </div>
                </div>

                <AdditionalServices />
                <TripsBlock />
            </div >
        </main >
    );
};

export default MainContent;
