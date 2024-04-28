// styling
import styles from './styles.module.scss';

// components
import Spring from '@components/Spring';
import ProductRowCard from '@components/ProductRowCard copy';
import {Swiper, SwiperSlide} from 'swiper/react';
import {Autoplay} from 'swiper';
import {Navigation} from 'swiper';
import {Fragment} from 'react';
import SwiperControls from '@ui/SwiperControls';

// hooks
import {useState, useEffect} from 'react';
import {useThemeProvider} from '@contexts/themeContext';
import axios from 'axios';
import {useAuthContext} from "@hooks/useAuthContext";

// data placeholder
import products from '@db/products';

const StaticWrapper = ({children}) => { 
    return (
        <div className={styles.grid}>{children}</div>
    )
}

const SliderWrapper = ({children}) => {
    const {direction} = useThemeProvider();
    const [swiper, setSwiper] = useState(null);

    useEffect(() => {
        if (swiper) {
            swiper.changeLanguageDirection(direction);
            swiper.update();
        }
    }, [swiper, direction]);

    return (
        <Spring>
            <div className="p-relative">
                <Swiper
                    className="h-100"
                    onSwiper={setSwiper}
                    modules={[Navigation, Autoplay]}
                    navigation
                    slidesPerView={1}
                    spaceBetween={24}
                    loop
                    autoplay={{
                        delay: 2500,
                        disableOnInteraction: false,
                        pauseOnMouseEnter: true
                    }}
                    speed={1500}
                    breakpoints={{
                        767: {
                            slidesPerView: 2,
                        },
                        1279: {
                            slidesPerView: 3,
                        },
                        1499: {
                            slidesPerView: 4,
                        }
                    }}
                >
                    {children}
                </Swiper>
                <SwiperControls swiper={swiper} withShadow/>
            </div>
        </Spring>
    )
}

const ProductRowCardList = ({ isSlider = false, players, addPlayer, homeTeam }) => {

    const [playerOntheFiled, setplayerOntheFiled] = useState([]);

    const saveLineup = async (players) => {
        // Implement save lineup logic
    };

    const { direction } = useThemeProvider();
    const WidgetWrapper = isSlider ? SliderWrapper : StaticWrapper;
    const CardWrapper = isSlider ? SwiperSlide : Fragment;
    const cardWrapperProps = isSlider ? { style: { margin: direction === 'ltr' ? '0 24px 0 0' : '0 0 0 24px' } } : {};

    return (
        <WidgetWrapper>
            {
                players.map((player, index) => (
                    <CardWrapper key={player.id} {...cardWrapperProps}>
                        <ProductRowCard index={index} player={player} isSlide={isSlider} addPlayer={addPlayer} homeTeam={homeTeam} />
                    </CardWrapper>
                ))
            }
        </WidgetWrapper>
    );
};

export default ProductRowCardList