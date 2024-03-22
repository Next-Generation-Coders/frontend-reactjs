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

const TeamProfileCard = () => {

    const [teamData, setTeamData] = useState([]);
    const [userData, setUserData] = useState([]);
    const {USER} = useAuthContext();

    useEffect(() => {
        async function fetchTeamData() {
            const userResponse = await axios.get(`http://localhost:3000/User/getbyemail?email=${USER.email}`);
            const userId = userResponse.data._id;
            try {
                const response = await fetch(`http://localhost:3000/Team/getTeambyTeamManger/${userId}`);
                const data = await response.json();
                setTeamData(data);
            } catch (error) {
                console.error(error);
            }
        }

        async function fetchUserData() {
            try {
                const userResponse = await axios.get(`http://localhost:3000/User/getbyemail?email=${USER.email}`);
                const userId = userResponse.data._id;
                const response = await fetch(`http://localhost:3000/User/getbyid/${userId}`); // team manger id 
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

    console.log(teamData , userData)

    return (
        <Spring className={`${styles.container} card h-1 g-30 card-padded`}>
            <div className="d-flex">
                <div className={styles.media} >
                    <LazyImage style={styles.img} src={teamData.logo} alt="Team Logo" />
                </div>
                <div className="d-flex flex-column justify-content-between" style={{ width: '100%' }}>
                    <div className={`${styles.main_info} d-flex flex-column g-14`}>
                        <div className="d-flex flex-column g-4">
                            <h1 className="text-20 text-overflow">{teamData.name}</h1>
                            {userData.fullname && (
                                <span className="text-12"> Team Manager: {userData.fullname} </span>
                            )}
                            <div>
                                {teamData.coachName && teamData.coachName.map(coach => (
                                    <span key={coach.id} className="text-12"> Coach: {coach.fullname} </span>
                                ))}
                            </div>
                        </div>
                    </div>
                    <div className="d-flex justify-content-between align-items-center">
                        <CustomRating value={4.5} max={5} type="stars" isCompact />
                        <Like qty={27} isLiked withText/>
                    </div>
                </div>
            </div>
        </Spring>

    )
}

export default TeamProfileCard