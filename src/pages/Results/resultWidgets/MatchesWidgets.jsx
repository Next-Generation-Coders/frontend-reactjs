import React, { useState, useEffect } from 'react';
import styled from 'styled-components/macro';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import ClubInfoTeam1 from './ClubInfoTeam1';
import ClubInfoTeam2 from './ClubInfoTeam2';
import Score from '@ui/Score';
import './score.css';

const Header = styled.div`
  .main {
    display: none;
    @media screen and (min-width: 768px) {
      display: flex;
    }
  }

  .progress-bar {
    display: flex;
    width: 100%;
    height: 20px;
    background-color: #ddd;
    margin-top: 10px;
    border-radius: 25px;
    overflow: hidden;
  }

  .progress {
    height: 100%;
    line-height: 20px;
    color: #ece9e9;
    font-weight: bold;
    transition: width 0.3s ease;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .predicted-goals {
    display: flex;
    justify-content: space-between;
    margin-top: 10px;
  }

  .predicted-goals .progress {
    flex: 1;
    margin-right: 10px;
    background-color: #ddd;
    border-radius: 25px;
    overflow: hidden;
  }
`;

const MatchesWidgets = ({ score, upcoming }) => {
    const navigate = useNavigate();
    const [matchData, setMatchData] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const fetchMatchData = async () => {
            try {
                setIsLoading(true);
                const response = await axios.get('http://localhost:5000/upcoming');
                const upcomingMatches = response.data;
                const matchId = score?.match?._id;

                if (matchId && upcomingMatches[matchId]) {
                    setMatchData(upcomingMatches[matchId]);
                    setIsLoading(false);
                }
            } catch (error) {
                setIsLoading(false);
                console.error('Error fetching match data:', error);
            }
        };

        if (upcoming) {
            fetchMatchData();
        }
    }, [score, upcoming]);

    const GoToMatchDetails = async (matchId) => {
        navigate('/match', { state: { matchId } });
    };

    return (
        <div className="card flex-column">
            <Header className="d-flex align-items-center justify-content-between card-padded p-relative">
                <Link to="/match" state={{ matchId: score?.match?._id }} style={{ textDecoration: 'none', color: 'inherit' }}>
                    <ClubInfoTeam1 team1={score?.match?.team1} />
                </Link>
                <Score team1={score?.team1Goals} team2={score?.team2Goals} />
                <Link to="/match" state={{ matchId: score?.match?._id }} style={{ textDecoration: 'none', color: 'inherit' }}>
                    <ClubInfoTeam2 team2={score?.match?.team2} wrapperClass="flex-row-reverse text-right" />
                </Link>
            </Header>

            <div className="predicted-winner">
                {matchData && upcoming && (
                    <>
                        <p style={{ color: 'white' }}>Predicted Winner: {matchData.predicted_winner}</p>
                        <div className="progress-bar">
                            <div className="progress" style={{ width: `${matchData.percentage_team1_win}%`,color:"black",borderRadius:"10px 10px 10px 10px", backgroundColor: '#08F26E' }}>
                                {matchData.team1_name} ({matchData.percentage_team1_win}%)
                            </div>
                            <div className="progress" style={{ width: `${matchData.percentage_team2_win}%`,color:"white",borderRadius:"10px 10px 10px 10px", backgroundColor: '#C21807' }}>
                                {matchData.team2_name} ({matchData.percentage_team2_win}%)
                            </div>
                        </div>

                        <div className="predicted-goals">
                            <div className="progress" style={{ color: 'white' }} >
                                Predicted Goals for {matchData.team1_name}: {matchData.predicted_goals_team1}
                            </div>
                            <div className="progress" style={{ color: 'white' }}>
                                Predicted Goals for {matchData.team2_name}: {matchData.predicted_goals_team2}
                            </div>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};

export default MatchesWidgets;
