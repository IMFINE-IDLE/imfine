import React, { useState, useEffect } from 'react';

function CountdownTimer() {
  const [timeLeft, setTimeLeft] = useState(180);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setTimeLeft(timeLeft - 1);
    }, 1000);
    return () => clearInterval(intervalId);
  }, [timeLeft]);

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  return (
    <div>
      Time remaining: {minutes}:{seconds}
    </div>
  );
}

export default CountdownTimer;
