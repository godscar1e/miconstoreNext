'use client';
import React, { useState, useEffect, useCallback } from "react";
import { getUserData } from '@/components/getUserData';
import Image from 'next/image';
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';
import styles from './NumerologyPage.module.scss';
import { useSession } from 'next-auth/react';
import SessionLogger from '@/components/SessionLogger';

const numerologyCourceInfo = [
    {
        label: 'Нумерология. Поиск себя с помощью чисел',
        name: 'numerology',
        packs: 3,
        buyButton: 'show',
        image: [
            { src: '/images/numerology-img.png', width: 320, height: 400 },
        ],
        packages: [
            {
                type: 'Основной',
                price: 'CHF 350.00',
                oldprice: '750.00',
                discountPercentage: 60,
            },
            {
                type: 'Основной плюс',
                price: 'CHF 450.00',
                oldprice: '850.00',
                discountPercentage: 60,
            },
            {
                type: 'Индивидуальный',
                price: 'CHF 550.00',
                oldprice: '950.00',
                discountPercentage: 60,
            },
        ],
    }
];

function formatCountdownTime(time) {
    const hours = String(Math.floor(time / 3600)).padStart(2, '0');
    const minutes = String(Math.floor((time % 3600) / 60)).padStart(2, '0');
    const seconds = String(time % 60).padStart(2, '0');
    return `${hours}:${minutes}:${seconds}`;
}

export default function NumerologyInfo() {
    const { data: session, status } = useSession();
    const [activeIndex, setActiveIndex] = useState(0);
    const [user, setUser] = useState(null);
    const [timers, setTimers] = useState([0, 0, 0]);

    // Calculate the target date and time
    const targetDate = new Date('2024-12-31T23:59:59').getTime(); 

    const notify = () => toast.success("Курс успешно куплен!");

    const fetchData = useCallback(async () => {
        if (session && session.user && session.user.email) {
            console.log("Session found:", session);
            const userEmail = session.user.email;
            const userData = await getUserData(userEmail);
            console.log("Fetched user data:", userData);
            setUser(userData);
        } else {
            console.log('No user email in session');
        }
    }, [session]);

    useEffect(() => {
        if (status === 'authenticated') {
            fetchData();
        }
    }, [status, fetchData]);

    useEffect(() => {
        const interval = setInterval(() => {
            const now = new Date().getTime();
            const timeDifference = targetDate - now;

            if (timeDifference <= 0) {
                // Timer reached the target date and time
                clearInterval(interval);
                return;
            }

            const hours = Math.floor((timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((timeDifference % (1000 * 60)) / 1000);

            setTimers([hours, minutes, seconds]);
        }, 1000);

        return () => clearInterval(interval);
    }, [targetDate]);

    async function onSubmit(event) {
        event.preventDefault();
        if (!user || !user.id) {
            console.error("User ID not found", user);
            return;
        }

        const selectedPackage = activeIndex === 0 ? 'Основной' : activeIndex === 1 ? 'Основной плюс' : 'Индивидуальный'; // Correctly set the value based on activeIndex
        const newCourse = {
            userId: user.id,
            course: numerologyCourceInfo[0].name,
            pack: selectedPackage,
            price: numerologyCourceInfo[0].packages[activeIndex].price
        };
        console.log("Submitting new course:", newCourse);

        try {
            const res = await axios.post('/api/boughtcourses', newCourse, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (res.status === 201) {
                notify();
            } else {
                throw new Error('Failed to send course');
            }
        } catch (error) {
            console.error('Error sending course:', error);
        }
    }

    return (
        <main className={styles.main}>
            <div className={styles.container}>
                <div className={styles.mainBlock}>
                    <div className={styles.actionBlock}>
                        <Image src={numerologyCourceInfo[0].image[0].src} width={numerologyCourceInfo[0].image[0].width} height={numerologyCourceInfo[0].image[0].height} alt='' />
                        <div className={styles.priceBlock}>
                            <div className={styles.priceContainer}>
                                <p className={styles.price}>{numerologyCourceInfo[0].packages[activeIndex].price}</p>
                                <p className={styles.oldprice}>{numerologyCourceInfo[0].packages[activeIndex].oldprice}</p>
                            </div>
                            <div className={styles.discountTimer}>
                                <div className={styles.countdown}>
                                    -{numerologyCourceInfo[0].packages[activeIndex].discountPercentage}% скоро закончиться через <span>{formatCountdownTime(timers[0] * 3600 + timers[1] * 60 + timers[2])}</span>
                                </div>
                            </div>
                        </div>
                        <form onSubmit={onSubmit}>
                            <div className={styles.packsBlock}>
                                <h3>Выберете тариф: </h3>
                                <div className={styles.packsContainer}>
                                    {Array.from({ length: numerologyCourceInfo[0].packs }, (_, index) => (
                                        <button key={index} type="button" className={index === activeIndex ? styles.active : ''} onClick={() => setActiveIndex(index)}>
                                            {index === 0 ? 'Основной' : index === 1 ? 'Основной плюс' : 'Индивидуальный'}
                                        </button>
                                    ))}
                                </div>
                            </div>
                            {numerologyCourceInfo[0].buyButton === 'show' && <button type='submit' className={styles.buyButton}>КУПИТЬ ПО АКЦИИ</button>}
                        </form>
                    </div>
                    <div className={styles.infoBlock}>
                        <h1>Нумерология. Поиск себя с помощью чисел</h1>
                        <div className={styles.PackInfo}>
                            <h3>Основной пакет <span>включает:</span></h3>
                            <ul className={styles.list}>
                                <li className={styles.listItem}>Шесть <span>модулей</span></li>
                                <li className={styles.listItem}>Двадцать пять <span>уроков</span></li>
                                <li className={styles.listItem}>Поддержка и ответы на вопросы<span> от ментора</span></li>
                            </ul>
                        </div>
                        <div className={styles.PackInfo}>
                            <h3>Основной плюс пакет <span>добавляет:</span></h3>
                            <ul className={styles.list}>
                                <li className={styles.listItem}>Два новых <span>модуля</span></li>
                                <li className={styles.listItem}>Шесть новых <span>уроков</span></li>
                                <li className={styles.listItem}>Индивидуальные встречи <span>с ментором онлайн</span></li>
                            </ul>
                        </div>
                        <div className={styles.PackInfo}>
                            <h3>Индивидуальный пакет <span>добавляет:</span></h3>
                            <ul className={styles.list}>
                                <li className={styles.listItem}>Разбор ваших ситуаций <span>с ментором</span></li>
                                <li className={styles.listItem}>Дополнительные занятия <span>с ментором касательно курса</span></li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
            <ToastContainer
                position="top-right"
                autoClose={3000}
                hideProgressBar={false}
                newestOnTop={false}
                closeButton={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
            />
        </main>
    );
}