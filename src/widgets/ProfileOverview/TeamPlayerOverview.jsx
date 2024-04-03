// components
import Spring from '@components/Spring';
import ClubInfo from '@components/ClubInfo';
import ProgressInfo from '@ui/ProgressInfo';
import SimpleLineChart from '@components/SimpleLineChart';
import styles from './styles.module.scss';
import { useLocation   } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
const TeamPlayerOverview = () => {

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
        <Spring className="card h-1 d-flex flex-column justify-content-between card-padded">
            <div className={`info d-flex align-items-center g-20`}>
            <img className="club-logo" src={teamData.logo} alt={teamData.name}/>
                <div className="main d-flex flex-column">
                    <h3>{teamData.name}</h3>
                    <span className="text-12"></span>
                </div>
            </div>
            <div className="align-items-center justify-content-between">
                <div className="d-flex justify-content-between align-items-center">
                    <div className="d-flex flex-column g-4 align-items-center">
                            <span className="h6 label">
                                Nationality
                            </span>
                            <h3>{userData.country?.label ?? 'Unknown'}</h3>
                    </div>
                    <div className="d-flex flex-column g-4 align-items-center">
                            <span className="h6 label">
                                Age
                            </span>
                            <h3>{userData.age}yrs</h3>
                    </div>
                    <div className="d-flex flex-column g-4 align-items-center">
                            <span className="h6 label">
                                Position
                            </span>
                            <h3>{userData.position?? 'Unknown'}</h3>
                    </div>
                </div>
                <div className="d-flex justify-content-between align-items-center ">
                    <div className="d-flex flex-column g-4 align-items-center">
                            <span className="h6 label">
                                Shirt number
                            </span>
                            <h3>{userData.jersyNumber?? 'Unknown'}</h3>
                    </div>
                    <div className="d-flex flex-column g-4 align-items-center">
                            <span className="h6 label">
                                Height
                            </span>
                            <h3>{userData.height?? 'Unknown'}</h3>
                    </div>
                    <div className="d-flex flex-column g-4 align-items-center">
                            <span className="h6 label">
                                Preferred foot
                            </span>
                            <h3>{userData.preferedFoot?? 'Unknown'}</h3>
                    </div>
                </div>
            </div>
        </Spring>
    )
}

export default TeamPlayerOverview