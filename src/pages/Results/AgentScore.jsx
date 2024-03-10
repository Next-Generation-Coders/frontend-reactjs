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

const AgentScore = () => { 


  const matchID = "65e742cdd620b28801ce9e8e"
  const socket = io('http://localhost:3000', { transports : ['websocket'] });


    const [result, setResult] = useState([]);

    const [changed, setChanged] = useState(null);

    const handleGoal = (team) => {
      // Emit goal event to the server
      socket.emit('goal', { team });

      setChanged(team);
      setTimeout(() => {
        setChanged(false);
      }, 1000);
      console.log("socket")

    };
    useEffect(() => {
      // Fetch current result when component mounts
      const fetchResult = async () => {
        try {
          const response = await axios.get(`http://localhost:3000/api/result/${matchID}`); // Assuming you have an endpoint to get the current result
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
      match_score: <ScoreWidget score={score} handleGoal={handleGoal}  changed={changed} />,

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
