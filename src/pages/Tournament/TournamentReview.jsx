import AppGrid from '@layout/AppGrid'
import PageHeader from '@layout/PageHeader'
import TeamStatsSlider from '@widgets/TeamStatsSlider'
import TournamentChoice from '@widgets/TournamentWidgets/LeagueWidgets/frontOffice/tournamentChoice'
import ReviewWidget from '@widgets/TournamentWidgets/TournamentReview/ReviewWidget'
import TournamentTeamSlider from '@widgets/TournamentWidgets/TournamentReview/TournamentsTeamSlider'
import React, { useState } from 'react'
import { useLocation } from 'react-router-dom';
const TournamentReview = () => {
  const { state } = useLocation();
  const tournamentId = state.tournamentId;
//const [tournamentId, setTournamentId] = useState("65fd1d5fa662c44a0912a23c");

    const widgets = {
        league_rating: <ReviewWidget selectedTournamentId={tournamentId}/>,
        matches_overview : <TournamentChoice selectedTournamentId={tournamentId} />,
       team_stats: <TournamentTeamSlider selectedTournamentId={tournamentId}/>,
    }


  return (
    <>
            <PageHeader title="Tournament Details" />
            <AppGrid id="league_overview" widgets={widgets}/>
        </>
  )
}

export default TournamentReview