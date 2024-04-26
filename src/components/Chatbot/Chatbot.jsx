import ChatBot from 'react-simple-chatbot';
import { ThemeProvider } from 'styled-components';
import React, { useState, useEffect } from 'react';
import {useAuthContext} from "@hooks/useAuthContext";
import axios from 'axios';
import { useLocation } from 'react-router-dom'; // Import useLocation hook

const theme = {
  background: '#f5f8fb',
  headerBgColor: '#FDCA40',
  headerFontColor: '#fff',
  headerFontSize: '15px',
  botBubbleColor: '#FDCA40',
  botFontColor: '#fff',
  userBubbleColor: '#fff',
  userFontColor: '#4a4a4a',
};

// Modify the Chatbot component to dynamically adjust steps based on the user's role
const Chatbot = () => {
    const { USER } = useAuthContext();
    const [userData, setUserData] = useState(null);
    const location = useLocation(); // Get the current URL using useLocation hook
let userData2 ;

    const handleRedirectToTournaments = () => {
        window.location.href = '/my-tournaments'; // Change the URL directly
      };
    
      const handleRedirectToLineup = () => {
        window.location.href = '/TeamLineupF'; // Change the URL directly
      };

      
      useEffect(() => {
        async function fetchTeamData() {
          try {
            const response = await axios.get(`http://localhost:3000/User/getbyemail?email=${USER.email}`);
            const userdata = response.data.roles;
            console.log("Response data:", response.data); // Log the entire response data
            setUserData(userdata);
            console.log("user:", userdata);
          } catch (error) {
            console.error(error);
          }
        }
        fetchTeamData();
      }, []);
      

    // Define the steps based on the user's role
    let steps = [];
    /* if (userData === null) {
        return <div>Loading...</div>;
    } */
        console.log("thisis the switch data"+userData)
        const role = userData; 
        if (userData !== null && userData !== undefined) {
            console.log("this is in and the adata is   "+location)
            switch (true) {
                case userData.includes(12): // Coach
                    if (location.pathname.includes('/TeamLineupF') && userData.includes(12)) {
                        // Add additional steps for coach on the '/TeamLineupF' page
                        steps.push(
                            {
                                id: 'info', // Unique id for the first step
                                message: 'This page will give you access to select your team lineup',
                                trigger: 'infomenu',
                            },
                            {
                                id:'infomenu' ,
                                options: [
                                    { value: 'info', label: 'Info on page', trigger: 'additionalStep' }, // Trigger should point to the id of the next step
                                    { value: 'back', label: 'Back', trigger: '2' }, // Trigger should point to the id of the next step

                                ],
                            },
                            {
                                id: 'additionalStep', // Unique id for the second step
                                message: 'The players of the team are shown in a slider. You can add them to the field by clicking on "Add to Lineup". Also, don\'t forget to save the lineup when you finished :)',
                                trigger:'2' // End the conversation after displaying this message
                            }
                        );
                        
                    }
                
                    steps.push(
                        {
                            id: '1',
                            message: 'Hello! Do you need some help?',
                            trigger: 'prompt',
                        },
                        {
                            id: '2',
                            message: 'if you need more help i\'m here?',
                            trigger: 'prompt',
                        },
                        {
                            id: 'prompt',
                            options: [
                            { value: 'yes', label: 'Yes', trigger: 'introduction' },
                            { value: 'no', label: 'No', end: true },
                            ],
                        },
                        {
                            id: 'matches',
                            user: true,
                            trigger: (value) => {
                              if (typeof value === 'string') {
                                const userInput = value.toLowerCase(); // Convert user input to lowercase for case-insensitive matching
                                if (userInput.includes('today') && userInput.includes('matches')) {
                                  return 'viewTodayMatches'; // If user input contains both "today" and "matches", trigger the next step
                                } else {
                                  return 'prompt'; // If not, stay on the same step
                                }
                              } else {
                                return 'introduction'; // Handle non-string values
                              }
                            }
                          },
                        {
                            id: 'introduction',
                            message: 'Link up tournament is a platform for organizing tournaments...',
                            trigger: 'options',
                        },
                        {
                            id: 'options',
                            message: 'Please choose an option:',
                            //user:true ,
                            trigger: 'menu',
                        },
                        {
                            id: 'menu',
                            options: [
                            { value: 'tournaments', label: 'Tournaments', trigger: 'redirectToTournaments' },
                            { value: 'lineup', label: 'Lineup', trigger: 'redirectToLineup' },
                            { value: 'back', label: 'Back', trigger: 'prompt' },
                            ],
                        },
                        {
                            id: 'redirectToTournaments',
                            message: 'Here you can find the tournaments that your Team is a part of.\n',
                            waitAction: true,
                            trigger: 'redirectingTour',
                        },
                        {
                            id: 'redirectingTour',
                            message:  'Redirecting you to view all tournaments...',
                            delay: 5000,
                            trigger: () => {
                                handleRedirectToTournaments();
                                return 'redirectingTour';
                            },
                        },
                        {
                            id: 'redirectToLineup',
                            message: 'Here as a coach you can select your team lineup',
                            waitAction: true,
                            trigger: 'redirectingLineup',
                        },
                        {
                            id: 'redirectingLineup',
                            message: 'Redirecting you to the team lineup...',
                            delay: 5000,
                            trigger: () => {
                            handleRedirectToLineup();
                            return 'redirectingLineup';
                            },
                        },
                        {
                            id: 'redirecting',
                            component: <div></div>,
                            asMessage: true,
                            end: true,
                        },
                    );
                    /* if (location.pathname.includes('/TeamLineupF')) {
                        // Add additional steps for coach on the '/TeamLineupF' page
                        steps.push(
                            {
                                id:'info' ,
                                options: [
                                    { value: 'info', label: 'Info on page', trigger: 'redirecting' },
                                    ],
                            },
                            {
                            id: 'additionalStep',
                            message: 'This page will give you access to select your team lineup',
                            trigger: 'info',
                        });
                    } */
                    break;
                case userData.includes(11): // Player
                    steps = [
                        {
                            id: '1',
                            message: 'Hello! Do you need some help?',
                            trigger: 'prompt',
                        },
                        {
                            id: 'prompt',
                            options: [
                            { value: 'yes', label: 'Yes', end: true  },
                            { value: 'no', label: 'No', end: true },
                            ],
                        },
                    ];
                    break;
                case userData.includes(20): // Referee
                    steps = [
                        {
                            id: '1',
                            message: 'Hello! Do you need some help?',
                            trigger: 'prompt',
                        },
                        {
                            id: 'prompt',
                            options: [
                            { value: 'yes', label: 'Yes', end: true  },
                            { value: 'no', label: 'No', end: true },
                            ],
                        },
                    ];
                    break;
                case userData.includes(21): // Team Manager
                    steps = [
                        {
                            id: '1',
                            message: 'Hello! Do you need some help?',
                            trigger: 'prompt',
                        },
                        {
                            id: 'prompt',
                            options: [
                            { value: 'yes', label: 'Yes Tea', end: true  },
                            { value: 'no', label: 'No', end: true },
                            ],
                        },
                    ];
                    break;
                // Add cases for other roles as needed
                default:
                    // Default steps for unknown roles
                    steps = [
                        {
                            id: '1',
                            message: 'Hello! Do you need some help?',
                            trigger: 'prompt',
                        },
                        {
                            id: 'prompt',
                            options: [
                            { value: 'yes', label: 'Yes', end: true },
                            { value: 'no', label: 'No', end: true },
                            ],
                        },
                    ];
                    break;
        }
        
        
}

    // Return the ChatBot component with dynamically adjusted steps
    return (
        <ThemeProvider theme={theme}>
            {userData != null ? (
                <ChatBot
                steps={steps}
                floating={true}
                />
            ) : (
                <div></div>
            )}
        </ThemeProvider>
    );
};

export default Chatbot;