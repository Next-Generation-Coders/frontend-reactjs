// components
import Spring from '@components/Spring';
import TeamStatsCard from '@components/TeamStatsCard';
import {Swiper, SwiperSlide} from 'swiper/react';
import {Autoplay} from 'swiper';
import SwiperControls from '@ui/SwiperControls';

// hooks
import {useState, useEffect} from 'react';
import {useThemeProvider} from '@contexts/themeContext';
import axios from 'axios';
import ItemInfo from './TournamentInfo';



const TournamentSlider = () => {
    const {direction} = useThemeProvider();
    const [swiper, setSwiper] = useState(null);
 
    const [teams, setTeams] = useState([]);
    const [DataTeams, setDataTeams] = useState([]);
    const [stop, setstop] = useState(false);
    
      
    
    
      useEffect(() => {
        const fetchTeams = async () => {
          try {
            const response = await axios.get(`http://localhost:3000/Tournament/getTopFollowedTournaments`);

          } catch (error) {
            console.error('Error fetching teams:', error);
          }
        };
   
        fetchTeams();
      }, []);

      useEffect(() => {
        const buildData = async () => {
            
                const dataOfTeams = await teams.map(team => ({
                    id: team._id,
                    value: team.numberOfFollowers 
                }));
                setDataTeams(dataOfTeams);
                setstop(true);
                
            
        };
  
        buildData();
    
    }, [teams]);


    
    useEffect(() => {
        if (swiper) {
            swiper.changeLanguageDirection(direction);
            swiper.update();
        }
    }, [direction, swiper]);

    return (
        <Spring className="w-100 h-100 p-relative">
            <Swiper className="w-100 h-100"
                    style={{paddingTop: 8, marginTop: -8}}
                    onSwiper={setSwiper}
                    modules={[Autoplay]}
                    autoplay={{delay: 3000, disableOnInteraction: false}}
                    speed={1200}
                    dir={direction}
                    breakpoints={{
                        413: {slidesPerView: 2},
                        1279: {slidesPerView: 3},
                        1919: {slidesPerView: 4},
                    }}
                    loop
                    slidesPerView={1}
                    spaceBetween={24}>
                {
                    DataTeams.map((item, index) => (
                        <SwiperSlide className="w-100 h-100"
                                     key={index}
                                     style={{
                                         width: 175,
                                         margin: direction === 'ltr' ? '0 24px 0 0' : '0 0 0 24px'
                                     }}>
                            
                                <ItemInfo {...item}/>
                          
                        </SwiperSlide>
                    ))
                }
            </Swiper>
            <SwiperControls swiper={swiper}/>
        </Spring>
    )
}

export default TournamentSlider;