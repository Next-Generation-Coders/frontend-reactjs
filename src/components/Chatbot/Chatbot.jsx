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
    const [hasTeam, setHasTeam] = useState(false);
    let userData2 ;
    const [lineup, setLineup] = useState([]);
    const [lineupFetched, setLineupFetched] = useState(false);



    const menuOptions = hasTeam
    ? [
        { value: 'Add_Player', label: 'Add Player', trigger: 'redirectToPlayerAddingName' },
        { value: 'Team_Profile', label: 'Team Profile', trigger: 'redirectToTeamProfile' },
        { value: 'Back', label: 'Back', trigger: 'prompt' }
        ]
    : [
        { value: 'Create_Team', label: 'Create Team', trigger: 'redirectToTeamCreation' },
        { value: 'Team_Profile', label: 'Team Profile', trigger: 'redirectToTeamProfile' },
        { value: 'Back', label: 'Back', trigger: 'prompt' }
        ];

    const handleRedirectToTournaments = () => {
        window.location.href = '/my-tournaments'; // Change the URL directly
      };
    
    const handleRedirectToLineup = () => {
        window.location.href = '/TeamLineupF'; // Change the URL directly
    };

    const handleRedirectToAddTeamPlayer = () => {
        window.location.href = `/add-new-player`; // Change the URL directly
        
    };

    const handleRedirectToAddTeamPlayerName = (playerName) => {
        sessionStorage.setItem('playerName', playerName);
        //window.location.href = `/add-new-player`; // Change the URL directly
        
    };

    const handleRedirectToAddTeamPlayerAge = (playerAge) => {
        sessionStorage.setItem('playerAge', playerAge);
        //window.location.href = `/add-new-player`; // Change the URL directly
        
    };

    const handleRedirectToTeamProfile = () => {
        window.location.href = '/team-Profile'; // Change the URL directly
    };

    

      
    useEffect(() => {
        async function fetchData() {
          try {
            const response = await axios.get(`http://localhost:3000/User/getbyemail?email=${USER.email}`);
            const userdata = response.data.roles;
            console.log("Response data:", response.data);
            setUserData(userdata);
            console.log("user:", userdata);
      
            if (userdata.includes(21)) {
              const UserId = response.data._id;
              const responseTeam = await axios.get(`http://localhost:3000/Team/checkTeam_manager/${UserId}`);
      
              if (responseTeam) {
                setHasTeam(true);
              } else {
                setHasTeam(false);
              }
            }
      
            const userResponse = await axios.get(`http://localhost:3000/User/getbyemail?email=${USER.email}`);
            const userId = userResponse.data.currentTeam;
            const lineupResponse = await fetch(`http://localhost:3000/Team/getLineup/${userId}`);
            const lineupData = await lineupResponse.json();
            console.log('Lineup Data:', lineupData.lineup.playerNames);
      
            setLineup(lineupData.lineup.playerNames);

            console.log("lllllllllllllll : ", lineup);
          } catch (error) {
            console.error(error);
          }
        }
      
        fetchData();
        console.log('Lineup:', lineup);
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
                            trigger: 'LineupDetails',
                        },
                        {
                            id: 'LineupDetails',
                            
                            component: (
                                <>
                                    {lineup.length > 0 ? (
                                        <div>
                                        <p>This is the List of players on the lineup:</p>
                                        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                                          <thead>
                                            <tr>
                                              <th style={{ border: '1px solid #dddddd', padding: '8px', textAlign: 'left' }}>Name</th>
                                              <th style={{ border: '1px solid #dddddd', padding: '8px', textAlign: 'left' }}>Position</th>
                                            </tr>
                                          </thead>
                                          <tbody>
                                            {lineup.map((player, index) => (
                                              <tr key={index}>
                                                <td style={{ border: '1px solid #dddddd', padding: '8px', textAlign: 'left' }}>{player.fullname}</td>
                                                <td style={{ border: '1px solid #dddddd', padding: '8px', textAlign: 'left' }}>{player.position}</td>
                                              </tr>
                                            ))}
                                          </tbody>
                                        </table>
                                      </div>
                                                                        
                                    ) : (
                                        <div>Loading lineup...</div>
                                    )}
                                </>
                            ),
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
                    /* if (location.pathname.includes('/team-Profile') && userData.includes(21)) {
                        // Add additional steps for coach on the '/TeamLineupF' page
                        steps.push(
                            {
                                id: 'infoTM', // Unique id for the first step
                                message: 'This page will give you access to view your team details',
                                trigger: 'infomenuTM',
                            },
                            {
                                id:'infomenuTM' ,
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
                        
                    } */
                    steps = [
                        {
                            id: '1',
                            message: 'Hello! Do you need some help?',
                            trigger: 'prompt',
                        },
                        {
                            id: 'prompt',
                            options: [
                            { value: 'yes', label: 'Yes', trigger: 'introduction'  },
                            { value: 'no', label: 'No', end: true },
                            ],
                        },
                        {
                            id: 'introduction',
                            message: "Welcome to Link Up Tournament! We are a platform for organizing tournaments between teams. As a team manager , you can create your own team, add players, and compete in exciting tournaments. Get ready to showcase your skills and connect with other teams!\n",
                            trigger: 'optionsTM',
                        },
                        {
                            id: 'optionsTM',
                            message: 'Please choose an option:',
                            //user:true ,
                            trigger: 'menuTM',
                        },
                        {
                            id: 'menuTM',
                            options :menuOptions
                        },
                        {
                            id: 'redirectToTeamCreation',
                            message: "Welcome! Here you can create your own team.\n",                       
                            waitAction: true,
                            trigger: 'rederictingcreateTeamAddPlayerName',
                        },
                        {
                            id: 'redirectToPlayerAddingName',
                            message: "You want to add a Player. What is he's full name ?\n",  
                            waitAction: true,
                            trigger: 'rederictingcreateTeamAddPlayerName',
                        },
                        {
                            id: 'rederictingcreateTeamAddPlayerName',
                            message:  'Player name is {previousValue}',
                            delay: 3000,
                            user: true,
                            trigger: ({value}) => {
                                const playerName = value; // Get the captured player name
                                handleRedirectToAddTeamPlayerName(playerName); // Redirect with the captured player name
                                return 'redirectToPlayerAddingAge'
                            },                            
                        },
                        {
                            id: 'redirectToPlayerAddingAge',
                            message: "Player name is {previousValue}. How old is he ?\n",  
                            waitAction: true,
                            trigger: 'rederictingcreateTeamAddPlayersAge',
                        },
                        {
                            id: 'rederictingcreateTeamAddPlayersAge',
                            message:  'Player age is {previousValue}',
                            delay: 3000,
                            user: true,
                            trigger: ({value}) => {
                                const playerAge = value; // Get the captured player name
                                handleRedirectToAddTeamPlayerAge(playerAge); // Redirect with the captured player name
                                return 'redirectToPlayerAdding'
                            },                            
                        },
                        {
                            id: 'redirectToPlayerAdding',
                            message: "Player age is {previousValue}. Ok now redirecting to finish filling the fields!\n",  
                            waitAction: true,
                            trigger: 'rederictingcreateTeamAddPlayer',
                        },
                        {
                            id: 'rederictingcreateTeamAddPlayer',
                            message:  'Player age is {previousValue}',
                            delay: 3000,
                            user: true,
                            trigger: () => {
                                handleRedirectToAddTeamPlayer(); // Redirect with the captured player name
                                return 'rederictingcreateTeamAddPlayer'
                            },                            
                        },
                        {
                            id: 'redirectToTeamProfile',
                            //message: 'Here you can find more information on your team, list of the players , tournaments that your team is a prat of and a calender to always stay tuned for upcoming matches.\n',
                            message: "Welcome to your team profile! Here, you can find all the important details about your team. Explore the list of players, discover the tournaments your team is a part of, and stay up-to-date with our calendar for upcoming matches. We're here to help you stay connected and informed!\n",
                            waitAction: true,
                            trigger: 'redirectToProfileOfTeam',
                        },
                        {
                            id: 'redirectToProfileOfTeam',
                            message:  'Redirecting you to the attempted page...',
                            delay: 15000,
                            trigger: () => {
                                handleRedirectToTeamProfile();
                                return 'redirectToProfileOfTeam';
                            },
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
            {userData != null && lineup.length > 0 ? (
                <ChatBot
                recognitionEnable={true}
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