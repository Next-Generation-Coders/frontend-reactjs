// styling
import styles from './styles.module.scss';

// components
import Spring from '@components/Spring';
import CustomRating from '@ui/CustomRating';
import Like from '@ui/Like';

// assets
import tshirt from '@assets/player_tshirt.webp';

import React, { useState, useEffect } from 'react';
import LazyImage from '@components/LazyImage';

import {useAuthContext} from "@hooks/useAuthContext";
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useLocation   } from 'react-router-dom';
const TeamProfileCard = () => {
    const [teamData, setTeamData] = useState([]);
    const [userData, setUserData] = useState([]);
    const [teamRating, setTeamRating] = useState(null); // State to store team rating
    const {USER} = useAuthContext();
    const { state } = useLocation();
const teamId = state ? state.teamId : null;

    
    
    useEffect(() => {
        async function fetchTeamData() {
            
            try {
                let teamDataResponse;
                if (!teamId) {
                    const userResponse = await axios.get(`http://localhost:3000/User/getbyemail?email=${USER.email}`);
                    const userId = userResponse.data._id;
                    teamDataResponse = await fetch(`http://localhost:3000/Team/getTeambyTeamManger/${userId}`);
                } else {
                    teamDataResponse = await fetch(`http://localhost:3000/Team/getbyid/${teamId}`);
                }
    
                const teamData = await teamDataResponse.json();
                setTeamData(teamData);
                fetchTeamRating(teamData._id);
            } catch (error) {
                console.error(error);
            }
        }

        /* async function fetchUserData() {
            try {
                const userResponse = await axios.get(`http://localhost:3000/User/getbyemail?email=${USER.email}`);
                const userId = userResponse.data._id;
                const response = await fetch(`http://localhost:3000/User/getbyid/${userId}`);
                const data = await response.json();
                setUserData(data);
            } catch (error) {
                console.error(error);
            }
        } */

        // Function to fetch team rating
        const fetchTeamRating = async (teamId) => {
            try {
                const response = await fetch(`http://localhost:3000/Team/getTeamRating/${teamId}`);
                const ratingData = await response.json();
                //console.log(ratingData.rating+"......")
                const rate =ratingData.rating
                setTeamRating(rate); // Update team rating state
                //console.log(teamRating+",,,,,,,,,,,,,,,,,,,,,,,")
            } catch (error) {
                console.error('Error fetching team rating:', error);
            }
        };

        //fetchTeamRating();
        fetchTeamData();
        //fetchUserData(); 
        
    }, []);


    useEffect(() => {
        console.log('teamRating changed:', teamRating);
    },[teamRating])
    

    return (
        <Spring className={`${styles.container} card h-1 g-30 card-padded`}>
            <div className="d-flex">
                <div className={styles.media} >
                    <LazyImage style={styles.img} src={teamData.logo ? teamData.logo : "https://static.vecteezy.com/system/resources/previews/027/385/965/original/blank-e-sport-shield-badge-png.png"} alt="https://clipart-library.com/img/1094138.jpg" />
                </div>
                <div className="d-flex flex-column justify-content-between" style={{ width: '100%' }}>
                    <div className={`${styles.main_info} d-flex flex-column g-14`}>
                        <div className="d-flex flex-column g-4">
                            <h1 className="text-20 text-overflow">{teamData.name}</h1>
                            {/* {userData.fullname && ( */}
                                <>
                                {teamData.teamManagerName && teamData.teamManagerName.map(manager => (
                                        <span key={manager.id} className="text-12"> Team Manager: {manager.fullname} </span>
                                        ))}
                                {teamData.coachName && teamData.coachName.length > 0 && !teamData.coachNameRendered && (
                                    <>
                                    <Link to={"/coach-profile"} state={{ playerId: teamData.coach }} style={{ textDecoration: 'none', color: 'inherit' }}>
                                        {teamData.coachName && teamData.coachName.map(coach => (
                                        <span key={coach.id} className="text-12"> Coach: {coach.fullname} </span>
                                        ))}
                                    </Link>
                                    </>
                                )}
                                </>
                                
                            {/* )} */}
                        </div>
                    </div>
                    <div className="d-flex justify-content-between align-items-center">
                        {teamRating !== null ? (
                            <CustomRating value={teamRating} max={5} type="stars" isCompact />
                        ) : null}
                        {/* <Like qty={27} isLiked withText/> */}
                    </div>
                </div>
            </div>
        </Spring>
    );
};


export default TeamProfileCard