// styling
import styled from 'styled-components/macro';

// components
import Spring from '@components/Spring';
import ClubInfo from '@components/ClubInfo';
import LegendItem from '@ui/LegendItem';
import {PieChart, Pie, Cell, ResponsiveContainer, Tooltip} from 'recharts';
import ChartTooltip from '@ui/ChartTooltip';

// hooks
import {useThemeProvider} from '@contexts/themeContext';

// constants
import {STATS_PIE_COLORS} from '@constants/chart';

// assets
import rays from '@assets/rays.svg';
import { useEffect, useState } from 'react';

const Wrapper = styled.div`
  position: relative;
  
  .info {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    text-align: center;
  }
  
  .chart {
    position: relative;
    z-index: 2;
  }
  
  .recharts-wrapper .recharts-surface {
    mask: url("${rays}") no-repeat center;
  }
`;

const TournamentsTypes = () => {
    const {theme} = useThemeProvider();

    /*const data = [
        {name: 'Group A', value: 400},
        {name: 'Group B', value: 300},
        {name: 'Group C', value: 300},
    ];

*/
    const [tournaments , setTournaments] = useState();

    useEffect(() => {
        const fetchTournaments = async () => {
            try {
                const response = await fetch('http://localhost:3000/Tournament/getall');
                if (!response.ok) {
                    throw new Error('Failed to fetch tournaments');
                }
                const data = await response.json();
                setTournaments(data);
                
            } catch (error) {
                console.error('Error fetching tournaments:', error);
            }
        };

        fetchTournaments();
    }, []);
const [leagueCount,setleagueCount] = useState();
const [knockoutCount,setknockoutCount] = useState();
const [championshipCount,setchampionshipCount] = useState();


/*useEffect(() => {
    setleagueCount(tournaments.filter(tournament => tournament.TournamentType === 'League').length)
    setknockoutCount(tournaments.filter(tournament => tournament.TournamentType === 'Knockout').length)
    setchampionshipCount(tournaments.filter(tournament => tournament.TournamentType === 'Championship').length)

}, [tournaments])

   */
let leagueCount1 = 0;
let knockoutCount1 = 0;
let championshipCount1 = 0;

if(tournaments){
tournaments.forEach(tournament => {
    switch (tournament.TournamentType) {
        case 'League':
            leagueCount1++;
            break;
        case 'Knockout':
            knockoutCount1++;
            break;
        case 'Championship':
            championshipCount1++;
            break;
        default:
            break;
    }
});
}
const dataoftournaments1 = [
    { name: 'League', value: leagueCount1 },
    { name: 'Knockout', value: knockoutCount1 },
    { name: 'Championship', value: championshipCount1 },
];
  
    const dataoftournaments = [
        { name: 'League', value: leagueCount },
        { name: 'Knockout', value: knockoutCount },
        { name: 'Championship', value: championshipCount },
    ];


    if (!tournaments) {
        return null; // Render nothing if tournaments data is not yet available
    }
 
    return (
        <Spring className="card h-2 d-flex flex-column justify-content-between g-24 card-padded">
         
            <Wrapper className="flex-1">
                <div className="info">
                    <h2>{tournaments.length}</h2>
                    <span className="label h6">Tournaments</span>
                </div>
                <ResponsiveContainer className="chart" width="100%" height="100%">
                    <PieChart>
                        <Pie
                            data={dataoftournaments1}
                            cx="50%"
                            cy="50%"
                            labelLine={false}
                            outerRadius={140}
                            innerRadius={80}
                            fill="#8884d8"
                            dataKey="value"
                            strokeWidth={0}
                        >
                            {
                                dataoftournaments1.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={`var(--${STATS_PIE_COLORS[theme][index]})`}/>
                                ))
                            }
                        </Pie>
                        <Tooltip content={<ChartTooltip/>}/>
                    </PieChart>
                </ResponsiveContainer>
            </Wrapper>
            <div className="d-flex align-items-center justify-content-center g-14">
                <LegendItem color="grass" text="League"/>
                <LegendItem color="salmon" text="Knockout"/>
                <LegendItem color="purple" text="Championship"/>
            </div>
        </Spring>
    )
}

export default TournamentsTypes;