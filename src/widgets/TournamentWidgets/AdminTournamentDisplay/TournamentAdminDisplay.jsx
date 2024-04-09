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

    const [search, setSearch] = useState('');
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

    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(7);
    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    // Calculate the index of the first and last item to display
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = tournaments.slice(indexOfFirstItem, indexOfLastItem);
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
                        <h2>Tournaments</h2>

                    </div>
                    <Form>
          <InputGroup className='my-3'>

            
          
              <Form.Control
                ref={inputRef}
                onChange={(e) => setSearch(e.target.value)}
                placeholder='Press / to search'
                style={{
                  padding: '10px',
                  borderRadius: '5px',
                  border: '1px solid #ccc',
                  boxShadow: 'none',
                }}
              />
          
          </InputGroup>
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
                <div>
                    {tournaments.length > itemsPerPage && (
                        <div style={{  alignItems: 'center'}}>
                            {Array.from({ length: Math.ceil(tournaments.length / itemsPerPage) }).map((_, index) => (
                                <Button className='btn' key={index} onClick={() => handlePageChange(index + 1)}>
                                    {index + 1}
                                </Button>
                            ))}
                        </div>
                    )}
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
