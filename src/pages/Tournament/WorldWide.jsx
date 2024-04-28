import AppGrid from '@layout/AppGrid'
import PageHeader from '@layout/PageHeader'
import TournamentChoice from '@widgets/TournamentWidgets/LeagueWidgets/frontOffice/tournamentChoice'
import TournamentSelectorWorldWide from '@widgets/TournamentWidgets/WorldWide/TournamentSelector/TournamentSelector'
import VideoDisplay from '@widgets/TournamentWidgets/WorldWide/VideoDisplay/VideoDisplay'
import React, { useState } from 'react'

const WorldWide = () => {
    const [selectedTournamentTitle, setSelectedTournamentTitle] = useState(null);
    const [selectedTournamentId, setSelectedTournamentId] = useState(null);
    const handleTournamentSelection = (tournamentId,title) => {
      setSelectedTournamentId(tournamentId);
      setSelectedTournamentTitle(title)
    };

    const widgets = {
        segment_chart: <TournamentSelectorWorldWide onSelectTournament={handleTournamentSelection} />,
       
        month_matches: <VideoDisplay selectedTournamentId={selectedTournamentId} title={selectedTournamentTitle} />,
       
    }
    
  return (<>

    <PageHeader title="World Wide Football" />
    <AppGrid id="championships" widgets={widgets} />
  
  </>
  )


}

export default WorldWide