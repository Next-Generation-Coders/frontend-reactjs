import React, { useState, useEffect } from 'react';
import Spring from '@components/Spring';
import TeamScoreRow from '../Standings/Row';

const GroupStandingsDisplay = ({ StandingsId }) => {
  const [standings, setStandings] = useState([]);
  const [error, setError] = useState(null);
  const [teamData, setTeamData] = useState({});
  const [tournament, setTournament] = useState({});
  const[SID , setTID] = useState(StandingsId.StandingsId)

 
  useEffect(() => {
    const fetchStandings = async () => {
      try {
        if (StandingsId) {
          const response = await fetch(`http://localhost:3000/Standings/GetbyID/${StandingsId}`);
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
  }, [StandingsId]);

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

  

  return (
    <div>
      <h2>Standings</h2>
      <Spring className="card d-flex flex-column g-16 card-padded">
        <div className="d-flex flex-column">
          
          <p className="text-12">Standing of the group stage</p>
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

export default GroupStandingsDisplay;
