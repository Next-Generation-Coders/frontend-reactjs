// components
import ElementTooltip from '@ui/ElementTooltip';

// styling
import styles from './styles.module.scss';

// assets
import field from '@assets/pitch.webp';

// data placeholder
import pitch from '@db/pitch.js';


const positionToRoleMap = {
    GK: 'keeper',
    CB: ['center-back-left', 'center-back-right'],
    RB: 'full-back-right',
    LB: 'full-back-left',
    RWB: 'right wing-back',
    LWB: 'left wing-back',
    CM: 'center-midfielder',
    CDM: ['center-midfielder-left','center-midfielder-right'],
    CAM: 'center-midfielder-center',
    RM: 'right midfielder',
    LM: 'left midfielder',
    ST: 'center-forward',
    CF: 'center forward',
    RF: 'right forward',
    LF: 'left forward',
    RW: 'right-winger',
    LW: 'left-winger',
  };


const Lineups = ({data , wrapperClass, withField, isCompact}) => {
    return (
        <div className={`${styles.container} ${wrapperClass || ''}`}>
            {
                withField && <img className={styles.field} src={field} alt="media"/>
            }
            <div className={styles.overlay}>
                {
                    data.map((player, index) => {
                        const roles = positionToRoleMap[player.position]; // Get the roles for the player's position
                        const positionIndex = Object.keys(positionToRoleMap).indexOf(player.position); // Find the index of the player's position within the positionToRoleMap

                        const role = Array.isArray(roles) ? roles[positionIndex] : roles; // Assign the appropriate role based on the positionIndex
                    return (
                            <ElementTooltip key={index} title={player.fullname}>
                                <div className={`${styles.player} ${isCompact ? styles.compact : ''}`} data-role={role}>
                                    <img className={styles.player_img} src={player.avatar} alt="avatar"/>
                                    <span className={`${styles.player_num} h6`}>{player.jersyNumber}</span>
                                </div>
                            </ElementTooltip>
                        )
                    })
                }
            </div>
        </div>
    )
}

export default Lineups

