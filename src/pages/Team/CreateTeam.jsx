// components
import PageHeader from '@layout/PageHeader';
import AppGrid from '@layout/AppGrid';

import TeamSettings from '@widgets/Team/TeamSettings';
import Team from '@widgets/TeamFullInfo';
import React, { useState, useEffect } from 'react';


const widgets = {
    
  // description: <ProfileDescription/>,
   settings: <TeamSettings/>,
  
}

const CreateTeam = () => {
   return (
       <>
           <PageHeader title="Create Team" />
           <AppGrid id="settings" widgets={widgets}/>
       </>
   )
}

/* const CreateTeam = () => {

    const [teamsData, setTeamsData] = useState([]);

    
      
      useEffect(() => {
        const fetchTeamsData = async () => {
          try {
            // Fetch teams data from API
            const response = await fetch('http://localhost:3000/Team/getTeamsByMatch/66056a2895be3305f204a6d8');
            const data = await response.json();
            const teamID1 = data.team1Lineup.team;
            const teamID2 = data.team2Lineup.team;
      
            const responses = await fetch(`http://localhost:3000/Team/getbyid/${teamID1}`);
            const Team1 = await responses.json();
            const team1 = {
              id: data.team1Lineup._id,
              name: Team1.name,
              lineup: data.team1Lineup.playerNames
            };
      
            const responses2 = await fetch(`http://localhost:3000/Team/getbyid/${teamID2}`);
            const Team2 = await responses2.json();
            const team2 = {
              id: data.team2Lineup._id,
              name: Team2.name,
              lineup: data.team2Lineup.playerNames
            };
            const datas = [team1, team2];
            setTeamsData(datas);
          } catch (error) {
            console.error('Error fetching teams data:', error);
          }
        };
      
        fetchTeamsData();
      }, []);

      useEffect(() => {
        console.log(teamsData); // Log teamsData whenever it changes
      }, [teamsData]);


      const widgets = {
    
        // description: <ProfileDescription/>,
         //settings: <TeamSettings/>,
         settings: <Team teamsData={teamsData[0]}/>,
         settings: <Team teamsData={teamsData[1]}/>,
        
     }


    return (
        <>
            <PageHeader title="Create Team" />
            <div className="team-container">
                <Team teamsData={teamsData[0]} />
                <br />
                <Team teamsData={teamsData[1]} />
            </div>
        </>
    )
} */

export default CreateTeam