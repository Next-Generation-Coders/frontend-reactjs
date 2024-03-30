import PageHeader from '@layout/PageHeader'
import React from 'react'
import TournamentChoice from '@widgets/TournamentWidgets/LeagueWidgets/frontOffice/tournamentChoice';
import { useState } from 'react';
import TournamentSelectorFrontDisplay from '@widgets/TournamentWidgets/LeagueWidgets/frontOffice/tournamentSelector/TournamentSelectorFrontDisplay';
import AppGrid from '@layout/AppGrid';
const LeaguesDisplay = () => {

  const [selectedTournamentId, setSelectedTournamentId] = useState(null);
  const handleTournamentSelection = (tournamentId) => {
    setSelectedTournamentId(tournamentId);
  };
  const widgets = {
    segment_chart: <TournamentSelectorFrontDisplay onSelectTournament={handleTournamentSelection} />,
   
    month_matches: <TournamentChoice selectedTournamentId={selectedTournamentId} />,
   
}


  return (<>    
        <PageHeader title="Leagues Display" />

       <AppGrid id="championships" widgets={widgets} />

       
        
        
    </>

  )
}

export default LeaguesDisplay