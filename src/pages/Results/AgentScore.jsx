// Install required packages: react, socket.io-client
// Create React components and set up WebSocket connection

import TeamScoreRow from '@components/TeamScoreRow';
import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';

const socket = io('http://localhost:3001', { transports : ['websocket'] });

const AgentScore = () => {
  const [team1Score, setTeam1Score] = useState(0);
  const [team2Score, setTeam2Score] = useState(0);
  const [team1Red, setTeam1Red] = useState(0);
  const [team2Red, setTeam2Red] = useState(0);
  const [team1Yellow, setTeam1Yellow] = useState(0);
  const [team2Yellow, setTeam2Yellow] = useState(0);
  const [team1Corners, setTeam1Corners] = useState(0);
  const [team2Corners, setTeam2Corners] = useState(0);



  useEffect(() => {
    // Listen for WebSocket events and update state
    // socket.on('scoreUpdate', ({team2Score,team1Score}) => {
    //   setTeam1Score(team1Score);
    //   setTeam2Score(team2Score);
    // });

    // Cleanup function
    return () => {
      socket.disconnect();
    };
  }, []);

  const handleGoalUpdate = (team) => {
   if (team === team1Score) {
      setTeam1Score(team1Score+1)

    } else if (team === team2Score) {
      setTeam2Score(team2Score+1)

    }

    // Emit a WebSocket event to update scores in the backend
    socket.emit('updateScore', { team });
  };
  const handleRedUpdate = (team) => {
    if (team === team1Red) {
       setTeam1Red(team1Red+1)
 
     } else if (team === team2Red) {
       setTeam2Red(team2Red+1)
 
     }
 
     // Emit a WebSocket event to update scores in the backend
     socket.emit('updateRed', { team });
   };
   const handleYellowUpdate = (team) => {
    if (team === team1Yellow) {
       setTeam1Yellow(team1Yellow+1)
 
     } else if (team === team2Yellow) {
       setTeam2Yellow(team2Yellow+1)
 
     }
 
     // Emit a WebSocket event to update scores in the backend
     socket.emit('updateYellow', { team });
   };
   const handleCornersUpdate = (team) => {
    if (team === team1Corners) {
       setTeam1Corners(team1Corners+1)
 
     } else if (team === team2Corners) {
       setTeam2Corners(team2Corners+1)
 
     }
 
     // Emit a WebSocket event to update scores in the backend
     socket.emit('updateCorners', { team });
   };

  return (
    <div style={{ display: 'flex', justifyContent: 'space-around', alignItems: 'center', height: '100vh' }}>
    <div style={{ textAlign: 'center', flex: 1 }}>
      <h2>Team 1</h2>
      {/* <img src="./barcelona.webp" alt="Team 1 Logo" style={{ width: '200px', height: '200px' }} /> */}
      <p>Score: {team1Score}</p>
      <button onClick={() => handleGoalUpdate(team1Score)}>Goal</button>
      <p>Corners: {team1Corners}</p>
      <button onClick={() => handleCornersUpdate(team1Corners)}>Corner</button>
      <p>Red Cards: {team1Red}</p>
      <button onClick={() => handleRedUpdate(team1Red)}>Red</button>
      <p>Yellow Cards: {team1Yellow}</p>
      <button onClick={() => handleYellowUpdate(team1Yellow)}>Yellow</button>
    </div>
    <div style={{ textAlign: 'center', flex: 1 }}>
      <h2>Team 2</h2>
      <p>Score: {team2Score}</p>
      <button onClick={() => handleGoalUpdate(team2Score)}>Goal</button>
      <p>Corners: {team2Corners}</p>
      <button onClick={() => handleCornersUpdate(team2Corners)}>Corner</button>
      <p>Red Cards: {team2Red}</p>
      <button onClick={() => handleRedUpdate(team2Red)}>Red </button>
      <p>Yellow Cards: {team2Yellow}</p>
      <button onClick={() => handleYellowUpdate(team2Yellow)}>Yellow</button>
    </div>
  </div>
  );
};

export default AgentScore;
