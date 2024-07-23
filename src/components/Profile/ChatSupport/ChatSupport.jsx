import React, { useState, useEffect, useRef } from "react";
import axios from 'axios';
import styles from './ChatSupport.module.scss';
import { getUserData } from '@/components/getUserData';

const ChatSupport = ({ userEmail, shouldScroll }) => {
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState('');
    const [user, setUser] = useState(null);
    const chatEndRef = useRef(null);

    useEffect(() => {
        const fetchUserData = async () => {
            if (userEmail) {
                const userData = await getUserData(userEmail);
                setUser(userData);
                if (userData) {
                    const userMessages = await axios.get(`/api/messages?userId=${userData.id}`);
                    setMessages(userMessages.data);
                }
            }
        };

        fetchUserData();
    }, [userEmail]);

    useEffect(() => {
        if (shouldScroll) {
            chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
        }
    }, [messages, shouldScroll]);

    const handleSend = async () => {
        if (input.trim() && user) {
            const newMessage = { text: input, sender: 'user', userId: user.id };

            console.log(newMessage);
            setMessages(prevMessages => [...prevMessages, newMessage]);
            setInput('');

            try {
                const res = await axios.post('/api/messages', newMessage, {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });

                console.log('Axios response:', res);

                if (res.status !== 201) {
                    throw new Error('Failed to send message');
                }
            } catch (error) {
                console.error('Error sending message:', error);
                console.log('Axios response:', error.response);
            }
        }
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            handleSend();
        }
    };

    return (
        <div className={styles.chatSupport}>
            <div className={styles.chatMessages}>
                {messages.length === 0 ? (
                    <div className={styles.noMessages}>Пока что нет сообщений</div>
                ) : (
                    messages.map((msg, index) => {
                        const timestamp = new Date(msg.timestamp);
                        const formattedTimestamp = isNaN(timestamp.getTime())
                            ? 'Сейчас'
                            : timestamp.toLocaleString('ru-RU', {
                                year: 'numeric',
                                month: '2-digit',
                                day: '2-digit',
                                hour: '2-digit',
                                minute: '2-digit',
                                second: '2-digit',
                            }).replace(',', '').replace(/\./g, '-').replace(' ', ' ');

                        return msg.sender === 'user' ? (
                            <div key={index} className={styles.userMessageContainer}>
                                <div className={styles.timestamp}>{formattedTimestamp}</div>
                                <div className={styles.userMessage}>
                                    {msg.text}
                                </div>
                            </div>
                        ) : (
                            <div key={index} className={styles.supportMessageContainer}>
                                <div className={styles.supportMessage}>
                                    {msg.text}
                                    Привет
                                </div>
                                <div className={styles.timestamp}>{formattedTimestamp}</div>
                            </div>
                        );
                    })
                )}
                <div ref={chatEndRef} />
            </div>
            <div className={styles.chatInput}>
                <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Введите сообщение..."
                />
                {/* <button onClick={handleSend}>Отправить</button> */}
            </div>
        </div>
    );
};
export default ChatSupport;