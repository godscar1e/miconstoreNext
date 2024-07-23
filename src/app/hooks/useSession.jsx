"use client";
import { useEffect } from 'react';

export const useSession = (onSessionChange) => {
	useEffect(() => {
		const fetchSession = async () => {
			try {
				const response = await fetch("/api/auth/session");
				if (!response.ok) {
					throw new Error("Network response was not ok");
				}
				const sessionData = await response.json();

				if (sessionData?.user) {
					localStorage.setItem("session", JSON.stringify(sessionData));
					onSessionChange(sessionData);
					console.log(sessionData);
				} else {
					localStorage.removeItem("session");
					onSessionChange(null);
					console.log("нет сессии");
				}
			} catch (error) {
				console.error("Error fetching session:", error);
				localStorage.removeItem("session");
				onSessionChange(null);
			}
		};

		const intervalId = setInterval(fetchSession, 3000);
		fetchSession(); // Initial fetch
		return () => clearInterval(intervalId);
	}, [onSessionChange]);
};
