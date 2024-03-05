import React, { useState, useEffect } from 'react';
import { useDragAndDrop } from "@hooks/useDragAndDrop"; 
import ContainerCards from "./ContainerCards"; 
import backgroundImageVS from '@assets/refree/terrain.jpeg';

const typesClub = ['List Team', 'VS'];


export const DragAndDrop = () => {


    const getTeamByCoach = async (coachId) => {
        try {
            const response = await fetch(`http://localhost:3000/Team/getTeambyCoach/${coachId}`);
            /* if (!response.ok) {
                throw new Error('Failed to fetch team');
            } */
            const data = await response.json();
            return data;
        } catch (error) {
            console.error(error);
            return null;
        }
    };
    
    const teamData = JSON.parse(localStorage.getItem('teamData'));

    const data = teamData.playerNames.map((player, index) => ({
        id: index + 1, // Adding 1 to start IDs from 1
        name: player,
        status: 'List Team',
    }));
    

    const { isDragging, listItems, handleDragging, handleUpdateList } = useDragAndDrop(data);

    const handleDragOver = (e) => {
        e.preventDefault();
    };

    const handleDrop = (e, container) => {
        e.preventDefault();
        const draggedItemId = parseInt(e.dataTransfer.getData('text/plain'), 10);
        handleUpdateList(draggedItemId, container);
    };

    const getContainerStyle = (container) => {
        if (container === 'VS') {
            return {
                height: '900px', 
                width: '600px', // Increase the width of the VS container
                backgroundImage: `url(${backgroundImageVS})`,
                backgroundSize: 'cover',
            };
        } else {
            return {
               // height: '300px', // Decrease the height of the list container
            };
        }
    };


    useEffect(() => {
        async function fetchData() {
        const Team = await getTeamByCoach("65e1126386566290fd9dd1f3");
        try {
            localStorage.setItem('teamData', JSON.stringify(Team));
          } catch (error) {
            console.error('Error setting item in localStorage:', error);
          }
          
        }
        fetchData()
    }, []);

    return (
        <div className="grid" onDragOver={handleDragOver}>
            {typesClub.map(container => (
                <div className="layout-cards" key={container} style={getContainerStyle(container)} onDrop={(e) => handleDrop(e, container)}>
                    <ContainerCards
                        items={listItems}
                        status={container}
                        key={container}
                        isDragging={isDragging}
                        handleDragging={handleDragging}
                        handleUpdateList={handleUpdateList}
                    />
                </div>
            ))}
        </div>
    );
    };
    




export default DragAndDrop;