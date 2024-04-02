import React, { useState, useEffect } from 'react';
import { Bracket } from 'react-brackets';

const RoundsDisplay = ({selectedTournamentId}) => {
    const [rounds, setRounds] = useState([]);
    const [roundsDb, setRoundsDB] = useState([]);
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
        const fetchFirstRoundMatches = async () => {
            try {
                const response = await fetch(`http://localhost:3000/Tournament/KnockoutTournament/${tournament._id}`);
                if (!response.ok) {
                    throw new Error('Failed to fetch first round matches');
                }
                const data = await response.json();
                setRoundsDB(data.rounds);
                
                
            } catch (error) {
                console.error('Error fetching first round matches:', error);
            }
        };

        if (tournament._id) {
            fetchFirstRoundMatches();
        }
    }, [tournament._id,selectedTournamentId]); 
    
    const fetchTeamDetails = async (teamId) => {
        try {
            const response = await fetch(`http://localhost:3000/Team/getbyid/${teamId}`);
            if (!response.ok) {
                throw new Error('Failed to fetch team details');
            }
            const teamData = await response.json();
            return teamData.name;
        } catch (error) {
            console.error('Error fetching team details:', error);
            return null;
       }
    };

    const fetchMatchDetails = async (MatchId) => {
        try {
            const response = await fetch(`http://localhost:3000/Match/getbyid/${MatchId}`);
            if (!response.ok) {
                throw new Error('Failed to fetch team details');
            }
            const MatchData = await response.json();
            return MatchData
        } catch (error) {
            console.error('Error fetching team details:', error);
            return null;
        }
    };

    useEffect(() => {
        const transformDataToRounds = async () => {
            if (roundsDb.length === 0) return; 
            if (!Array.isArray(roundsDb)) {
                console.error('roundsDb is not an array');
                return;
            }
    
            const transformedRoundsData = await Promise.all(roundsDb.map(async (round) => {
                const roundSeeds = await Promise.all(round.fixtures.map(async (fixture, index) => {
                    const Match = await fetchMatchDetails(fixture._id);
                    let homeTeamName = "Will be determnied soon";
                    let awayTeamName = "Will be determnied soon";
                    const awayTeamId = Match.team2;
                    const homeTeamId = Match.team1;
                    
                    
                    if (homeTeamId) {
                        homeTeamName = await fetchTeamDetails(homeTeamId);
                    }
                    if (awayTeamId) {
                        awayTeamName = await fetchTeamDetails(awayTeamId);
                    }
                    return {
                        id: index + 1,
                        teams: [
                            { name: homeTeamName || "Unknown Team"},
                            { name: awayTeamName || "Unknown Team" }
                        ]
                    };
                }));
                return {
                    title: round.title,
                    seeds: roundSeeds
                };
            }));
    
            setRounds(transformedRoundsData);
        };
    
        transformDataToRounds();
    }, [roundsDb]);
    
    
    return (
        <div>
            <Bracket rounds={rounds} />
        </div>
    );
};

export default RoundsDisplay;
