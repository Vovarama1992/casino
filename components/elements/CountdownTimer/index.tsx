'use client';
import React, { useState, useEffect } from 'react';

const formatTime = (seconds: any) => {
  const hours = String(Math.floor(seconds / 3600)).padStart(2, '0');
  const minutes = String(Math.floor((seconds % 3600) / 60)).padStart(2, '0');
  const remainingSeconds = String(seconds % 60).padStart(2, '0');
  return `${hours}:${minutes}:${remainingSeconds}`;
};

export const CountdownTimer = ({ timeLeft }: { timeLeft: any }) => {
  const [time, setTime] = useState(timeLeft);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setTime((prevTime: any) => (prevTime > 0 ? prevTime - 1 : 0));
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    setTime(timeLeft);
  }, [timeLeft]);

  return <>{formatTime(time)}</>;
};

export default CountdownTimer;
