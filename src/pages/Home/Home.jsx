// components
import PageHeader from '@layout/PageHeader';
import AppGrid from '@layout/AppGrid';
import MatchLiveReport from '@widgets/MatchLiveReport';
import LiveMatches from '@widgets/LiveMatches';
import MatchesOverview from '@widgets/MatchesOverview';
import HomeGamesCalendar from "@pages/Home/GamesCalendar";
import TournamentSlider from '@widgets/TournamentWidgets/TopRatedTournaments/TournamentsSlider';


const widgets = {
    calendar: <HomeGamesCalendar />,
    live_report: <MatchLiveReport/>,
    matches_overview: <MatchesOverview />,
    live_matches: <LiveMatches variant="small" />,
    tournamentslider : <TournamentSlider/>
}

const Home = () => {
    return (
        <>
            <PageHeader title="Home"/>
            <AppGrid id="home" widgets={widgets}/>
        </>
    )
}

export default Home