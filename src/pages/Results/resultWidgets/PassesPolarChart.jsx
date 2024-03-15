// components
import Spring from '@components/Spring';
import LegendItem from '@ui/LegendItem';
import {Radar, RadarChart, PolarGrid, PolarAngleAxis, ResponsiveContainer, Tooltip} from 'recharts';
import ChartTooltip from '@ui/ChartTooltip';

// hooks
import {useWindowSize} from 'react-use';

// utils
import {renderPolarAngleAxis} from '@utils/helpers';

const PassesPolarChartt = ({score,red1,red2,yellow1,yellow2,corners,offsides,team1,team2}) => {
    const {width} = useWindowSize()
    const data = [
        { value: 'goals', a: score.scoreTeam1, b: score.scoreTeam2 },
        { value: 'red cards', a: red1, b: red2 },  // Assuming red1 and red2 represent relevant values for crosses
        { value: 'outs', a:offsides.offsidesTeam1 , b:offsides.offsidesTeam2  },  // Assuming yellow1 and yellow2 represent relevant values for outs
        {value: 'yellow cards', a: yellow1, b: yellow2},
        {value: 'corners',a: corners.cornersTeam1, b: corners.cornersTeam2},
        {value: 'passes', a: 0, b: 0}
        // { value: 'shots', a: score.scoreTeam1, b: score.scoreTeam2 },
        // { value: 'crosses', a: red1, b: red2 },  // Assuming red1 and red2 represent relevant values for crosses
        // { value: 'outs', a: yellow1, b: yellow2 },  // Assuming yellow1 and yellow2 represent relevant values for outs
        // {value: 'saves', a: 25, b: 6},
        // {value: 'corners',a: corners.cornersTeam1, b: corners.cornersTeam2},
        // {value: 'passes', a: 14, b: 28}
    ]

    return (
        <Spring className="card d-flex flex-column card-padded g-30">
            <h3>Passes stats</h3>
            <div className={width >= 768 ? 'flex-1' : ''} style={{height: 240}}>
                <ResponsiveContainer width="100%" height="100%">
                    <RadarChart cx="50%" cy="50%" outerRadius="80%" data={data}>
                        <PolarGrid stroke="var(--border)"/>
                        <PolarAngleAxis dataKey="value"
                                        tick={props => renderPolarAngleAxis(props)}
                                        cx="50%"
                                        cy="50%"
                                        style={{
                                            textTransform: 'uppercase',
                                            fontFamily: 'var(--heading-font)',
                                            fontSize: '8px',
                                            fontWeight: '600',
                                        }}
                        />
                        <Radar dataKey="a"
                               activeDot={{stroke: 'var(--accent)'}}
                               stroke="var(--accent)"
                               strokeWidth={4}
                               fill="var(--accent)"
                               fillOpacity={0.1}/>
                        <Radar dataKey="b"
                               activeDot={{stroke: 'var(--red)'}}
                               stroke="var(--red)"
                               strokeWidth={4}
                               fill="var(--red)"
                               fillOpacity={0.1}/>
                        <Tooltip cursor={false} content={<ChartTooltip multi/>}/>
                    </RadarChart>
                </ResponsiveContainer>
            </div>
            <div className="d-flex justify-content-center g-20">
                <LegendItem color="accent" text={team1?.name}/>
                <LegendItem color="red" text={team2?.name}/>
            </div>
        </Spring>
    )
}

export default PassesPolarChartt