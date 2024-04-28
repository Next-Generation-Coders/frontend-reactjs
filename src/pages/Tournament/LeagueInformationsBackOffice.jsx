// components
import PageHeader from '@layout/PageHeader';
import React, { useState } from 'react';

import MatchesPanel from '@widgets/TournamentWidgets/LeagueWidgets/backOffice/MatchPanel';
import TournamentSelector from '@widgets/TournamentWidgets/LeagueWidgets/backOffice/TournamentSelector';

import AppGrid from '@layout/AppGrid';



const LeagueInformationsBackOffice = () => {

    const [selectedTournamentId, setSelectedTournamentId] = useState(null);
    
 
  const handleTournamentSelect = (tournamentId) => {
    setSelectedTournamentId(tournamentId);
  };
  const widgets = {
    segment_chart: <TournamentSelector onTournamentSelect={handleTournamentSelect} />,
   
    month_matches: <MatchesPanel selectedTournamentId={selectedTournamentId} />,
   
}



    return (
        <>
            <PageHeader title="Manage Your Tournaments" />

            
          <AppGrid id="championships" widgets={widgets} />
        </>
    )
}

export default LeagueInformationsBackOffice