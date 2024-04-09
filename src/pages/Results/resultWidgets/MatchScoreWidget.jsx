// styling
import styled from 'styled-components/macro';

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

const MatchScoreWidget = ({score , team1,team2 }) => {
   

    console.log(team1)
    return (
        <div className="card  flex-column ">
            <Header className="d-flex align-items-center justify-content-between card-padded p-relative">
                <ClubInfoTeam1 team1={team1} />
                <Score team1={score.scoreTeam1}  team2={score.scoreTeam2}   />
            
                <ClubInfoTeam2  team2={team2} wrapperClass="flex-row-reverse text-right"/>
           
            </Header>

           
            
        </div>
    )
} 

export default MatchScoreWidget