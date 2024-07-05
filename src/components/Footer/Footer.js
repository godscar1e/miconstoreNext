import styles from "./Footer.module.scss";
import Image from "next/image"
import Link from "next/link";

export default function Footer() {
    return (
        <footer className={styles.footer} id="footer">
            <div className={styles.container}>
                <div className={styles.body}>
                    <h2 className={styles.label}>Курс читает Людмила Альбертини</h2>
                    <div className={styles.mainblock}>
                        <Image src="/images/woman-ellipse.png" alt="" width={225} height={225} />
                        <div className={styles.listСontainer}>
                            <ul className={styles.list}>
                                <li className={styles.listItem}> Автор проекта, преподаватель, нумеролог, мануальный терапевт.
                                </li>
                                <li className={styles.listItem}>Опыт телесно-ориентированной терапии - 30 лет.</li>
                                <li className={styles.listItem}>Опыт консультирования – 10 лет. </li>
                                <li className={styles.listItem}>Проект нового времени, запуск 2024. </li>
                            </ul>
                        </div>
                    </div>
                    <div className={styles.contacts}>
                        <Link href="https://www.youtube.com" className={styles.contacts_group}>
                            <Image src="/icons/youtube-ico.svg" alt="" width={40} height={40} />
                            <p>YouTube</p>
                        </Link>
                        <Link href="https://www.instagram.com" className={styles.contacts_group}>
                            <Image src="../icons/instagram-ico.svg" alt="" width={40} height={40} />
                            <p>Instagram</p>
                        </Link>
                        <Link href="https://www.facebook.com" className={styles.contacts_group}>
                            <Image src="../icons/facebook-ico.svg" alt="" width={40} height={40} />
                            <p>Facebook</p>
                        </Link>
                        <Link href="https://www.vk.com" className={styles.contacts_group}>
                            <Image src="../icons/vkontakte-ico.svg" alt="" width={40} height={40} />
                            <p>VKontakte</p>
                        </Link>
                        <Link href="tel:+41214645522" className={styles.contacts_group}>
                            <Image src="../icons/phone-ico.svg" alt="" width={40} height={40} />
                            <p>+41 21 464 55 22</p>
                        </Link>
                    </div>
                </div>
            </div>
        </footer >
    );

};
