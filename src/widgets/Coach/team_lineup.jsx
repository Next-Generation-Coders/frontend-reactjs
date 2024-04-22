import React, { useState, useEffect } from "react";
import SoccerLineup from "react-soccer-lineup";
import { nanoid } from "nanoid";
import {useAuthContext} from "@hooks/useAuthContext";
import axios from 'axios';
// styling
import styles  from './styleee.module.scss';
import ProductRowCardList from '@widgets/ProductRowCardList copy';


export const TeamLineupManager = () => {
  const {USER} = useAuthContext() ;
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

  const [players, setPlayers] = useState([]);
  const [playerOntheFiled, setplayerOntheFiled] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const userResponse = await axios.get(`http://localhost:3000/User/getbyemail?email=${USER.email}`);
      const userId = userResponse.data._id;
      //console.log(userId+"-/-/-/-/-/-/-/-/")
      const team = await getTeamByCoach(userId);// *------------change this id userId 
      if (team) {
        const positionOrder = {
          "GK": 1,
          "CB": 2,
          "RB": 3,
          "LB": 4,
          "RWB": 5,
          "LWB": 6,
          "CM": 7,
          "CDM": 8,
          "CAM": 9,
          "RM": 10,
          "LM": 11,
          "ST": 12,
          "CF": 13,
          "RF": 14,
          "LF": 15,
          "RW": 16,
          "LW": 17
        };

        // Sort players based on the custom order of positions
        const sortedPlayers = team.playerNames.sort((a, b) => {
          return positionOrder[a.position] - positionOrder[b.position];
        });

        setPlayers(sortedPlayers);
        /* correct one if needed
          if (team) {
          setPlayers(team.playerNames);
        } */
      }
      
      getLineup(); // Fetch the lineup after the team data is fetched
    }
    fetchData();
  }, []);

  const getLineup = async () => {
    try {
      const userResponse = await axios.get(`http://localhost:3000/User/getbyemail?email=${USER.email}`);
      const userId = userResponse.data.currentTeam;
      const response = await fetch(`http://localhost:3000/Team/getLineup/${userId}`);
      const lineupData = await response.json();
  
      console.log("Lineup Data:", lineupData); // Log the entire lineup data object
  
      if (lineupData && lineupData.lineup && lineupData.lineup.playerNames) {
        const playerNames = lineupData.lineup.playerNames;
  
        // Initialize an empty squad object
        const updatedSquad = {
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
        playerNames.forEach(player => {
          const position = positionMap[player.position.toUpperCase()]; // Ensure the position is uppercase
          console.log(position, updatedSquad[position]); // Log the position and current value of updatedSquad[position]
          if (position && position in updatedSquad) { // Check if position exists in the squad
            const playerInfo = {
              name: player.fullname,
              number: player.jersyNumber,
              position: player.position
            };
            if (position === "gk") {
              console.log("goalkeeper info:", playerInfo);
              updatedSquad.gk = playerInfo;
            } else {
              // Ensure the position is initialized as an array
              if (!Array.isArray(updatedSquad[position])) {
                updatedSquad[position] = [];
              }
              updatedSquad[position].push(playerInfo);
            }
          } else {
            console.log(`Position ${player.position} doesn't exist in updatedSquad`);
            // Optionally handle this case based on your application logic
          }
        });
  
        // Update the homeTeam with the new squad
        setHomeTeam({ squad: updatedSquad });
      } else {
        console.log("Player names not found in lineup data");
      }
    } catch (error) {
      console.error('Error fetching lineup:', error);
    }
  };
  
  
  
  


  const getTeamByCoach = async (coachId) => {
    try {
      const response = await fetch(`http://localhost:3000/Team/getTeambyCoach/${coachId}`);
      const data = await response.json();
      //console.log(data)
      return data;
    } catch (error) {
      console.error(error);
      return null;
    }
  };

  const saveLineup = async (players) => {
    try {
      // Filter out the players who are currently on the field
      const playersOnField = players.filter(player =>
        Object.values(homeTeam.squad).flat().some(p => p && p.name === player.fullname)
      );
  
      setplayerOntheFiled(playersOnField);
      const playerIds = players.map(player => player.id);
  
        // Check if the team has a lineup saved
      const userResponse = await axios.get(`http://localhost:3000/User/getbyemail?email=${USER.email}`);
      const userId = userResponse.data.currentTeam;
      const response = await fetch(`http://localhost:3000/Team/getLineup/${userId}`);
      const existingLineup = await response.json();
      if(existingLineup.success==true){
        const updateResponse = await fetch(`http://localhost:3000/Team/updateLineup/${userId}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ 
            playerNames: playersOnField ,
            players :playerIds
          })
        });
        const updatedLineup = await updateResponse.json();
        console.log('Lineup updated:', updatedLineup);
      }
      else{
      const response = await fetch('http://localhost:3000/Team/addLineup/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          team : userId,
          playerNames: playersOnField ,
          players :playerIds
          //players : playerOntheFiled.id
        })
      });
      const data = await response.json();
      console.log('Lineup added :',data); 
    }
    } catch (error) {
      console.error('Error saving lineup:', error);
      // Optionally, handle error
    }
  };
  
  
  
  
  
  

  const addPlayer = (selectedPlayer) => {
    if (!selectedPlayer || !selectedPlayer.position || !selectedPlayer.fullname) return;
  
    // Check if the maximum number of players on the field (11) has been reached
    const playersOnFieldCount = Object.values(homeTeam.squad).flat().filter(p => p !== null).length;
    if (playersOnFieldCount >= 11) {
      alert('Maximum number of players on the field (11) reached.');
      return;
    }
  
    const player = {
      id: nanoid(),
      name: selectedPlayer.fullname,
      number: selectedPlayer.jersyNumber,
      position: selectedPlayer.position
    };
  
    const isInField = Object.values(homeTeam.squad).flat().some(p => p && p.name === selectedPlayer.fullname);
    
    if (isInField) {
      const confirmRemove = window.confirm(`${selectedPlayer.fullname} is already in the field. Do you want to remove them?`);
      if (confirmRemove) {
        const updatedSquad = { ...homeTeam.squad };
        Object.keys(updatedSquad).forEach(key => {
          if (Array.isArray(updatedSquad[key])) {
            updatedSquad[key] = updatedSquad[key].filter(p => p && p.name !== selectedPlayer.fullname);
          } else if (updatedSquad[key] && updatedSquad[key].name === selectedPlayer.fullname) {
            updatedSquad[key] = null;
          }
        });
        setHomeTeam({ squad: updatedSquad });
      }
    } else {
      setPlayers((prevPlayers) => prevPlayers.filter((p) => p.name !== selectedPlayer.fullname));
  
      setHomeTeam((prevHomeTeam) => {
        const updatedSquad = { ...prevHomeTeam.squad };
  
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
  
        const mappedPosition = positionMap[selectedPlayer.position];
        if (mappedPosition === "gk") {
          updatedSquad.gk = player;
        } else {
          updatedSquad[mappedPosition].push(player);
        }
  
        return {
          ...prevHomeTeam,
          squad: updatedSquad
        };
      });
    }
  };
  

  return (
    <>
    <div className={styles.container}>
      <div className={styles.pitchContainer}>
        <h2>Field</h2>
        <div className={styles.pitch}>
          <SoccerLineup homeTeam={homeTeam} 
          pattern="lines"
          />
        </div>
      </div>
      {/* <div className={styles.playersContainer}>
        <h2>Available Players</h2>
        <ul className={styles.playersList}>
          {players.map((player) => (
            <div key={player.id} className={styles.playerItem}>
              <li>
                {player.fullname} - {player.position}
              </li>
              <button
                className={`${styles.addButton} ${
                  Object.values(homeTeam.squad)
                    .flat()
                    .some((p) => p && p.name === player.fullname)
                    ? styles.removeButton
                    : ""
                }`}
                onClick={() => addPlayer(player)}
              >
                {Object.values(homeTeam.squad)
                  .flat()
                  .some((p) => p && p.name === player.fullname)
                  ? "Remove from Lineup"
                  : "Add to Lineup"}
              </button>
            </div>
          ))}
        </ul>
      </div> */}
    </div>
    <br />
    <ProductRowCardList isSlider players={players} addPlayer={addPlayer} homeTeam={homeTeam} />
    <br />
    <button onClick={() => saveLineup(players)}>Save Lineup</button>

    </>
  );
  
  
};

export default TeamLineupManager;
