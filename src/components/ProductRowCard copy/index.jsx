import styles from './styles.module.scss';
import Spring from '@components/Spring';
import TruncatedText from '@components/TruncatedText';
import { Link } from 'react-router-dom';
import CustomRating from '@ui/CustomRating';
import Price from '@ui/Price';
import IconButton from '@ui/IconButton';
import useMeasure from 'react-use-measure';
import { useWindowSize } from 'react-use';
import { useState, useEffect } from 'react'; 

const images = [
  'https://pbs.twimg.com/media/DCZBKuMXsAYRDVi?format=png&name=small',
  'https://media.asroma.com/prod/images/square_medium_fill/c431a82a89dd-5be9a56f0985-lukaku-copia.png',
  'https://www.orlandopiratesfc.com/storage/2024/01/01eb1374cd229ff7c7433e966baae768.png',
  'https://www.indiansuperleague.com/static-assets/images/players/33676.png?v=100.82',
  'https://media.asroma.com/prod/images/square_medium_fill/143a6bf28f85-rui-patricio-copia.png',
  'https://www.valenciacf.com/public/Image/2024/1/diakhaby_Retrato.png',
  'https://media.ol.fr/uploads/assets/Henrique_e2b12fe9f1.png?twic=v1/focus=auto/cover=400x533',
  'https://www.olympiacos.org/wp-content/uploads/2024/01/02/Martins-PANIGIRIKO.png',
];

const ProductRowCard = ({ player, isSlide = false, addPlayer, homeTeam }) => {
  const Wrapper = isSlide ? 'div' : Spring;
  const [ref, { width }] = useMeasure();
  const { width: windowWidth } = useWindowSize();

  const [randomImageIndex, setRandomImageIndex] = useState(null);
  const avatar = player?.avatar || images[randomImageIndex];

  useEffect(() => {
    const savedIndex = localStorage.getItem('randomImageIndex');
    if (savedIndex !== null) {
      setRandomImageIndex(parseInt(savedIndex));
    } else {
      const newIndex = Math.floor(Math.random() * images.length);
      setRandomImageIndex(newIndex);
      localStorage.setItem('randomImageIndex', newIndex.toString());
    }
  }, []);

  const handleAddToLineup = () => {
    addPlayer(player);
  };

  const handleRemoveFromLineup = () => {
    // Handle the logic to remove the player from the lineup
  };

  const isPlayerInLineup =
    Object.values(homeTeam.squad)
      .flat()
      .some((p) => p && p.name === player.fullname);

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

export default ProductRowCard;