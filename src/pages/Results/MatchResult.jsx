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
import ScoreWidget from './resultWidgets/ScoreWidget';
import { useEffect, useState } from 'react';
import axios from 'axios';
import MatchScoreWidget from './resultWidgets/MatchScoreWidget';

import io from 'socket.io-client';



const matchID = "65e341a70606ddaee59b93bb"
const socket = io('http://localhost:3001', { transports : ['websocket'] });
const MatchResult = () => {
    const [result, setResult] = useState([]);

    useEffect(() => { 
        // Fetch current result when component mounts
        const fetchResult = async () => {
          try {
            const response = await axios.get(`http://localhost:3001/api/result/${matchID}`); // Assuming you have an endpoint to get the current result
            setResult(response.data);
  
          } catch (error) {
            console.error('Error fetching current result:', error);
          }
        };
    
        fetchResult();
    
        // Listen for scoreUpdate event from server
        socket.on('scoreUpdate', ({ team1Goals, team2Goals }) => {
          setResult({ team1Goals, team2Goals });
          
        });
    
        // Cleanup function
        return () => {
          socket.disconnect(); // Disconnect socket when component unmounts
        };
      }, []); 


      const score ={
        scoreTeam1 : result.team1Goals,
        scoreTeam2:result.team2Goals
      }

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
        match_events: <MatchScoreWidget score={score} />,
    }
    return (
        <>
            <PageHeader title="Match Overview" />
            <AppGrid id="MatchResult" widgets={widgets}/>
        </>
    )
}

export default MatchResult