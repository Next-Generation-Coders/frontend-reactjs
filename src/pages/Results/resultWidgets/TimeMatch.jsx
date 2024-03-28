import axios from 'axios';
import React, { useState, useRef } from 'react';

const TimeMatch = () => {
  const [matchStarted, setMatchStarted] = useState(false);
  const [matchTime, setMatchTime] = useState({ minutes: 0, seconds: 0 });
  const [pauseTime, setPauseTime] = useState({ minutes: 0, seconds: 0 });
  const [elapsedTime, setElapsedTime] = useState(0);
  const [matchEnded, setMatchEnded] = useState(false);
  const intervalRef = useRef();


  const startMatch = async () => {
    setMatchStarted(true);
    const startTime = Date.now() - elapsedTime;
    intervalRef.current = setInterval(() => {
      const currentTime = Date.now();
      const newElapsedTime = Math.floor((currentTime - startTime) / 1000);
      setElapsedTime(newElapsedTime);
      const minutes = Math.floor(newElapsedTime / 60);
      const seconds = newElapsedTime % 60;
      setMatchTime({ minutes, seconds });
    }, 1000);
    try {
      const response = await axios.post('http://localhost:3000/api/results', {
        matchId: '65fb89764297d5d1df8c8858' // Replace with actual match ID if available
      });
      console.log('Result state initiated:', response.data);
    } catch (error) {
      console.error('Error initiating result state:', error);
    }

  };

  const pauseMatch = () => {
    clearInterval(intervalRef.current);
    setPauseTime({ minutes: Math.floor(elapsedTime / 60), seconds: elapsedTime % 60 });
  };

  const resumeMatch = () => {
    const resumeStartTime = Date.now() - (pauseTime.minutes * 60 + pauseTime.seconds) * 1000;
    setElapsedTime(pauseTime.minutes * 60 + pauseTime.seconds);
    intervalRef.current = setInterval(() => {
      const currentTime = Date.now();
      const newElapsedTime = Math.floor((currentTime - resumeStartTime) / 1000);
      setElapsedTime(newElapsedTime);
      const minutes = Math.floor(newElapsedTime / 60);
      const seconds = newElapsedTime % 60;
      setMatchTime({ minutes, seconds });
    }, 1000);
  };

  const endMatch = () => {
    clearInterval(intervalRef.current);
    setMatchStarted(false);
    setMatchEnded(true);
    setMatchTime({ minutes: 0, seconds: 0 });
    setPauseTime({ minutes: 0, seconds: 0 });
    setElapsedTime(0);
  };

  return (
    <div>
      {!matchStarted && !matchEnded ? (
        <button className='btn' onClick={startMatch}>Start Match</button>
      ) : null}

      {matchStarted && !matchEnded ? (
        <>
          <p>
            Time {matchTime.minutes}:
            {matchTime.seconds < 10 ? `0${matchTime.seconds}` : matchTime.seconds}
          </p>

          <button className='btn' onClick={pauseMatch}>Pause</button>
          <button className='btn' onClick={resumeMatch}>Resume</button>
          <button className='btn' onClick={endMatch}>End Match</button>
        </>
      ) : null}

      {matchEnded ? (
        <p>Match ended</p>
      ) : null}
    </div>
  );
};

export default TimeMatch;
