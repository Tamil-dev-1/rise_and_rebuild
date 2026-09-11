import { useState, useEffect } from "react";

const DAY = 86400000;
const HOUR = 3600000;
const MINUTE = 60000;

/**
 * Ticks every second and returns {days, hours, minutes, seconds} until
 * targetDate. Clamps at zero once the target has passed.
 */
export function useCountdown(targetDate) {
  const [remaining, setRemaining] = useState(() => getTimeLeft(targetDate));

  useEffect(() => {
    const id = setInterval(() => {
      setRemaining(getTimeLeft(targetDate));
    }, 1000);

    return () => clearInterval(id);
  }, [targetDate]);

  return remaining;
}

function getTimeLeft(targetDate) {
  const diff = Math.max(0, new Date(targetDate).getTime() - Date.now());

  return {
    days: Math.floor(diff / DAY),
    hours: Math.floor((diff % DAY) / HOUR),
    minutes: Math.floor((diff % HOUR) / MINUTE),
    seconds: Math.floor((diff % MINUTE) / 1000),
  };
}
