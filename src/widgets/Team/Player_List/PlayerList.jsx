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

import {useAuthContext} from "@hooks/useAuthContext";
import axios from 'axios';


import { CardActionArea } from '@mui/material';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';

const PlayerList = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [teamData, setTeamData] = useState([]);
    const { USER } = useAuthContext();

    useEffect(() => {
        async function fetchTeamData() {
            try {
                const userResponse = await axios.get(`http://localhost:3000/User/getbyemail?email=${USER.email}`);
                const userId = userResponse.data._id;
                const response = await fetch(`http://localhost:3000/Team/getTeambyTeamManger/${userId}`);
                const data = await response.json();
                setTeamData(data);
            } catch (error) {
                console.error(error);
            }
        }
        fetchTeamData();
    }, []);

    const handleSearch = () => {
        console.log("Recherche effectuée :", searchTerm);
    };

    return (
        <Spring className="card h-fit card-padded">
            <div className="card h-fit card-padded">
                {/* Header */}
                {/* <div style={{ display: 'flex', alignItems: 'center', width: '30%' }}>
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
                </div> */}
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                    <h3>Players</h3>
                </div>
                {/* Player Cards */}
                <Spring className="card h-fit card-padded">
                <div style={{ textAlign: 'left', display: 'inline-flex', justifyContent: 'space-between', padding: '10px' }}>                        {teamData.playerNames && teamData.playerNames.map((player, index) => (
                            <Link key={index} to={"/player-profile"} state={{ playerId: player.id }} style={{ textDecoration: 'none', color: 'inherit' }}>
                                <Card sx={{ width: 160, height: 180,  marginBottom: '100px', backgroundColor: "#FCC93F" ,margin: '0 6px' }}> 
                                    <br />
                                    <CardActionArea> 
                                        <CardMedia 
                                            component="img"
                                            height="50"
                                            image="https://lh3.googleusercontent.com/a/ACg8ocIu_fdBLNNd7jslkDNR0mxKfGyciEWI1_QF1RIe3Kun=s96-c"
                                            /* image={player.fullname} */
                                            alt={player.fullname}

                                            style={{
                                                borderRadius: "50%",
                                                width: 70,
                                                height: 70,
                                                background: "red",
                                                display: "block",
                                                marginLeft:"auto" ,
                                                marginRight:"auto" ,
                                              }}
                                        />
                                        <Typography variant="body2" color="text.secondary" style={{
                                            position: 'absolute',
                                            bottom: 0,
                                            right: 0,
                                            backgroundColor: 'rgba(255, 255, 255, 0.5)',
                                            padding: '8px 12px',
                                            borderRadius: '4px',
                                        }}>
                                            {player.jersyNumber}
                                        </Typography>
                                        <CardContent style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' ,height: '100%',}}>
                                            <Typography gutterBottom variant="h5" component="div">
                                                {player.fullname}
                                            </Typography>
                                            <Typography variant="body2" color="text.secondary">
                                                <strong> {player.position}</strong>
                                            </Typography>
                                        </CardContent>
                                    </CardActionArea>
                                </Card>
                            </Link>
                        ))}
                    </div>
                </Spring>
            </div>
        </Spring>
    );
};

export default PlayerList;