
"use client";
import { useEffect, useRef } from "react";

export const setHasFetchedSession = (value) => {
    hasFetchedSession.current = value;
};

const SessionLogger = ({ onSessionChange }) => {
    const hasFetchedSession = useRef(false);

    useEffect(() => {
        const fetchSession = async () => {
            try {
                const response = await fetch("/api/auth/session");
                if (!response.ok) {
                    throw new Error("Network response was not ok");
                }
                const sessionData = await response.json();

                if (sessionData?.user) {
                    console.log("User is logged in:", sessionData.user);
                    onSessionChange(sessionData);
                } else {
                    console.log("User is not logged in.");
                    onSessionChange(null);
                }
            } catch (error) {
                console.error("Error fetching session:", error);
                onSessionChange(null);
            }
        };

        if (!hasFetchedSession.current) {
            fetchSession();
            hasFetchedSession.current = true;
        }

        const intervalId = setInterval(fetchSession, 1000);

        return () => clearInterval(intervalId);
    }, [onSessionChange]);

    return null; // Компонент не рендерит ничего в UI
};

export default SessionLogger;