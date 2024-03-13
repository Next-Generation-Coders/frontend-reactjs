import React, { useState, useEffect } from "react";
import SoccerLineup from "react-soccer-lineup";
import { nanoid } from "nanoid";

// styling
import styles  from './styles.module.scss';

export const TeamLineupManager = () => {
  const [homeTeam, setHomeTeam] = useState({
    squad: {
      gk: null,
      df: [], // Initialize as an empty array
      cm: [],
      cdm: [],
      cam: [],
      fw: []
    }
  });

  const [players, setPlayers] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const team = await getTeamByCoach("65e1126386566290fd9dd1f3");
      if (team) {
        // Define the custom order of positions
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
      }
    }
    fetchData();
  }, []);

  


  /* useEffect(() => {
    async function fetchData() {
      const team = await getTeamByCoach("65e1126386566290fd9dd1f3");
      if (team) {
        setPlayers(team.playerNames);
      }
    }
    fetchData();
  }, []);
 */



  const getTeamByCoach = async (coachId) => {
    try {
      const response = await fetch(`http://localhost:3000/Team/getTeambyCoach/${coachId}`);
      const data = await response.json();
      console.log(data)
      return data;
    } catch (error) {
      console.error(error);
      return null;
    }
  };

  const saveLineup = async () => {
    try {
      if (!players || !players.playerNames) {
        console.error('Player names are undefined');
        return;
      }
  
      const response = await fetch('http://localhost:3000/Team/addLineup/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          playerNames: players.playerNames
        })
      });
      const data = await response.json();
      console.log(data); // Assuming the response contains the saved lineup data
      // Optionally, handle success response
    } catch (error) {
      console.error('Error saving lineup:', error);
      // Optionally, handle error
    }
  };
  
  
  
  
  

  const addPlayer = (selectedPlayer) => {
    if (!selectedPlayer || !selectedPlayer.position || !selectedPlayer.fullname) return;

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
    <div className={styles.container}>
      <div className={styles.pitchContainer}>
        <h2>Field</h2>
        <div className={styles.pitch}>
          <SoccerLineup homeTeam={homeTeam} />
        </div>
      </div>
      <div className={styles.playersContainer}>
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
      </div>
      <button onClick={saveLineup}>Save Lineup</button>
    </div>
  );
  
  
};

export default TeamLineupManager;
