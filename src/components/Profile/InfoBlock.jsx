"use client";
import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import Image from "next/image";
import styles from "./InfoBlock.module.scss";
import { getUserData } from "../getUserData";
import ChatSupport from "./ChatSupport/ChatSupport";
import PropBlock from "./PropositionsBlock/PropBlock";

export default function InfoBlock({ activeBlock }) {
    const { data: session } = useSession();
    const [user, setUser] = useState(() => {
        // Попытка получить данные пользователя из localStorage
        const storedUser = localStorage.getItem('user');
        return storedUser ? JSON.parse(storedUser) : session?.user || null;
    });

    useEffect(() => {
        if (session && session.user && !user) {
            const userEmail = session.user.email;
            console.log('Fetching user data for:', userEmail);
            getUserData(userEmail).then(userData => {
                console.log('User data fetched:', userData);
                setUser(userData);
                // Сохраняем данные пользователя в localStorage
                localStorage.setItem('user', JSON.stringify(userData));
            }).catch(error => {
                console.error('Error fetching user data:', error);
            });
        }
    }, [session, user]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUser((prevUser) => ({
            ...prevUser,
            [name]: value,
        }));
        // Обновляем данные в localStorage при изменении
        localStorage.setItem('user', JSON.stringify({ ...user, [name]: value }));
    };

    return (
        <div className={`${styles.infoblock} ${(activeBlock === 'support' || activeBlock === 'propositions') ? styles['infoblock--support'] : ''}`}>
            <div id="profile" className={`${styles.profilechangeform} ${activeBlock === 'profile' ? styles.active : ''}`}>
                <h3>Редактировать профиль</h3>

                <form className={styles.profilechangeform__photochange}>
                    <div className={styles.photochange_leftblock}>
                        <Image src='/images/bgimage.png' alt="profileImage" width={200} height={50} />
                        <div className={styles.photochange_info}>
                            <p className={styles.user_name}>{user?.name}</p>
                            <p className={styles.user_type}>Студент</p>
                        </div>
                    </div>
                    <div className={styles.photochange_input}>
                        <button id="photochangeButton" className={styles.photo_change_button}>Новое фото</button>
                        <input type="file" id="profilePhotoInput" style={{ display: 'none' }} />
                    </div>
                </form>

                <div className={styles.input_group}>
                    <label>Номер телефона</label>
                    <input
                        type="text"
                        name="phone"
                        value={user?.phone || ''}
                        onChange={handleInputChange}
                    />
                </div>
                <div className={styles.input_group}>
                    <label>Эл. почта</label>
                    <input
                        type="text"
                        name="email"
                        value={user?.email || ''}
                        onChange={handleInputChange}
                    />
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
                    <select>
                        <option value="enabled">Включены</option>
                        <option value="disabled">Выключены</option>
                    </select>
                </div>
                <div className={styles.input_group}>
                    <label>Электронные письма с напоминаниями</label>
                    <select>
                        <option value="enabled">Включены</option>
                        <option value="disabled">Выключены</option>
                    </select>
                </div>
                <div className={styles.input_group}>
                    <label>Электронные письма с новостями</label>
                    <select>
                        <option value="enabled">Включены</option>
                        <option value="disabled">Выключены</option>
                    </select>
                </div>
                <div className={styles.input_group}>
                    <label>Электронные письма в службу поддержки</label>
                    <select>
                        <option value="enabled">Включены</option>
                        <option value="disabled">Выключены</option>
                    </select>
                </div>
            </div>

            <div id="support" className={`${styles.supportchat} ${activeBlock === 'support' ? styles.active : ''}`}>
                <div className={`${styles.supportchat_topblock} ${styles.supporttopblock}`}>
                    <h3>Чат с службой поддержки</h3>
                    <button className={styles.supporttopblock__complainbtn}>Пожаловаться</button>
                </div>
                <ChatSupport userEmail={user?.email} shouldScroll={activeBlock === 'support'} />
            </div>

            <div id="propositions" className={`${styles.propositionsBlock} ${activeBlock === 'propositions' ? styles.active : ''}`}>
                <div className={styles.topblock}>
                    <h3>Напишите ваши предложения:</h3>
                    <PropBlock userEmail={user?.email} />
                </div>
            </div>
        </div>
    );
}
