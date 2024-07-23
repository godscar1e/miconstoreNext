"use client";

import React, { useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import SessionLogger from "@/components/SessionLogger";
import styles from "./Header.module.scss";
import Image from "next/image";

import BurgerMenu from "./BurgerMenu/BurgerMenu";

const Header = () => {
    const [session, setSession] = useState(null);
    const pathname = usePathname();
    const isHomePage = pathname === "/";
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const handleSessionChange = (sessionData) => {
        setSession(sessionData);
    };
    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    return (
        <>
            <SessionLogger onSessionChange={handleSessionChange} />
            <header className={styles.header}>
                <div className={styles.header__container}>
                    <div className={styles.headerbody}>
                        <div className={styles.headerbody__logo}>
                            <Link href="/">
                                <Image src="/logo.svg" alt="logo" width={90} height={90} />
                            </Link>
                        </div>
                        <div className={styles.headernav}>
                            {isHomePage && (
                                <ul className={styles.navlist}>
                                    <li className={styles.navlist__item}>
                                        <Link href="#questionblock">Вопросы</Link>
                                    </li>
                                    <li className={styles.navlist__item}>
                                        <Link href="#feedbacksblock">Отзывы</Link>
                                    </li>
                                    <li className={styles.navlist__item}>
                                        <Link href="#rateblock">Тарифы</Link>
                                    </li>
                                    <li className={styles.navlist__item}>
                                        <Link href="#additservice">Доп. Услуги</Link>
                                    </li>
                                    <li className={styles.navlist__item}>
                                        <Link href="#trips">Поездки</Link>
                                    </li>
                                    <li className={styles.navlist__item}>
                                        <Link href="#footer">Контакты</Link>
                                    </li>
                                    {session && session.user ? (
                                        <li>
                                            <Link href="/profile">
                                                <button className={styles.headerBtn}>ПРОФИЛЬ</button>
                                            </Link>
                                        </li>
                                    ) : (
                                        <li>
                                            <Link href="/login">
                                                <button className={styles.headerBtn}>ВОЙТИ</button>
                                            </Link>
                                        </li>
                                    )}
                                </ul>
                            )}
                            {!isHomePage && (
                                <Link href="/">
                                    <button className={styles.headerBtn}>
                                        ГЛАВНАЯ
                                    </button>
                                </Link>
                            )}
                            {isHomePage && (
                                <BurgerMenu />
                            )}
                        </div>
                    </div>
                </div>
            </header>
        </>
    );
};

export default Header;
