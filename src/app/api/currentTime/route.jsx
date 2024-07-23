import { NextResponse } from "next/server";

export const GET = async (request) => {
    try {
        const currentTimeResponse = await axios.get('/api/currentTime');
        const currentTime = currentTimeResponse.data.currentTime;

        const timersFromServer = numerologyCourceInfo[0].packages.map(pkg => {
            const [hours, minutes, seconds] = pkg.countdownTimer.split(':').map(Number);
            const serverTimeInSeconds = new Date(currentTime).getTime() / 1000;
            const initialTime = serverTimeInSeconds - (hours * 3600 + minutes * 60 + seconds);
            return initialTime > 0 ? initialTime : 0;
        });

        setTimers(timersFromServer);
        setServerTime(currentTime);
    } catch (error) {
        console.error('Error fetching server time:', error);
    }
};

