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
import PlayerDiscipline1 from './resultWidgets/PlayerDiscipline1';
import PlayerDiscipline2 from './resultWidgets/PlayerDiscipline2';
import PassesPolarChartt from './resultWidgets/PassesPolarChart';
import TeamStatsProgress1 from './resultWidgets/TeamStatsProgress';
import TeamStatsProgress2 from './resultWidgets/TeamStatsProgress copy';
import { useParams } from 'react-router-dom';
import TeamsLineups1 from './resultWidgets/TeamsLineups1';
import TeamsLineups2 from './resultWidgets/TeamsLineups2';
import { useLocation } from 'react-router-dom';
import MatchLiveReport from './resultWidgets/MatchLiveReport';
import MatchLiveReportScan from './resultWidgets/MatchLiveReport copy';

const matchID = "65fb89764297d5d1df8c8858"

const socket = io('http://localhost:3000', { transports : ['websocket'] });
const MatchResult = () => {
  const { state } = useLocation();
  const MatchIdfromLeaguesDisplay = state.matchId;
  
//const {id} = useParams()
    const [result, setResult] = useState([]);
    const [teams, setTeams] = useState({});
  const team1 = teams?.team1?.team1
  const team2=teams?.team2?.team2
    useEffect(() => { 
        // Fetch current result when component mounts
        const fetchResult = async () => {
          try {
            const response = await axios.get(`http://localhost:3000/result/result/${MatchIdfromLeaguesDisplay}`); // Assuming you have an endpoint to get the current result
            console.log("aaaa",response.data);

            setResult(response.data);
            const teamsResponse = await axios.get(`http://localhost:3000/result/teams/${MatchIdfromLeaguesDisplay}`);
            setTeams(teamsResponse.data);

          } catch (error) {
            console.error('Error fetching current result:', error);
          }
        };

    
        fetchResult();
    
        // Listen for scoreUpdate event from server
        socket.on('scoreUpdate', ({ team1Goals, team2Goals }) => {
          setResult({ team1Goals, team2Goals });
          fetchResult();

          
        });
        socket.on('redUpdate', ({ team1Red, team2Red }) => {
          setResult({ team1Red, team2Red });
          fetchResult();

          
        });
        socket.on('yellowUpdate', ({ team1Yellow, team2Yellow }) => {
          setResult({ team1Yellow, team2Yellow });
          fetchResult();

        });
        socket.on('cornersUpdate', ({ team1Corners, team2Corners }) => {
          setResult({ team1Corners, team2Corners });
          fetchResult();
  
        });
        socket.on('offsidesUpdate', ({ team1Corners, team2Corners }) => {
          setResult({ team1Corners, team2Corners });
          fetchResult();
  
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
      const red ={
        redTeam1 : result.team1Red ,
        redTeam2:result.team2Red   }
        const yellow ={
          yellowTeam1 : result.team1Yellow,
          yellowTeam2:result.team2Yellow    }
      
          const corners ={
            cornersTeam1 : result.team1Corners,
            cornersTeam2:result.team2Corners
          }
          const offsides ={
            offsidesTeam1 : result.team1Offsides,
            offsidesTeam2:result.team2Offsides
          }
      const widgets = {
        //teamA_lineups: <TeamsLineups1 team1={team1}/>,
        matchLive:<MatchLiveReport/>,
        teamA_stats_progress: <TeamStatsProgress1 score={score} corners={corners} offsides={offsides} team2={team2}/>,
    
        passes_polar_chart: <PassesPolarChartt  offsides={offsides} corners={corners} score={score} red1={red.redTeam1} red2={red.redTeam2} yellow1={yellow.yellowTeam1} yellow2={yellow.yellowTeam2} team1={team1} team2={team2}/>,
        //teamB_lineups: <TeamsLineups2 team2={team2} />,
        matchLiveScan:<MatchLiveReportScan/>,

        teamB_stats_progress: <TeamStatsProgress2 score={score} corners={corners} offsides={offsides} team1={team1}/>,
        player_cards: <WidgetGroup>
                         <PlayerDiscipline2 red2={red.redTeam2} yellow2={yellow.yellowTeam2} team2={team2}/>

            <PlayerDiscipline1 red1={red.redTeam1} yellow1={yellow.yellowTeam1}  team1={team1} />
             </WidgetGroup>,
        match_events: <MatchScoreWidget score={score}  team1={team1} team2={team2}/>,
    }
    return (
        <>
            <PageHeader title="Match Overview" />
            <AppGrid id="MatchResult" widgets={widgets}/>
        </>
    )
}

export default MatchResult