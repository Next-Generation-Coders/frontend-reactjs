// styling
import styles from './styles.module.scss';

// components
import Spring from '@components/Spring';
import Lineups from '@components/Lineups';
import Score from '@ui/Score';
import { useEffect, useState } from 'react';

import defaultLogo1 from "../../../../../assets/Def1.png";
import defaultLogo2 from "../../../../../assets/Def2.png";
import defaultLogo3 from "../../../../../assets/Def3.png";
import defaultLogo4 from "../../../../../assets/Def4.png";
import {useThemeProvider} from '@contexts/themeContext';
import {useWindowSize} from 'react-use';

// utils
import PropTypes from 'prop-types';

import RefNStaduim from './RefNStaduim';
import ScoreMatch from "@ui/ScoreMatch";
import axios from "axios";

const GameCard = ({score,match, index, variant = 'basic',selectedDay ,onClick }) => {
    const {width} = useWindowSize();
    const {theme} = useThemeProvider();
    const defaultLogos = [defaultLogo1, defaultLogo2, defaultLogo3, defaultLogo4];

    const getRandomDefaultLogo = (prevLogo) => {
        let randomIndex = Math.floor(Math.random() * defaultLogos.length);
        // If there's only one default logo, return it
        if (defaultLogos.length === 1) return defaultLogos[0];
        
        // Loop until we get a different logo from the previous one
        while (defaultLogos[randomIndex] === prevLogo) {
          randomIndex = Math.floor(Math.random() * defaultLogos.length);
        }
        return defaultLogos[randomIndex];
      };
    const [team1Name, setTeam1Name] = useState(null);
    const [team2Name, setTeam2Name] = useState(null);
    const [team2Logo, setteam2Logo] = useState(null);
    const [team1Logo, setteam1Logo] = useState(null);
  
    useEffect(() => {
      const fetchTeamDetails = async () => {
        try {
          // Fetch team details for team1
          const team1Response = await fetch(`http://localhost:3000/Team/getbyid/${match.team1}`);
          if (!team1Response.ok) {
            throw new Error('Failed to fetch team details');
          }
          const team1Data = await team1Response.json();
          setTeam1Name(team1Data.name);
          setteam1Logo(team1Data.logo || getRandomDefaultLogo(team1Data.logo));
          // Fetch team details for team2
          const team2Response = await fetch(`http://localhost:3000/Team/getbyid/${match.team2}`);
          if (!team2Response.ok) {
            throw new Error('Failed to fetch team details');
          }
          const team2Data = await team2Response.json();
          setTeam2Name(team2Data.name);
          setteam2Logo(team2Data.logo || getRandomDefaultLogo(team2Data.logo));
        } catch (error) {
          console.error('Error fetching team details:', error);
        }
      };
  
      fetchTeamDetails();
    }, [match]);
  
    if (match.startDay !== selectedDay ) {
        return null; 
      }






    return (
        <Spring className={`${styles.container} ${styles[theme]} h-100`} type="slideUp" index={index}>
            <div className="card-padded d-flex flex-column g-20"
                 style={{paddingBottom: variant !== 'extended' ? 'var(--card-padding)' : 10}}>
                    
                <div className="d-flex align-items-center justify-content-between p-relative">
                    
                
                    <img className="club-logo" src={team1Logo } alt={team1Logo}/>
                    <Score team1={score.scoreTeam1}  team2={score.scoreTeam2}   />

                    <img className="club-logo" src={team2Logo } alt={team2Logo}/>
                </div>
                {
                    width >= 414 && (
                        <div className="d-flex justify-content-between g-30">
                            <div style={{minWidth: 0}}>
                                <h3>{team1Name}</h3>
                               
                            </div>
                            <div className="text-right" style={{minWidth: 0}}>
                                <h3>{team2Name}</h3>
                               
                            </div>
                        </div>
                    )
                }
            </div>
            {
                variant === 'extended' && (
                    <div className="border-top">
                        <Lineups wrapperClass={styles.field} isCompact/>
                    </div>
                )
            }
          
            <RefNStaduim  variant="alt" match={match}/>
        </Spring>
    )
}

GameCard.propTypes = {
    match: PropTypes.object.isRequired,
    index: PropTypes.number,
    variant: PropTypes.oneOf(['basic', 'extended'])
}

export default GameCard;