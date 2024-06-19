import React, { useState, useRef, useEffect } from 'react';
// import './Stopwatch.css';
 
const Stopwatch = () => {
  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [laps, setLaps] = useState([]);
  const timerRef = useRef(null);
 
  useEffect(() => {
    if (isRunning) {
      timerRef.current = setInterval(() => {
        setTime(prevTime => prevTime + 10);
      }, 10);
    } else {
      clearInterval(timerRef.current);
    }
 
    return () => clearInterval(timerRef.current);
  }, [isRunning]);
 
  const formatTime = (time) => {
    const getMilliseconds = `0${(time % 1000) / 10}`.slice(-2);
    const seconds = Math.floor(time / 1000);
    const getSeconds = `0${seconds % 60}`.slice(-2);
    const minutes = Math.floor(seconds / 60);
    const getMinutes = `0${minutes % 60}`.slice(-2);
    return `${getMinutes}:${getSeconds}:${getMilliseconds}`;
  };
 
  const handleStartStop = () => {
    setIsRunning(!isRunning);
  };
 
  const handleLap = () => {
    if (isRunning) {
      setLaps([...laps, time]);
    }
  };
 
  const handleReset = () => {
    setIsRunning(false);
    setTime(0);
    setLaps([]);
  };
 
  return (
    <div className="stopwatch-container text-center">
      <h1>Stopwatch</h1>
      <div className="stopwatch-time">{formatTime(time)}</div>
      <div className="stopwatch-buttons">
        <button onClick={handleStartStop} className="btn start-stop-btn">
          {isRunning ? 'Stop' : 'Start'}
        </button>
        <button onClick={handleLap} disabled={!isRunning} className="btn lap-btn">
          Lap
        </button>
        <button onClick={handleReset} className="btn reset-btn">
          Reset
        </button>
      </div>
      <ul className="laps-list">
        {laps.map((lap, index) => (
          <li key={index} className="lap-item">{`Lap ${index + 1}: ${formatTime(lap)}`}</li>
        ))}
      </ul>
    </div>
  );
};
 
export default Stopwatch;
 