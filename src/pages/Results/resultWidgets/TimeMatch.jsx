import axios from 'axios';
import React, { useState, useRef, useEffect } from 'react';

const TimeMatch = ({matchID,matchStart, setMatchStart }) => {
  const [matchStarted, setMatchStarted] = useState(false);
  const [matchTime, setMatchTime] = useState({ minutes: 0, seconds: 0 });
  const [pauseTime, setPauseTime] = useState({ minutes: 0, seconds: 0 });
  const [elapsedTime, setElapsedTime] = useState(0);
  const [matchEnded, setMatchEnded] = useState(false);
  const [tournament , setTournament] = useState();
  const intervalRef = useRef();

  useEffect(() => {
    const fetchTournamentDetails = async () => {
        try {
            const response = await fetch(`http://localhost:3000/Tournament/getTournamentBymatch/${matchID}`);
            if (!response.ok) {
                throw new Error('Failed to fetch tournament details');
            }
            const tournamentData = await response.json();
            setTournament(tournamentData);
        } catch (error) {
            console.error('Error fetching tournament details:', error);
        }
    };

    fetchTournamentDetails();
}, [matchID]);

  const startMatch = async () => {
    setMatchStarted(true);
    setMatchStart(true);

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
      const response = await axios.post('http://localhost:3000/result/results', {
        matchId: matchID // Replace with actual match ID if available
      });
      console.log('Result state initiated:', response.data);
    } catch (error) {
      console.error('Error initiating result state:', error);
    }

  };

  const pauseMatch = () => {
    clearInterval(intervalRef.current);
    setMatchStart(false);

    setPauseTime({ minutes: Math.floor(elapsedTime / 60), seconds: elapsedTime % 60 });
  };

  const resumeMatch = () => {
    setMatchStart(true);

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

  const endMatch = async () => {
    setMatchStart(false);

    clearInterval(intervalRef.current);
    setMatchStarted(false);
    setMatchEnded(true);
    setMatchTime({ minutes: 0, seconds: 0 });
    setPauseTime({ minutes: 0, seconds: 0 });
    setElapsedTime(0);

    try {
      let endpoint;
      switch (tournament.TournamentType) {
          case 'League':
              endpoint = `http://localhost:3000/Standings/upadteStandings/${matchID}`;
              break;
          case 'Knockout':
              endpoint = `http://localhost:3000/Tournament/UpdateTournamentKnockout/${tournament._id}/${matchID}`;
              break;
          case 'Championship':
              
          if(tournament.GPended=== false){
          endpoint = `http://localhost:3000/Tournament/UpdateGroupStandingAfterMatch/${matchID}`;
          }
          else {
          endpoint  = `http://localhost:3000/Tournament/UpdateTournamentKnockout/${tournament._id}/${matchID}`;
          }break;
          default:
              throw new Error('Invalid tournament type');
      }
console.log(tournament.GPended)
      const response = await fetch(endpoint, {
          method: 'PUT',
          headers: {
              'Content-Type': 'application/json'
          }
      });

      if (!response.ok) {
          throw new Error('Failed to update standings');
      }

      console.log('Standings updated successfully:', response.data);
  } catch (error) {
      console.error('Error updating standings:', error);
  }
   

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
