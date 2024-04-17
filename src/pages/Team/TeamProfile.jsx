// components
import PageHeader from '@layout/PageHeader';
import AppGrid from '@layout/AppGrid';
import TeamProfileCard from '@widgets/PlayerProfileCard copy';
import TrainingPaceChart from '@widgets/TrainingPaceChart';
import GamesCalendar from '@widgets/GamesCalendar copy';
import ShotsStats from '@widgets/ShotStats';
import TrainingsPlanner from '@widgets/TrainingsPlanner';
import LatestMessages from '@widgets/LatestMessages';
import HotField from '@widgets/HotField';
import ChampionsLeague from '@widgets/ChampionsLeague';
import PlayerList from '@widgets/Team/Player_List/PlayerList';
import PlayerTour from "@widgets/PlayerTournaments/PlayerTour";
import LoadingScreen from "@components/LoadingScreen";
import {useFindUserTour} from "@hooks/useFindUserTour";
import React, { useState, useEffect } from 'react';
import { useLocation   } from 'react-router-dom';
import {useAuthContext} from "@hooks/useAuthContext";
import axios from 'axios'; // Import axios for HTTP requests



const TeamProfile = () => {
    const {findTours,tournaments,isLoading} = useFindUserTour();
    let length = tournaments.length;
    let userId ;
    const { state } = useLocation();
    const teamId = state ? state.teamId : null;
    const [teamData, setTeamData] = useState([]);
    const [TeamId, setTeamId] = useState([]);

    const {USER} = useAuthContext();
    let IdTeam ;
    useEffect(() => {
        async function fetchData() {
            
            if(!teamId){
                const userResponse = await axios.get(`http://localhost:3000/User/getbyemail?email=${USER.email}`);
                userId = userResponse.data.currentTeam;
                console.log("userId :" +userId+"....")
                setTeamId(userId)
                await findTours()
                
            }
            else{
                setTeamId(teamId)
                try {
                    const teamDataResponse = await fetch(`http://localhost:3000/Team/getbyid/${teamId}`);
                    const teamData = await teamDataResponse.json();
                    const firstTeamManagerId = teamData.teamManagerName[0].id;
                    await findTours(firstTeamManagerId);
                } catch (error) {
                    console.error('Error fetching team data:', error);
                }
            }
        }

        fetchData().then(()=>{
            length = tournaments.length;
            console.log(length," Tournaments, data :",tournaments);
        })
        console.log("TeamId :" +TeamId+"....")
    }, [length,TeamId]);

    const isDataLoaded = TeamId && !isLoading;
    const widgets = {
        profile_card: <TeamProfileCard />,
        calendar: isDataLoaded && <GamesCalendar teamId={TeamId} />,
        listplayers :isDataLoaded && <PlayerList teamId={TeamId} />,
        messages: <PlayerTour tournaments={tournaments}/>,
    }
    
    return (
        <>
            <PageHeader title="Team Profile" />
            <AppGrid id="Team_Managment" widgets={widgets}/>
        </>
    )
}

export default TeamProfile