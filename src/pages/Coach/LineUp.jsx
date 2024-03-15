import  LineupOfTeam  from '@components/Coach/Lineup';
import  TeamLineup  from '@widgets/Coach/TeamsLineups';
import { Title } from '@components/Refree/Title';
import React from 'react';
import PageHeader from '@layout/PageHeader';

const LineUp = () => {
    const widgets = {
    
        // description: <ProfileDescription/>,
        teams_lineups: <TeamLineup/>,
        
     }

    return (
        <>
            <PageHeader title=" Teams Linup" />
            <LineupOfTeam />
            <TeamLineup id="Test" widgets={widgets}/>
      
      </>
    );
};

export default LineUp;
