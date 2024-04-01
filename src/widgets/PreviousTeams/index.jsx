// styling
import styles from './styles.module.scss';

// components
import Spring from '@components/Spring';
import LazyImage from '@components/LazyImage';
import DraggableScrollContainer from '@components/DraggableScrollContainer';

// constants
import CLUBS from '@constants/clubs';
import { useLocation   } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
const PreviousTeams = () => {

    const location = useLocation();
    console.log(location)
    const { playerId } = location.state || {}; // Set a default value for playerId if it's undefined
    console.log(playerId)
    if (!playerId) {
        // Redirect to a fallback page if the playerId is not available
        console.log("error player id ")
    }

    const [teamData, setTeamData] = useState([]);
    const [userData, setUserData] = useState([]);

    useEffect(() => {
        async function fetchTeamData() {
            try {
                const response = await fetch(process.env.REACT_APP_BASE_URL+`/Team/getbyid/${userData.currentTeam}`);
                const data = await response.json();
                setTeamData(data);
                console.log(data)
            } catch (error) {
                console.error(error);
            }
        }

        async function fetchUserData() {
            try {
                const response = await fetch(process.env.REACT_APP_BASE_URL+`/User/getbyid/${playerId}`); // team manger id 
                const data = await response.json();
                setUserData(data);
                console.log(userData)
            } catch (error) {
                console.error(error);
            }
        }

        fetchTeamData();
        fetchUserData(); 
    }, []);
    return (
        <Spring className={`${styles.container} card card--side-shadow`}>
            <h3 className="card_header">Previous Teams</h3>
            <DraggableScrollContainer className={`${styles.list} card_footer d-flex`}>
                {
                        <Spring className={`${styles.list_item} d-flex flex-column align-items-center g-14`}>
                            <LazyImage className="club-logo club-logo--lg" src={teamData.logo} alt={teamData.name}/>
                            <span className="text-12">{teamData.name}</span>
                        </Spring>
                }
            </DraggableScrollContainer>
        </Spring>
    )
}

export default PreviousTeams