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

        <Spring className="card player-profile">
                    <div className="player-profile-header">
                        <img src={teamData.logo} alt="Team logo" className="team-logo" />
                        <div className="player-info">
                        <h2 className="player-name">{teamData.name}</h2>
                        </div>
                    </div>

                    <div className="player-profile-body">
                        <div className="details-section">
                        <h3>DETAILS</h3>
                        <p>Email : {userData.email}</p>
                        <p>Age : {userData.age} yrs</p>
                        <span className="player-position">Position : {userData.position}</span>
                        <p>Nationality : </p>
                        <p>Height : {userData.height} cm</p>
                        <p>Preferred Foot : {userData.preferredFoot}</p>
                        </div>
                        <div className="statistics-section">
                        <h3>Value : {userData.value}</h3>
                        </div>
                    </div>
        </Spring>
    )
}

export default ProfileOverview