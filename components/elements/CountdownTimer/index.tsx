'use client';
import React from 'react';
import { useState, useEffect } from 'react';

export const CountdownTimer = ({ targetDate }: { targetDate: string }) => {
  const [timeLeft, setTimeLeft] = useState('00:00:00');

  useEffect(() => {
    const formatTime = (milliseconds: number) => {
      const totalSeconds = Math.floor(milliseconds / 1000);
      const hours = String(Math.floor(totalSeconds / 3600)).padStart(2, '0');
      const minutes = String(Math.floor((totalSeconds % 3600) / 60)).padStart(
        2,
        '0',
      );
      const seconds = String(totalSeconds % 60).padStart(2, '0');
      return `${hours}:${minutes}:${seconds}`;
    };

    const updateTimer = () => {
      const now = new Date(Date.now() + new Date().getTimezoneOffset() * 60000);
      const start = new Date(targetDate);
      const end = new Date(start.getTime() + 24 * 60 * 60 * 1000);
      const timeRemaining = +end - +now;

      if (timeRemaining <= 0) {
        setTimeLeft('00:00:00');
        clearInterval(intervalId);
      } else {
        setTimeLeft(formatTime(timeRemaining));
      }
    };

    updateTimer();
    const intervalId = setInterval(updateTimer, 1000);

    return () => clearInterval(intervalId);
  }, [targetDate]);

  return <>{timeLeft}</>;
};

export default CountdownTimer;
