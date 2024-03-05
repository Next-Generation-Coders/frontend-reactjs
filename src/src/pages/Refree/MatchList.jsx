import PageHeader from '@layout/PageHeader';
import AppGrid from '@layout/AppGrid';
import RefreeRating from '@widgets/Refree/RefreeRating';
import MatchesOverview from '@widgets/MatchesOverview';
import RefPulse from '@widgets/Refree/RefPulse';
import GamesCalendar from '@widgets/GamesCalendar';
import StandingsRef from '@widgets/Refree/StandingsRef';


const widgets = {
    league_rating: <RefreeRating />,
    matches_overview: <MatchesOverview />,
    team_pulse: <RefPulse />,
    calendar: <GamesCalendar />,
    StandingsRef: <StandingsRef />,
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