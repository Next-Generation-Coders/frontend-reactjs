// compone
import PassesPolarChart from '@widgets/PassesPolarChart';

import MatchEventsLarge from '@widgets/MatchEventsLarge';
import PageHeader from '@layout/PageHeader';
import AppGrid from '@layout/AppGrid';
import PlayerHighlight from '@widgets/PlayerHighlight';
import TeamCompare from '@widgets/TeamCompare';
import ClubsByCountry from '@widgets/ClubsByCountry';
import MatchResultFinals from '@widgets/MatchResultFinals';
import TeamsLineups from '@widgets/TeamsLineups';
import TeamStatsProgress from '@widgets/TeamStatsProgress';
import PlayerDiscipline from '@widgets/PlayerDiscipline';
import WidgetGroup from '@components/WidgetGroup';
// const widgets = {
//     teamA_lineups: <TeamsLineups />,
//     match_events: <MatchEventsLarge />,
//     teamB_lineups: <TeamsLineups />,


// //     passes_polar_chart: <PassesPolarChart />,
// //     team_stats_progress: <TeamStatsProgress />,


// //     merch: <Merch />,
// //     player_cards: <WidgetGroup>
// //         <PlayerDiscipline/>
// //         <PlayerDiscipline/>
// //     </WidgetGroup>,
// //  support: <GeneralSupport />,

// }

const widgets = {
    teamA_lineups: <TeamsLineups />,
    teamA_stats_progress: <TeamStatsProgress />,

    passes_polar_chart: <PassesPolarChart />,
    teamB_lineups: <TeamsLineups />,
    teamB_stats_progress: <TeamStatsProgress />,
    player_cards: <WidgetGroup>
        <PlayerDiscipline/>
           <PlayerDiscipline/>
         </WidgetGroup>,
    match_events: <MatchEventsLarge />,
}

const MatchResult = () => {
    return (
        <>
            <PageHeader title="Match Overview" />
            <AppGrid id="MatchResult" widgets={widgets}/>
        </>
    )
}

export default MatchResult