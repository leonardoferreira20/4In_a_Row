import React, { useState, useEffect } from "react";
import "./Timer.css";

function Timer({ timeout, onTimer }) {
  const [seconds, setSeconds] = useState(timeout);
  const [idInterval, setIdInterval] = useState(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setSeconds((prevSeconds) => prevSeconds + 1);
    }, 1000);

    setIdInterval(interval);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    onTimer(seconds);
    if (seconds === 10) {
      clearInterval(idInterval);
    }
  }, [seconds, onTimer, idInterval]);
  return (
    <>
      <div className={seconds > 6 ? "timer-container timer-container-show" : "timer-container"}>
        <span className={seconds > 6 ? "timer-text" : ""}>{seconds}</span>
      </div>
    </>
  );
}

export default Timer;
