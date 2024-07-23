'use client'

import { useEffect, useState } from 'react';
import Head from 'next/head';
import Header from "@/components/Header/Header";
import styles from "../../../../../Trainings.module.scss";
import lessonsStyles from "./LessonsStyles.module.scss";
import Link from 'next/link';
import { lessonsData } from '@/data/lessonsData';
import { useRouter } from 'next/navigation';

export default function LessonPage({ params }) {
    const router = useRouter();
    const { module: moduleTitle } = params;

    const decodedTitle = decodeURIComponent(moduleTitle);
    const matchingLessons = lessonsData.filter(lesson => lesson.module_title === decodedTitle);
    const trainingTitle = matchingLessons.length > 0 ? matchingLessons[0].training_title : '';

    const modulesUrl = `/profile/trainings/${encodeURIComponent(trainingTitle.replace(/\/modules\/.*$/, ''))}`;

    const [currentUrl, setCurrentUrl] = useState('');
    const [lessonTitle, setLessonTitle] = useState('');
    const [lesson, setLesson] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const url = window.location.href;
        setCurrentUrl(url);

        const urlParts = url.split('/lessons/');
        if (urlParts.length > 1) {
            const lessonTitlePart = urlParts[1].split('/')[0];
            const decodedLessonTitle = decodeURIComponent(lessonTitlePart);
            setLessonTitle(decodedLessonTitle);

            const foundLesson = matchingLessons.find(lesson => lesson.title === decodedLessonTitle);
            setLesson(foundLesson);
        }
        setLoading(false); // Устанавливаем загрузку в false после получения данных
    }, [decodedTitle, matchingLessons]);

    const lessonIndex = lesson ? matchingLessons.findIndex(l => l.title === lesson.title) : -1;

    const handlePrevLesson = () => {
        if (lessonIndex > 0) {
            const prevLesson = matchingLessons[lessonIndex - 1];
            router.push(`/profile/trainings/${encodeURIComponent(trainingTitle)}/modules/${encodeURIComponent(decodedTitle)}/lessons/${encodeURIComponent(prevLesson.title)}`);
        }
    };

    const handleNextLesson = () => {
        if (lessonIndex < matchingLessons.length - 1) {
            const nextLesson = matchingLessons[lessonIndex + 1];
            router.push(`/profile/trainings/${encodeURIComponent(trainingTitle)}/modules/${encodeURIComponent(decodedTitle)}/lessons/${encodeURIComponent(nextLesson.title)}`);
        }
    };

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
                                <span className={styles.separator}> - </span>
                                {lessonTitle}
                            </div>
                            <h2>Вы вошли как:
                                <span>
                                    <Link href="/profile"> Людмила Альбертини</Link>
                                </span>
                            </h2>
                            <div className={styles.trainingsContainer}>
                                <div className={lessonsStyles.trainingWindow}>
                                    <div className={lessonsStyles.windowTopHeader}>
                                        <div className={lessonsStyles.container}>
                                            <div className={lessonsStyles.body}>
                                                {loading ? (
                                                    <SkeletonLoader />
                                                ) : (
                                                    <>
                                                        <button onClick={handlePrevLesson} disabled={lessonIndex <= 0}>Предыдущий урок</button>
                                                        <div className={lessonsStyles.info}>
                                                            <h2>{lessonTitle}</h2>
                                                            <div className={lessonsStyles.bottomInfo}>
                                                                <p className={lessonsStyles.pagination}>{lessonIndex + 1} из {matchingLessons.length} уроков</p>
                                                                <p className={lessonsStyles.avaibility}>Доступен</p>
                                                            </div>
                                                        </div>
                                                        <button onClick={handleNextLesson} disabled={lessonIndex >= matchingLessons.length - 1}>Следующий урок</button>
                                                    </>
                                                )}
                                            </div>
                                        </div>
                                    </div>

                                    <div className={lessonsStyles.windowMain}>
                                        {loading ? 'Загрузка...' : (lesson ? lesson.name : 'Урок не найден')}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </>
    );
}

function SkeletonLoader() {
    return (
        <div className={lessonsStyles.skeletonLoader}>
            <button className={lessonsStyles.skeletonButton}></button>
            <div className={lessonsStyles.skeletonInfo}>
                <h2 className={lessonsStyles.skeletonTitle}></h2>
                <div className={lessonsStyles.skeletonBottomInfo}></div>
            </div>
            <button className={lessonsStyles.skeletonButton}></button>
        </div>


    );
}
