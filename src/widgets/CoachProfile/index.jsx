// styling
import styles from './styles.module.scss';

// components
import Spring from '@components/Spring';
import CustomRating from '@ui/CustomRating';
import Like from '@ui/Like';

// assets
import tshirt from '@assets/player_tshirt.webp';

import React, { useState, useEffect } from 'react';
import { useLocation   } from 'react-router-dom';

const PlayerProfileCard = () => {
    
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
                const response = await fetch(`http://localhost:3000/Team/getbyid/${userData.currentTeam}`);
                const data = await response.json();
                setTeamData(data);
                console.log(data)
            } catch (error) {
                console.error(error);
            }
        }

        async function fetchUserData() {
            try {
                const response = await fetch(`http://localhost:3000/User/getbyid/${playerId}`); // team manger id 
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
        <Spring className={`${styles.container} card h-1  card-padded`}>
            <div className="d-flex flex-column justify-content-between">
                <div className={`d-flex flex-column g-14`}>
                    <div className="d-flex flex-column g-4">
                        <br />
                        <h1 className="text-40">{userData.fullname}</h1>
                        <h5 className="text-overflow">{userData.email}</h5>
                    </div>
                </div>
                <div className="d-flex justify-content-between align-items-center">
                    <Like qty={userData.rate} isLiked withText/>
                </div>
            </div>
            <div className={styles.media}>
                <img src={userData.avatar} alt="player picture" />
            </div>
        </Spring>
    )
}

export default PlayerProfileCard