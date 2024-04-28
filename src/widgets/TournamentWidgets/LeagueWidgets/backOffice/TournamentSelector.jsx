import React, { useState, useEffect, useRef } from 'react';
import Spring from '@components/Spring'

import './styles.css';
import InputGroup from 'react-bootstrap/InputGroup';
import Form from 'react-bootstrap/Form';

import defaultLogo from "../../../../assets/uefa.png";
import {FaSearch} from "react-icons/fa";

const TournamentSelector = ({  onTournamentSelect }) => {
  const [tournaments, setTournaments] = useState([]);
    const [showSearch, setShowSearch] = useState(false);









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

    const handleIconClick = () => {
        setShowSearch((prevShowSearch) => !prevShowSearch);
        if (!showSearch && inputRef.current) {
            inputRef.current.focus();
        }
    };
    const handleSearchChange = (e) => {
        setSearch(e.target.value);
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
      {tournaments.filter((tournament) => {
                return search.toLowerCase() === ''
                  ? tournament
                  :tournament.title && tournament.title.toLowerCase().includes(search);

              })
      .map(tournament => (

        <div key={tournament._id} className="tournament-item" onClick={() => onTournamentSelect(tournament._id)}>
            <div className="tournament-content">
                <img src={tournament.logo || defaultLogo} alt="Tournament Logo" className="tournament-logo" />
                <p className="tournament-title">{tournament.title}</p>
            </div>
        </div>


      ))}
    </div>

  </Spring>




  );
};

export default TournamentSelector;
