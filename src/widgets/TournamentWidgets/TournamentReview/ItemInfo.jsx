// components
import TruncatedText from '@components/TruncatedText';
import GoalsStats from '@ui/GoalsStats';

// hooks
import useMeasure from 'react-use-measure';

import defaultLogo1 from "../../../assets/Def1.png";
import defaultLogo2 from "../../../assets/Def2.png";
import defaultLogo3 from "../../../assets/Def3.png";
import defaultLogo4 from "../../../assets/Def4.png";
import PropTypes from 'prop-types';
import {getClubInfo} from '@utils/helpers';
import { useEffect, useState } from 'react';

const ItemInfo = ({id, value}) => {
    const [ref, {width}] = useMeasure();
    const club1 = getClubInfo(id);
    const [club ,setClub] = useState();
    useEffect(() => {
        const fetchTeamDetails = async () => {
            try {
                const response = await fetch(`http://localhost:3000/Team/getbyid/${id}`);
                if (!response.ok) {
                    throw new Error('Failed to fetch team details');
                }
                const tournamentData = await response.json();
                setClub(tournamentData);
                
            } catch (error) {
                console.error('Error fetching team details:', error);
            }
        };
    
        fetchTeamDetails();
    }, [id])
    
    
    
    const getRandomDefaultLogo = () => {
        const defaultLogos = [defaultLogo1, defaultLogo2, defaultLogo3, defaultLogo4];
        const randomIndex = Math.floor(Math.random() * defaultLogos.length);
        return defaultLogos[randomIndex];
      };

      const defaultLogos = [defaultLogo1, defaultLogo2, defaultLogo3, defaultLogo4];
      const getDefaultLogo = () => {
        const index = Math.abs(Math.random() * defaultLogos.length) // Hash code to get consistent index
        return defaultLogos[index];
    };
    if(!club){
        return null ;
    }
    return (
        <div className="card h-1 d-flex flex-column border-color-bottom" >
            <div className="d-flex flex-column align-items-start flex-1 g-14"
                 ref={ref}
                 style={{padding: '30px 30px 22px'}}>
               {club.logo ? (
                    <img className="club-logo club-logo--md" src={club.logo} alt={club.name} />
                ) : (
                    <img className="club-logo club-logo--md" src={getRandomDefaultLogo()} alt="Default Logo" />
                )}
                <h3>
                    <TruncatedText text={club.name} width={width}/>
                    
                </h3>
            </div>
            <div className="card_footer--sm">
                <GoalsStats goals={value}/>
            </div>
        </div>
    )
}

ItemInfo.propTypes = {
    id: PropTypes.string.isRequired,
    value: PropTypes.number.isRequired,
}

export default ItemInfo;