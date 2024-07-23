import Link from 'next/link';
import styles from './TrainingComponent.module.scss';

export default function TrainingComponent({ trainingData = [] }) {

    console.log(trainingData);
    return (
        <>
            {trainingData.map((training, index) => (
                <div key={index} className={styles.training}>
                    <Link className={styles.moduleLink} href={training.avaibility === 1 ? `/profile/trainings/${encodeURIComponent(training.title)}` : "/numerology-course"}>
                        <div className={styles.trainingInfo}>
                            <p className={styles.trainingTitle}>{training.title}</p>
                            <p>{training.module_quantity} ({training.lessons_quantity})</p>
                        </div>
                    </Link>
                    <button className={styles.trainingButton}>
                        {training.avaibility === 1 ? 'Перейти к тренингу' : 'Получить доступ'}
                    </button>
                </div>
            ))}
        </>
    );
}
