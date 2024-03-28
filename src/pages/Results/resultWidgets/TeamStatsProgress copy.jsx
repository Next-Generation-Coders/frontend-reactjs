// components
import Spring from '@components/Spring';
import ClubInfo from '@components/ClubInfo';
import Progress from '@ui/Progress';

// hooks
import {useThemeProvider} from '@contexts/themeContext';
import {useWindowSize} from 'react-use';
import ClubInfoTeam2 from './ClubInfoTeam2';

const TeamStatsProgress2 = ({score,corners,offsides,team1}) => {
    const {width} = useWindowSize();
    const {theme} = useThemeProvider();
    const data = [
        {name: 'Goals', value: score.scoreTeam1},
        {name: 'Corners', value: corners.cornersTeam1},
        {name: 'Offsides', value: offsides.offsidesTeam1}
    ]

    const getPercents = () => {
        let total = 0;
        for (const item of data) {
            total += item.value;
        }
        const result = [];
        for (const item of data) {
            result.push((item.value / total) * 200);
        }
        return result;
    }

    return (
        <Spring className={`card d-flex flex-column ${width < 414 ? 'g-20' : 'g-30'}`}>
            <ClubInfoTeam2 team1={team1} />
            <div className="d-flex flex-column justify-content-between flex-1 border-top card-padded  g-20">
                {
                    data.map((item, index) => (
                        <div key={index} className="d-flex flex-column g-4">
                            <div className="d-flex justify-content-between label h6">
                                <span>{item.name}</span>
                                <span>{item.value}</span>
                            </div>
                            <Progress value={getPercents()[index]}
                                      barColor="red"
                                      trackColor={theme === 'light' ? 'body' : 'border'} />
                        </div>
                    ))
                }
            </div>
        </Spring>
    )
}

export default TeamStatsProgress2