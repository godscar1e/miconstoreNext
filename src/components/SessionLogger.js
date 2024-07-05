// components/SessionLogger.js
import { useEffect, useState } from "react";

const SessionLogger = ({ onSessionChange }) => {
    useEffect(() => {
        const fetchSession = async () => {
            try {
                const response = await fetch("/api/auth/session");
                const sessionData = await response.json();

                if (sessionData?.user) {
                    console.log("User is logged in:", sessionData.user);
                    onSessionChange(sessionData); // Передаем данные о сессии в родительский компонент
                } else {
                    console.log("User is not logged in.");
                    onSessionChange(null); // Устанавливаем null, если пользователь не авторизован
                }
            } catch (error) {
                console.error("Error fetching session:", error);
                onSessionChange(null); // Обработка ошибок
            }
        };

        fetchSession(); // Вызываем функцию при монтировании
    }, [onSessionChange]);

    return null; // Компонент не рендерит ничего в UI
};

export default SessionLogger;
