// styling
import styles from './styles.module.scss';

// components
import Spring from '@components/Spring';
import {Swiper, SwiperSlide} from 'swiper/react';
import {Autoplay, Thumbs, EffectFade} from 'swiper';
import Like from '@ui/Like';
import SizeSelector from '@ui/SizeSelector';
import SizeGuide from '@components/SizeGuide';
import Price from '@ui/Price';
import IconButton from '@ui/IconButton';
import CompareButton from '@ui/CompareButton';
import ColorCheckbox from '@ui/ColorCheckbox';

// hooks
import {useState, useEffect} from 'react';
import {useThemeProvider} from '@contexts/themeContext';

// constants
import {SIZES} from '@constants/shop';

// assets
import stadium from '@assets/refree/terrain.jpeg';
import full2 from '@assets/product/full2.webp';
import full3 from '@assets/product/full3.webp';
import full4 from '@assets/product/full4.webp';
import full5 from '@assets/product/full5.webp';
import thumb1 from '@assets/product/thumb1.webp';
import thumb2 from '@assets/product/thumb2.webp';
import thumb3 from '@assets/product/thumb3.webp';
import thumb4 from '@assets/product/thumb4.webp';
import thumb5 from '@assets/product/thumb5.webp';

const ProductDisplay = () => {
    const {direction} = useThemeProvider();
    const [popupOpen, setPopupOpen] = useState(false);
    const [mainSwiper, setMainSwiper] = useState(null);
    const [thumbsSwiper, setThumbsSwiper] = useState(null);

    useEffect(() => {
        if (mainSwiper && thumbsSwiper) {
            mainSwiper.changeLanguageDirection(direction);
            mainSwiper.update();
            thumbsSwiper.changeLanguageDirection(direction);
            thumbsSwiper.update();
        }
    }, [mainSwiper, thumbsSwiper, direction]);

    const productColors = [
        {id: 'yellow', color1: 'accent'},
        {id: 'blue', color1: 'blue'},
        {id: 'black', color1: 'black-3'},
        {id: 'grass', color1: 'grass'},
        {id: 'salmon', color1: 'salmon'},
        {id: 'olive', color1: 'olive-light'},
        {id: 'pink', color1: 'pink'},
        {id: 'haki', color1: 'haki'},
        {id: 'neon-green', color1: 'neon-green'}
    ]

    return (
        <Spring className={`${styles.container} card d-grid card-padded`}>
            <span className={styles.media}>
                
            <img src={stadium} alt="Description de l'image"  />
            <div  className="d-flex flex-column">
                <button className="btn" type="submit">Confirme</button>
            </div>

            </span>
            <span className={styles.divider}/>
            <div className="d-flex flex-column">
            <img src={stadium} alt="Description de l'image"  />
            <button className="btn" type="submit">Confirme</button>


            </div>
            <SizeGuide open={popupOpen} onClose={() => setPopupOpen(false)}/>
        </Spring>
    )
}

export default ProductDisplay