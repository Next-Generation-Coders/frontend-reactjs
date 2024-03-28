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
    const { playerId } = location.state || {};
    const [previousTeams, setPreviousTeams] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        async function fetchPreviousTeams() {
            try {
                const userResponse = await fetch(`http://localhost:3000/User/getbyid/${playerId}`);
                const userData = await userResponse.json();
                const teamsData = await Promise.all(userData.teams.map(async (teamId) => {
                    const teamResponse = await fetch(`http://localhost:3000/Team/getbyid/${teamId}`);
                    return teamResponse.json();
                }));
                setPreviousTeams(teamsData);
                setIsLoading(false);
            } catch (error) {
                console.error(error);
                setIsLoading(false);
            }
        }

        if (playerId) {
            fetchPreviousTeams();
        } else {
            console.log("Player ID not found");
        }
    }, [playerId]);

    return (
        <Spring className={`${styles.container} card card--side-shadow`}>
            <h3 className="card_header">Previous Teams</h3>
            <DraggableScrollContainer className={`${styles.list} card_footer d-flex`}>
                {isLoading ? (
                    <div>Loading...</div>
                ) : (
                    previousTeams.map((teamData) => (
                        <Spring key={teamData._id} className={`${styles.list_item} d-flex flex-column align-items-center g-14`}>
                            <LazyImage className="club-logo club-logo--lg" src={teamData.logo} alt={teamData.name}/>
                            <span className="text-12">{teamData.name}</span>
                        </Spring>
                    ))
                )}
            </DraggableScrollContainer>
        </Spring>
    );
};

export default PreviousTeams;