// utils
import PropTypes from 'prop-types';

const Score = ({team1 = 0, team2 = 0, variant = 'main' ,changed}) => {

    
    return (
        <div className={`score ${variant === 'alt' ? 'score--alt' : ''}`}>
            <span className={`scoreNumber ${changed==='team1' || changed ===true ? 'changed' : ''}`} >{team1}</span>
            <span>:</span>
            <span className={`scoreNumber ${changed==='team2' || changed ===true ? 'changed' : ''}`} >{team2}</span>
        </div>
    )
}

Score.propTypes = {
    team1: PropTypes.number,
    team2: PropTypes.number,
    variant: PropTypes.oneOf(['main', 'alt']),
}

export default Score