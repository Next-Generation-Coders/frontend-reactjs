import React, { useEffect, useState } from 'react';
import { Button } from '@mui/material';
import loadable from '@loadable/component';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import PropTypes from 'prop-types';
import {toast} from "react-toastify";
const Popup = ({
                   open,
                   onClose,
                   fetchReferees,
                   fetchStadiums,
                   referees,
                   selectedStadiums,
                   stadiums,
                   setSelectedRefs,
                   selectedRefs,
                   setSelectedStadiums,
                   tournamentId,

               }) => {
    useEffect(() => {
        fetchReferees();
        fetchStadiums();
    }, []);
    const fetchRefsAndStadiums = async (tournamentId, selectedRefs, selectedStadiums) => {
        try {
            console.log(selectedRefs);
            const response = await fetch(`http://localhost:3000/Tournament/addRefereesAndStadiumsToTournament/${tournamentId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ referees: selectedRefs, stadiums: selectedStadiums }),
            });

            if (!response.ok) {
                throw new Error('Failed to add referees and stadiums to the tournament');
            }

            const data = await response.json();
            return data;
        } catch (error) {
            throw error;
        }
    };


    const handleDataCollection = async () => {
        try {
            console.log(tournamentId);
            const data = await fetchRefsAndStadiums(tournamentId, selectedRefs, selectedStadiums);
            toast.success("Referees and stadiums added to the tournament successfully")
        } catch (error) {
            toast.error("Failed to add referees and stadiums to the tournament")
        }

    };


    const handleRefereeSelection = (refereeId) => {
        setSelectedRefs((prevRefs) => {
            if (!prevRefs.includes(refereeId)) {
                return [...prevRefs, refereeId];
            } else {
                return prevRefs;
            }
        });
    };

    useEffect(() => {
        if (!open) {
            setSelectedRefs([]);
            setSelectedStadiums([]);
        }
    }, [open, setSelectedRefs, setSelectedStadiums]);

    const handleStadiumSelection = (stadiumId) => {
        setSelectedStadiums((prevStadiums) => {
            if (!prevStadiums.includes(stadiumId)) {
                return [...prevStadiums, stadiumId];
            } else {
                return prevStadiums;
            }
        });
    };

    const onRefereeDragEnd = (result) => {
        if (!result.destination) return;

        const sourceIndex = result.source.index;
        const destinationIndex = result.destination.index;

        const sourceList = referees;
        const destinationList = selectedRefs;

        const sourceItem = sourceList[sourceIndex];

        if (result.source.droppableId === result.destination.droppableId) {
            sourceList.splice(sourceIndex, 1);
            sourceList.splice(destinationIndex, 0, sourceItem);
            setSelectedRefs([...sourceList]);
        } else {
            sourceList.splice(sourceIndex, 1);
            destinationList.splice(destinationIndex, 0, sourceItem);
            setSelectedRefs([...selectedRefs]);
            setSelectedStadiums([...selectedStadiums]);
        }
    };

    const onStadiumDragEnd = (result) => {
        if (!result.destination) return;

        const sourceIndex = result.source.index;
        const destinationIndex = result.destination.index;

        const sourceList = stadiums;
        const destinationList = selectedStadiums;

        const sourceItem = sourceList[sourceIndex];

        if (result.source.droppableId === result.destination.droppableId) {
            sourceList.splice(sourceIndex, 1);
            sourceList.splice(destinationIndex, 0, sourceItem);
            setSelectedStadiums([...sourceList]);
        } else {
            sourceList.splice(sourceIndex, 1);
            destinationList.splice(destinationIndex, 0, sourceItem);
            setSelectedStadiums([...selectedStadiums]);
            setSelectedRefs([...selectedRefs]);
        }
    };

    const Modal = loadable(() => import('@mui/material/Modal'));

    return (
        <Modal open={open} onClose={onClose} closeAfterTransition>
            <div className="popup-container">
                <div className="popup card card-padded" style={{ minHeight: 'unset', display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
                    <button className="popup_close" onClick={onClose} aria-label="Close popup">
                        <i className="icon-xmark" />
                    </button>
                    <DragDropContext onDragEnd={onRefereeDragEnd}>
                        <Droppable droppableId="referees">
                            {(provided) => (
                                <div  ref={provided.innerRef} {...provided.droppableProps}>
                                    <h2 style={{paddingLeft:"50px"}}>Select Referees</h2>
                                    <br></br>

                                    {referees.map((referee, index) => (
                                        <Draggable key={referee._id} draggableId={referee._id} index={index}>
                                            {(provided) => (
                                                <div
                                                    ref={provided.innerRef}
                                                    {...provided.draggableProps}
                                                    {...provided.dragHandleProps}
                                                >
                                                    {referee.fullname}
                                                </div>
                                            )}
                                        </Draggable>
                                    ))}
                                    {provided.placeholder}
                                </div>
                            )}
                        </Droppable>
                        <br></br>
                        <div style={{ marginRight: '20px',width:"100%" }}>

                            <Droppable  droppableId="selectedRefs">
                                {(provided) => (
                                    <div ref={provided.innerRef} {...provided.droppableProps} style={{ minHeight: '100px', border: '1px dashed #ccc', borderRadius: '4px', padding: '10px' }}>
                                        {selectedRefs.map((refereeId, index) => {
                                            const referee = referees.find(ref => ref._id === refereeId);
                                            return (
                                                <div key={`selectedReferee-${refereeId}-${index}`}>
                                                    {referee && referee.fullname}
                                                </div>
                                            );
                                        })}
                                        <p>drop the Referee</p>
                                        {provided.placeholder}
                                    </div>
                                )}
                            </Droppable>
                        </div>
                        <br></br>

                    </DragDropContext>
                    <DragDropContext onDragEnd={onStadiumDragEnd}>
                        <Droppable ClassName="" droppableId="stadiums">
                            {(provided, snapshot) => (
                                <div ref={provided.innerRef} {...provided.droppableProps}>
                                    <h2  style={{paddingLeft:"50px"}}>Select Stadiums</h2>
                                    <br></br>

                                    {stadiums.map((stadium, index) => (
                                        <Draggable key={stadium._id} draggableId={stadium._id} index={index}>
                                            {(provided) => (
                                                <div ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                                                    {stadium.name}
                                                </div>
                                            )}
                                        </Draggable>
                                    ))}
                                    {provided.placeholder}
                                </div>
                            )}
                        </Droppable>
                        <br></br>

                        <div style={{ marginRight: '20px',width:"100%" }}>
                            <Droppable droppableId="selectedStadiums">
                                {(provided) => (
                                    <div ref={provided.innerRef} {...provided.droppableProps} style={{ minHeight: '100px', border: '1px dashed #ccc', borderRadius: '4px', padding: '10px' }}>
                                        {selectedStadiums.map((stadiumId, index) => {
                                            const stadium = stadiums.find(std => std._id === stadiumId);
                                            return (
                                                <div key={`selectedStadium-${index}`}>
                                                    {stadium && stadium.name}
                                                </div>
                                            );
                                        })}
                                        <p>drop the stadium</p>
                                        {provided.placeholder}
                                    </div>
                                )}
                            </Droppable>
                        </div>
                    </DragDropContext><br/>
                    <Button className='btn' style={{backgroundColor:"#FDCA40",color:"black",width:"100%"}}  onClick={handleDataCollection}>Confirm</Button>
                </div>
            </div>
        </Modal>
    );
};

Popup.propTypes = {
    open: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,

};

export default Popup;