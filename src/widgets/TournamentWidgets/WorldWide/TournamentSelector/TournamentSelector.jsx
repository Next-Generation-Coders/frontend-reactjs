import Spring from '@components/Spring'
import React, { useEffect, useRef, useState } from 'react';
import './styles.css';
import InputGroup from 'react-bootstrap/InputGroup';
import Form from 'react-bootstrap/Form';
import { useNavigate } from 'react-router-dom';
import defaultLogo from "../../../../assets/uefa.png";
import {FaSearch} from "react-icons/fa";

const TournamentSelectorWorldWide = ({ onSelectTournament }) => {
  const [tournaments, setTournaments] = useState([]);
  const [search, setSearch] = useState('');
    const [showSearch, setShowSearch] = useState(false);
    const [leagues , setleagues] = useState();

useEffect(() => {
  const fetchApiLeagues = async () => {

const url = 'https://free-football-soccer-videos1.p.rapidapi.com/v1/';
const options = {
  method: 'GET',
  headers: {
    'X-RapidAPI-Key': 'f72b06fffbmshdbb3c567af911fbp16ea8bjsna390cb0595bd',
    'X-RapidAPI-Host': 'free-football-soccer-videos1.p.rapidapi.com'
  }
};

try {
	const response = await fetch(url, options);
	const result = await response.json();
	setleagues(result);
} catch (error) {
	console.error(error);
}}
fetchApiLeagues();
}, [])

const renderLeagues = () => {
  return leagues.map(league => (
    <div key={league.id} className="league-item" onClick={() => handleTournamentClick(league.id)}>
      <img src={league.logo || defaultLogo} alt="League Logo" className="league-logo"/>
      <p className="league-title">{league.name}</p>
    </div>
  ));
};
  
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
  
  const handleTournamentClick = (tournamentId,title) => {
  
    onSelectTournament(tournamentId,title);
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

if (!leagues){
  return null ;
}

    const handleSearchChange = (e) => {
        setSearch(e.target.value);
    };


    const handleIconClick = () => {
        setShowSearch((prevShowSearch) => !prevShowSearch);
        if (!showSearch && inputRef.current) {
            inputRef.current.focus();
        }
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
                  <h2>Games</h2>
              )}
              <InputGroup.Text onClick={handleIconClick} style={{ cursor: 'pointer' }}>
                  <FaSearch style={{ color: "#FBCB40" }} />
              </InputGroup.Text>
          </div>
            <div  className="tournament-selector-container">
            {leagues.map((league, index) => (
          <div key={index} className="tournament-item" onClick={() => handleTournamentClick(league.competition.id, league.title)}>
             <img src={league.thumbnail || defaultLogo} alt="Tournament Logo"  className="tournament-logo"/>
             <p className="tournament-title">{league.competition.name}<br></br>
             {league.title}
             </p>
          </div>
            ))}
          </div>

  </Spring>
   
  );
};

export default TournamentSelectorWorldWide;
