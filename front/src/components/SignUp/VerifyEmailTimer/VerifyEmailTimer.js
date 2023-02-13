import React, { useEffect } from 'react';
import { BoxTimer } from './style';

function VerfifyEmailTimer({ timeLeft, setTimeLeft }) {
  useEffect(() => {
    const intervalId = setInterval(() => {
      setTimeLeft(timeLeft - 1);
    }, 1000);
    return () => clearInterval(intervalId);
  }, [timeLeft]);

  const minutes =
    Math.floor(timeLeft / 60) > 0 ? Math.floor(timeLeft / 60).toString() : '00';
  let seconds = timeLeft % 60;
  if (seconds < 1) {
    seconds = 0;
  }
  if (seconds.toString().length < 2) {
    seconds = '0' + seconds.toString();
  }

  return (
    <BoxTimer>
      {minutes}:{seconds}
    </BoxTimer>
  );
}

export default VerfifyEmailTimer;
