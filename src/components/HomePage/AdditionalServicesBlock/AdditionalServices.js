import Image from 'next/image';
import styles from './AdditionalServices.module.scss';

const additionalServices = [
    {
        label: 'НУМЕРОЛОГИЯ',
        price: '1500$ / 60 мин.',
        description: false,
        showButtons: true,
        description_text: 'Телесно-ориентированная терапия помогает человеку понять, какие чувства, эмоции он испытывает и что переживает в трудные жизненные периоды, и как с этим взаимодействовать. ',
        items: [
            'Выявление талантов, способностей, врождённые качества;',
            'Рекомендации по развитию качеств, потенциала;',
            'Рекомендации по деятельности, бизнесу и деньгам;',
            'Прогноз на будущее', 'Ответы на ваши вопросы'
        ],
        images: [
            { src: '/images/taroyunga.png', width: 140, height: 213 },
            { src: '/images/numerology.png', width: 230, height: 213 },
            { src: '/images/psychotypesimg.png', width: 140, height: 213 }
        ]
    },
    {
        label: 'МАНУАЛЬНАЯ ТЕРАПИЯ',
        price: '150$ / 60 мин.',
        description: true,
        showButtons: false,
        description_text: 'Телесно-ориентированная терапия помогает человеку понять, какие чувства, эмоции он испытывает и что переживает в трудные жизненные периоды, и как с этим взаимодействовать. ',
        items: [
            'Выявление талантов, способностей, врождённые качества;',
            'Рекомендации по развитию качеств, потенциала;',
            'Рекомендации по деятельности, бизнесу и деньгам;',
            'Прогноз на будущее', 'Ответы на ваши вопросы'
        ],
        images: [
            { src: '/images/bodytheraphy1.png', width: 320, height: 213 },
            { src: '/images/bodytheraphy2.png', width: 220, height: 213 },
        ]
    }
];

const ServicesComponent = () => (
    <div className={styles.additServiceBlock} id="additservice">
        <h2 className={styles.label}>ДОП. УСЛУГИ</h2>
        <div className={styles.services}>
            {additionalServices.map((service, index) => (
                <div key={index} className={styles.service}>
                    <h2 className={styles.label}>{service.label}</h2>
                    <div className={styles.serviceImages}>
                        {service.images.map((image, imgIndex) => (
                            <Image
                                key={imgIndex}
                                src={image.src}
                                alt={`Image ${imgIndex}`}
                                width={image.width}
                                height={image.height}
                                className={styles.serviceImage}
                            />
                        ))}
                    </div>
                    <div className={styles.listContainer}>
                        <ul className={styles.serviceList}>
                            {service.items.map((item, itemIndex) => (
                                <li key={itemIndex} className={styles.listItem}>{item}</li>
                            ))}
                        </ul>
                    </div>
                    {service.description && (
                        <div className={styles.description}>
                            <p className={styles.description_text} >{service.description_text}</p>
                        </div>
                    )}
                    {service.showButtons && (
                        <div className={styles.typeBtnsContainer}>
                            <button className={styles.offlineBtn}>Офлайн</button>
                            <button className={styles.onlineBtn}>Онлайн</button>
                        </div>
                    )}
                    <div className={styles.priceContainer}>
                        <button className={styles.contactBtn}>Связаться со мной</button>
                        <div className={styles.pricentime}>{service.price}</div>
                    </div>
                </div>
            ))}
        </div>
    </div>
);

export default ServicesComponent;
