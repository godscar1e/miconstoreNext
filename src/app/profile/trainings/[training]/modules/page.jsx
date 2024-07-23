'use client'

import Header from "@/components/Header/Header";
import styles from "./Trainings.module.scss";
import TrainingComponent from "@/components/ProfileTrainingComp/TrainingComponent";

const trainingData = [
    {
        id: 1,
        title: 'Знакомство. Презентация курса',
        module_quantity: '1 модуль',
        lessons_quantity: '3 урока',
        avaibility: 1
    },
    {
        id: 2,
        title: 'Нумерология. Поиск себя с помощью чисел',
        module_quantity: '6-8 модулей',
        lessons_quantity: '25-31 уроков',
        avaibility: 1
    },
];

export default function ModulePage() {

    return (
        <>
            <Header />
            <main className={styles.main}>
                <div className={styles.container}>
                    <div className={styles.body}>
                        <div className={styles.topblock}>
                            <h2>Список тренингов</h2>
                        </div>
                        <div className={styles.mainblock}>
                            <p className={styles.path}>Список тренингов</p>
                            <h2>Вы вошли как: <span>Людмила Альбертини</span></h2>
                            <div className={styles.trainingsContainer}>
                                <TrainingComponent trainingData={trainingData} />
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </>
    );
}
