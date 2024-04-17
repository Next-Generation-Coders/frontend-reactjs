// components
import PageHeader from '@layout/PageHeader';
import AppGrid from '@layout/AppGrid';
import PlayerProfileCard from '@widgets/PlayerProfileCard';
import TrainingPaceChart from '@widgets/TrainingPaceChart';
import GamesCalendar from '@widgets/GamesCalendar copy';
import TeamCoachOverview from '@widgets/ProfileOverview/TeamCoachOverview';
import TrainingsPlanner from '@widgets/TrainingsPlanner';
import LatestMessages from '@widgets/LatestMessages';
import HotField from '@widgets/HotField';
import PreviousTeams from '@widgets/PreviousTeams';

const widgets = {
    profile_card: <PlayerProfileCard />,
    /* training_pace: <TrainingPaceChart />, */
    calendar: <GamesCalendar />,
    shots: <TeamCoachOverview />,
    //planner: <TrainingsPlanner />,
    //messages: <LatestMessages />,
    //field: <HotField />,
    champions: <PreviousTeams />
}

const Tickets = () => {
    return (
        <>
            <PageHeader title="Coach Profile" />
            <AppGrid id="player_profile" widgets={widgets}/>
        </>
    )
}

export default Tickets