// hooks
import {useEffect, useState} from 'react';
import { useNavigate } from 'react-router-dom';
import { FaMapMarkerAlt, FaUser } from 'react-icons/fa'; // Import icons// utils
import PropTypes from 'prop-types';
import Score from "@ui/Score";
import ScoreMatch from "@ui/ScoreMatch";

const RefNStaduim = ({variant = 'main', match}) => {
    const [active, setActive] = useState('lineups');
    const[referee , setReferee ] = useState();
    const[stadium , setStadium ] = useState();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchStadium = async () => {
            try {
                const response = await fetch(`http://localhost:3000/Stadium/getbyid/${match.stadium}`);
                if (!response.ok) {
                    throw new Error('Failed to fetch Stadium');
                }
                const data = await response.json();
                console.log(data)
                setStadium(data);
                
            } catch (error) {
                console.error('Error fetching Stadium:', error);
            }
        };

        fetchStadium();
    }, [match]);
   
    useEffect(() => {
        const fetchreferee = async () => {
            try {
                const response = await fetch(`http://localhost:3000/User/getbyid/${match._ref}`);
                if (!response.ok) {
                    throw new Error('Failed to fetch referee');
                }
                const data = await response.json();
                console.log(data)
                setReferee(data);
          
            } catch (error) {
                console.error('Error fetching referee:', error);
            }
        };

        fetchreferee();
    }, [match]);

    
    const GoToMatchDetails = async (matchId) =>{
      navigate('/match', { state: { matchId } });
    }


    if (!stadium || !referee) {
        // If stadium or referee is not defined, return null to prevent rendering
        return null;
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