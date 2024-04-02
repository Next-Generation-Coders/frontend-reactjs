import Spring from '@components/Spring'
import React, { useEffect, useRef, useState } from 'react';
import './styles.css';
import InputGroup from 'react-bootstrap/InputGroup';
import Form from 'react-bootstrap/Form';
import { useNavigate } from 'react-router-dom';
import defaultLogo from "../../../../../assets/uefa.png";

const TournamentSelectorFrontDisplay = ({ onSelectTournament }) => {
  const [tournaments, setTournaments] = useState([]);
  const [search, setSearch] = useState('');
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
  const inputRef = useRef(null);
  
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


  return (
    
    <Spring className="card d-flex flex-column g-16 card-padded">
      <div style={{ display: 'flex' ,justifyContent: 'space-between'}}>
      <h2>Tournaments</h2>
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
        </Form></div>
    <div className="tournament-selector-container">
      {tournaments.filter((tournament) => {
                return search.toLowerCase() === ''
                  ? tournament
                  : tournament.title.toLowerCase().includes(search);
              })
      .map(tournament => (
        <div key={tournament._id} className="tournament-item" onClick={() => handleTournamentClick(tournament._id)}>
           <img src={tournament.logo || defaultLogo} alt="Tournament Logo"  className="tournament-logo"/>
           <p className="tournament-title">{tournament.title}</p>
           <button className='tournament.button'  onClick={() => GoToTournamentReview(tournament._id)}>More</button>
        </div>
      ))}
    </div>
  </Spring>
   
  );
};

export default TournamentSelectorFrontDisplay;
