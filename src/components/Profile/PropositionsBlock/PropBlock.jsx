import React, { useState, useEffect } from "react";
import axios from 'axios';
import styles from './PropBlock.module.scss';
import Image from 'next/image';
import { Inter } from 'next/font/google';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';
import { getUserData } from '@/components/getUserData';
const inter = Inter({ subsets: ["latin"], weight: ["400"] });

const PropBlock = ({ userEmail }) => {
    const [input, setInput] = useState('');
    const [textarea, setTextarea] = useState('');
    const [user, setUser] = useState(null);

    const notify = () => toast.success("Предложение успешно отправлено!");
    const erorrNotify = () => toast.error("Ошибка отправки предложения!");

    useEffect(() => {
        const fetchUserData = async () => {
            if (userEmail) {
                const userData = await getUserData(userEmail);
                setUser(userData);

            }
        };

        fetchUserData();
    }, [userEmail]);


    const handleSend = async () => {
        // console.log('Input value:', input);
        // console.log('Textarea value:', textarea);
        // console.log('User ID:', user.id);

        const newProposition = { title: input, proposition: textarea, attachments: "attach", userId: user.id };

        // console.log('New proposition:', newProposition);
        try {
            const res = await axios.post('/api/propositions', newProposition, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            // console.log('Axios response:', res);

            if (res.status === 201) {
                notify();
                setInput('');
                setTextarea('');
            } else {
                throw new Error('Failed to send message');
            }
        } catch (error) {
            console.error('Error sending message:', error);
        }

    };



    return (
        <div className={styles.container}>
            <form className={styles.form}>
                <div className={styles.mainBlock}>
                    <div className={styles.topblock}>
                        <input type='text' id="title" name='title' onChange={(e) => setInput(e.target.value)} value={input} placeholder='Введите заголовок' />
                        <div className={styles.warning}>
                            <p>Максимум 1600 символов</p>
                        </div>
                    </div>
                    <textarea className={`${styles.textarea} ${inter.className}`} placeholder='Предложение:' maxLength={1628} onChange={(e) => setTextarea(e.target.value)} value={textarea}></textarea>
                </div>
                <div className={styles.bottomBlock}>
                    <div className={styles.fileInput} onClick={() => document.getElementById('file-upload').click()}>
                        <Image
                            width={32}
                            height={40}
                            src={'/icons/file-ico.svg'}
                            alt=""
                        />
                        {/* <input id="file-upload" type="file" style={{ display: 'none' }} /> */}
                        <p>При необходимости прикрепите файл</p>
                    </div>
                    <div className={styles.propButtons}>
                        <button type="button" className={styles.cancelBtn}>Отменить</button>
                        <button type="button" onClick={handleSend} className={styles.sendBtn}>Отправить</button>
                    </div>
                </div>
            </form >
            <ToastContainer
                position="top-right"
                autoClose={3000}
                hideProgressBar={false}
                newestOnTop={false}
                closeButton={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
            />
        </div >
    );
};
export default PropBlock;