// components
import Spring from '@components/Spring';
import RefInfo from '@components/Refree/RefInfo';
import ProgressInfo from '@ui/ProgressInfo';
import SimpleLineChart from '@components/SimpleLineChart';

const RefPulse = () => {
    const data = [
        {points: 30},
        {points: 120},
        {points: 12},
        {points: 168},
        {points: 40},
        {points: 200},
    ];

    return (
        <Spring className="card h-1 d-flex flex-column justify-content-between card-padded">
            <RefInfo id="GANOUATI" title="GANOUATI Dorsaf" subtitle="Ariana ,Tunisie"/>
            <div className="d-flex justify-content-between">
                <div className="d-flex flex-column g-4">
                    <h3>2 pts</h3>
                    <ProgressInfo progress={2} text="positions"/>
                </div>
               <div className="flex-1" style={{maxWidth: 140}}>
                   <SimpleLineChart data={data} dataKey="points"/>
               </div>
            </div>
        </Spring>
    )
}

export default RefPulse