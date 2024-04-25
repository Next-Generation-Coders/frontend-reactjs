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
import ClubInfoTeam1 from './ClubInfoTeam1';
import ClubInfoTeam2 from './ClubInfoTeam2';
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
const ScoreWidgetContainer = styled.div`
    height: 37vh; /* Set the height to 50% of the viewport height */
  `;

const ScoreWidget = ({matchID,matchStart,score , handleGoal ,changed,handleRed,handleYellow,handleCorners,handleOffsides,team1,team2}) => {
    

    const buttonStyle = { 
        width: '40%',
        padding:'2%',
        fontWeight:"bold",
        fontSize:"1rem"
      };

    return (
        <ScoreWidgetContainer className="card flex-column">

        <div className="card  flex-column ">
            <Header className="d-flex align-items-center justify-content-between card-padded p-relative">
                <ClubInfoTeam1 team1={team1}/>
                
                <Score changed={changed} team1={score.scoreTeam1} team2={score.scoreTeam2}  />
                <ClubInfoTeam2 team2={team2} wrapperClass="flex-row-reverse text-right"/>

            </Header>

            <div className='bg-red text-center'> 
            
            {/* <TimeMatch matchID={matchID}/> */}
            
            
            </div>
        

            <Header className="d-flex align-items-center justify-content-between card-padded p-relative">
               
            <button className="btn " disabled={!matchStart}  onClick={() => handleGoal('team1',matchID)} style={buttonStyle} type="submit">
                        Goal 
                    </button>

                     <button className="btn " disabled={!matchStart}  onClick={() => handleRed('team1',matchID)} style={buttonStyle} type="submit">
                        Red 
                    </button>     
                    <button className="btn" disabled={!matchStart} onClick={() => handleYellow('team1',matchID)}   style={buttonStyle} type="submit">
                        Yellow 
                    </button>  
                    <button className="btn" disabled={!matchStart}  onClick={() => handleCorners('team1',matchID)}   style={buttonStyle} type="submit">
                        Corner 
                    </button> 
                    <button className="btn" disabled={!matchStart} onClick={() => handleOffsides('team1',matchID)}  style={buttonStyle }type="button">
                        Offside 
                    </button> 
               
                <button className="btn" disabled={!matchStart}   onClick={() => handleGoal('team2',matchID)} style={buttonStyle} type="submit">
                        Goal 
                    </button> 
                    <button className="btn" disabled={!matchStart} onClick={() => handleRed('team2',matchID)}   style={buttonStyle} type="submit">
                        Red 
                    </button>   
                    <button className="btn" disabled={!matchStart}  onClick={() => handleYellow('team2',matchID)}  style={buttonStyle} type="submit">
                        Yellow 
                    </button>  
                    <button className="btn" disabled={!matchStart}   onClick={() => handleCorners('team2',matchID)} style={buttonStyle} type="button">
                        Corner 
                    </button> 
                    <button className="btn" disabled={!matchStart} onClick={() => handleOffsides('team2',matchID)}   style={buttonStyle} type="button">
                        Offside 
                    </button> 


                    
                  

 

            </Header>
                        
        </div>
        </ScoreWidgetContainer>
    )
} 

export default ScoreWidget