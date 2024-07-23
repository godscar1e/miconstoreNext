'use client';

import Header from "@/components/Header/Header";
import Head from 'next/head';
import styles from "../Trainings.module.scss";
import Link from "next/link";
import { modulesData } from '@/data/modulesData';

export default function TrainingPage({ params }) {
    console.log('params:', params);

    const { training: moduleTitle } = params;
    console.log('moduleTitle:', moduleTitle);

    // Декодируйте и проверьте заголовок модуля
    const decodedTitle = decodeURIComponent(moduleTitle);
    console.log('Decoded moduleTitle:', decodedTitle);

    // Найдите все модули, соответствующие заголовку
    const matchingModules = modulesData.filter(module => module.training_title === decodedTitle);
    console.log('Found modules:', matchingModules);

    if (matchingModules.length === 0) {
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
                            <h2>{decodedTitle}</h2>
                        </div>
                        <div className={styles.mainblock}>
                            <p className={styles.path}>Список тренингов - Модули</p>
                            <h2>Вы вошли как: <span>Людмила Альбертини</span></h2>
                            <div className={styles.trainingsContainer}>
                                {matchingModules.map(module => (
                                    <div key={module.slug} className={styles.training}>
                                        <Link
                                            className={styles.moduleLink}
                                            href={`/profile/trainings/${encodeURIComponent(moduleTitle)}/modules/${encodeURIComponent(module.title)}/`}
                                            as={`/profile/trainings/${decodedTitle}/modules/${decodeURIComponent(module.title)}/`}
                                        >
                                            <div className={styles.trainingInfo}>
                                                <p className={styles.trainingTitle}>{module.title}</p>
                                                <p>{module.moduleNum} ({module.lessons_quantity})</p>
                                            </div>
                                        </Link>
                                        <Link
                                            href={`/profile/trainings/${encodeURIComponent(moduleTitle)}/modules/${encodeURIComponent(module.title)}/`}
                                            as={`/profile/trainings/${decodedTitle}/modules/${decodeURIComponent(module.title)}/`}
                                        >
                                            <button className={styles.trainingButton}>
                                                Перейти к тренингу
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
