// components
import ElementTooltip from '@ui/ElementTooltip';

// styling
import styles from './styles.module.scss';

// assets
import field from '@assets/pitch.webp';

// data placeholder
import pitch from '@db/pitch.js';
import { useEffect, useState } from 'react';

const Lineups = ({data = data.players, wrapperClass, withField, isCompact}) => {

    const [players, setPlayers] = useState([]);

    useEffect(() => {
        async function fetchPlayers() {
            try {
                const playerIds = data; // Assuming data contains player IDs
                /* const playersData = await getPlayersByIds(playerIds);
                setPlayers(playersData); */


                const CheckResponse = await fetch(`http://localhost:3000/User/getPlayersByIds/${playerIds}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });
                //const checkDatam = await CheckResponse.json();
                //setCheckData(checkDatam)

                const allplayers = await CheckResponse.json();
                const all= allplayers
                setPlayers(all);
                console.log(allplayers+"\n1111111111111...........................")
            } catch (error) {
                console.error('Error fetching players:', error);
            }
        }

        fetchPlayers();
    }, [data,players]);


    return (
        <div className={`${styles.container} ${wrapperClass || ''}`}>
            {
                withField && <img className={styles.field} src={field} alt="media"/>
            }
            <div className={styles.overlay}>
                {
                    players.map((player, index) => {
                        console.log(player+"\n33333333333333333333")
                        return (
                            <ElementTooltip key={index} title={player.fullname}>
                                <div className={`${styles.player} ${isCompact ? styles.compact : ''}`} data-role={player.role}>
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

