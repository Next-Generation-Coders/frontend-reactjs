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

const ItemInfo = ({id, value}) => {
    const [ref, {width}] = useMeasure();
    const club = getClubInfo(id);
    
    
    
    
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
    return (
        <div className="card h-1 d-flex flex-column border-color-bottom" >
            <div className="d-flex flex-column align-items-start flex-1 g-14"
                 ref={ref}
                 style={{padding: '30px 30px 22px'}}>
               {id.logo ? (
                    <img className="club-logo club-logo--md" src={id.logo} alt={id.name} />
                ) : (
                    <img className="club-logo club-logo--md" src={getRandomDefaultLogo()} alt="Default Logo" />
                )}
                <h3>
                    <TruncatedText text={id} width={width}/>
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