import React, { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [time, setTime] = useState(0);
  const [running, setRunning] = useState(false);
  const [laps, setLaps] = useState([]);
  const [lapStartTime, setLapStartTime] = useState(0);

  const reset = () => {
    setTime(0);
    setRunning(false);
    setLaps([]);
  };

  const start = () => {
    setRunning(true);
    if (laps.length === 0) {
      // Record the start time of the first lap
      setLapStartTime(time);
    }
  };

  const stop = () => {
    setRunning(false);
  };

  const lap = () => {
    if (running) {
      // Calculate the lap time and add it to the list of laps
      const lapTime = time - lapStartTime;
      setLaps([...laps, lapTime]);
      // Update lap start time for the next lap
      setLapStartTime(time);
    }
  };

  useEffect(() => {
    let intervalId;

    if (running) {
      intervalId = setInterval(() => {
        setTime((prevTime) => prevTime + 10);
      }, 10);
    } else {
      clearInterval(intervalId);
    }

    return () => clearInterval(intervalId);
  }, [running]);

  const formatTime = (time) => {
    const milliseconds = time % 1000;
    const seconds = Math.floor((time / 1000) % 60);
    const minutes = Math.floor((time / (1000 * 60)) % 60);
    const hours = Math.floor(time / (1000 * 60 * 60));

    const formatNumber = (num) => (num < 10 ? `0${num}` : num);

    return (
      <>
        <span id="hrs">{formatNumber(hours)}</span>
        <span>:</span>
        <span id="min">{formatNumber(minutes)}</span>
        <span>:</span>
        <span id="sec">{formatNumber(seconds)}</span>
        <span>:</span>
        <span id="ms">
          {milliseconds < 10 ? "0" + milliseconds : milliseconds}
        </span>
      </>
    );
  };
  const formatLapTime = (time) => {
    const milliseconds = time % 1000;
    const seconds = Math.floor((time / 1000) % 60);
    const minutes = Math.floor((time / (1000 * 60)) % 60);
    const hours = Math.floor(time / (1000 * 60 * 60));

    const formatNumber = (num) => (num < 10 ? `0${num}` : num);

    return `${formatNumber(hours)}:${formatNumber(minutes)}:${formatNumber(
      seconds
    )}:${milliseconds < 10 ? "0" + milliseconds : milliseconds}`;
  };

  return (
    <>
      <div className="container">
        <div className="clock">{formatTime(time)}</div>
        <div className="buttons">
          <div className="left">
            <button onClick={reset}>Reset</button>
            <button onClick={stop}>Stop</button>
          </div>
          <div className="right">
            <button onClick={lap}>Lap</button>
            <button onClick={start}>Start</button>
          </div>
        </div>
        <div className="laps">
          <h3>Lap Times</h3>
          <ul>
            {laps.map((lapTime, index) => (
              <li key={index}>
                Lap {index + 1}: {formatLapTime(lapTime)}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
}

export default App;
