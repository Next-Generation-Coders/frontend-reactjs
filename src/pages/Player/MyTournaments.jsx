// components
import PageHeader from '@layout/PageHeader';
import AppGrid from '@layout/AppGrid';
import MyTournament from "@widgets/TeamTournament/TournamentStandings";
import {useFindUserTour} from "@hooks/useFindUserTour";
import {useEffect} from "react";
import LiveMatches from "@widgets/LiveMatches";
import MatchResultBasic from "@widgets/MatchResultBasic";
import MatchesOverview from "@widgets/MatchesOverview";
import PlayerTour from "@widgets/PlayerTournaments/PlayerTour";
import LoadingScreen from "@components/LoadingScreen";






const MyTournaments = () => {
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
    const widgets =  {
        // league_standings: <MyTournament/>,
        league_standings: <PlayerTour tournaments={tournaments}/>,
    }
    return (
        <>
            <PageHeader title="Home"/>
            {isLoading ? <LoadingScreen/> :  <AppGrid id="my_tournaments" widgets={widgets}/>}

        </>
    )
}

export default MyTournaments