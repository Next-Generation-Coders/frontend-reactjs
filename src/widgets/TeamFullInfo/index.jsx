// styling
import styles from './styles.module.scss';

// components
import Spring from '@components/Spring';
import ClubFullInfo from '@components/ClubFullInfo copy';
import PlayerRow from '@components/PlayerRow';
import Lineups from '@components/Lineups copy';

// utils
import PropTypes from 'prop-types';

// constants
import CLUBS from '@constants/clubs';
import React, { useState, useEffect } from 'react';
import LazyImage from '@components/LazyImage';

// data placeholder
import {players_list} from '@db/players';

const TeamFullInfo = ({id,teamsData}) => {
    console.log(teamsData+",,,,,,,,,,,,");
    if (!teamsData || teamsData.length === 0) {
        return <div>Loading...</div>; // Or display a loading indicator while data is being fetched
      }

    const club = CLUBS.find((club) => club.id === id);

    const dataArr = players_list.sort((a, b) => {
        if (a.isCaptain) {
            return -1;
        }
        if (b.isCaptain) {
            return 1;
        }
        return 0;
    });

    

    return (
        <Spring className={`${styles.container} card`}>
            <div className="d-flex flex-column g-20">
                <ClubFullInfo club={club}/>
                <div className="d-flex flex-column g-1">
                    <div>
                        {/* <LazyImage className="media" src={teamsData.logo} alt="logo"/> */}
                        <h3>{teamsData.name}</h3>
                        {teamsData.lineup.map((player, index) => (
                        <PlayerRow key={index} player={player} index={index} />
                        ))}
                    </div>
                </div>
            </div>
            <div className="d-flex flex-column g-20">
                <h3>Lineups</h3>
                {/* {teamsData.lineup.map((player, index) => ( */}
                    <Lineups  data={teamsData.lineup}  wrapperClass={styles.field} withField/>
                {/* ))} */}
            </div>


            {/* <div className="d-flex flex-column g-20">
                <ClubFullInfo club={club}/>
                <div className="d-flex flex-column g-1">
                    <div>
                        <h3>{teamsData[1]?.name}</h3>
                        {teamsData[1]?.lineup.map((player, index) => (
                        <PlayerRow key={index} player={player} index={index} />
                        ))}
                    </div>
                </div>
            </div>
            <div className="d-flex flex-column g-20">
                <h3>Lineups</h3>
                <Lineups wrapperClass={styles.field} withField/>
            </div> */}
        </Spring>
    )
}

TeamFullInfo.propTypes = {
    id: PropTypes.string.isRequired,
}

export default TeamFullInfo