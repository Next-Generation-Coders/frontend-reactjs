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
import ItemInfo from './ItemInfo';
import { Link } from 'react-router-dom';
const data = [
    {id: 'arsenal', value: 10},
    {id: 'chelsea', value: 12},
    {id: 'mancity', value: 9},
    {id: 'manunited', value: 7},
    {id: 'liverpool', value: 18},
    {id: 'fiorentina', value: 4},
    {id: 'realmadrid', value: 10},
    {id: 'juventus', value: 25}
]

const TournamentTeamSlider = ({selectedTournamentId}) => {
    const {direction} = useThemeProvider();
    const [swiper, setSwiper] = useState(null);
    const[tournament ,setTournament] = useState();
    const [teams, setTeams] = useState([]);
    const [DataTeams, setDataTeams] = useState([]);
    const [stop, setstop] = useState(false);
    
      useEffect(() => {
        const fetchTournamentDetails = async () => {
            try {
                const response = await fetch(`http://localhost:3000/Tournament/getbyid/${selectedTournamentId}`);
                if (!response.ok) {
                    throw new Error('Failed to fetch tournament details');
                }
                const tournamentData = await response.json();
                setTournament(tournamentData);
                
            } catch (error) {
                console.error('Error fetching tournament details:', error);
            }
        };
    
        fetchTournamentDetails();
    }, [selectedTournamentId]);
    
    
      useEffect(() => {
        const fetchTeams = async () => {
          try {
            const response = await axios.get(`http://localhost:3000/Tournament/getTeamsOftournament/${selectedTournamentId}`);
            await setTeams(response.data);
            
          } catch (error) {
            console.error('Error fetching teams:', error);
          }
        };
   
        fetchTeams();
      }, [selectedTournamentId]);

      useEffect(() => {
        const buildData = async () => {
            
                const dataOfTeams = await teams.map(team => ({
                    id: team._id,
                    value: team.matches.length 
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
                            <Link key={index} to={"/team-profile"} state={{ teamId: item.id }} style={{ textDecoration: 'none', color: 'inherit' }}>
                                <ItemInfo {...item}/>
                            </Link>
                        </SwiperSlide>
                    ))
                }
            </Swiper>
            <SwiperControls swiper={swiper}/>
        </Spring>
    )
}

export default TournamentTeamSlider;