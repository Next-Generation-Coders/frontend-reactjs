// components
import PageHeader from '@layout/PageHeader';
import AppGrid from '@layout/AppGrid';
import MatchLiveReport from '@widgets/MatchLiveReport';
import LiveMatches from '@widgets/LiveMatches';
import MatchesOverview from '@widgets/MatchesOverview';
import TournamentSlider from '@widgets/TournamentWidgets/TopRatedTournaments/TournamentsSlider';
import PlayerTour from "@widgets/PlayerTournaments/PlayerTour";
import {useFindUserTour} from "@hooks/useFindUserTour";
import {useEffect} from "react";




const Home = () => {
    const {findTours,tournaments,isLoading} = useFindUserTour();
    let length = tournaments.length;
    useEffect(() => {
        async function fetchData() {
            await findTours()
        }

        fetchData().then(()=>{
            length = tournaments.length;
        })
    }, [length]);


const widgets = {
    live_report: <MatchLiveReport/>,
    matches_overview: <MatchesOverview />,
    live_matches: <LiveMatches variant="small" />,
    tournamentslider : <TournamentSlider/>,
   league_standings: <PlayerTour tournaments={tournaments}/>,

}

    return (
        <>
            <PageHeader title="Home"/>
            <AppGrid id="home" widgets={widgets}/>
        </>
    )
}

export default Home