import PageHeader from '@layout/PageHeader';
import AppGrid from '@layout/AppGrid';
import RefreeRating from '@widgets/Refree/RefreeRating';
import MatchesOverview from '@widgets/MatchesOverview';
import RefPulse from '@widgets/Refree/RefPulse';
import GamesCalendar from '@widgets/GamesCalendar copy';
import StandingsRef from '@widgets/Refree/StandingsRef';
import RefereeMatches from "@widgets/RefereeMatches/RefereeMatches";


const widgets = {
    league_rating: <RefreeRating />,
    matches_overview: <RefereeMatches />,
   // team_pulse: <RefPulse />,
    calendar: <GamesCalendar />,
    //StandingsRef: <StandingsRef />,
}

const MatchList = () => {
    return (
        <>
            <PageHeader title="Match List" />
            <AppGrid id="league_overview" widgets={widgets}/>
        </>
    )
}

export default MatchList