import React, { useState, useEffect, useRef } from 'react';
import './App.css';
import arrowUp from './images/arrow-up.png';
import arrowDown from './images/arrow-down.png';
import pomodoroIcon from './images/pomodora.png';

function App() {
  const [sessionLength, setSessionLength] = useState(25);
  const [breakLength, setBreakLength] = useState(5);
  const [timer, setTimer] = useState(sessionLength * 60);
  const [isRunning, setIsRunning] = useState(false);
  const [onBreak, setOnBreak] = useState(false);
  const intervalRef = useRef(null);

  useEffect(() => {
    setTimer(sessionLength * 60);
  }, [sessionLength]);

  useEffect(() => {
    if (isRunning) {
      intervalRef.current = setInterval(() => {
        setTimer((prevTimer) => {
          if (prevTimer === 0) {
            if (onBreak) {
              setOnBreak(false);
              return sessionLength * 60;
            } else {
              setOnBreak(true);
              return breakLength * 60;
            }
          }
          return prevTimer - 1;
        });
      }, 1000);
    } else {
      clearInterval(intervalRef.current);
    }
    return () => clearInterval(intervalRef.current);
  }, [isRunning, onBreak, breakLength, sessionLength]);

  const handleIncreaseBreakLength = () => {
    if (breakLength < 60) {
      setBreakLength(breakLength + 1);
    }
  };

  const handleDecreaseBreakLength = () => {
    if (breakLength > 1) {
      setBreakLength(breakLength - 1);
    }
  };

  const handleIncreaseSessionLength = () => {
    if (sessionLength < 60) {
      setSessionLength(sessionLength + 1);
    }
  };

  const handleDecreaseSessionLength = () => {
    if (sessionLength > 1) {
      setSessionLength(sessionLength - 1);
    }
  };

  const handlePlayPauseButton = () => {
    setIsRunning((prevIsRunning) => !prevIsRunning);
  };

  function Timer({ timer }) {
    const formatTime = (timer) => {
      let minutes = String(Math.floor(timer / 60)).padStart(2, '0');
      let seconds = String(timer % 60).padStart(2, '0');
      return `${minutes}:${seconds}`;
    };
    return <div id="time-left">{formatTime(timer)}</div>;
  }

  return (
    <div className="container border">
      <h2 className="title">
        <span className="title1">Pomodoro</span> <span className="title2">Timer</span>
      </h2>

      <div className="controles">
        <div className="sessionLength" id='session-label'>
          <button onClick={handleIncreaseSessionLength} id='session-increment'>
            <span className='time'><img className="arrow" src={arrowUp} alt="arrow up" /></span>
          </button>
          <span className='time'><span id='session-length'>{sessionLength}</span>min</span>
          <button onClick={handleDecreaseSessionLength} id='session-decrement'>
            <span className='time'><img className="arrow" src={arrowDown} alt="arrow down" /></span>
          </button>
        </div>
        <div className="breakLength" id='break-label'>
          <button onClick={handleIncreaseBreakLength} id='break-increment'>
            <span className='time'>
              <img className="arrow" src={arrowUp} alt="arrow up" />
            </span>
          </button>
          <span className='time'><span id='break-length'>{breakLength}</span>min</span>
          <button onClick={handleDecreaseBreakLength} id='break-decrement'>
            <span className='time'>
              <img className="arrow" src={arrowDown} alt="arrow down" />
            </span>
          </button>
        </div>
      </div>

      <div className="pomodoraIcon border">
        <div className="timer">
          <p>{onBreak ? "Break" : "Session"}</p>
          <h1 id='timer-label'><Timer timer={timer} /></h1>
        </div>
        <img src={pomodoroIcon} alt="pomodoro" />
      </div>

      <div className="pauseContainer" onClick={handlePlayPauseButton}>
        <label>
          <input className="play-btn" type="checkbox" checked={isRunning} onChange={handlePlayPauseButton} />
          <div className="play-icon"></div>
          <div className="pause-icon"></div>
        </label>
      </div>
    </div>
  );
}

export default App;
