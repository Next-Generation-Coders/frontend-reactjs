import React, { useState,useEffect } from 'react';
import styles from './styles.module.scss';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

const Lineup = () => {
  const [listPlayers, setListPlayers] = useState([]);
  const [lineup, setLineup] = useState(Array(11).fill(null)); // Assuming a lineup with 11 spots

  useEffect(() => {
    const fetchPlayers = async () => {
      try {
        const response = await fetch("http://localhost:3000/User/getallPlayers", {
          method: "GET",
        });
        if (!response.ok) {
          throw new Error('Failed to fetch players');
        }
        const data = await response.json();
        setListPlayers(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchPlayers();
  }, []);

  const onDragEnd = (result) => {
    if (!result.destination) return;
  
    const sourceId = result.source.droppableId;
    const destinationId = result.destination.droppableId;
    const draggedPlayer = listPlayers[result.source.index];
  
    if (sourceId === 'players' && destinationId === 'lineup') {
      // Remove player from the list and add to the lineup
      const updatedPlayers = [...listPlayers];
      updatedPlayers.splice(result.source.index, 1);
      setListPlayers(updatedPlayers);
      updateLineup(result.destination.index, draggedPlayer);
    } else if (sourceId === 'lineup' && destinationId === 'players') {
      // Remove player from the lineup and add back to the list
      const updatedLineup = [...lineup];
      updatedLineup.splice(result.destination.index, 1, null);
      setLineup(updatedLineup);
      setListPlayers([...listPlayers, draggedPlayer]); // Pass the full player details
    }
  };
  

  const updateLineup = (index, player) => {
    const updatedLineup = [...lineup];
    updatedLineup[index] = player.fullname; // Use fullname property
    setLineup(updatedLineup);
  };

  console.log(listPlayers)
  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="lineup">
        <h2>Available Players</h2>
        <Droppable droppableId="players">
          {(provided) => (
            <ul className="players" {...provided.droppableProps} ref={provided.innerRef}>
            {listPlayers.length > 0 && listPlayers.map((player, index) => (
              player && player._id &&
              <Draggable key={index} draggableId={player._id} index={index}>
                {(provided) => (
                  <li
                    className="player"
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                  >
                    {player.fullname}
                  </li>
                )}
              </Draggable>
            ))}

              {provided.placeholder}
            </ul>
          )}
        </Droppable>
        <h2>Lineup</h2>
        <Droppable droppableId="lineup">
          {(provided) => (
            <ul className="lineup" {...provided.droppableProps} ref={provided.innerRef}>
              {lineup.map((player, index) => (
                <Draggable key={player ? player : `spot-${index}`} draggableId={player ? player : `spot-${index}`} index={index}>
                  {(provided) => (
                    <li
                      className="spot"
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                    >
                      {player ? player : '-'}
                    </li>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </ul>
          )}
        </Droppable>
      </div>
    </DragDropContext>
  );
};

export default Lineup;

