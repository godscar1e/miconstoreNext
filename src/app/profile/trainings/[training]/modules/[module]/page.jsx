'use client';
import { useEffect, useState } from 'react';
import Head from 'next/head';
import Header from "@/components/Header/Header";
import styles from "../../../Trainings.module.scss";
import Link from 'next/link';
import { lessonsData } from '@/data/lessonsData';

export default function ModulePage({ params }) {
    console.log('params:', params);
    const { module: moduleTitle } = params;
    console.log('moduleTitle:', moduleTitle);

    // Декодируйте и проверьте заголовок модуля
    const decodedTitle = decodeURIComponent(moduleTitle);
    console.log('Decoded moduleTitle:', decodedTitle);

    // Найдите все модули, соответствующие заголовку
    const matchingLessons = lessonsData.filter(lesson => lesson.module_title === decodedTitle);

    const trainingTitle = matchingLessons.length > 0 ? matchingLessons[0].training_title : '';
    console.log('Found modules:', matchingLessons);

    // Создаем URL для ссылки "Модули"
    const modulesUrl = `/profile/trainings/${encodeURIComponent(trainingTitle.replace(/\/modules\/.*$/, ''))}`;
    const [currentUrl, setCurrentUrl] = useState('');
    useEffect(() => {
        // Сохраните текущий URL в переменную
        setCurrentUrl(window.location.href);
    }, []);
    const decodedURL = decodeURIComponent(currentUrl)
    console.log('Cffurrent URL:', decodedURL);
    if (matchingLessons.length === 0) {
        return (
            <>
                <Head>
                    <title>Модули не найдены</title>
                </Head>
                <Header />
                <main className={styles.main}>
                    <div className={styles.container}>
                        <div className={styles.body}>
                            <div className={styles.topblock}>
                                <h2>Модули не найдены</h2>
                            </div>
                            <div className={styles.mainblock}>
                                <p className={styles.path}>Список тренингов</p>
                                <h2>Вы вошли как: <span>Людмила Альбертини</span></h2>
                                <p>Извините, модули с указанным названием не найдены.</p>
                            </div>
                        </div>
                    </div>
                </main>
            </>
        );
    }

    return (
        <>
            <Head>
                <title>{decodedTitle}</title>
            </Head>
            <Header />
            <main className={styles.main}>
                <div className={styles.container}>
                    <div className={styles.body}>
                        <div className={styles.topblock}>
                            <h2>{trainingTitle}</h2>
                        </div>
                        <div className={styles.mainblock}>
                            <div className={styles.path}>
                                <Link href="/profile/trainings">
                                    Список тренингов
                                </Link>
                                <span className={styles.separator}> - </span>
                                <Link href={modulesUrl}>
                                    Модули
                                </Link>
                                <span className={styles.separator}> - </span>
                                Уроки
                            </div>
                            <h2>Вы вошли как:
                                <span>
                                    <Link href="/profile">Людмила Альбертини</Link>
                                </span>
                            </h2>
                            <div className={styles.trainingsContainer}>
                                {matchingLessons.map(lesson => (
                                    <div key={lesson.slug} className={styles.training}>
                                        <Link
                                            className={styles.moduleLink}
                                            href={`${currentUrl}/lessons/${encodeURIComponent(lesson.title)}`}
                                        >
                                            <div className={styles.trainingInfo}>
                                                <p className={styles.trainingTitle}>{lesson.title}</p>
                                                <p>{lesson.moduleNum} ({lesson.lessons_quantity})</p>
                                            </div>
                                        </Link>
                                        <Link
                                            href={`/profile/trainings/${encodeURIComponent(decodedTitle)}/modules/${encodeURIComponent(lesson.title)}`}
                                        >
                                            <button className={styles.trainingButton}>
                                                Смотреть
                                            </button>
                                        </Link>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </>
    );
}
