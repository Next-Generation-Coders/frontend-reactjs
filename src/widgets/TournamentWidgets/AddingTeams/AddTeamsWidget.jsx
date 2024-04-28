import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import {toast} from 'react-toastify';
import defaultLogo1 from "../../../assets/Def1.png";
import defaultLogo2 from "../../../assets/Def2.png";
import defaultLogo3 from "../../../assets/Def3.png";
import defaultLogo4 from "../../../assets/Def4.png";
import styles from './AddTeamsWidget.module.css';
import { useNavigate } from 'react-router-dom';

const AddTeamsWidget = ({ tournamentId }) => {
  const [teams, setTeams] = useState([]);
  const [selectedTeams, setSelectedTeams] = useState([]);
  const [tournament, setTournament] = useState(null);
  const tournamentIdString = String(tournamentId);
  const navigate= useNavigate();
  const getRandomDefaultLogo = () => {
    const defaultLogos = [defaultLogo1, defaultLogo2, defaultLogo3, defaultLogo4];
    const randomIndex = Math.floor(Math.random() * defaultLogos.length);
    return defaultLogos[randomIndex];
  };

  useEffect(() => {
    const fetchTournamentDetails = async () => {
        try {
            const response = await fetch(`http://localhost:3000/Tournament/getbyid/${tournamentIdString}`);
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
}, [tournamentId]);


  useEffect(() => {
    const fetchTeams = async () => {
      try {
        const response = await axios.get('http://localhost:3000/Team/getall');
        setTeams(response.data);
      } catch (error) {
        console.error('Error fetching teams:', error);
      }
    };
console.log(tournamentId)
    fetchTeams();
  }, []);


  const [matchestable, setMatches] = useState([]);

    /*useEffect(() => {
        const fetchMatches = async () => {
            try {
                const response = await fetch('http://localhost:3000/Tournament/fixtures/65eb22e0767105013a8eaa41');
                if (!response.ok) {
                    throw new Error('Failed to fetch matches');
                }
                const data = await response.json();
                console.log(data.fixtures)
                console.log(matchestable)
                setMatches(data.fixtures);
                console.log("after the set",matchestable)
            } catch (error) {
                console.error('Error fetching matches:', error);
            }
        };

        fetchMatches();
    }, []);*/


    const addTeamsToTournament = async (tournamentIdString) => {
      const expectedTeamIds = tournament.numberOfTeams

    const selectedTeamIds = selectedTeams.map(team => team._id);
    const number = selectedTeamIds.length;
      if (number != expectedTeamIds) {

        toast.error("Number of the teams selected is not valid");
        return;
      }

      try {

        const addTeamsResponse = await fetch(`http://localhost:3000/Tournament/addteams/${tournament._id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ teams: selectedTeams })
        });

        if (!addTeamsResponse.ok) {
          throw new Error('Failed to add teams to the tournament');
        }



        toast.success('Selected teams added to the tournament successfully.');
        if (tournament.TournamentType === 'League') {
          try {
            const [generateScheduleResponse, standingsResponse] = await Promise.all([
              fetch(`http://localhost:3000/Tournament/generateRoundRobinSchedule/${tournament._id}`),
              fetch(`http://localhost:3000/Standings/CreateStandings/${tournament._id}`)
            ]);

            if (!generateScheduleResponse.ok) {
              throw new Error('Failed to generate round robin schedule');
            }

            if (!standingsResponse.ok) {
              throw new Error('Failed to generate standings');
            }

          } catch (error) {
            console.error('Error during schedule or standings generation:', error);
          }
      } else if (tournament.TournamentType === 'Knockout') {
          const generateScheduleResponse = await fetch(`http://localhost:3000/Tournament/KnockoutTournamentBuild/${tournament._id}`);
          if (!generateScheduleResponse.ok) {
              throw new Error('Failed to generate Knockout rounds');
          }
          console.log('Knockout rounds generated successfully.');
      } else if (tournament.TournamentType === 'Championship') {
        const generateScheduleResponse = await fetch(`http://localhost:3000/Tournament/ChampionshipGroupsAndMatches/${tournament._id}`);
        if (!generateScheduleResponse.ok) {
            throw new Error('Failed to generate championship tournament');
        }
        console.log('championship tournament generated successfully.');
    }
      else {
          throw new Error('Invalid tournament type');
      }

      navigate('/TournamentCreated');
  } catch (error) {
      console.error('Error adding teams to tournament:', error);
  }
    };



  const onDragEnd = (result) => {
    if (!result.destination) return;

    const sourceIndex = result.source.index;
    const destinationIndex = result.destination.index;

    const sourceList = result.source.droppableId === 'teams' ? teams : selectedTeams;
    const destinationList = result.destination.droppableId === 'teams' ? teams : selectedTeams;

    const sourceItem = sourceList[sourceIndex];

    // If moving within the same list
    if (result.source.droppableId === result.destination.droppableId) {
      sourceList.splice(sourceIndex, 1);
      sourceList.splice(destinationIndex, 0, sourceItem);
      if (result.source.droppableId === 'teams') {
        setTeams([...sourceList]);
      } else {
        setSelectedTeams([...sourceList]);
      }
    } else {
      sourceList.splice(sourceIndex, 1);
      destinationList.splice(destinationIndex, 0, sourceItem);
      setTeams([...teams]);
      setSelectedTeams([...selectedTeams]);
    }
  };

  return (
      <>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 2.5fr 0.5fr" }} className="wrapper">
              <div style={{ paddingLeft:"10%" }}> <h2> <u>Available Teams</u></h2></div>
              <div style={{ paddingLeft:"50%" }}> <h2><u>Selected Teams</u></h2></div>
              <div>
                  <button onClick={addTeamsToTournament} className={styles.addButton}>Save Tournament</button>
              </div>
              <DragDropContext onDragEnd={onDragEnd}>
                  <div style={{
                      border: "2px dashed #948409",
                      width: "270px",
                      padding: "15px",
                      minHeight: "170px",
                      maxHeight: "690px",
                      borderRadius: "5px",
                      overflowY: "scroll",
                  }}>
                      <Droppable droppableId="teams">
                          {(provided) => (
                              <div className={styles.teamsList} {...provided.droppableProps} ref={provided.innerRef}>
                                  {teams.map((team, index) => (
                                      <Draggable key={team._id} draggableId={team._id} index={index}>
                                          {(provided) => (
                                              <div
                                                  ref={provided.innerRef}
                                                  {...provided.draggableProps}
                                                  {...provided.dragHandleProps}
                                                  className={styles.teamContainer}
                                              >
                                                  <img
                                                      src={team.logo || getRandomDefaultLogo()}
                                                      alt={team.name}
                                                      className={styles.teamLogo}
                                                  />
                                                  <span className={styles.teamName}>{team.name}</span> {/* Utilisation d'une balise span pour le nom de l'équipe */}
                                              </div>
                                          )}
                                      </Draggable>
                                  ))}
                                  {provided.placeholder}
                              </div>
                          )}
                      </Droppable>
                  </div>
                  <div style={{

                      padding: "15px",
                      Height: "100%",
                      overflowY: "scroll",
                  }}>
                      <Droppable droppableId="selected-teams">
                          {(provided) => (
                              <div
                                  className={styles.selectedTeamsContainer}
                                  {...provided.droppableProps}
                                  ref={provided.innerRef}
                              >
                                  {selectedTeams.map((team, index) => (
                                      <Draggable key={team._id} draggableId={team._id} index={index}>
                                          {(provided) => (
                                              <div
                                                  ref={provided.innerRef}
                                                  {...provided.draggableProps}
                                                  {...provided.dragHandleProps}
                                              >
                                                  <img
                                                      src={team.logo || getRandomDefaultLogo()}
                                                      alt={team.name}
                                                      className={styles.teamLogo}
                                                  />
                                                  {team.name}
                                              </div>
                                          )}
                                      </Draggable>
                                  ))}
                                  {provided.placeholder}
                              </div>
                          )}
                      </Droppable>
                  </div>
              </DragDropContext>
          </div>
      </>

  );
};

export default AddTeamsWidget;
