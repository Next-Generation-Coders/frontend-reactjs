// components
import PageHeader from '@layout/PageHeader';
import AppGrid from '@layout/AppGrid';
import PlayerProfileCard from '@widgets/PlayerProfileCard';
import TrainingPaceChart from '@widgets/TrainingPaceChart';
import GamesCalendar from '@widgets/GamesCalendar copy';
import TeamPlayerOverview from '@widgets/ProfileOverview/TeamPlayerOverview';
import TrainingsPlanner from '@widgets/TrainingsPlanner';
import LatestMessages from '@widgets/LatestMessages';
import HotField from '@widgets/HotField';
import PreviousTeams from '@widgets/PreviousTeams';
import { useLocation   } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import {useAuthContext} from "@hooks/useAuthContext";
import axios from 'axios';
import User from '@widgets/User';


const Tickets = () => {
    const location = useLocation();
    const [TeamId, setTeamId] = useState(null);
    const [UserId, setUserId] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const {USER} = useAuthContext();

    useEffect(() => {
        const fetchData = async () => {
            const userResponse = await axios.get(`http://197.26.204.208:3000/User/getbyemail?email=${USER.email}`);
            const userId = userResponse.data._id;
            setUserId(userId);
            const { playerId } = location.state || {} ;
            if (!playerId) {
                console.log("data not fetched !!")
            } else {
                try {
                    const response = await fetch(`http://197.26.204.208:3000/User/getbyid/${playerId}`);
                    const data = await response.json();
                    setTeamId(data?.currentTeam);
                    setIsLoading(false);
                } catch (error) {
                    console.error('Error fetching player data:', error);
                    setIsLoading(false);
                }
            }
        };

        fetchData();
    }, [location.state]);

    const isDataLoaded = TeamId !== null && !isLoading ;
    const isLoad =UserId!==null;

    const widgets = {
        profile_card: isLoad && <PlayerProfileCard userId={UserId}/>,
        training_pace: <TrainingPaceChart />,
        calendar: isDataLoaded && <GamesCalendar teamId={TeamId} />,
        shots: isLoad && <TeamPlayerOverview userId={UserId}/>,
        champions: <PreviousTeams />
    };

    return (
        <>
            <PageHeader title="Player Profile" />
            <AppGrid id="player_profile" widgets={widgets}/>
        </>
    );
};

export default Tickets;