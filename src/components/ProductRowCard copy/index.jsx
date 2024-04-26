// styling
import styles from './styles.module.scss';

// components
import Spring from '@components/Spring';
import TruncatedText from '@components/TruncatedText';
import {Link} from 'react-router-dom';
import CustomRating from '@ui/CustomRating';
import Price from '@ui/Price';
import IconButton from '@ui/IconButton';

// hooks
import useMeasure from 'react-use-measure';
import {useWindowSize} from 'react-use';
import { useState } from 'react';

const images = [
    'https://pbs.twimg.com/media/DCZBKuMXsAYRDVi?format=png&name=small',
    '/assets/avatars/2.webp',
    '/assets/avatars/3.webp',
    '/assets/avatars/4.webp',
    '/assets/avatars/5.webp',
  ];
  
  const ProductRowCard = ({ player, isSlide = false ,addPlayer, homeTeam}) => {
    const Wrapper = isSlide ? 'div' : Spring;
    const [ref, { width }] = useMeasure();
    const { width: windowWidth } = useWindowSize();
  
    // Randomly select an image if player avatar is not specified
    const [randomImageIndex] = useState(Math.floor(Math.random() * images.length));
    const avatar = player?.avatar || images[randomImageIndex];
    //const avatar =''
  
    return (
      <Wrapper className={`${styles.container} card card-padded ${windowWidth >= 414 ? 'h-1' : ''}`}>
        <img className={styles.media} src={avatar} alt={player?.fullname || 'Player Image'} />
        <div className={styles.main} ref={ref}>
          <div className="d-flex flex-column flex-1">
            <span className="label label--store h6">{player?.position}</span>
            <Link className={styles.main_title} to="/player">
              <TruncatedText className="h3" width={width} text={player?.fullname} />
            </Link>
            {/* <CustomRating value={player?.rating}/> */}
          </div>
          {/* <div className="d-flex align-items-center justify-content-between">
            <Price price={player?.price}/>
            <IconButton/>
          </div> */}
          <button
            className={`${styles.addButton} ${
              Object.values(homeTeam.squad)
                .flat()
                .some((p) => p && p.name === player.fullname)
                ? styles.removeButton
                : ""
                }`}
                onClick={() => addPlayer(player)}
            >
              {Object.values(homeTeam.squad)
                  .flat()
                  .some((p) => p && p.name === player.fullname)
                  ? "Remove from Lineup"
                  : "Add to Lineup"}
          </button>
        </div>
        
      </Wrapper>
    );
  };

export default ProductRowCard