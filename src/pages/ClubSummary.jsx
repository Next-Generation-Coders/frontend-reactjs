// components
import PageHeader from '@layout/PageHeader';
import AppGrid from '@layout/AppGrid';
import TeamStats from '@widgets/TeamStats';
import Points from '@widgets/Points';
import Attendance from '@widgets/Attendance';
import TrainingPaceChart from '@widgets/TrainingPaceChart';
import MatchLiveReport from '@widgets/MatchLiveReport';
import WidgetGroup from '@components/WidgetGroup';
import TeamFullInfo from '@widgets/TeamFullInfo';
import TeamResults from '@widgets/TeamResults';
import LeagueStandings from '@widgets/LeagueStandings';
import LiveMatches from '@widgets/LiveMatches';
import GamesCalendar from '@widgets/GamesCalendar copy';
import MatchesOverview from '@widgets/MatchesOverview';
import MatchResultBasic from '@widgets/MatchResultBasic';


const widgets = {
    calendar: <GamesCalendar />,

    live_report: <MatchLiveReport/>,    
    
    league_standings: <LeagueStandings/>,
    matches_overview: <MatchesOverview />,
    match_result: <MatchResultBasic />,
    // team_stats: <TeamStats/>,
    // attendance:
    //     <WidgetGroup>
    //         <Points/>
    //         <Attendance/>
    //     </WidgetGroup>
    // ,
    // training_pace: <TrainingPaceChart/>,
    // team_full_info: <TeamFullInfo id="bayern"/>,
    // team_results: <TeamResults/>,
    live_matches: <LiveMatches variant="small" />,
}

const ClubSummary = () => {
    return (
        <>
            <PageHeader title="Home"/>
            <AppGrid id="league_overview" widgets={widgets}/>
        </>
    )
}

export default ClubSummary