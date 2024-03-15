// components
import PageHeader from '@layout/PageHeader';
import AppGrid from '@layout/AppGrid';
import TeamProfileCard from '@widgets/PlayerProfileCard copy';
import TrainingPaceChart from '@widgets/TrainingPaceChart';
import GamesCalendar from '@widgets/GamesCalendar';
import ShotsStats from '@widgets/ShotStats';
import TrainingsPlanner from '@widgets/TrainingsPlanner';
import LatestMessages from '@widgets/LatestMessages';
import HotField from '@widgets/HotField';
import ChampionsLeague from '@widgets/ChampionsLeague';
import PlayerList from '@widgets/Team/Player_List/PlayerList';

const widgets = {
    profile_card: <TeamProfileCard />,
    calendar: <GamesCalendar />,
    listplayers : <PlayerList/>
}

const TeamProfile = () => {
    return (
        <>
            <PageHeader title="Team Profile" />
            <AppGrid id="Team_Managment" widgets={widgets}/>
        </>
    )
}

export default TeamProfile