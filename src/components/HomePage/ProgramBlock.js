import { useState } from 'react';
import styles from "./MainContent.module.scss";

const ProgramComponent = () => {
    const [activeProgram, setActiveProgram] = useState(0);

    const modules = [
        { title: 'ПЕРВЫЙ', text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.' },
        { title: 'ВТОРОЙ', text: 'Suspendisse malesuada lacus ex, sit amet blandit leo lobortis eget.' },
        { title: 'ТРЕТИЙ', text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.' },
        { title: 'ЧЕТВЕРТЫЙ', text: 'Suspendisse malesuada lacus ex, sit amet blandit leo lobortis eget.' },
        { title: 'ПЯТЫЙ', text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.' },
        { title: 'ШЕСТОЙ', text: 'Suspendisse malesuada lacus ex, sit amet blandit leo lobortis eget.' },
    ];

    return (
        <div className={styles.programblock}>
            <h1 className={styles.label}>ПРОГРАММА КУРСА</h1>
            <div className={styles.program}>
                <div className={styles.progbtns}>
                    {['ПЕРВЫЙ МОДУЛЬ', 'ВТОРОЙ МОДУЛЬ', 'ТРЕТИЙ МОДУЛЬ', 'ЧЕТВЕРТЫЙ МОДУЛЬ', 'ПЯТЫЙ МОДУЛЬ', 'ШЕСТОЙ МОДУЛЬ'].map((module, index) => (
                        <button
                            key={index}
                            className={`${styles.programbtn} ${index === activeProgram ? styles.active : ''}`}
                            onClick={() => setActiveProgram(index)}
                        >
                            {module}
                        </button>
                    ))}
                </div>

                <div className={styles.programwindow}>
                    {modules.map((info, index) => (
                        <div key={index} className={`${styles.programwindow__info} ${index === activeProgram ? styles.active : ''}`}>
                            <h2>{info.title}</h2>
                            <p>{info.text}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ProgramComponent;
