// styling
import styled from 'styled-components/macro';

// components
import Spring from '@components/Spring';
import ClubInfo from '@components/ClubInfo';
import Score from '@ui/Score';
import MatchTrack from '@ui/MatchTrack';
import MatchEventText from '@ui/MatchEventText';
import MatchProgress from '@ui/MatchProgress';

// hooks 
import useMeasure from 'react-use-measure';

const Header = styled.div`
  .main {
    display: none;
    
    // tablet portrait
    @media screen and (min-width: 768px) {
        display: flex;
    }
  }
`;

const ScoreWidget = ({score , handleGoal ,changed}) => {
    

    const buttonStyle = { 
        width: '40%',
        padding:'2%',
        fontWeight:"bold",
        fontSize:"1rem"
      };

    return (
        <div className="card  flex-column ">
            <Header className="d-flex align-items-center justify-content-between card-padded p-relative">
                <ClubInfo id="realmadrid"/>
                
                <Score changed={changed} team2={score.scoreTeam2} team1={score.scoreTeam1} />
                <ClubInfo id="barcelona" wrapperClass="flex-row-reverse text-right"/>
           
            </Header>

            <Header className="d-flex align-items-center justify-content-between card-padded p-relative">
           
                <button className="btn"   onClick={() => handleGoal('team2')} style={buttonStyle}type="button">
                        Goal Real madrid
                    </button>   

                     <button className="btn "  onClick={() => handleGoal('team1')} style={buttonStyle} type="submit">
                        Goal Barca
                    </button>        
            </Header>
            
        </div>
    )
} 

export default ScoreWidget