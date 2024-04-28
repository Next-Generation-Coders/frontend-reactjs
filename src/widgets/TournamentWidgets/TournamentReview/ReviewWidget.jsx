
import Spring from '@components/Spring';
import LeagueHeader from '@components/LeagueHeader';
import ProgressItem from '@components/ProgressItem';
import AnimatedCount from '@components/AnimatedCount';
import {useThemeProvider} from '@contexts/themeContext';
import { useEffect , useState } from 'react';
import BasicRating from './RatingStars';
import FollowButton from './FollowButton';

const ReviewWidget = ({selectedTournamentId}) => {
    const {theme} = useThemeProvider();
    


const [tournament ,setTournament] = useState();
const [count ,setcount] = useState();
const [tournamentrates ,settournamentrates] = useState();
    useEffect(() => {
        const fetchTournament = async () => {
            try {
                const response = await fetch(`http://localhost:3000/Tournament/getbyid/${selectedTournamentId}`);
                if (!response.ok) {
                    throw new Error('Failed to fetch tournaments');
                }
                const data = await response.json();
                console.log('Fetched tournament:', data);
                setTournament(data);
                settournamentrates(data.rating);
                calculateAverage(data.rating);
            } catch (error) {
                console.error('Error fetching tournaments:', error);
            }
        };

        fetchTournament();
    }, []);



    const calculateAverage = (rates) => {
        let totalSum = 0;
        let totalCount = 0;

        for (const key in rates) {
            totalSum += rates[key] * parseInt(key); 
            totalCount += rates[key];
        }

        const average = totalSum / totalCount;
        setcount(average); 
    };
    const getPercents = (tournamentrates) => {
        let total = 0;
        for (const key in tournamentrates) {
            total += tournamentrates[key];
        }
        const result = {};
        for (const key in tournamentrates) {
            result[key] = (tournamentrates[key] / total) * 200;
        }
        return result;
    }

    if (!tournament) {
        return null ;
    }

    return (
        <>
        
        <Spring className="card d-flex flex-column justify-content-between g-20 card-padded">
        <div style={{ display: 'flex', alignItems: 'center' }}>
  
        {tournament && (
    <LeagueHeader img={tournament.logo} title={tournament.title} subtitle={tournament.TournamentType} />
  )}
  <div style={{ marginLeft: '50px' ,alignItems: 'center'}}>
    <FollowButton  selectedTournamentId={tournament._id} />
    <BasicRating  selectedTournamentId={tournament._id}/>
  </div>
  
</div>
            <AnimatedCount className="h1 large" count={count} decimals={1} />
            <div className="d-flex flex-column g-24">
                {
                    Object.keys(tournamentrates).map((key, index) => (
                        <ProgressItem
                            key={index}
                            title={key}
                            value={getPercents(tournamentrates)[key]}
                            barColor="accent"
                            trackColor={theme === 'light' ? 'body' : 'border'}
                        />
                    ))
                }
            </div>
            
        </Spring>
        
        </>
    )
}

export default ReviewWidget;