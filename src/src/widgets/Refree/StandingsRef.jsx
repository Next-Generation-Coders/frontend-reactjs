// components
import Spring from '@components/Spring';
import TeamScoreRow from '@components/TeamScoreRow';

const StandingsRef = () => {
    const data = [
        {
            name: 'GUIRAT Haythem',
            color: 'red',
            score: 5
        },
        {
            name: 'SELMI Sadok',
            color: 'blue',
            score: 4
        },
        {
            name: 'LOUCIF Amir',
            color: 'green',
            score: 4
        },
        {
            name: 'GANOUATI Dorsaf',
            color: 'orange',
            score: 2
        }
    ];

    return (
        <Spring className="card d-flex flex-column g-16 card-padded">
            <div className="d-flex flex-column">
                <h3>LIST REFREE</h3>
                <p className="text-12">Standing after Match</p>
            </div>
            <div className="d-flex flex-column g-2">
                {
                    data.map((item, index) => (
                        <TeamScoreRow key={index} data={item} index={index} />
                    ))
                }
            </div>
        </Spring>
    )
}

export default StandingsRef