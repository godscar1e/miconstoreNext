'use client'

import { useState } from 'react';
import styles from "./Profile.module.scss";
import Image from "next/image";
import "../styles/_vars.scss";
import "../styles/globals.scss";
import Header from '../../components/Header';
import Script from 'next/script';
<link rel="stylesheet" href="https://unpkg.com/swiper/swiper-bundle.min.css" />
import { useActiveButton } from '../hooks/useActiveButton';
import { useProfilePhotoChange } from '../hooks/useProfilePhotoChange';

export default function Profile() {
    const { activeButton, handleButtonClick } = useActiveButton('profileBtn');
    const [activeBlock, setActiveBlock] = useState('profile');

    useProfilePhotoChange();

    const handleBlockChange = (blockId) => {
        setActiveBlock(blockId);
    };

    return (
        <div className={styles.wrapper}>
            <Header hideNavigation={false} />
            <main className={styles.main}>
                <div className={styles.main__container}>
                    <div className={styles.profilebody}>
                        <div className={styles.profilenav}>
                            <h3>Настройки</h3>
                            <ul className={styles.profilenav__list}>
                                <li>
                                    <button className={`${styles.list_button} ${styles.profileBtn} ${activeButton === 'profileBtn' ? styles.active : ''}`}
                                        id="profileBtn"
                                        onClick={() => {
                                            handleButtonClick('profileBtn');
                                            handleBlockChange('profile');
                                        }}>
                                        <p>Редактировать профиль</p>
                                    </button>
                                </li>
                                <li>
                                    <button className={`${styles.list_button} ${styles.notificationsBtn} ${activeButton === 'notificationsBtn' ? styles.active : ''}`}
                                        id="notificationsBtn"
                                        onClick={() => {
                                            handleButtonClick('notificationsBtn');
                                            handleBlockChange('notifications');
                                        }}>
                                        <p>Уведомления</p>
                                    </button>
                                </li>
                                <li>
                                    <button className={`${styles.list_button} ${styles.supportBtn} ${activeButton === 'supportBtn' ? styles.active : ''}`}
                                        id="supportBtn"
                                        onClick={() => {
                                            handleButtonClick('supportBtn');
                                            handleBlockChange('support');
                                        }} >
                                        <p>Служба поддержки</p>
                                    </button>
                                </li>
                                <li>
                                    <button className={`${styles.list_button} ${styles.propositionsBtn} ${activeButton === 'propositionsBtn' ? styles.active : ''}`}
                                        id="propositionsBtn"
                                        onClick={() => {
                                            handleButtonClick('propositionsBtn');
                                            handleBlockChange('propositions');
                                        }}>
                                        <p>Отправить предложение для улучшения курса</p>
                                    </button>
                                </li>
                            </ul>
                        </div>
                        <div className={styles.infoblock}>
                            <div id="profile" className={`${styles.profilechangeform} ${activeBlock === 'profile' ? styles.active : ''}`}>
                                <h3>Редактировать профиль</h3>
                                <div className={styles.profilechangeform__photochange}>
                                    <div className={styles.photochange_leftblock}>
                                        <Image src='/images/bgimage.png' alt="" width={200} height={50} />
                                        <div className={styles.photochange_info}>
                                            <p className={styles.user_name}>Владислав Долженко</p>
                                            <p className={styles.user_type}>Студент</p>
                                        </div>
                                    </div>
                                    <div className={styles.photochange_input}>
                                        <button id="photochangeButton" className={styles.photo_change_button}>Новое фото</button>
                                        <input type="file" id="profilePhotoInput" style={{ display: 'none' }} />
                                    </div>
                                </div>
                                <div className={styles.input_group}>
                                    <label>Пол</label>
                                    <input type="text" />
                                </div>
                                <div className={styles.input_group}>
                                    <label>Номер телефона</label>
                                    <input type="text" />
                                </div>
                                <div className={styles.input_group}>
                                    <label>Эл. почта</label>
                                    <input type="text" />
                                </div>
                                <div className={styles.input_group}>
                                    <label>Купленный тариф</label>
                                    <input type="text" />
                                </div>
                            </div>
                            <div id="notifications" className={`${styles.notificationsblock} ${activeBlock === 'notifications' ? styles.active : ''}`}>
                                <h3>Уведомления по эл. почте</h3>
                                <div className={styles.input_group}>
                                    <label>Электронные письма с опросами</label>
                                    <input type="text" />
                                </div>
                                <div className={styles.input_group}>
                                    <label>Электронные письма с напоминаниями</label>
                                    <input type="text" />
                                </div>
                                <div className={styles.input_group}>
                                    <label>Электронные письма с новостями</label>
                                    <input type="text" />
                                </div>
                                <div className={styles.input_group}>
                                    <label>Электронные письма в службу поддержки</label>
                                    <input type="text" />
                                </div>
                            </div>
                            <div id="support" className={`${styles.supportchat} ${activeBlock === 'support' ? styles.active : ''}`}>
                                <div className={`${styles.supportchat_topblock} ${styles.supporttopblock}`}>
                                    <h3>Чат с службой поддержки</h3>
                                    <button className={styles.supporttopblock__complainbtn}>Пожаловаться</button>
                                </div>
                                <div>{/* Include your chat component or HTML here */}</div>
                            </div>
                            <div id="propositions" className={`${styles.infoblock__proposition} ${activeBlock === 'propositions' ? styles.active : ''}`}>proposition</div>
                        </div>
                    </div>
                </div>
            </main>
            <Script
                src="/js/profile.js"
                strategy="lazyOnload"
                onLoad={() =>
                    console.log('profile.js script loaded correctly')
                }
                onError={(error) =>
                    console.error('Error loading profile.js:', error)
                }
            />
        </div>
    );
}
