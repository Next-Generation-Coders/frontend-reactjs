// components
import Spring from '@components/Spring';
// styling
import styles from './styles.module.scss';
import { useLocation   } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
const ProfileOverview = () => {
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

        async function fetchUserData() {
            try {
                const userResponse =await fetch(`http://localhost:3000/User/getbyid/${playerId}`) ;
                const userData = await userResponse.json();
                setUserData(userData);

                const teamResponse =await fetch(`http://localhost:3000/Team/getbyid/${userData.currentTeam}`) ;
                const teamData = await teamResponse.json();
                setTeamData(teamData);
            } catch (error) {
                console.error(error);
            }
        }
        fetchUserData();         
    }, []);
 
    return (

        <Spring className={` card card--side-shadow`}>
                    <div className={`${styles.player_profile_header}`}>
                        <img src="https://png.pngtree.com/png-vector/20191121/ourmid/pngtree-blue-bird-vector-or-color-illustration-png-image_2013004.jpg" alt="Team logo" className={`${styles.team_logo }`} />
                        {/* <img src={teamData.logo} alt="Team logo" className="team-logo" /> */}
                        <div className="team-details">
                            <h2 className={`${styles.team_name}`}>{teamData.name}</h2>
                        </div>
                    </div>

                    
                    <div className={`${styles.player_profile_body}`}>
                        <div className={`${styles.player_profile_body_item}`}>
                            {/* <p>Email</p>
                            <h4>{userData.email}</h4> */}
                            <p>Age</p>
                            <h4>{userData.age} yrs</h4>
                            <span className="player-position">Position:</span>
                            <h4 className="player-position">{userData.position}</h4>
                        </div>
                        <div className={`${styles.player_profile_body_item}`}>
                            {/* <p>Nationality</p>
                            <h4>{userData.nationality}</h4> */}
                            <p>Height</p>
                            <h4>{userData.height} cm</h4>
                            <p>Preferred Foot</p>
                            <h4>{userData.preferredFoot}R</h4>
                        </div>
                        
                    </div>
                    <div className={`${styles.player_profile_body_item}`}>
                            <p>Value :</p>
                            <h3>{userData.value}</h3>
                        </div>
                    
        </Spring>
    )
}

export default ProfileOverview