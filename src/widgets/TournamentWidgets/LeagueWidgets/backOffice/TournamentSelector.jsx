import React, { useState, useEffect, useRef } from 'react';
import Spring from '@components/Spring'

import './styles.css';
import InputGroup from 'react-bootstrap/InputGroup';
import Form from 'react-bootstrap/Form';

import defaultLogo from "../../../../assets/uefa.png";

const TournamentSelector = ({  onTournamentSelect }) => {
  const [tournaments, setTournaments] = useState([]);









  const [search, setSearch] = useState('');
  useEffect(() => {
    const fetchTournaments = async () => {
      try {
        const response = await fetch(`http://localhost:3000/Tournament/UserTournaments`,{
          method: 'GET',
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
        });
        if (!response.ok) {
          throw new Error('Failed to fetch tournaments');
        }
        const data = await response.json();
        setTournaments(data.tournaments);
      } catch (error) {
        console.error('Error fetching tournaments:', error);
      }
    };

    fetchTournaments();
  }, []);

  const inputRef = useRef(null);
  
  
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
                  :tournament.title && tournament.title.toLowerCase().includes(search);

              })
      .map(tournament => (
        <div key={tournament._id} className="tournament-item" onClick={() => onTournamentSelect(tournament._id)}>
           <img src={tournament.logo || defaultLogo} alt="Tournament Logo"  className="tournament-logo"/>
           <p className="tournament-title">{tournament.title}</p>
        </div>
      ))}
    </div>
  </Spring>
   
  );
};

export default TournamentSelector;
