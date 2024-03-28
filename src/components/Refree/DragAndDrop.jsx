import React, { useState, useEffect } from "react";
import { useDragAndDrop } from "@hooks/useDragAndDrop";
import ContainerCards from "./ContainerCards";
import backgroundImageVS from '@assets/refree/terrain.jpeg';
import axios from "axios";

export const DragAndDrop = () => {
    const [teamsData, setTeamsData] = useState([]);
    const { isDragging, listItems, handleDragging, handleUpdateList } = useDragAndDrop([]);

    useEffect(() => {
        // Fetch teams data from API
        const fetchTeamsData = async () => {
            try {
                // Replace 'your-api-url' with the actual API endpoint
                const response = await fetch('http://localhost:3000/Team/getTeamsByMatch/66056a2895be3305f204a6d8');
                const data = await response.json();
                console.log("\n++++++++++"+data.team1Lineup);
                const teamID1 =data.team1Lineup.team ;
                const teamID2 =data.team2Lineup.team;

                console.log(teamID1+"\n ......"+teamID2)
                const responses = await fetch(`http://localhost:3000/Team/getbyid/${teamID1}`);
                const Team1 = await responses.json();
                console.log(Team1+"\n ......")
                // Assuming the response contains team1Lineup and team2Lineup
                const team1 = {
                    id: data.team1Lineup._id,
                    name: Team1.name,
                    lineup: data.team1Lineup.playerNames // Assuming team1Lineup contains players data
                };

                const responses2 = await fetch(`http://localhost:3000/Team/getbyid/${teamID2}`);
                const Team2 = await responses2.json();
                const team2 = {
                    id: data.team2Lineup._id,
                    name: Team2.name,
                    lineup: data.team2Lineup.playerNames // Assuming team2Lineup contains players data
                };

                setTeamsData([team1, team2]);
            } catch (error) {
                console.error('Error fetching teams data:', error);
            }
        };

        fetchTeamsData();
    }, []);
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
                height: '800px', 
                backgroundImage: `url(${backgroundImageVS})`,
                backgroundSize: 'cover',
            };
        }
    };

    return (
        <div className="grid" onDragOver={handleDragOver}>
            {teamsData.map(team => (
                <div className="layout-cards" key={team.id} style={getContainerStyle(team.name)} onDrop={(e) => handleDrop(e, team.name)}>
                    <ContainerCards
                        items={team.lineup.map(player => ({
                            id: player.id,
                            name: player.fullname,
                            status: team.name
                        }))}
                        status={team.name}
                        key={team.id}
                        isDragging={isDragging}
                        handleDragging={handleDragging}
                        handleUpdateList={handleUpdateList}
                    />
                </div>
            ))}
        </div>
    );
};

export default DragAndDrop;