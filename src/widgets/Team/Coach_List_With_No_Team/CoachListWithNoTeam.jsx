// styles
import { Dialog, DialogTitle, DialogContent, DialogActions, Button } from '@mui/material';

// styled components
import {StyledEventsCalendar, Header} from './styles';
import styles from './styles.module.scss';
// components
import Spring from '@components/Spring';
import {toast} from 'react-toastify';

// hooks
import {useState, useEffect} from 'react';

import { FaSearch } from "react-icons/fa";
import { Link } from 'react-router-dom';

import {useAuthContext} from "@hooks/useAuthContext";
import axios from 'axios';

const CoachListWithNoTeam = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [playerData, setPlayerData] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const playersPerPage = 4;
    const {USER} = useAuthContext();

    const addNewPlayer = async ( newPlayerData) => {
        //console.log(newPlayerData+"-----------")
        const userResponse = await axios.get(`http://localhost:3000/User/getbyemail?email=${USER.email}`);
        const userId = userResponse.data._id;
        try {
            const response = await fetch(`http://localhost:3000/Team/addCoachToTeam/${userId}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(newPlayerData)
                
            });console.log(JSON.stringify(newPlayerData))
            const data = await response.json();
            console.log("New player added:", data);
            toast.success('New player added successfully!');
        } catch (error) {
            console.error(error);
            toast.error('Failed to add new player');
        }
    };

    useEffect(() => {
        async function fetchPlayerData() {
            try {
                const response = await fetch(`http://localhost:3000/User/getallCoachesWithNoTeam`);
                const data = await response.json();
                setPlayerData(data);
            } catch (error) {
                console.error(error);
            }
        }

        fetchPlayerData();
    }, []);

    const handleSearch = (searchTerm) => {
        const filteredPlayers = playerData.filter(player => player.fullname.toLowerCase().includes(searchTerm.toLowerCase()));
        setPlayerData(filteredPlayers);
        setCurrentPage(1);
    };

    const handleChange = (e) => {
        setSearchTerm(e.target.value);
        handleSearch(e.target.value);
    };
    
    const AddPlayerToTeam = (email)=>{
        console.log(email)
        addNewPlayer(email) ;
    }

    const indexOfLastPlayer = currentPage * playersPerPage;
    const indexOfFirstPlayer = indexOfLastPlayer - playersPerPage;
    const filteredPlayers = playerData.filter(player =>
        player.fullname.toLowerCase().includes(searchTerm.toLowerCase())
      );

    const currentPlayers = filteredPlayers.slice(indexOfFirstPlayer, indexOfLastPlayer);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    

    return (
        <div className="card h-fit card-padded" >
            {/* Header */}
            <div style={{ display: 'flex', alignItems: 'center', width: '30%' }}>
                <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Search..."
                    style={{ flex: '1', fontSize: '15px', padding: '5px',  alignItems: 'center' }}
                />
            </div>

            {/* Player Table */}
            <div style={{ width: '100%', overflowX: 'auto', padding: '10px' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', tableLayout: 'fixed' }}>
                <colgroup>
                    <col style={{ width: '25%' }} />
                    <col style={{ width: '25%' }} />
                    <col style={{ width: '25%' }} />
                    <col style={{ width: '25%' }} />
                </colgroup>
                <thead>
                    <tr>
                        <th style={{ padding: '10px', textAlign: 'center', fontWeight: 'bold', borderBottom: '1px solid #ddd' }}>Name</th>
                        <th style={{ padding: '10px', textAlign: 'center', fontWeight: 'bold', borderBottom: '1px solid #ddd' }}>Age</th>
                        <th style={{ padding: '10px', textAlign: 'center', fontWeight: 'bold', borderBottom: '1px solid #ddd' }}>Value</th>
                        <th style={{ padding: '10px', textAlign: 'center', fontWeight: 'bold', borderBottom: '1px solid #ddd' }}>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {currentPlayers.map((player, index) => (
                        <tr key={index}>
                            <td style={{ padding: '10px', borderBottom: '1px solid #ddd', textAlign: 'center', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{player.fullname}</td>
                            <td style={{ padding: '10px', borderBottom: '1px solid #ddd', textAlign: 'center' }}>{player.age}</td>
                            <td style={{ padding: '10px', borderBottom: '1px solid #ddd', textAlign: 'center' }}>{player.value}</td>
                            <td style={{ padding: '10px', borderBottom: '1px solid #ddd', textAlign: 'center' }}>
                                <Button style={{ backgroundColor: '#24292B', textTransform: 'none' }} onClick={() => AddPlayerToTeam({ email: player.email })} >
                                    <b style={{ color: 'white', fontSize: "12px" }}>Add Coach</b>
                                </Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>


            </div>

            {/* Pagination */}
            <div style={{ marginTop: '10px', textAlign: 'center' }}>
                <Button onClick={() => paginate(currentPage - 1)} disabled={currentPage === 1} style={{  color: 'white' }}>Previous</Button>
                <Button onClick={() => paginate(currentPage + 1)} disabled={indexOfLastPlayer >= playerData.length} style={{  color: 'white' }} >Next</Button>
            </div>
        </div>
    );
};


export default CoachListWithNoTeam