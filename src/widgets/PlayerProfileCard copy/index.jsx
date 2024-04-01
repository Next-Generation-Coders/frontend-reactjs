// styling
import styles from './styles.module.scss';

// components
import Spring from '@components/Spring';
import CustomRating from '@ui/CustomRating';
import Like from '@ui/Like';

// assets
import tshirt from '@assets/player_tshirt.webp';

import React, { useState, useEffect } from 'react';

const TeamProfileCard = () => {

    const [teamData, setTeamData] = useState([]);
    const [userData, setUserData] = useState([]);

    useEffect(() => {
        async function fetchTeamData() {
            try {
                const response = await fetch(process.env.REACT_APP_BASE_URL+'/Team/getTeambyTeamManger/65e3b04de506da5b7fdff654');
                const data = await response.json();
                setTeamData(data);
                console.log(data)
            } catch (error) {
                console.error(error);
            }
        }

        async function fetchUserData() {
            try {
                const response = await fetch(process.env.REACT_APP_BASE_URL+'/User/getbyid/65e3b04de506da5b7fdff654'); // team manger id 
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
            <div className="d-flex flex-column justify-content-between">
                <div className={`${styles.main_info} d-flex flex-column g-14`}>
                    <div className="d-flex flex-column g-4">
                        <h1 className="text-20 text-overflow">{teamData.name}</h1>
                        <span className="text-12"> Team Manager : {userData.fullname} </span>
                    </div>
                </div>
                <div className="d-flex justify-content-between align-items-center">
                    <CustomRating value={4.5} max={5} type="stars" isCompact />
                    <Like qty={27} isLiked withText/>
                </div>
            </div>
            <div className={styles.media}>
                <img src={tshirt} alt="player tshirt" />
            </div>
        </Spring>
    )
}

export default TeamProfileCard