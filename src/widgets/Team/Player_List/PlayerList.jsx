// styles
import { Dialog, DialogTitle, DialogContent, DialogActions, Button } from '@mui/material';

// styled components
import {StyledEventsCalendar, Header} from './styles';

// components
import Spring from '@components/Spring';

// hooks
import {useState, useEffect} from 'react';

import { FaSearch } from "react-icons/fa";
import { Link } from 'react-router-dom';


const PlayerList = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [teamData, setTeamData] = useState([]);
    const [playerData, setPlayerData] = useState([]);

    useEffect(() => {
        async function fetchTeamData() {
            try {
                const response = await fetch(process.env.REACT_APP_BASE_URL+'/Team/getTeambyTeamManger/65e3b04de506da5b7fdff654');
                const data = await response.json();
                setTeamData(data);
            } catch (error) {
                console.error(error);
            }
        }
        async function fetchPlayerData() {
            try {
                const response = await fetch(process.env.REACT_APP_BASE_URL+`/User/getPlayersByIds/+${teamData.players}`);
                const data = await response.json();
                setPlayerData(data);
            } catch (error) {
                console.error(error);
            }
        }
        fetchTeamData();
        /* fetchPlayerData(); */
    }, []);

    const handleSearch = () => {
        console.log("Recherche effectuée :", searchTerm);
    };

    //console.log(JSON.stringify(teamData)+"--------------------")

    //console.log(JSON.stringify(playerData)+"+++++++++++++++++++")

    return (
        <Spring className="card h-fit card-padded">
            <div className="card h-fit card-padded">
                {/* Header */}
                <div style={{ display: 'flex', alignItems: 'center', width: '30%' }}>
                    <input
                        type="text"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        placeholder="To research..."
                        style={{ flex: '1', fontSize: '15px', padding: '5px', borderBottom: '2px solid #ddd', alignItems: 'center' }}
                    />
                    <Button onClick={handleSearch} style={{ backgroundColor: 'yellow', color: 'black', borderRadius: '20%' }}>
                        <FaSearch />
                    </Button>
                </div>

                {/* Player Table */}
                <div style={{ width: '100%', overflowX: 'auto', padding: '10px' }}>
                    <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                        <thead>
                            <tr>
                                <th style={{ padding: '10px', textAlign: 'left', fontWeight: 'bold', borderBottom: '1px solid #ddd' }}>Name</th>
                                <th style={{ padding: '10px', textAlign: 'left', fontWeight: 'bold', borderBottom: '1px solid #ddd' }}>Jersey Number</th>
                                <th style={{ padding: '10px', textAlign: 'left', fontWeight: 'bold', borderBottom: '1px solid #ddd' }}>Position</th>
                                <th style={{ padding: '10px', textAlign: 'left', fontWeight: 'bold', borderBottom: '1px solid #ddd' }}>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {teamData.playerNames && teamData.playerNames.map((player, index) => (
                                <tr key={index}>
                                    <td style={{ padding: '10px', borderBottom: '1px solid #ddd' }}>{player.fullname}</td>
                                    <td style={{ padding: '10px', borderBottom: '1px solid #ddd' }}>{player.jerseyNumber}</td>
                                    <td style={{ padding: '10px', borderBottom: '1px solid #ddd' }}>{player.position}</td>
                                    <td style={{ padding: '10px', borderBottom: '1px solid #ddd' }}>
                                    <Link
                                        to={"/player-profile"}
                                        state={{playerId: player.id}}>
                                            <Button style={{ backgroundColor: 'red' }} ><b style={{ color: 'white' }}>View Profile</b></Button>
                                        </Link>
                                        {/* <Link to={`/player-profile/${player.id}`}>
                                            <Button style={{ backgroundColor: 'red' }} ><b style={{ color: 'white' }}>View Profile</b></Button>
                                        </Link> */}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </Spring>
    );
};


export default PlayerList