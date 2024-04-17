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


const Tickets = () => {
    const location = useLocation();
    const [TeamId, setTeamId] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
  
    useEffect(() => {
      const fetchData = async () => {
        const { playerId } = location.state || {};
        if (!playerId) {
          console.log("Error: Player ID not found");
        } else {
          try {
            const response = await fetch(`http://localhost:3000/User/getbyid/${playerId}`);
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
  
    const isDataLoaded = TeamId !== null && !isLoading;
  
    const widgets = {
      profile_card: <PlayerProfileCard />,
      training_pace: <TrainingPaceChart />,
      calendar: isDataLoaded && <GamesCalendar teamId={TeamId} />,
      shots: <TeamPlayerOverview />,
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