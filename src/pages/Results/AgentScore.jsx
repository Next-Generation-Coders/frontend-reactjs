// Install required packages: react, socket.io-client
// Create React components and set up WebSocket connection

import TeamScoreRow from '@components/TeamScoreRow';
import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';
import axios from "axios";
import PageHeader from '@layout/PageHeader';
import { DragAndDrop } from '@components/Refree/DragAndDrop';
import AppGrid from '@layout/AppGrid';
import TeamsLineups from '@widgets/TeamsLineups';
import MatchEventsLarge from '@widgets/MatchEventsLarge';
import ScoreWidget from './resultWidgets/ScoreWidget';
import WidgetGroup from '@components/WidgetGroup';
import PlayerDiscipline1 from './resultWidgets/PlayerDiscipline1';
import PlayerDiscipline2 from './resultWidgets/PlayerDiscipline2';
import TimeMatch from './resultWidgets/TimeMatch';
import { useParams } from 'react-router-dom';

const AgentScore = () => { 


  const matchID = "65e742cdd620b28801ce9e8e"
  //const {id} = useParams()

  const socket = io(process.env.REACT_APP_BASE_URL+'', { transports : ['websocket'] });


    const [result, setResult] = useState([]);
    const [teams, setTeams] = useState({});
    const team1 = teams?.team1?.team1
  const team2=teams?.team2?.team2


    const [changed, setChanged] = useState(null);

    const handleGoal = (team) => {
      // Emit goal event to the server
      socket.emit('goal', { team });

      setChanged(team);
      setTimeout(() => {
        setChanged(false);
      }, 1000);
      console.log("goal")

    };
    const handleRed = (team) => {
      // Emit goal event to the server
      socket.emit('red', { team });

      setChanged(team);
      setTimeout(() => {
        setChanged(false);
      }, 1000);
      console.log("red")

    };
    const handleYellow = (team) => {
      // Emit goal event to the server
      socket.emit('yellow', { team });

      setChanged(team);
      setTimeout(() => {
        setChanged(false);
      }, 1000);
      console.log("yellow")

    };
    const handleCorners = (team) => {
      // Emit goal event to the server
      socket.emit('corners', { team });

      setChanged(team);
      setTimeout(() => {
        setChanged(false);
      }, 1000);
      console.log("corner")

    };
    const handleOffsides = (team) => {
      // Emit goal event to the server
      socket.emit('offsides', { team });

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
          const response = await axios.get(process.env.REACT_APP_BASE_URL+`/api/result/${matchID}`); // Assuming you have an endpoint to get the current result
          setResult(response.data);
          const teamsResponse = await axios.get(process.env.REACT_APP_BASE_URL+`/api/teams/${matchID}`);
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
      match_score: <ScoreWidget team1={team1} team2={team2} score={score} handleGoal={handleGoal} red={red} yellow={yellow} 
      handleRed={handleRed} handleYellow={handleYellow} changed={changed}
      corners={corners} handleCorners={handleCorners}  offsides={offsides} handleOffsides={handleOffsides} teams={team}/>,
   
      

  }
 
  return (

    <>            
  <PageHeader title="Match live tracking" />
  
  <AppGrid id="MatchAgent" widgets={widgets}/>



  <DragAndDrop />

    </>
   
  );
};


export default AgentScore;
