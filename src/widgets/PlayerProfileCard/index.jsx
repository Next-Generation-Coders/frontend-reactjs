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
import {useAuthContext} from "@hooks/useAuthContext";
import axios from 'axios';
const PlayerProfileCard = () => {
    const {USER} = useAuthContext() ;
    const location = useLocation();
    //console.log(location)
  const { playerId } = location.state || {}; // Set a default value for playerId if it's undefined
//console.log(playerId)
  if (!playerId) {
    // Redirect to a fallback page if the playerId is not available
    console.log("error player id ")
  }
    const [teamData, setTeamData] = useState([]);
    const [playerData, setplayerData] = useState([]);
    const [userData, setUserData] = useState([]);
    const [checkData, setCheckData] = useState(false);
    const [qtyData, setQtykData] = useState(false);

    useEffect(() => {
        async function fetchTeamData() {
                /* const userResponse = await axios.get(`http://localhost:3000/User/getbyemail?email=${USER.email}`);
                const userId = userResponse.data._id;
                setUserData(userId)

                const CheckResponse = await fetch(`http://localhost:3000/User/checkLiked/${playerId}/${userId}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });
                //const checkDatam = await CheckResponse.json();
                //setCheckData(checkDatam)

                const data = await CheckResponse.json();
                console.log(data+"............................................");
                setCheckData(data); */

            try {
                const response = await fetch(`http://localhost:3000/Team/getbyid/${playerData.currentTeam}`);
                const data = await response.json();
                setTeamData(data);
                //console.log(data)
            } catch (error) {
                console.error(error);
            }
        }

        async function fetchplayerData() {
            try {
                const response = await fetch(`http://localhost:3000/User/getbyid/${playerId}`); // team manger id 
                const data = await response.json();

                console.log("DDDD",data)
                setplayerData(data);
                //console.log(playerData)
            } catch (error) {
                console.error(error);
            }
        }

        async function fetchLikes() {
            try {
                const userResponse = await axios.get(`http://localhost:3000/User/getbyemail?email=${USER.email}`);
                const userId = userResponse.data._id;
                const CheckResponse = await fetch(`http://localhost:3000/User/checkLiked/${playerId}/${userId}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });
                //const checkDatam = await CheckResponse.json();
                //setCheckData(checkDatam)

                const data = await CheckResponse.json();
                //console.log(data.isLiked+"............................................");
                const d= data.isLiked;
                setCheckData(d);

                const qty=data.qty ;
                setQtykData(qty)
                //console.log(checkData+".+++++++++++.."+qtyData);
            } catch (error) {
                console.error(error);
            }
        }

        fetchLikes();
        fetchTeamData();
        fetchplayerData(); 
        
    }, [playerId,checkData]);

    return (
        <Spring className={`${styles.container} card h-1  card-padded`}>
            <div className="d-flex flex-column justify-content-between">
                <div className={`d-flex flex-column g-14`}>
                    <div className="d-flex flex-column g-4">
                        <br />
                        <h1 className="text-40">{playerData.fullname}</h1>
                        <h5 className="text-overflow">{playerData.email}</h5>
                    </div>
                </div>
                <div className="d-flex justify-content-between align-items-center">
                    <Like playerId={playerId} isLiked={checkData} withText qty={qtyData} />
                </div>
            </div>
            <div className={styles.media}>
                <img src={playerData.avatar} alt="player picture" />
            </div>
        </Spring>
    )
}

export default PlayerProfileCard