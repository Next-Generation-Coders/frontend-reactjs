    // styling
import styled from 'styled-components/macro';

import ClubInfo from '@components/ClubInfo';
import Score from '@ui/Score';

import './score.css'; // Import your CSS file

const Header = styled.div`
  .main {
    display: none;
    
    // tablet portrait
    @media screen and (min-width: 768px) { 
        display: flex;
    }
  }
`;

const MatchScoreWidget = ({score  }) => {
   
    return (
        <div className="card  flex-column ">
            <Header className="d-flex align-items-center justify-content-between card-padded p-relative">
                <ClubInfo id="realmadrid"/>
                <Score  team2={score.scoreTeam2} team1={score.scoreTeam1}   />
                <ClubInfo id="barcelona" wrapperClass="flex-row-reverse text-right"/>
           
            </Header>

        
            
        </div>
    )
} 

export default MatchScoreWidget