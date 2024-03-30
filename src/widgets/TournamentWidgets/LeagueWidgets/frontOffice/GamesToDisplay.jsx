import React, { useState, useEffect } from 'react';
import { FaMapMarkerAlt, FaClock, FaUser } from 'react-icons/fa'; // Import icons
import './game.css'

const GamesToDisplay = ({ match, selectedDay }) => {
    const [team1Name, setTeam1Name] = useState(null);
    const [team2Name, setTeam2Name] = useState(null);
  
    useEffect(() => {
      const fetchTeamDetails = async () => {
        try {
          
          const team1Response = await fetch(`http://localhost:3000/Team/getbyid/${match.team1}`);
          if (!team1Response.ok) {
            throw new Error('Failed to fetch team details');
          }
          const team1Data = await team1Response.json();
          setTeam1Name(team1Data.name);
          const team2Response = await fetch(`http://localhost:3000/Team/getbyid/${match.team2}`);
          if (!team2Response.ok) {
            throw new Error('Failed to fetch team details');
          }
          const team2Data = await team2Response.json();
          setTeam2Name(team2Data.name);
        } catch (error) {
          console.error('Error fetching team details:', error);
        }
      };
  
      fetchTeamDetails();
    }, [match]);
  
    if (!team1Name || !team2Name) {
      return <div>Loading...</div>;
    }
  
    // Check if the match occurs on the selected day
    if (match.startDay !== selectedDay) {
      return null; 
    }
  
    return (
      <div className="game-card">
        <h3>Match Details</h3>
        <p>Match ID: {match._id}</p>
        <p>{team1Name} <span className="vs">VS</span> {team2Name}</p>
        <div className="game-details">
          <FaMapMarkerAlt className="icon" />
          <p>Stadium: {match.stadium}</p>
        </div>
        <div className="game-details">
          <FaUser className="icon" />
          <p>Referee: {match.referee}</p>
        </div>
        <div className="game-details">
          <FaClock className="icon" />
          <p>Start Time: {match.startHour}:{match.startMinutes}</p>
          <p>Start day: {match.startDay}</p>
        </div>
      </div>
    );
  };
  
  export default GamesToDisplay;
  