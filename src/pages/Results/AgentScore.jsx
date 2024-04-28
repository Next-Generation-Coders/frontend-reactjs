// Install required packages: react, socket.io-client
// Create React components and set up WebSocket connection
import styled from 'styled-components/macro';

import TeamScoreRow from '@components/TeamScoreRow';
import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';
import axios from "axios";
import PageHeader from '@layout/PageHeader';
import { DragAndDrop } from '@components/Refree/DragAndDrop';
import { LineupTeams } from '@components/Refree/LineupTeams';
import AppGrid from '@layout/AppGrid';
import TeamsLineups from '@widgets/TeamsLineups';
import MatchEventsLarge from '@widgets/MatchEventsLarge';
import ScoreWidget from './resultWidgets/ScoreWidget';
import WidgetGroup from '@components/WidgetGroup';
import PlayerDiscipline1 from './resultWidgets/PlayerDiscipline1';
import PlayerDiscipline2 from './resultWidgets/PlayerDiscipline2';
import TimeMatch from './resultWidgets/TimeMatch';
import { useParams } from 'react-router-dom';

const ScoreWidgetContainer = styled.div`
    height: 37vh; /* Set the height to 50% of the viewport height */
  `;
const AgentScore = () => { 

  const [matchStart, setMatchStart] = useState(false);

  //const matchID = "65fb89764297d5d1df8c8858"
  const {id} = useParams()

  const socket = io('http://localhost:3000', { transports : ['websocket'] });


    const [result, setResult] = useState([]);
    const [teams, setTeams] = useState({});
    const team1 = teams?.team1?.team1
    const team2=teams?.team2?.team2


    const [changed, setChanged] = useState(null);
    // const handleGoal = (team, matchID) => {
    //   const goalTime = new Date(); // Get the current timestamp
  
    //   // Emit goal event to the server along with the goal time
    //   socket.emit('goal', { team, matchID, time: goalTime });
    //   setChanged(team);
  
    //   setTimeout(() => {
    //     setChanged(false);
    //   }, 1000);
    // };
    const handleGoal = (team,matchID) => {
      console.log(matchID)

      // Emit goal event to the server
      socket.emit('goal', { team,matchID });
      console.log(matchID)
      setChanged(team);
      setTimeout(() => {
        setChanged(false);
      }, 1000);
      console.log("goal")

    };
    const handleRed = (team,matchID) => {
      // Emit goal event to the server
      socket.emit('red', { team,matchID });

      setChanged(team);
      setTimeout(() => {
        setChanged(false);
      }, 1000);
      console.log("red")

    };
    const handleYellow = (team,matchID) => {
      // Emit goal event to the server
      socket.emit('yellow', { team,matchID });

      setChanged(team);
      setTimeout(() => {
        setChanged(false);
      }, 1000);
      console.log("yellow")

    };
    const handleCorners = (team,matchID) => {
      // Emit goal event to the server
      socket.emit('corners', { team,matchID });

      setChanged(team);
      setTimeout(() => {
        setChanged(false);
      }, 1000);
      console.log("corner")

    };
    const handleOffsides = (team,matchID) => {
      // Emit goal event to the server
      socket.emit('offsides', { team,matchID });

      setChanged(team);
      setTimeout(() => {
        setChanged(false);
      }, 1000);
      console.log("offside")

    };
    useEffect(() => {
      // Fetch current result when component mounts
      const fetchResult = async () => { 
        try {
          const response = await axios.get(`http://localhost:3000/result/result/${id}`); // Assuming you have an endpoint to get the current result
          setResult(response.data);
          const teamsResponse = await axios.get(`http://localhost:3000/result/teams/${id}`);
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
      redTeam1 : result.team1Red,
      redTeam2:result.team2Red    }
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
        const team ={
          Team1 : teams.team1,
          Team2:teams.team2
        }
    
    const widgets = {
      match_score: <ScoreWidget matchID={id} team1={team1} team2={team2} score={score} handleGoal={handleGoal} red={red} yellow={yellow} 
      handleRed={handleRed} handleYellow={handleYellow} changed={changed}
      corners={corners} handleCorners={handleCorners}  offsides={offsides} handleOffsides={handleOffsides} teams={team} matchStart={matchStart}/>,
   
      

  }
 
  return (

    <>            
  <PageHeader title="Match live tracking" />
  <ScoreWidgetContainer className="card flex-column">
  <div className='bg-red text-center'> 
  <TimeMatch matchID={id} matchStart={matchStart} setMatchStart={setMatchStart}/>
  </div>
  <AppGrid id="MatchAgent" widgets={widgets}/>
 
  </ScoreWidgetContainer>
  
  
  <DragAndDrop id={id} />
{/*   <LineupTeams id={id} />
 */}    </>
   
  );
};


export default AgentScore;
