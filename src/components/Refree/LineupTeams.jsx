import React, { useState, useEffect } from "react";
import axios from "axios";
import SoccerLineup from "react-soccer-lineup";

export const LineupTeams = ({ id }) => {
  const [teamsData, setTeamsData] = useState([]);

  const [homeTeam, setHomeTeam] = useState({
    squad: {
        gk: null,
        df: [], 
        cm: [],
        cdm: [],
        cam: [],
        fw: []
        }
    });
    const [awayTeam, setAwayTeam] = useState({
        squad: {
            gk: null,
            df: [], 
            cm: [],
            cdm: [],
            cam: [],
            fw: []
            }
        });

  useEffect(() => {
    const fetchTeamsData = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/Team/getTeamsByMatch/${id}`);
        const data = response.data;
        const teamID1 = data.team1Lineup.team;
        const teamID2 = data.team2Lineup.team;

        const team1Response = await axios.get(`http://localhost:3000/Team/getbyid/${teamID1}`);
        const team1Data = team1Response.data;
        const team1 = {
          id: data.team1Lineup._id,
          name: team1Data.name,
          lineup: data.team1Lineup.playerNames
        };

        const team2Response = await axios.get(`http://localhost:3000/Team/getbyid/${teamID2}`);
        const team2Data = team2Response.data;
        const team2 = {
          id: data.team2Lineup._id,
          name: team2Data.name,
          lineup: data.team2Lineup.playerNames
        };

        setTeamsData([team1, team2]);


        if (data && data.team2Lineup && data.team1Lineup && data.team2Lineup.playerNames && data.team1Lineup.playerNames) {
            const playerNames1 = data.team1Lineup.playerNames;
            const playerNames2 = data.team2Lineup.playerNames;
      
            // Initialize an empty squad object
            const updatedSquadTeam1 = {
              gk: null,
              df: [],
              cm: [],
              cdm: [],
              cam: [],
              fw: []
            };
            const updatedSquadTeam2 = {
                gk: null,
                df: [],
                cm: [],
                cdm: [],
                cam: [],
                fw: []
              };
            const positionMap = {
              GK: "gk",
              CB: "df",
              RB: "df",
              LB: "df",
              RWB: "df",
              LWB: "df",
              CM: "cm",
              CDM: "cdm",
              CAM: "cam",
              RM: "cm",
              LM: "cm",
              ST: "fw",
              CF: "fw",
              RF: "fw",
              LF: "fw",
              RW: "fw",
              LW: "fw"
            };
      
            // Map each player to their respective position in the squad
            playerNames1.forEach(player => {
              const position = positionMap[player.position.toUpperCase()]; // Ensure the position is uppercase
              console.log(position, updatedSquadTeam1[position]); // Log the position and current value of updatedSquadTeam1[position]
              if (position && position in updatedSquadTeam1) { // Check if position exists in the squad
                const playerInfo = {
                  name: player.fullname,
                  number: player.jersyNumber,
                  position: player.position
                };
                if (position === "gk") {
                  console.log("goalkeeper info:", playerInfo);
                  updatedSquadTeam1.gk = playerInfo;
                } else {
                  // Ensure the position is initialized as an array
                  if (!Array.isArray(updatedSquadTeam1[position])) {
                    updatedSquadTeam1[position] = [];
                  }
                  updatedSquadTeam1[position].push(playerInfo);
                }
              } else {
                console.log(`Position ${player.position} doesn't exist in updatedSquadTeam1`);
                // Optionally handle this case based on your application logic
              }
            });
            playerNames2.forEach(player => {
                const position = positionMap[player.position.toUpperCase()]; // Ensure the position is uppercase
                console.log(position, updatedSquadTeam2[position]); // Log the position and current value of updatedSquadTeam2[position]
                if (position && position in updatedSquadTeam2) { // Check if position exists in the squad
                  const playerInfo = {
                    name: player.fullname,
                    number: player.jersyNumber,
                    position: player.position
                  };
                  if (position === "gk") {
                    console.log("goalkeeper info:", playerInfo);
                    updatedSquadTeam2.gk = playerInfo;
                  } else {
                    // Ensure the position is initialized as an array
                    if (!Array.isArray(updatedSquadTeam2[position])) {
                      updatedSquadTeam2[position] = [];
                    }
                    updatedSquadTeam2[position].push(playerInfo);
                  }
                } else {
                  console.log(`Position ${player.position} doesn't exist in updatedSquadTeam2`);
                  // Optionally handle this case based on your application logic
                }
              });
      
            // Update the homeTeam with the new squad
            setHomeTeam({ squad: updatedSquadTeam1 });
            setAwayTeam({ squad: updatedSquadTeam2 });


            if(data && data.team1Lineup && data.team2Lineup){
            const responseTeam1 = await fetch('http://localhost:3000/Team/addLineup/', {
                method: 'POST',
                headers: {
                'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                team : data.team1Lineup?.team,
                playerNames: data.team1Lineup.playerNames ,
                players :data.team1Lineup.players,
                matche: id
                //players : playerOntheFiled.id
                })
            });
            const dataTeam1 = await responseTeam1.json();
            console.log('Lineup added Team 1:',dataTeam1); 


            const responseTeam2 = await fetch('http://localhost:3000/Team/addLineup/', {
                method: 'POST',
                headers: {
                'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                team : data.team2Lineup?.team,
                playerNames: data.team2Lineup.playerNames ,
                players :data.team2Lineup.players,
                matche: id
                //players : playerOntheFiled.id
                })
            });
            const dataTeam2 = await responseTeam2.json();
            console.log('Lineup added Team 1:',dataTeam2); 

            }


          } else {
            console.log("Player names not found in lineup data");
          }
      } catch (error) {
        console.error('Error fetching teams data:', error);
      }
    };

    fetchTeamsData();
  }, []);

  return (
    <>
        <SoccerLineup
          homeTeam={homeTeam}
          awayTeam={awayTeam}
          pattern="lines"
        />
    </>
  );
};

export default LineupTeams;