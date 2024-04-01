import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

const AddTeamsWidget = () => {
  const [teams, setTeams] = useState([]);
  const [selectedTeams, setSelectedTeams] = useState([]);

  useEffect(() => {
    const fetchTeams = async () => {
      try {
        const response = await axios.get(process.env.REACT_APP_BASE_URL+'/Team/getall');
        setTeams(response.data);
      } catch (error) {
        console.error('Error fetching teams:', error);
      }
    };

    fetchTeams();
  }, []);


  const addTeamsToTournament = async () => {
    try {
      
      await axios.put(process.env.REACT_APP_BASE_URL+'/Tournament/addteams/65e606111c6ca2f4141c4714', { teams: selectedTeams });
      console.log('Selected teams added to the tournament successfully.');
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
    <div>
      <h2>Available Teams</h2>
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="teams">
          {(provided) => (
            <ul className="teams" {...provided.droppableProps} ref={provided.innerRef}>
              {teams.map((team, index) => (
                <Draggable key={team._id} draggableId={team._id} index={index}>
                  {(provided) => (
                    <li
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                    >
                      {team.name}
                    </li>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </ul>
          )}
        </Droppable>

        <h2>Selected Teams</h2>
        <Droppable droppableId="selected-teams">
          {(provided) => (
            <ul className="selected-teams" {...provided.droppableProps} ref={provided.innerRef}>
              {selectedTeams.map((team, index) => (
                <Draggable key={team._id} draggableId={team._id} index={index}>
                  {(provided) => (
                    <li
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                    >
                      {team.name}
                    </li>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </ul>
          )}
        </Droppable>
      </DragDropContext>

      <button onClick={addTeamsToTournament}>
        Add Teams to Tournament
      </button>
    </div>
  );
};

export default AddTeamsWidget;
