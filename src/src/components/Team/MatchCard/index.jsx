// styling
import styles from './styles.module.scss';

// components
import Spring from '@components/Spring';
import MatchScoreItem from '@components/MatchScoreItem';

const MatchCard = ({match, index}) => {
    const latestEvent = match.events[match.events.length - 1];

    return (
        <Spring className={styles.container} type="slideUp" index={index}>
            <div className={styles.main}>
                {/*  pour etre liste des equipe */}
                <MatchScoreItem match={match} withLogo/>
            </div>
            
        </Spring>
    )
}

export default MatchCard