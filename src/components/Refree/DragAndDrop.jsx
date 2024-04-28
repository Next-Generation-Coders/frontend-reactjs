import React, { useState, useEffect } from "react";
import { useDragAndDrop } from "@hooks/useDragAndDrop";
import ContainerCards from "./ContainerCards";
import backgroundImageVS from '@assets/refree/terrain.jpeg';
import axios from "axios";
import { LineupTeams } from '@components/Refree/LineupTeams';

export const DragAndDrop = ({id}) => {
    const [teamsData, setTeamsData] = useState([]);

    useEffect(() => {
        const fetchTeamsData = async () => {
            try {
                // const response = await axios.get('http://localhost:3000/Team/getTeamsByMatch/66056a2895be3305f204a6d8');
                const response = await axios.get(`http://localhost:3000/Team/getTeamsByMatch/${id}`);

                const data = response.data;
                const teamID1 = data.team1Lineup.team;
                const teamID2 = data.team2Lineup.team;
                console.log(data)

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
            } catch (error) {
                console.error('Error fetching teams data:', error);
            }
        };

        fetchTeamsData();
    }, []);

    const { isDragging, listItems, handleDragging, handleUpdateList } = useDragAndDrop([]);

    const handleDragOver = (e) => {
        e.preventDefault();
    };

    const handleDrop = (e, container) => {
        e.preventDefault();
        const draggedItemId = parseInt(e.dataTransfer.getData('text/plain'), 10);
        handleUpdateList(draggedItemId, container);
    };

    const getContainerStyle = () => ({
        height: '800px', 
        backgroundImage: `url(${backgroundImageVS})`,
        backgroundSize: 'cover',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'flex-start', // Aligns "VS" text to the top
        // Add margin to the top
    });

    return (
        <div className="grid" style={{ display: 'flex' }}>
            <div className="layout-cards" style={{ flex: 1, marginTop: '40px' }}>
                {/* Left team lineup container */}
                {teamsData.length > 0 && (
                    <div>
                        <ContainerCards
                            items={teamsData[0].lineup.map(player => ({
                                id: player.id,
                                name: player.fullname,
                                status: teamsData[0].name
                            }))}
                            status={teamsData[0].name}
                            key={teamsData[0].id}
                            isDragging={isDragging}
                            handleDragging={handleDragging}
                            handleUpdateList={handleUpdateList}
                        />
                    </div>
                )}
            </div>
            <div className="layout-cards" style={{ flex: 1, marginTop: '40px'}}>
                {/* Middle container */}
                {/* <div style={getContainerStyle()} onDrop={(e) => handleDrop(e, 'VS')}>
                    
                    <h2>VS</h2>
                </div> */}

                <LineupTeams id={id} />
            </div>
            <div className="layout-cards" style={{ flex: 1, marginTop: '40px' }}>
                {/* Right team lineup container */}
                {teamsData.length > 1 && (
                    <div>
                        <ContainerCards
                            items={teamsData[1].lineup.map(player => ({
                                id: player.id,
                                name: player.fullname,
                                status: teamsData[1].name
                            }))}
                            status={teamsData[1].name}
                            key={teamsData[1].id}
                            isDragging={isDragging}
                            handleDragging={handleDragging}
                            handleUpdateList={handleUpdateList}
                        />
                    </div>
                )}
            </div>
        </div>
    );
};

export default DragAndDrop;
