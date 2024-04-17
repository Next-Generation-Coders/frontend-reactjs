// components
import PageHeader from '@layout/PageHeader';
import AppGrid from '@layout/AppGrid';
import LeagueRating from '@widgets/LeagueRating';
import TeamsOverview from '@widgets/Team/TeamsOverview';
import TeamStatsCard from '@components/TeamStatsCard';
import TeamPulse from '@widgets/TeamPulse';
import GamesCalendar from '@widgets/GamesCalendar copy';
import Standings from '@widgets/Standings';
import BallPossessionAreaChart from '@widgets/BallPossessionAreaChart';
import LineDotsChart from '@widgets/LineDotsChart';
import WidgetGroup from '@components/WidgetGroup';
import ClubFans from '@widgets/ClubFans';

const widgets = {
    club_fans: <WidgetGroup>
    <ClubFans id="realmadrid" />
    <ClubFans id="manunited" />
     </WidgetGroup>,     
    matches_overview: <TeamsOverview />,
    team_pulse: <TeamPulse />,
    calendar: <GamesCalendar />,
    standings: <Standings />,
    dots_chart: <LineDotsChart />
}

const TeamList = () => {
    return (
        <>
            <PageHeader title="List of Your Team" />
            <AppGrid id="league_overview" widgets={widgets}/>
        </>
    )
}

export default TeamList