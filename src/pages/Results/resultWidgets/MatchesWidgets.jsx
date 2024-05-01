import React from 'react';
import styled from 'styled-components/macro';
import { Link, useNavigate } from 'react-router-dom';

import ClubInfoTeam1 from './ClubInfoTeam1';
import ClubInfoTeam2 from './ClubInfoTeam2';
import Score from '@ui/Score';
import './score.css'; // Import your CSS file
import TimeMatch from './TimeMatch';

const Header = styled.div`
  .main {
    display: none;
    
    // tablet portrait
    @media screen and (min-width: 768px) { 
      display: flex;
    }
  }
`;

const MatchesWidgets = ({ score }) => {
    const navigate = useNavigate();

    const GoToMatchDetails = async (matchId) => {
        navigate('/match', { state: { matchId } });
    }

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
        </div>
    );
};

export default MatchesWidgets;
