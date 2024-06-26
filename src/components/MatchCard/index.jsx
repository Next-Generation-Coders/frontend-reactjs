// styling
import styles from './styles.module.scss';

// components
import Spring from '@components/Spring';
import MatchScoreItem from '@components/MatchScoreItem';

const MatchCard = ({match, index}) => {

    return (
        <Spring className={styles.container} type="slideUp" index={index}>
            <div className={styles.main}>
                <MatchScoreItem match={match} />
            </div>
            <div className={`${styles.footer} d-flex align-items-center g-10 border-top text-12`}>
                <span className="text-600 text-highlight">a</span>
                <span className="text-overflow">as</span>
            </div>
        </Spring>
    )
}

export default MatchCard