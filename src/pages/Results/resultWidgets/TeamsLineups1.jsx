// components
import Spring from '@components/Spring';
import TabButton from '@ui/TabButton';
import Lineups from '@components/Lineups';
import {TabsList} from '@mui/base/TabsList';
import {TabPanel} from '@mui/base/TabPanel';
import {Tabs} from '@mui/base/Tabs';
import Fade from '@mui/material/Fade';

// hooks
import React, { useState, useEffect } from 'react';
// data placeholder
import pitch from '@db/pitch';
import pitch2 from '@db/pitch2';

const TeamsLineups1 = ({team1}) => {
    const [activeTab, setActiveTab] = useState('realmadrid');
    const [teamsData, setTeamsData] = useState([]);

    useEffect(() => {
        // Fetch teams data from API
        const fetchTeamsData = async () => {
            try {
                // Replace 'your-api-url' with the actual API endpoint
                const response = await fetch('http://localhost:3000/Team/getTeamsByMatch/66056a2895be3305f204a6d8');
                const data = await response.json();
                const teamID1 =data.team1Lineup.team ;
                const teamID2 =data.team2Lineup.team;

                const responses = await fetch(`http://localhost:3000/Team/getbyid/${teamID1}`);
                const Team1 = await responses.json();
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


    return (
        <Spring className="card h-2 card-padded">
            <Tabs className="d-flex flex-column h-100 g-30" value={activeTab}>
                <TabsList className="tab-nav col-1">
                    <TabButton title={team1?.name}
                               onClick={() => setActiveTab('realmadrid')}
                               active={activeTab === 'realmadrid'}
                               type="color"
                               color="accent"/>
                    
                </TabsList>
                <div className="flex-1 h-100">
                    <TabPanel className="h-100" value="realmadrid">
                        <Fade in={activeTab === 'realmadrid'} timeout={400}>
                            <div className="h-100" style={{marginTop: 10}}>
                                <Lineups data={teamsData}/>
                            </div>
                        </Fade>
                    </TabPanel>
                </div>
            </Tabs>
        </Spring>
    )
}

export default TeamsLineups1