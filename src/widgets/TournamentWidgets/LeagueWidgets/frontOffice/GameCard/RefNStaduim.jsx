// hooks
import {useEffect, useState} from 'react';
import { useNavigate } from 'react-router-dom';
import { FaMapMarkerAlt, FaUser } from 'react-icons/fa'; // Import icons// utils
import PropTypes from 'prop-types';
import Score from "@ui/Score";
import ScoreMatch from "@ui/ScoreMatch";

const RefNStaduim = ({variant = 'main', match}) => {
    const [active, setActive] = useState('lineups');
 
    const navigate = useNavigate();

  
   
   

    
    const GoToMatchDetails = async (matchId) =>{
      navigate('/match', { state: { matchId } });
    }


    
    return (
        
        <div className="d-grid col-2">
            <button  className={`btn--switch ${active === 'lineups' && 'active'} ${variant} `}
                    onClick={() => GoToMatchDetails(match._id)}>
                <span className="p-relative z-2">
                <FaMapMarkerAlt className="icon" style={{marginRight : "10px"}}/>
                Details
                </span>
            </button>
            
            <button className={`btn--switch ${active === 'lineups' && 'active'} ${variant} `}>
                <span  className="p-relative z-2">
                    <ScoreMatch team1={match.startHour} team2={match.startMinutes} variant="alt"/>
                </span>
            </button>
            
        </div>
    )
}

RefNStaduim.propTypes = {
    variant: PropTypes.oneOf(['main', 'alt'])
}

export default RefNStaduim