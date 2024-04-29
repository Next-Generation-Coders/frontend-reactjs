// components
import PageHeader from '@layout/PageHeader';
import AppGrid from '@layout/AppGrid';
import MatchLiveReport from '@widgets/MatchLiveReport';
import LiveMatches from '@widgets/LiveMatches';
import MatchesOverview from '@widgets/MatchesOverview';
import HomeGamesCalendar from "@pages/Home/GamesCalendar";
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
            console.log(length," Tournaments, data :",tournaments);
        })
    }, [length]);

    const widgets = {
        league_standings: <PlayerTour tournaments={tournaments} />,
        live_report: <MatchLiveReport/>,
        matches_overview: <MatchesOverview />,
        live_matches: <LiveMatches variant="small" />,

    }


    return (
        <>
            <PageHeader title="Home"/>
            <AppGrid id="home" widgets={widgets}/>
        </>
    )
}

export default Home