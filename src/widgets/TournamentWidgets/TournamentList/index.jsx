import React, { useEffect, useState } from 'react';
import axios from "axios";
import Swiper from 'swiper';
import "./style.css"
import { useAuthContext } from "@hooks/useAuthContext";
import { MdFavorite } from "react-icons/md";
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import { Link } from 'react-router-dom';
import InputAdornment from '@mui/material/InputAdornment';
import TextField from '@mui/material/TextField';
import { IoIosCloseCircle } from "react-icons/io";

const Index = () => {
  const [tournaments, setTournaments] = useState([]);
  const [filteredTournaments, setFilteredTournaments] = useState([]);
  const [activeTournament, setActiveTournament] = useState(null);
  const { USER } = useAuthContext();
  const [openDialog, setOpenDialog] = useState(false);
  const [payments, setPayments] = useState([]);
  const [searchTitle, setSearchTitle] = useState("");
  const [searchActive, setSearchActive] = useState(false); // State to control the search field activation


  const handleClearSearch = () => {
    setSearchTitle("");
    setSearchActive(false);
    // Add any additional logic here if needed
  };
  const handleSearchButtonClick = () => {
    setSearchActive(true); // Activate the search field when the search button is clicked
  };


  const handleSearch = (event) => {
    const { value } = event.target;
    setSearchTitle(value);
    const filtered = tournaments.filter(tournament => tournament.title.toLowerCase().includes(value.toLowerCase()));
    setFilteredTournaments(filtered);
    if (filtered.length > 0) {
      setActiveTournament(filtered[0]);
    } else {
      setActiveTournament(null);

    }
  };


  const isTournamentPaid = () => {
    return payments.some(payment => payment.tournament === activeTournament._id && payment.payment_status === "paid");
  };
  const handlePayedClick = () => {
    setOpenDialog(true);
  };

  useEffect(() => {
    const fetchTournaments = async () => {
      try {
        const userResponse = await axios.get(`http://localhost:3000/User/getbyemail?email=${USER.email}`);
        const userId = userResponse.data._id;
        console.log(userId)

        const response = await axios.get(`http://localhost:3000/Tournament/getByUserId/${userId}`);

        const data = response.data && response.data.tournaments ? response.data.tournaments : [];
        setTournaments(data);
        setFilteredTournaments(data);

      } catch (error) {
        console.error("Error fetching tournaments:", error.message);
      }
    };

    if (USER && USER.email) {
      fetchTournaments();
    }
  }, [USER]);

  useEffect(() => {
    const fetchPayments = async () => {
      try {
        const userResponse = await axios.get(`http://localhost:3000/User/getbyemail?email=${USER.email}`);
        const userId = userResponse.data._id;

        const response = await axios.get(`http://localhost:3000/Payment/user/${userId}`);

        const data = response.data || [];
        console.log('payments :',data)
        setPayments(data);
      } catch (error) {
        console.error("Error fetching payments:", error.message);
      }
    };

    if (USER && USER.email) {
      fetchPayments();
    }
  }, [USER]);


  useEffect(() => {
    const swiper = new Swiper('.swiper', {
      effect: 'cards',
      grabCursor: true,
      initialSlide: 2,
      speed: 500,
      loop: true,
      rotate: true,
      mousewheel: {
        invert: false,
      },
      on: {
        slideChange: function () {
          const activeIndex = this.activeIndex % filteredTournaments.length;
          setActiveTournament(filteredTournaments[activeIndex]);
        },
      },
    });

    swiper.on('slideChange', () => {
      const activeIndex = swiper.realIndex % filteredTournaments.length;
      setActiveTournament(filteredTournaments[activeIndex]);
    });

    return () => {
      swiper.destroy(true, true);
    };
  }, [filteredTournaments]);

  return (
      <section>


        <div className="content">
          <div className="info">
            {searchActive ? (
                <div  className="search-container">
                  <TextField
                      style={{boxShadow:'0 4px 20px -2px #e9e9e9',borderRadius:'40px' ,border: '1px solid #ccc' }}
                      type="text"
                      value={searchTitle}
                      onChange={handleSearch}
                      placeholder="Search by title"
                      InputProps={{
                        endAdornment: (
                            <InputAdornment position="end">
                              <IoIosCloseCircle  onClick={handleClearSearch} style={{ cursor: 'pointer',color:'red',fontSize: '16px' }} />
                            </InputAdornment>
                        ),
                      }}
                  />
                </div>
            ) : (

                  <Button className="search-container" onClick={handleSearchButtonClick} variant="contained">Search</Button>
            )}
            {activeTournament ? (
                <>
                  <p>
                   <b>Title:</b>  {activeTournament.title} <br />
                    <b>Start Date:</b>  {activeTournament.startDay}/{activeTournament.startMonth}/{activeTournament.startYear} <br />
                    <b> End Date:</b>  {activeTournament.endDay}/{activeTournament.endMonth}/{activeTournament.endYear} <br />
                    <b> Country:</b>  {activeTournament.Country} <br />
                    <b> City:</b>  {activeTournament.City} <br />
                    <b> Tournament Type:</b>  {activeTournament.TournamentType} <br />
                    <b>Access: </b>   {activeTournament.access} <br />
                    <b> FriOrComp: </b>  {activeTournament.FriOrComp} <br />
                  </p>

                  <div className="button-containerr">
                    <Button
                        style={{
                          marginRight: '10px',
                          backgroundColor: activeTournament && isTournamentPaid() ? '#CCCCCC' : '#FDCA40',
                          color: activeTournament && isTournamentPaid() ? '#666666' : 'black',
                        }}
                        variant="contained"
                        disabled={activeTournament && isTournamentPaid()}
                        onClick={handlePayedClick}
                    >
                      PAID
                    </Button>
                    <button style={{ color: 'black' }} className="btnnn"><Link to="/LeaguesBackOffice">SEE MORE</Link></button>
                  </div>
                </>
            ) : (
                <p className="info" >There are no tournaments available for you right now.</p>
            )}
          </div>

          <div className="swiper">
            <div className="swiper-wrapper">
              {tournaments.map((tournament, index) => (
                  <div key={index} className="swiper-slide">
                    {tournament.logo ? (
                        <>
                          <img src={tournament.logo} alt={tournament.title} />
                          <div className="overlay">
                            <span><MdFavorite /></span>
                            {tournament.rating ? (
                                <p>{(((parseInt(tournament.rating['5 stars']) * 5 +
                                            parseInt(tournament.rating['4 stars']) * 4 +
                                            parseInt(tournament.rating['3 stars']) * 3 +
                                            parseInt(tournament.rating['2 stars']) * 2 +
                                            parseInt(tournament.rating['1 star'])) /
                                        (parseInt(tournament.rating['5 stars']) +
                                            parseInt(tournament.rating['4 stars']) +
                                            parseInt(tournament.rating['3 stars']) +
                                            parseInt(tournament.rating['2 stars']) +
                                            parseInt(tournament.rating['1 star']))) || 0
                                ).toFixed(1)}</p>
                            ) : (
                                <p>0.0</p>
                            )}

                            <h2>{tournament.title}</h2>
                          </div>
                        </>
                    ) : (
                        <img src='https://img.pikbest.com/origin/05/97/54/08QpIkbEsTMsd.jpg!sw800' alt="Default" className="default-image" />
                    )}
                  </div>
              ))}
            </div>
          </div>
        </div>
        <Dialog  style={{ backgroundColor: 'transparent'}} open={openDialog} onClose={() => setOpenDialog(false)}>
          <div style={{ padding: '20px' }}>
            {/* <h2  style={{marginLeft: '30px',  color: 'red' }}><u>Select Payment Option</u></h2><br/>*/}
            <h2><u>Select Payment Option</u></h2>
            <Button style={{ marginRight: '10px', backgroundColor: '#ffc107', color: 'black' }}  variant="contained" ><b><Link to="/payment-stripe">Pay with Stripe</Link></b></Button>
            <Button style={{ marginRight: '10px', backgroundColor: '#063fbb', color: 'white' }} variant="contained" ><b><Link to="/payment-coin">Pay with GSCoin</Link></b></Button>
          </div>
        </Dialog>

        <ul className="circles">
          {Array.from({ length: 10 }).map((_, index) => (
              <li key={index}></li>
          ))}
        </ul>
      </section>
  );
};

export default Index;