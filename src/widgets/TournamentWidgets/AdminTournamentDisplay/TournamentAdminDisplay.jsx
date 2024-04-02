import React, { useState, useEffect } from 'react';
import { Button } from '@mui/material';
import { FaSearch } from "react-icons/fa";
import { Header } from './styles';
import Spring from '@components/Spring';

import { useWindowSize } from 'react-use';
import { useThemeProvider } from '@contexts/themeContext';
import Popup from './PopUp';

const TournamentAdminDisplay = () => {
    const { direction } = useThemeProvider();
    const [searchTerm, setSearchTerm] = useState('');
    const { width } = useWindowSize();
    const [tournaments, setTournaments] = useState([]);
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const [selectedRefs, setSelectedRefs] = useState([]); 
    const [selectedStadiums, setSelectedStadiums] = useState([]);
    const [Referees, setReferees] = useState([]); 
    const [Stadiums, setStadiums] = useState([]);
    const [selectedTournament, setSelectedTournament] = useState(null);
    const [selectedTournamentId, setSelectedTournamentId] = useState(null);
    useEffect(() => {
        const fetchTournaments = async () => {
            try {
                const response = await fetch('http://localhost:3000/Tournament/getall');
                if (!response.ok) {
                    throw new Error('Failed to fetch tournaments');
                }
                const data = await response.json();
                setTournaments(data);
            } catch (error) {
                console.error('Error fetching tournaments:', error);
            }
        };

        fetchTournaments();
    }, []);
   
    const fetchReferees = async () => {
        try {
            const response = await fetch('http://localhost:3000/User/getAllReferees');
            if (!response.ok) {
                throw new Error('Failed to fetch referees');
            }
            const data = await response.json();
            setReferees(data);
        } catch (error) {
            console.error('Error fetching referees:', error);
        }
    };

    const fetchStadiums = async () => {
        try {
            const response = await fetch('http://localhost:3000/Stadium/getall');
            if (!response.ok) {
                throw new Error('Failed to fetch stadiums');
            }
            const data = await response.json();
            setStadiums(data);
        } catch (error) {
            console.error('Error fetching stadiums:', error);
        }
    };

    const handleDeleteTournament = async (tournamentId) => {
        try {
            const response = await fetch(`http://localhost:3000/Tournament/delete/${tournamentId}`, {
                method: 'DELETE',
            });
            if (!response.ok) {
                throw new Error('Failed to delete tournament');
            }
            // Remove the deleted tournament from the state
            setTournaments(prevTournaments => prevTournaments.filter(tournament => tournament._id !== tournamentId));
            console.log('Tournament deleted successfully');
        } catch (error) {
            console.error('Error deleting tournament:', error);
        }
    };


    const handleSetActiveTournament = async (tournamentId) => {
        try {
            const response = await fetch(`http://localhost:3000/Tournament/StartTournament/${tournamentId}`, {
                method: 'PUT',
            });
            if (!response.ok) {
                throw new Error('Failed to set active tournament');
            }
            // Update the tournament status in the state
            setTournaments(prevTournaments =>
                prevTournaments.map(tournament =>
                    tournament._id === tournamentId
                        ? { ...tournament, TournamentStatus: 'OnGoing' }
                        : tournament
                )
            );
            console.log('Tournament status set to active successfully');
        } catch (error) {
            console.error('Error setting active tournament:', error);
        }
    };


    const handleAddRefsAndStadiums = (tournamentId, selectedRefs, selectedStadiums) => {
      console.log("Tournament ID:", tournamentId);
        console.log("Selected referees:", selectedRefs);
        console.log("Selected stadiums:", selectedStadiums);
     
        setIsPopupOpen(false);
    };

    const handleSearch = () => {
        console.log("Search term:", searchTerm);
        // Implement search functionality here
    };

    return (
        <Spring className="card h-fit card-padded">
            <div className="card h-fit card-padded">
                <Header>
                    <div style={{ display: 'flex', alignItems: 'center', width: '30%' }}>
                        <input
                            type="text"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            placeholder="Search..."
                            style={{ flex: '1', fontSize: '15px', padding: '5px', borderBottom: '2px solid #ddd' }}
                        />
                        <Button onClick={handleSearch} style={{ backgroundColor: 'yellow', color: 'black', borderRadius: '20%' }}>
                            <FaSearch />
                        </Button>
                    </div>
                </Header>
                <div style={{ width: '100%', overflowX: 'auto', padding: '10px' }}>
                    <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                        <thead>
                            <tr>
                                <th style={{ padding: '10px', textAlign: 'left', fontWeight: 'bold', borderBottom: '1px solid #ddd' }}>ID</th>
                                <th style={{ padding: '10px', textAlign: 'left', fontWeight: 'bold', borderBottom: '1px solid #ddd' }}>Title</th>
                                <th style={{ padding: '10px', textAlign: 'left', fontWeight: 'bold', borderBottom: '1px solid #ddd' }}>Date</th>
                                <th style={{ padding: '10px', textAlign: 'left', fontWeight: 'bold', borderBottom: '1px solid #ddd' }}>Location</th>
                                <th style={{ padding: '10px', textAlign: 'left', fontWeight: 'bold', borderBottom: '1px solid #ddd' }}>Action</th>
                                <th style={{ padding: '10px', textAlign: 'left', fontWeight: 'bold', borderBottom: '1px solid #ddd' }}>Action</th>
                                <th style={{ padding: '10px', textAlign: 'left', fontWeight: 'bold', borderBottom: '1px solid #ddd' }}>Action</th>
                                <th style={{ padding: '10px', textAlign: 'left', fontWeight: 'bold', borderBottom: '1px solid #ddd' }}>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {tournaments.map(tournament => (
                                <tr key={tournament._id}>
                                    
                                    <td style={{ padding: '10px', borderBottom: '1px solid #ddd' }}>{tournament.title}</td>
                                    <td style={{ padding: '10px', borderBottom: '1px solid #ddd' }}>{tournament.startDay}</td>
                                    <td style={{ padding: '10px', borderBottom: '1px solid #ddd' }}>{tournament.TournamentType ? tournament.TournamentType.toString() : ''}</td>
                                    <td style={{ padding: '10px', borderBottom: '1px solid #ddd' }}>{tournament.TournamentStatus ? tournament.TournamentStatus.toString() : ''}</td>
                                    <td style={{ padding: '10px', borderBottom: '1px solid #ddd' }}>{tournament.access ? tournament.access.toString() : ''}</td>
                                    <td style={{ padding: '10px', borderBottom: '1px solid #ddd' }}>
                                        
                                        <Button onClick={() => handleSetActiveTournament(tournament._id)} style={{ backgroundColor: 'black' }} ><b style={{ color: 'white' }}>Set Active</b></Button>
                                    </td>
                                    <td style={{ padding: '10px', borderBottom: '1px solid #ddd' }}>
                                       
                                        <Button onClick={() => { setIsPopupOpen(true); setSelectedTournamentId(tournament._id); }} style={{ backgroundColor: 'black' }} ><b style={{ color: 'white' }}>Add Referees and Stadiums</b></Button>
                                    </td>
                                    <td style={{ padding: '10px', borderBottom: '1px solid #ddd' }}>
                     
                                        <Button onClick={() => handleDeleteTournament(tournament._id)} style={{ backgroundColor: 'red' }} ><b style={{ color: 'white' }}>DELETE</b></Button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
            <Popup
    open={isPopupOpen}
    onClose={() => setIsPopupOpen(false)}
    fetchReferees={fetchReferees}
    fetchStadiums={fetchStadiums}
    referees={Referees}
    stadiums={Stadiums}
    setSelectedRefs={setSelectedRefs}
    setSelectedStadiums={setSelectedStadiums}
    selectedRefs={selectedRefs} 
    selectedStadiums={selectedStadiums}
    tournamentId={selectedTournamentId}
>
    
  
</Popup>
        </Spring>
    );
};

export default TournamentAdminDisplay;
