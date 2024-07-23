"use client";

import React, { useState, useEffect, useCallback } from "react";
import styles from "./Profile.module.scss";
import Header from '../../components/Header/Header';
import Script from 'next/script';
import Link from "next/link";
import { useActiveButton } from '../hooks/useActiveButton';
import { useProfilePhotoChange } from '../hooks/useProfilePhotoChange';
import Logout from "@/components/Logout/Logout";
import SessionLogger from "@/components/SessionLogger";
import InfoBlock from "@/components/Profile/InfoBlock";
import { SessionProvider } from "next-auth/react";


export default function Profile() {
    const [session, setSession] = useState(null);
    const { activeButton, handleButtonClick } = useActiveButton('profileBtn');
    const [activeBlock, setActiveBlock] = useState('profile');

    useProfilePhotoChange();

    const handleBlockChange = (blockId) => {
        setActiveBlock(blockId);
    };

    const handleSessionChange = useCallback((sessionData) => {
        setSession(sessionData);
    }, []);

    useEffect(() => {
        const storedSession = localStorage.getItem("session");
        if (storedSession) {
            setSession(JSON.parse(storedSession));
        } else {
            setSession(null);
        }
    }, []);

    return (
        <>
            <SessionLogger onSessionChange={handleSessionChange} />
            <div className={styles.wrapper}>
                <Header />
                <main className={styles.main}>
                    <div className={styles.main__container}>
                        <div className={styles.profilebody}>
                            <div className={styles.profilenav}>
                                <h3>Настройки</h3>
                                <div className={styles.buttonsContainer}>
                                    <Logout />
                                    <Link href="/change-password" className={styles.changepassLink}>Сменить пароль в аккаунте</Link>
                                </div>
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
                                    <li>
                                        <Link href="/profile/trainings" className={`${styles.list_button} ${styles.trainingsLink}`} id="trainingsLink">
                                            <p>Мои тренинги</p>
                                        </Link>
                                    </li>
                                </ul>
                            </div>
                            <SessionProvider>
                                <InfoBlock activeBlock={activeBlock} />
                            </SessionProvider>
                        </div>
                    </div>
                </main >

            </div >
        </>
    );
}
