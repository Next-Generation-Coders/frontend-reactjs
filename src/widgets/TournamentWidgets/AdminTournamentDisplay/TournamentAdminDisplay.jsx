import React, { useState, useEffect, useRef } from 'react';
import { Button } from '@mui/material';
import { FaSearch } from "react-icons/fa";
import { Header } from './styles';
import Spring from '@components/Spring';
import InputGroup from 'react-bootstrap/InputGroup';
import Form from 'react-bootstrap/Form';
import { useWindowSize } from 'react-use';
import { useThemeProvider } from '@contexts/themeContext';
import Popup from './PopUp';
import {GiNextButton, GiPreviousButton} from "react-icons/gi";
import { toast } from 'react-toastify';

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
    const inputRef = useRef(null);
    const PAGE_SIZE = 5;
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(5); // Define itemsPerPage here
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = tournaments.slice(indexOfFirstItem, indexOfLastItem);

    const [search, setSearch] = useState('');

    const [activeTournaments, setActiveTournaments] = useState([]);


    const handleOpenDialog = (tournamentId) => {
        setIsPopupOpen(true);
        setSelectedTournamentId(tournamentId);
    };

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
                toast.error('Error fetching tournaments:', error);
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
            toast.error('Error fetching referees:', error);
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
            toast.error('Error fetching stadiums:', error);
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
            toast.success('Tournament deleted successfully');
        } catch (error) {
            toast.error('Error deleting tournament:', error);
        }
    };


    const handleSetActiveTournament = async (tournamentId, currentStatus) => {
        try {
            const newStatus = currentStatus === 'Active' ? 'Inactive' : 'Active';
            const response = await fetch(`http://localhost:3000/Tournament/StartTournament/${tournamentId}`, {
                method: 'PUT',
                body: JSON.stringify({ status: newStatus }), // Envoyer le nouveau statut dans le corps de la requête
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            if (!response.ok) {
                throw new Error('Failed to toggle tournament status');
            }
            // Mettre à jour l'état du tournoi
            setTournaments(prevTournaments =>
                prevTournaments.map(tournament =>
                    tournament._id === tournamentId
                        ? { ...tournament, TournamentStatus: newStatus }
                        : tournament
                )
            );
            toast.success(`Tournament status set to ${newStatus} successfully`);
        } catch (error) {
            toast.error('Error toggling tournament status:', error);
        }
    };



    const handleAddRefsAndStadiums = (tournamentId, selectedRefs, selectedStadiums) => {
       // console.log("Tournament ID:", tournamentId);
        //console.log("Selected referees:", selectedRefs);
       // console.log("Selected stadiums:", selectedStadiums);

        setIsPopupOpen(false);
    };

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    // Calculate the number of pages
    const totalPages = Math.ceil(tournaments.length / PAGE_SIZE);

    useEffect(() => {
        document.addEventListener('keydown', detectkeydown , true)

    }, [])
    const detectkeydown=(e) =>{

        if(e.key ==="/"){
            e.preventDefault();
            inputRef.current.focus();
            inputRef.current.value = '';
        }
    }

    return (
        <Spring className="card h-fit card-padded">
            <div className="card h-fit card-padded">
                <Header>
                    <div style={{ display: 'flex', alignItems: 'center', width: '30%' }}>
                        <h2>Tournaments List</h2>
                    </div>
                    <Form>


                        <div style={{ display: 'flex', alignItems: 'center', width: '30%',paddingLeft:'900px' }}>

                            <input
                                type="text"
                                value={searchTerm}
                                onChange={(e) => setSearch(e.target.value)}
                                placeholder="To research..."
                                style={{ flex: '1', fontSize: '15px', padding: '5px', borderBottom: '2px solid #ddd', alignItems: 'center' }}
                            />
                            <Button style={{ backgroundColor: 'yellow', color: 'black', borderRadius: '20%' }}>
                                <FaSearch />
                            </Button>
                        </div>


                    </Form>
                </Header>
                <div style={{ width: '100%', overflowX: 'auto', padding: '10px' }}>
                    <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                        <thead>
                        <tr>
                            <th style={{ padding: '10px', textAlign: 'left', fontWeight: 'bold', borderBottom: '1px solid #ddd' }}>Logo</th>
                            <th style={{ padding: '10px', textAlign: 'left', fontWeight: 'bold', borderBottom: '1px solid #ddd' }}>Title</th>
                            <th style={{ padding: '10px', textAlign: 'left', fontWeight: 'bold', borderBottom: '1px solid #ddd' }}>Type</th>
                            <th style={{ padding: '10px', textAlign: 'left', fontWeight: 'bold', borderBottom: '1px solid #ddd' }}>Status</th>
                            <th style={{ padding: '10px', textAlign: 'left', fontWeight: 'bold', borderBottom: '1px solid #ddd' }}>Start</th>
                            <th style={{ padding: '10px', textAlign: 'left', fontWeight: 'bold', borderBottom: '1px solid #ddd' }}>Affect</th>
                            <th style={{ padding: '10px', textAlign: 'left', fontWeight: 'bold', borderBottom: '1px solid #ddd' }}>Delete</th>
                        </tr>
                        </thead>
                        <tbody>
                        {currentItems.filter((tournament) => {
                            return search.toLowerCase() === ''
                                ? tournament
                                : tournament.title && tournament.title.toLowerCase().includes(search);
                        })
                            .map(tournament => (
                                <tr key={tournament._id}>

                                    <td style={{ padding: '10px', borderBottom: '1px solid #ddd'  }}><img style={{width : '50px' , height: '50px' , borderRadius : '15%' }} src={tournament.logo} alt={tournament.logo}/></td>
                                    <td style={{ padding: '10px', borderBottom: '1px solid #ddd' }}>{tournament.title}</td>
                                    <td style={{ padding: '10px', borderBottom: '1px solid #ddd' }}>{tournament.TournamentType ? tournament.TournamentType.toString() : ''}</td>
                                    <td style={{ padding: '10px', borderBottom: '1px solid #ddd' }}>{tournament.TournamentStatus ? tournament.TournamentStatus.toString() : ''}</td>

                                    <td style={{ padding: '10px', borderBottom: '1px solid #ddd' }}>
                                        <Button
                                            onClick={() => handleSetActiveTournament(tournament._id, tournament.TournamentStatus)}
                                            style={{ backgroundColor: tournament.TournamentStatus === 'Active' ? '#f50606' : '#0D51A3' }}
                                        >
                                            <b style={{ color: 'white' }}>{tournament.TournamentStatus === 'Active' ? 'Set Inactive' : 'Set Active'}</b>
                                        </Button>
                                    </td>

                                    <td style={{ padding: '10px', borderBottom: '1px solid #ddd' }}>

                                        <Button onClick={() => handleOpenDialog(tournament._id)} style={{ backgroundColor: '#396e11' }}>
                                            <b style={{ color: 'white' }}>Add Referees and Stadiums</b>
                                        </Button>                                    </td>
                                    <td style={{ padding: '10px', borderBottom: '1px solid #ddd' }}>

                                        <Button onClick={() => handleDeleteTournament(tournament._id)} style={{ backgroundColor: 'red' }} ><b style={{ color: 'white' }}>DELETE</b></Button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>





                <div style={{ marginTop: '20px', textAlign: 'center', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Button
                        style={{ marginRight: '10px', backgroundColor: '#4285f4', color: 'white' }}
                        disabled={currentPage === 1}
                        onClick={() => handlePageChange(currentPage - 1)}
                    >
                        <GiPreviousButton />
                    </Button>
                    <span style={{ fontSize: '12px', fontWeight: 'bold' }}>
                            Page {currentPage} of {totalPages}
                        </span>
                    <Button
                        style={{ marginLeft: '10px', backgroundColor: '#4285f4', color: 'white' }}
                        disabled={currentPage === totalPages}
                        onClick={() => handlePageChange(currentPage + 1)}
                    >
                        <GiNextButton />
                    </Button>
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
