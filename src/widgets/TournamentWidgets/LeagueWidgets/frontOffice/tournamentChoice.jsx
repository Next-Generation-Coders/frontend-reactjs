import { useEffect, useState } from 'react';
import styles from './styles.module.scss';

import Spring from '@components/Spring';
import { NavLink } from 'react-router-dom';
import dayjs from 'dayjs';
import { getMonthDays } from '@utils/helpers';
import classNames from 'classnames';
import { Swiper, SwiperSlide } from 'swiper/react';
import { useThemeProvider } from '@contexts/themeContext';
import GameCard from './GameCard/GameCard';
import ScrollContainer from '@components/ScrollContainer';
import StandingsDisplay from './Standings/StandingsDisplay';
import RoundsDisplay from './RoundsDisplay';
import ChampionshipGroups from './GroupsDisplay/ChampionshipGroups';
import {toast} from "react-toastify";
import axios from "axios";

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

const TournamentChoice = ({ selectedTournamentId }) => {
    const [fixtures, setFixtures] = useState([]);
    const today = dayjs().date();
    const [selectedDay, setSelectedDay] = useState(today); // Default selected day
    const [tournament, settournament]= useState({})
    const [matchResult, setMatchResult] = useState(null);

    const [tournamentType , settournamentType] =useState();
    const [rounds , setRounds] = useState([]);
    const [groupMatches , setGroupMatches] =useState([]);
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
                toast.error('Error fetching tournament details:', error);
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
                    console.log("ddddd", data.fixtures);

                    const fixtureIds = data.fixtures.map(fixture => fixture._id);
                    console.log("aaaaaaaa", fixtureIds);

                    setRounds(data.fixtures);

                    // Use the first matchId (if available) to fetch match result
                    if (fixtureIds.length > 0) {
                        fetchMatchResult(fixtureIds[0]); // Fetch match result for the first match
                    }
                }
            } catch (error) {
                console.error('Error fetching fixtures:', error);
            }
        };

        const fetchMatchResult = async (matchId) => {
            try {
                const response = await axios.get(`http://localhost:3000/result/resultMatch/${matchId}`);
                console.log("youssef", response.data);
                setMatchResult(response.data);
            } catch (error) {
                console.error('Error fetching match result:', error);
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
                console.log(data.fixtures+"dddddddddddöööööö")
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

    /////////////////////////////
    // Render match result when available
    const score = {
        scoreTeam1: 0, // Default score for team 1
        scoreTeam2: 0, // Default score for team 2
    };

    console.log("vcvcvcvvc",matchResult)

    if (matchResult) {
        score.scoreTeam1 = matchResult.team1Goals;
        score.scoreTeam2 = matchResult.team2Goals;

    }
    console.log("team1",score.scoreTeam1)
    console.log("TEAM2",score.scoreTeam2)





    /////////////////////////////

    return (
        <Spring className="card d-flex flex-column">
            <div className="card_header d-flex flex-column g-10" style={{ paddingBottom: 20 }}>
                <div className="d-flex justify-content-between align-items-center">
                    <h3>{dayjs().format('MMMM')} matches</h3>
                    <NavLink className="text-button" to="/schedule">
                        Scheduler
                    </NavLink>
                </div>
                <Navigator active={selectedDay} setActive={setSelectedDay} />
            </div>

            <div className="d-flex flex-column g-24" style={{ paddingBottom: 24 }}>
                <div className={styles.grid}>
                    <div className={styles.scroll}>
                        <ScrollContainer height={0}>
                            <div className={`${styles.scroll_track} track d-flex flex-column g-20`}>
                                <div className="game-container">
                                    {tournament.TournamentType === 'League' ? (
                                        <div className={`${styles.card}`}>
                                            {fixtures.map((fixture, index) => (
                                                <div key={index} className="fixture-table" style={{marginBottom : '15px'}}>
                                                    <GameCard match={fixture} selectedDay={selectedDay}  />
                                                </div>
                                            ))}
                                        </div>
                                    ) : tournament.TournamentType === 'Knockout' ? (
                                        <div className={`${styles.card}`}>
                                            {rounds.map((fixture, index) => (
                                                <div key={index} className="fixture-table"  style={{marginBottom : '15px'}}>
                                                    <GameCard  score={score}  match={fixture} selectedDay={selectedDay}  />
                                                </div>
                                            ))}
                                        </div>
                                    ) : tournament.TournamentType === 'Championship' ? (
                                        <div className={`${styles.card}`}>
                                            {groupMatches.map((fixture, index) => (
                                                <div key={index} className="fixture-table" style={{marginBottom : '15px'}}>
                                                    <GameCard match={fixture} selectedDay={selectedDay}   />
                                                </div>
                                            ))}
                                        </div>
                                    ) : (
                                        <div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </ScrollContainer>
                    </div>
                    {tournament.TournamentType === 'League' ? (
                        <div className={`${styles.card}`}>
                            <StandingsDisplay selectedTournamentId={tournament._id} />
                        </div>
                    ) : tournament.TournamentType === 'Knockout' ? (
                        <div className={`${styles.card}`}>
                            <RoundsDisplay selectedTournamentId={tournament._id} />
                        </div>
                    ) : tournament.TournamentType === 'Championship' ?(
                            <div>
                                <ChampionshipGroups selectedTournamentId={tournament._id}/>
                            </div>
                        ):

                        (
                            <div>

                            </div>
                        )}
                </div>

            </div>
        </Spring>
    );
};

export default  TournamentChoice;

