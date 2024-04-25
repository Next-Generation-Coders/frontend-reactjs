import React, { useState, useEffect } from 'react';
import Spring from '@components/Spring';
import ScrollContainer from '@components/ScrollContainer';
import GameCardBackOffice from './GameCardBackOffice';
import styles from './styles.module.scss';
const MatchesPanel = ( { selectedTournamentId }) => {
    const [matchestable, setMatches] = useState([]);
    const [currentFixtureTableIndex, setCurrentFixtureTableIndex] = useState(0);
    const [tournament ,settournament] = useState();
    const [tournamentType , settournamentType] =useState();
    const [rounds , setRounds] = useState([]);
    const [groupMatches , setGroupMatches] =useState([]);
    useEffect(() => {
        const fetchTournament = async () => {
            try {
                const tournamentData = await fetch(`http://localhost:3000/Tournament/getbyid/${selectedTournamentId}`);
                if (!tournamentData.ok) {
                    throw new Error('Failed to fetch Tournament');
                }
                const data = await tournamentData.json();
                settournament(data);
                settournamentType(data.TournamentType); // Set the tournament type after fetching the tournament data
            } catch (error) {
                console.error('Error fetching tournament:', error);
            }
        };

        if (selectedTournamentId) {
            fetchTournament();
        }
    }, [selectedTournamentId]);
    //http://localhost:3000/Tournament/getMatchesFromGroupsWithMatches
    useEffect(() => {
        const fetchMatchesForLeague = async () => {
            try {
                const response = await fetch(`http://localhost:3000/Tournament/fixtures/${tournament._id}`);
                if (!response.ok) {
                    throw new Error('Failed to fetch matches for League');
                }
                const data = await response.json();
                setMatches(data.fixtures);
            } catch (error) {
                console.error('Error fetching matches for type 1:', error);
            }
        };

        const fetchMatchesForKnockout = async () => {
            try {
                const response = await fetch(`http://localhost:3000/Tournament/getFixturesKnockout/${tournament._id}`);
                if (!response.ok) {
                    throw new Error('Failed to fetch matches for Knockout');
                }
                const data = await response.json();
                setRounds(data.fixturesByRound);
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

        if (selectedTournamentId && tournamentType) { // Check if tournamentType is set before fetching matches
            if (tournamentType === 'League') {
                fetchMatchesForLeague();
            } else if (tournamentType === 'Knockout') {
                fetchMatchesForKnockout();
            }else if (tournamentType === 'Championship'){
                fetchMatchesForChampionship();
            }
        }
    }, [ tournamentType,selectedTournamentId]);

    const switchToNextFixtureTable = () => {
        if (tournamentType === 'League') {
            setCurrentFixtureTableIndex((prevIndex) => (prevIndex + 1) % matchestable.length);
        }else if (tournamentType === 'Knockout') {
            setCurrentFixtureTableIndex((prevIndex) => (prevIndex + 1) % rounds.length);
        }
        else if (tournamentType === 'Championship') {
            setCurrentFixtureTableIndex((prevIndex) => (prevIndex + 1) % groupMatches.length);
        }
    };

    const switchToPreviousFixtureTable = () => {
        if (tournamentType === 'League') {
            setCurrentFixtureTableIndex((prevIndex) => (prevIndex - 1 + matchestable.length) % matchestable.length);
        }else if (tournamentType === 'Knockout') {
            setCurrentFixtureTableIndex((prevIndex) => (prevIndex - 1 + rounds.length) % rounds.length);
        }
        else if (tournamentType === 'Championship') {
            setCurrentFixtureTableIndex((prevIndex) => (prevIndex - 1 + groupMatches.length) % groupMatches.length);
        }

    };


    return (
        <Spring className="card d-flex flex-column card-padded">
            <div className="d-flex flex-column g-24" style={{ paddingBottom: 24 }}>
                <div className="switch-buttons">
                    <button style={{backgroundColor:"#FDCA40",color:"black"}} className='btn' onClick={switchToPreviousFixtureTable}>Previous</button>
                    <button style={{backgroundColor:"#FDCA40",color:"black",marginLeft:"950px"}} className='btn' onClick={switchToNextFixtureTable}>Next</button>
                </div>
            </div>
            <div className="d-flex flex-column g-24" style={{ paddingBottom: 24 }}>
                <div className={styles.grid}>
                    <div className="matchCardContainer-selector">
                        <ScrollContainer height={0}>
                            <div className={`${styles.scroll_track} track d-flex flex-column g-20`}>
                                <div className="game-container">
                                    {tournamentType === 'League' && (

                                        <>
                                            {matchestable[currentFixtureTableIndex]?.map((matchId, matchIndex) => (
                                                <div key={matchIndex} className='matchCardContainer'>
                                                    <GameCardBackOffice matchId={matchId} selectedTournamentId={selectedTournamentId} />
                                                </div>
                                            ))}
                                        </>
                                    )}
                                    {tournamentType === 'Knockout' && (


                                        <>
                                            {rounds && rounds[currentFixtureTableIndex]?.map((matchId, matchIndex) => (
                                                <div key={matchIndex} className='matchCardContainer'>
                                                    <GameCardBackOffice matchId={matchId} selectedTournamentId={selectedTournamentId} />
                                                </div>
                                            ))}
                                        </>
                                    )}
                                    {tournamentType === 'Championship' && (


                                        <>
                                            {groupMatches && groupMatches[currentFixtureTableIndex]?.map((matchId, matchIndex) => (
                                                <div key={matchIndex} className='matchCardContainer'>
                                                    <GameCardBackOffice matchId={matchId} selectedTournamentId={selectedTournamentId} />
                                                </div>
                                            ))}
                                        </>
                                    )}


                                </div>
                            </div>
                        </ScrollContainer>
                    </div>
                </div>
            </div>
        </Spring>

    );
};

export default MatchesPanel;

