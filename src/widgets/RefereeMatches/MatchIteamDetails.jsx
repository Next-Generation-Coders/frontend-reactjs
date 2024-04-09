// components
import TruncatedText from '@components/TruncatedText';

// hooks
import useMeasure from 'react-use-measure';

// utils
import {getClubInfo} from '@utils/helpers';
import PropTypes from 'prop-types';

const MyMatchItem = ({isLeader, withLogo, team, variant,isTeamOne,tournament}) => {
    const [ref, {width}] = useMeasure();
    const itemStyles = {
        fontFamily: 'var(--heading-font)',
        lineHeight: 1,
        fontSize: variant === 'card' ? '1rem' : '1.125rem',
        color: variant === 'card' ? (isLeader ? 'var(--header)' : 'var(--text)') : 'var(--header-dark)'
    }

    const logoStyles = {
        height: 20,
        width: 20,
    }

    return (
        <div className={`${isLeader ? 'text-700 h3' : ''} d-flex justify-content-between align-items-center g-20`}
             style={itemStyles}>
            <div className="d-flex align-items-center g-8 flex-1" ref={ref}>
                {
                    <img style={logoStyles} src={team.logo} alt={team.name}/>
                }
                <b>{isTeamOne && <TruncatedText width={width - 30} text={team.name} lines={1}/>}
                    {!isTeamOne && team.name}</b>
            </div>
            {tournament && <div>
                {isTeamOne && "Tournament :"}<p className="text-700 h3">{isTeamOne && tournament.title}</p>
                {!isTeamOne && <img style={logoStyles} src={tournament.logo} alt={team.name}/>}
            </div>}
        </div>
    )
}

const MatchItemDetails = ({match, variant = 'card', withLogo}) => {
    const getLeader = () => {
        if (match.team1.score > match.team2.score) {
            return match.team1.id;
        } else if (match.team1.score < match.team2.score) {
            return match.team2.id;
        } else {
            return null;
        }
    }

    return (
        <div className={`d-flex flex-column ${variant === 'card' ? 'g-6' : 'g-8'}`}>
            <MyMatchItem isLeader={getLeader() === match.team1.id}
                  withLogo={withLogo}
                  variant={variant}
                  team={match.team1}
                  isTeamOne={true}
                  tournament={match.tournament}
            />
            <MyMatchItem isLeader={getLeader() === match.team2.id}
                  withLogo={withLogo}
                  variant={variant}
                  team={match.team2}
                  isTeamOne={false}
                  tournament={match.tournament}
            />
        </div>
    )
}

MatchItemDetails.propTypes = {
    match: PropTypes.object.isRequired,
    variant: PropTypes.oneOf(['card', 'thumb']),
    withLogo: PropTypes.bool
}

export default MatchItemDetails