import React, { useState, useEffect } from 'react';
import Spring from '@components/Spring';
import TeamScoreRow from './Row';

const StandingsDisplay = ({ selectedTournamentId }) => {
  const [standings, setStandings] = useState([]);
  const [error, setError] = useState(null);
  const [teamData, setTeamData] = useState({});
  const [tournament, setTournament] = useState({});
 

  useEffect(() => {
    const fetchTournamentDetails = async () => {
      try {
        if (selectedTournamentId) {
          const response = await fetch(`http://localhost:3000/Tournament/getbyid/${selectedTournamentId}`);
          if (!response.ok) {
            throw new Error('Failed to fetch tournament details');
          }
          const tournamentData = await response.json();
          setTournament(tournamentData);
        }
      } catch (error) {
        console.error('Error fetching tournament details:', error);
      }
    };

    fetchTournamentDetails();
  }, [selectedTournamentId]);

  useEffect(() => {
    const fetchStandings = async () => {
      try {
        if (tournament._id) {
          const response = await fetch(`http://localhost:3000/Standings/GetByTournament/${tournament._id}`);
          if (!response.ok) {
            throw new Error('Failed to fetch standings data');
          }
          const data = await response.json();
          const sortedStandings = data.standings.sort((a, b) => b.points - a.points);
          setStandings(sortedStandings);
          

          const teamIds = data.standings.map(standing => standing.team);
          const teamPromises = teamIds.map(fetchTeamData);
          const teamResults = await Promise.all(teamPromises);

          const teamDataObject = {};
          teamIds.forEach((teamId, index) => {
            teamDataObject[teamId] = teamResults[index];
          });
          setTeamData(teamDataObject);
        }
      } catch (error) {
        console.error('Error fetching standings:', error);
        setError('Failed to fetch standings data');
      }
    };

    fetchStandings();
  }, [selectedTournamentId, tournament._id]);

  // Function to fetch team data
  const fetchTeamData = async (teamId) => {
    try {
      const response = await fetch(`http://localhost:3000/Team/getbyid/${teamId}`);
      if (!response.ok) {
        throw new Error('Failed to fetch team data');
      }
      return await response.json();
    } catch (error) {
      console.error('Error fetching team data:', error);
      return null;
    }
  };

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!selectedTournamentId) {
    return null;
  }

  return (
    <div>
      <h2>Standings</h2>
      <Spring className="card d-flex flex-column g-16 card-padded">
        <div className="d-flex flex-column">
          <h3>{tournament.title}</h3>
          <p className="text-12">Standing after group stage</p>
        </div>
        <div className="d-flex flex-column g-2">
          {standings.map((item, index) => (
            <TeamScoreRow key={index} data={item} index={index} />
          ))}
        </div>
      </Spring>
    </div>
  );
};

export default StandingsDisplay;
