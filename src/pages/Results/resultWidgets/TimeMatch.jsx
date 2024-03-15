import React, { useState } from 'react';

const TimeMatch = () => {
    const [matchStarted, setMatchStarted] = useState(false);
    const [matchTime, setMatchTime] = useState({ minutes: 0, seconds: 0 });
    const [pauseTime, setPauseTime] = useState({ minutes: 0, seconds: 0 });
    const [resumeTime, setResumeTime] = useState({ minutes: 0, seconds: 0 });

    const startMatch = () => {
      setMatchStarted(true);
  
      // Start the match timer
      const startTime = new Date();
      setInterval(() => {
        const currentTime = new Date();
        const elapsedTime = Math.floor((currentTime - startTime) / 1000); // in seconds
        const minutes = Math.floor(elapsedTime / 60);
        const seconds = elapsedTime % 60;
        setMatchTime({ minutes, seconds });
      }, 1000); // Update time every second
    };


    const resumeMatch = () => {
      setMatchStarted(true);
  
      // Start the match timer

      const startTime = Math.floor(Date.now() / 1000)

      setInterval(() => {


        const currentTime = pauseTime.seconds;
        console.log(currentTime)

        const elapsedTime = currentTime - matchTime.seconds; // in seconds
        const minutes = elapsedTime / 60;
        const seconds = elapsedTime % 60;
        setResumeTime({ minutes, seconds });

        console.log(resumeTime)
      }, 1000); // Update time every second
    };
    const pauseMatch= ()=>{

      setPauseTime(matchTime)

        console.log(matchTime)
    }

  
  

    return (
      <div>
        {!matchStarted ? (
          <button className='btn ' onClick={startMatch}>Start Match</button>
        ) : (
          <>
          <p>
            time {matchTime.minutes}:
            {matchTime.seconds < 10 ? `0${matchTime.seconds}` : matchTime.seconds}{' '}
        
          </p>

          <p>
           pause time {pauseTime.minutes}:
            {pauseTime.seconds < 10 ? `0${pauseTime.seconds}` : pauseTime.seconds}{' '}
        
          </p>



          <p>
           resume  time {resumeTime.minutes}:
            {resumeTime.seconds < 10 ? `0${resumeTime.seconds}` : resumeTime.seconds}{' '}
        
          </p>
          {/* <button className='btn' onClick={pauseMatch}>Pause</button>

          <button className='btn' onClick={resumeMatch}>Resume</button> */}

          </>
        )}
      </div>
    );
  };
  


export default TimeMatch;
