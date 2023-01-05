import { useState, useEffect } from "react";
import { useTimeQuery } from "../util/useTime";

const useFetch = ({ data }) => {
    const [days, setDays] = useState(0);
    const [hours, setHours] = useState(0);
    const [minutes, setMinutes] = useState(0);
    const [seconds, setSeconds] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            const currentDate = new Date();
            const timeLeft = new Date(data?.time.date) - currentDate;
            setDays(Math.floor(timeLeft / (1000 * 60 * 60 * 24)));
            setHours(Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)));
            setMinutes(Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60)));
            setSeconds(Math.floor((timeLeft % (1000 * 60)) / 1000));
        }, 1000);

        return () => clearInterval(interval);
    }, [data]);
    return { timerDays: days, timerHours: hours, timerMinutes: minutes, timerSeconds: seconds };
};

export default useFetch;