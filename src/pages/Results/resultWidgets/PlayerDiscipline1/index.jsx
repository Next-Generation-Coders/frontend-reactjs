// styling
import styles from './styles.module.scss'

// components
import LazyImage from '@components/LazyImage';

// hooks
import {useThemeProvider} from '@contexts/themeContext';
import logo from '../../placeholder.png';
// utils
import {getClubInfo} from '@utils/helpers';
import PropTypes from 'prop-types';

const PlayerDiscipline1 = ({clubID = 'realmadrid', firstName = 'Manuel', lastName = 'Neuer', yellow1,red1  ,team1 }) => {
    // Destructure redTeam1 from red1 prop
    const club = getClubInfo(clubID);
    const {direction} = useThemeProvider();

    const drawYellowCards = () => {
        return Array(yellow1).fill(0).map((_, i) => <span key={i} className={`${styles.card} ${styles.yellow} ${styles[direction]}`}/>)
    }
    // const drawRedCards = () => {
    //     return Array(red).fill(0).map((_, b) => <span key={b} className={`${styles.card} ${styles.red} ${styles[direction]}`}/>)
    // }
    const drawRedCards = () => {
        // Use redTeam1 if available, otherwise default to 0
        return Array(red1).fill(0).map((_, b) => <span key={b} className={`${styles.card} ${styles.red} ${styles[direction]}`}/>)
    }

    return (
        <div className="card h-1 d-flex flex-column g-20">
            <div className="card_header d-flex flex-column g-16 flex-1">
                <LazyImage className="club-logo club-logo--md" src={ team1?.logo} alt={team1?.name} />
                <h3>
                   {team1?.name}
                </h3>
            </div>
            <div className="card_footer--sm justify-content-between">
                <div className="d-flex align-items-center g-8">
                    <div className={styles.card_wrapper}>
                        {drawYellowCards()}
                    </div>
                    <span className="label h6">{yellow1}</span>
                </div>
                <div className="d-flex align-items-center g-8">
                    <div className={styles.card_wrapper}>
                        {drawRedCards()}
                    </div>
                    <span className="label h6">{red1}</span>
                </div>
                {/* <div className="d-flex align-items-center g-8">
                    <span className={`${styles.card} ${styles.red}`}/>
                    <span className="label h6">{red}</span>
                </div> */}
            </div>
        </div>
    )
}

PlayerDiscipline1.propTypes = {
    clubID: PropTypes.string,
    firstName: PropTypes.string,
    lastName: PropTypes.string,
    red: PropTypes.number,
    yellow: PropTypes.number
}

export default PlayerDiscipline1