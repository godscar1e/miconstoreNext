import React, { useState } from "react";
import Link from "next/link";
import SessionLogger from "@/components/SessionLogger";
import styles from './BurgerMenu.module.scss';

export default function BurgerMenu() {
    const [session, setSession] = useState(null);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };
    const handleSessionChange = (sessionData) => {
        setSession(sessionData);
    };
    return (
        <>
            <SessionLogger onSessionChange={handleSessionChange} />
            <div className={styles.burgerMenu} onClick={toggleMenu}>
                <div className={styles.burgerLine}></div>
                <div className={styles.burgerLine}></div>
                <div className={styles.burgerLine}></div>
            </div>
            <div className={`${styles.mobileMenu} ${isMenuOpen ? styles.open : ""}`}>
                <ul>
                    <li><Link href="#questionblock" onClick={toggleMenu}>Вопросы</Link></li>
                    <li><Link href="#feedbacksblock" onClick={toggleMenu}>Отзывы</Link></li>
                    <li><Link href="#rateblock" onClick={toggleMenu}>Тарифы</Link></li>
                    <li><Link href="#additservice" onClick={toggleMenu}>Доп. Услуги</Link></li>
                    <li><Link href="#trips" onClick={toggleMenu}>Поездки</Link></li>
                    <li><Link href="#footer" onClick={toggleMenu}>Контакты</Link></li>
                    {session && session.user ? (
                        <li>
                            <Link href="/profile" onClick={toggleMenu}>
                                <button className={styles.headerBtn}>ПРОФИЛЬ</button>
                            </Link>
                        </li>
                    ) : (
                        <li>
                            <Link href="/login" onClick={toggleMenu}>
                                <button className={styles.headerBtn}>ВОЙТИ</button>
                            </Link>
                        </li>
                    )}
                </ul>
            </div>
            <div className={`${styles.overlay} ${isMenuOpen ? styles.open : ""}`} onClick={toggleMenu}></div>
        </>
    );
};


