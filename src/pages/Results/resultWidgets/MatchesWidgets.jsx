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

const MatchesWidgets = ({score }) => {
   
    //console.log(score)

    return (
        <div className="card  flex-column ">
            <Header className="d-flex align-items-center justify-content-between card-padded p-relative">
                <ClubInfoTeam1 team1={score?.match?.team1} />
                <Score  team2={score.team1Goals} team1={score.team2Goals}   />
            
                <ClubInfoTeam2  team2={score?.match?.team2} wrapperClass="flex-row-reverse text-right"/>
           
            </Header>

           
            
        </div>
    )
} 

export default MatchesWidgets