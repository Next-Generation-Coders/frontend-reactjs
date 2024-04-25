import Spring from '@components/Spring'
import React, { useEffect, useRef, useState } from 'react';
import './styles.css';
import InputGroup from 'react-bootstrap/InputGroup';
import Form from 'react-bootstrap/Form';
import { useNavigate } from 'react-router-dom';
import defaultLogo from "../../../../../assets/uefa.png";


import { FaSearch } from 'react-icons/fa';
const TournamentSelectorFrontDisplay = ({ onSelectTournament }) => {
  const [tournaments, setTournaments] = useState([]);
    const [showSearch, setShowSearch] = useState(false);
    const [search, setSearch] = useState('');
    const inputRef = useRef(null);
  useEffect(() => {
    const fetchTournaments = async () => {
      try {
        const response = await fetch('http://localhost:3000/Tournament/getall');
        const data = await response.json();
        setTournaments(data);
      } catch (error) {
        console.error('Error fetching tournaments:', error);
      }
    };

    fetchTournaments();
  }, []);

    const handleIconClick = () => {
        setShowSearch((prevShowSearch) => !prevShowSearch);
        if (!showSearch && inputRef.current) {
            inputRef.current.focus();
        }
    };

    const handleSearchChange = (e) => {
        setSearch(e.target.value);
    };



  const handleTournamentClick = (tournamentId) => {
  
    onSelectTournament(tournamentId);
  };
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
const navigate= useNavigate();
  const GoToTournamentReview = async (tournamentId) =>{
    navigate('/TournamentReview', { state: { tournamentId } });
  }


    const renderTournamentItem = (tournament) => (
        <div key={tournament._id} className="tournament-item" onClick={() => handleTournamentClick(tournament._id)}>
            <div className="tournament-content">
                <img src={tournament.logo || defaultLogo} alt="Tournament Logo" className="tournament-logo" />
                <p className="tournament-title">{tournament.title}</p>
            </div>
            <button className="btn" style={{backgroundColor: "#FDCA40",color:"black"}} onClick={() => GoToTournamentReview(tournament._id)}>More</button>
        </div>
    );

    const filterTournaments = () => {
        return tournaments.filter((tournament) => {
            return search.toLowerCase() === ''
                ? tournament
                : tournament.title && tournament.title.toLowerCase().includes(search);
        });
    };

 return (
        <Spring className="card d-flex flex-column g-16 card-padded">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                {showSearch ? (
                    <Form>
                        <InputGroup className='my-3' style={{ paddingLeft: '30px' }}>
                            <Form.Control
                                ref={inputRef}
                                value={search}
                                onChange={handleSearchChange}
                                onBlur={() => setShowSearch(false)}
                                placeholder='Search..'
                                style={{
                                    padding: '8px',
                                    borderRadius: '5px',
                                    border: '1px solid #FDCA40',
                                    boxShadow: 'none',
                                }}
                            />
                        </InputGroup>
                    </Form>
                ) : (
                    <h2>Tournaments</h2>
                )}
                <InputGroup.Text onClick={handleIconClick} style={{ cursor: 'pointer' }}>
                    <FaSearch style={{ color: "#FBCB40" }} />
                </InputGroup.Text>
            </div>
            <div className="tournament-selector-container">
                {filterTournaments().map(renderTournamentItem)}
            </div>
        </Spring>
    );
};

export default TournamentSelectorFrontDisplay;


