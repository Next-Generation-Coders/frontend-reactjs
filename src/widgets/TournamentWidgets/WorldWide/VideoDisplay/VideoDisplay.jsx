import { useEffect, useState } from 'react';
import styles from './styles.module.scss';

import Spring from '@components/Spring';
import { NavLink } from 'react-router-dom';
import dayjs from 'dayjs';
import { getMonthDays } from '@utils/helpers';
import classNames from 'classnames';
import { Swiper, SwiperSlide } from 'swiper/react';
import { useThemeProvider } from '@contexts/themeContext';



const Navigator = ({ active, setActive }) => {
    const { theme, direction } = useThemeProvider();
    const [swiper, setSwiper] = useState(null);

    useEffect(() => {
        if (swiper) {
            swiper.slideToLoop(parseInt(active) - 1);
        }
    }, [swiper, active]);

    useEffect(() => {
        if (swiper) {
            swiper.changeLanguageDirection(direction);
            swiper.update();
        }
    }, [swiper, direction]);

    return (
        <div className={`${styles.navigator} ${theme === 'light' ? styles.light : styles.dark}`}>
            <Swiper
                className="h-100"
                slidesPerView="auto"
                spaceBetween={10}
                centeredSlides={true}
                onSwiper={setSwiper}
                loop
                initialSlide={+active - 1}
            >
                {getMonthDays().map((day, index) => (
                    <SwiperSlide className={styles.slide} key={index}>
                        <div
                            className={classNames(`${styles.navigator_item} ${styles[direction]}`, {
                                [styles.active]: active === parseInt(day.date)
                            })}
                            onClick={() => setActive(parseInt(day.date))}
                        >
                            <h4 className={styles.day}>{day.date}</h4>
                            <span className="label h6">{day.weekday}</span>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
};

const VideoDisplay = ({ selectedTournamentId,title }) => {
    const [fixtures, setFixtures] = useState([]);
    const today = dayjs().date();
    const [selectedDay, setSelectedDay] = useState(today); // Default selected day
    const [tournament, settournament]= useState({})
    
    const [tournamentType , settournamentType] =useState();
    const [rounds , setRounds] = useState([]);
    const [groupMatches , setGroupMatches] =useState([]);
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

    const [highlights, setHighlights] = useState([]);

    useEffect(() => {
        const fetchHighlights = async (selectedTournamentId) => {
            try {
                leagues.forEach((league) => {
                    if (league.competition.id === selectedTournamentId && league.title ===title) {
                        setHighlights(league.videos);
                    }
                });
            } catch (error) {
                console.error('Error fetching highlights:', error);
            }
        };
    
        // Call fetchHighlights with the selectedTournamentId
        fetchHighlights(selectedTournamentId);
    }, [selectedTournamentId, leagues]); // Add leagues as a dependency to update when leagues change
    
   

    useEffect(() => {
      const fetchTournamentDetails = async () => {
        
            try {
                if (selectedTournamentId){
                const response = await fetch(`http://localhost:3000/Tournament/getbyid/${selectedTournamentId}`);
                if (!response.ok) {
                    throw new Error('Failed to fetch tournament details');
                }
                const tournamentData = await response.json();
                settournament(tournamentData);
                settournamentType(tournament.TournamentType);
        }
          
          } catch (error) {
              console.error('Error fetching tournament details:', error);
          }
      };
  
      fetchTournamentDetails();
  }, [selectedTournamentId]);


  
  useEffect(() => {
    const fetchMatchesForLeague = async () => {
        try {
            if (tournament._id) {
                const response = await fetch(`http://localhost:3000/Tournament/fixturesByDay/${tournament._id}/${selectedDay}`);
                if (!response.ok) {
                    throw new Error('Failed to fetch fixtures');
                }
                const data = await response.json();
                console.log(data.fixtures);
                setFixtures(data.fixtures);
            }
        } catch (error) {
            console.error('Error fetching fixtures:', error);
        }
    };

    fetchMatchesForLeague();
}, [tournament._id, selectedDay]);

useEffect(() => {
    const fetchMatchesForKnockout = async () => {
        try {
            if (tournament._id) {
                const response = await fetch(`http://localhost:3000/Tournament/FixturesByDayKnockout/${tournament._id}/${selectedDay}`);
                if (!response.ok) {
                    throw new Error('Failed to fetch matches for Knockout');
                }
                const data = await response.json();
                console.log(data.fixtures)
                setRounds(data.fixtures);
            }
        } catch (error) {
            console.error('Error fetching fixtures:', error);
        }
    };

    fetchMatchesForKnockout();
}, [tournament._id, selectedDay]);


useEffect(() => {
    const fetchMatchesForChampionship = async () => {
        try {
            if (tournament._id) {
                const response = await fetch(`http://localhost:3000/Tournament/MatcheGroupsByday/${tournament._id}/${selectedDay}`);
                if (!response.ok) {
                    throw new Error('Failed to fetch matches for Knockout');
                }
                const data = await response.json();
                setGroupMatches(data.fixtures);
            }
        } catch (error) {
            console.error('Error fetching fixtures:', error);
        }
    };

    fetchMatchesForChampionship();
}, [tournament._id, selectedDay]);

  useEffect(() => {
        const fetchMatchesForLeague = async () => {
            try {
                
                if (tournament._id) { // Check if selectedTournamentId is not undefined
                  const response = await fetch(`http://localhost:3000/Tournament/fixturesByDay/${tournament._id}/${selectedDay}`);
                  if (!response.ok) {
                    throw new Error('Failed to fetch fixtures');
                  }
                  const data = await response.json();
                  console.log(data.fixtures)
                  setFixtures(data.fixtures);
                }
              } catch (error) {
                console.error('Error fetching fixtures:', error);
              }
        };

        const fetchMatchesForKnockout = async () => {
            try {
                const response = await fetch(`http://localhost:3000/Tournament/FixturesByDayKnockout/${tournament._id}/${selectedDay}`);
                if (!response.ok) {
                    throw new Error('Failed to fetch matches for Knockout');
                }
                const data = await response.json();
                console.log(data.fixtures)
                setRounds(data.fixtures);
            } catch (error) {
                console.error('Error fetching matches for type 2:', error);
            }
        };
        const fetchMatchesForChampionship = async () => {
            try {
                const response = await fetch(`http://localhost:3000/Tournament/getMatchesFromGroupsWithMatches/${tournament._id}`);
                if (!response.ok) {
                    throw new Error('Failed to fetch matches for Knockout');
                }
                const data = await response.json();
                setGroupMatches(data.gamesByGroup);
            } catch (error) {
                console.error('Error fetching matches for type 2:', error);
            }
        };

        if ( tournamentType) { // Check if tournamentType is set before fetching matches
            if ( tournamentType === 'League') {
                fetchMatchesForLeague();
            } else if ( tournamentType === 'Knockout') {
                fetchMatchesForKnockout();
            }else if ( tournamentType === 'Championship'){
                fetchMatchesForChampionship();
            }
        }
    }, [selectedTournamentId]);

    

    return (
        <Spring className="card d-flex flex-column">
        <div className="card_header d-flex flex-column g-10" style={{ paddingBottom: 20 }}>
            <div className="d-flex justify-content-between align-items-center">
    
                {highlights.map((highlight, index) => (
                    <div key={index} style={{ marginBottom: '20px' , marginRight : '200px'  , marginLeft : '20px',justifyContent: 'center'}}>
                        <h4>{highlight.title}</h4>
                        <div style={{ height: '400px', width: '800px' }} dangerouslySetInnerHTML={{ __html: highlight.embed }} />
                    </div>
                ))}
    
            </div>
        </div>
    </Spring>
    
    );
};

export default  VideoDisplay;


