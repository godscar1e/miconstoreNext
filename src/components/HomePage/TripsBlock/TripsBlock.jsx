import Image from 'next/image';
import { useState } from 'react';
import styles from './TripsBlock.module.scss';

const tripsData = [
    {
        location: 'Флоренция, Италия',
        description: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis',
        image: { src: '/images/Rectangle 68.png', width: 500, height: 500 },
        showButtons: true
    },
    {
        location: 'Даманхур, Италия',
        description: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesLorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean масса. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesLorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor.',
        image: { src: '/images/Rectangle 66.png', width: 500, height: 500 },
        showButtons: true
    },
    {
        location: 'Асизи, Италия',
        description: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis',
        image: { src: '/images/Rectangle 67.png', width: 690, height: 607 },
        showButtons: true
    }
];

const buttonImages = [
    { src: '/images/Group 113.png', alt: 'Button 1', width: 420, height: 390 },
    { src: '/images/Group 115.png', alt: 'Button 2', width: 420, height: 390 },
    { src: '/images/Group 116.png', alt: 'Button 3', width: 420, height: 390 }
];

const TripsComponent = () => {
    const [activeProgram, setActiveProgram] = useState(0);

    return (
        <div className={styles.trips} id="trips">
            <h2 className={styles.label}>ПОЕЗДКИ</h2>

            <div className={styles.tripbody}>
                <div className={styles.tripwindow}>
                    {tripsData.map((trip, index) => (
                        <div key={index} className={`${styles.tripinfo} ${index === activeProgram ? styles.active : ''}`}>
                            <Image src={trip.image.src} alt="" width={trip.image.width} height={trip.image.height} />
                            <div className={styles.infoContainer}>
                                <h2>{trip.location}</h2>
                                <p>{trip.description}</p>
                                {trip.showButtons && (
                                    <div className={styles.infoBtn}>
                                        <button className={styles.booktripbtn}>Забронировать</button>
                                    </div>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
                <div className={styles.tripbuttons}>
                    {buttonImages.map((button, index) => (
                        <button
                            key={index}
                            className={`${styles.tripBtn} ${index === activeProgram ? styles.active : ''}`}
                            onClick={() => setActiveProgram(index)}
                        >
                            <Image src={button.src} alt={button.alt} width={button.width} height={button.height} />
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default TripsComponent;
