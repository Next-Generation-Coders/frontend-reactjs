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
import { toast } from 'react-toastify';

import {useAuthContext} from "@hooks/useAuthContext";
import axios from 'axios';


import { CardActionArea } from '@mui/material';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { useLocation   } from 'react-router-dom';


// Define position categories
const positionMap = { 
    GK: "Goalkeeper",
    CB: "Defender",
    RB: "Defender",
    LB: "Defender",
    RWB: "Defender",
    LWB: "Defender",
    CM: "Midfielder",
    CDM: "Midfielder",
    CAM: "Midfielder",
    RM: "Midfielder",
    LM: "Midfielder",
    ST: "Forward",
    CF: "Forward",
    RF: "Forward",
    LF: "Forward",
    RW: "Forward",
    LW: "Forward"
};

const images = [
    'https://media.asroma.com/prod/images/square_medium_fill/c431a82a89dd-5be9a56f0985-lukaku-copia.png',
    'https://www.orlandopiratesfc.com/storage/2024/01/01eb1374cd229ff7c7433e966baae768.png',
    'https://www.indiansuperleague.com/static-assets/images/players/33676.png?v=100.82',
    'https://media.asroma.com/prod/images/square_medium_fill/143a6bf28f85-rui-patricio-copia.png',
    'https://www.valenciacf.com/public/Image/2024/1/diakhaby_Retrato.png',
    'https://media.ol.fr/uploads/assets/Henrique_e2b12fe9f1.png?twic=v1/focus=auto/cover=400x533',
    'https://www.olympiacos.org/wp-content/uploads/2024/01/02/Martins-PANIGIRIKO.png',
  ];

const PlayerList = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [teamData, setTeamData] = useState([]);
    const { USER } = useAuthContext();

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
            } catch (error) {
                console.error(error);
            }
        }
        fetchTeamData();
    }, []);

    const handleSearch = () => {
        console.log("Recherche effectuée :", searchTerm);
    };

    
    const removePlayerFromTeam = async (playerId, name) => {
        try {
            // Show confirmation dialog
            const confirmRemove = window.confirm(`Are you sure you want to remove ${name} from the team?`);
            if (!confirmRemove) {
                return; // Exit if user cancels the removal
            }
    
            // Proceed with removal if user confirms
            const response = await axios.delete(`http://localhost:3000/Team/removePlayerFromTeam?idPlayer=${playerId}`);
            toast.success(name + ' has been successfully removed from the team!');
            return response.data; // Return any data returned by the backend
        } catch (error) {
            console.error('Error removing player from team:', error);
            throw error; // Rethrow the error to be handled by the caller
        }
    };
    

    // Group players by position category
    const categorizedPlayers = {};
    teamData.playerNames?.forEach(player => {
        console.log("team players : "+player.position)
        const category = positionMap[player.position] || 'Other';
        categorizedPlayers[category] = [...(categorizedPlayers[category] || []), player];
    });

    // Define the order of categories
    const categoryOrder = ['Forward' ,'Midfielder' , 'Defender','Goalkeeper' ];

    return (
        <Spring className="card h-fit card-padded">
            <div className="card h-fit card-padded">
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                    <h3>Players</h3>
                </div>
                {/* Render players grouped by categories */}
                <Spring className="card h-fit card-padded">
                    {categoryOrder.map(category => (
                        <div key={category} style={{ marginBottom: '20px' }}>
                            <h4>{category}</h4>
                            <hr /><br />
                            <div style={{ textAlign: 'left', display: 'inline-flex', justifyContent: 'space-between', padding: '10px' }}>
                                {categorizedPlayers[category]?.map((player, index) => (
                                    <>
                                    {!teamId && (
                                        <Button onClick={() => removePlayerFromTeam(player.id, player.fullname)}>Remove</Button>
                                    )}
                                    <Link key={index} to={"/player-profile"} state={{ playerId: player.id }} style={{ textDecoration: 'none', color: 'inherit' }}>
                                        <Card sx={{ width: 160, height: 180, marginBottom: '100px', backgroundColor: "#FCC93F", margin: '0 6px' }}>
                                            <CardActionArea>
                                                <br />
                                            <CardMedia 
                                                component="img"
                                                height="50"
                                                image= {player.avatar ? player.avatar : images[index]}
                                                /* image={player.fullname} */
                                                alt="avatar"

                                                style={{
                                                    borderRadius: "50%",
                                                    width: 70,
                                                    height: 70,
                                                    background: "white",
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
                                                <CardContent style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100%' }}>
                                                    <Typography gutterBottom variant="h5" component="div" style={{ maxWidth: '150px', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                                                        {player.fullname.length > 7 ? `${player.fullname.substring(0, 7)}...` : player.fullname} {/* truncate */}
                                                    </Typography>
                                                    <Typography variant="body2" color="text.secondary">
                                                        <strong>{player.position}</strong>
                                                    </Typography>
                                                </CardContent>
                                            </CardActionArea>
                                        </Card>
                                    </Link>
                                    </>
                                ))}
                            </div>
                        </div>
                    ))}
                </Spring>
            </div>
        </Spring>
    );
};

export default PlayerList;