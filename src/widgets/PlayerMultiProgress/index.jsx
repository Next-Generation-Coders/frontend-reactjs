// styling
import styles from './styles.module.scss';

// components
import Spring from '@components/Spring';
import PlayerInfo from '@components/PlayerInfo';

// hooks
import useMeasure from 'react-use-measure';
import {useThemeProvider} from '@contexts/themeContext';

const PlayerMultiProgress = () => {
    const {direction} = useThemeProvider();
    const [ref, {width}] = useMeasure();
    const data = [
        {value: 80, color: 'red'},

        {value: 20, color: 'blue'},
    ];
    const sortedBars = [...data].sort((a, b) => b.value - a.value);

    const getPercentage = (value) => {
        const total = data.reduce((acc, item) => acc + item.value, 0);
        const greatestNumber = data.reduce((acc, item) => acc > item.value ? acc : item.value, 0);
        return value === greatestNumber ? 100 : (value / (total / 100)).toFixed() * (width / 100)
    }

    return (
        <Spring className="card d-flex flex-column">

            <div className="card_footer d-flex flex-column justify-content-end flex-1 g-24 border-top card-padded">
                <div className={styles.track} ref={ref}>
                    {
                        sortedBars.map((item, index) => (
                                <div className={`${styles.track_item} ${styles[direction]}`} key={index}
                                     style={{
                                         width: `${getPercentage(item.value)}%`,
                                         backgroundColor: `var(--${item.color})`,
                                         zIndex: index + 1
                                     }}/>
                            ))
                    }
                </div>
            </div>
        </Spring>
    )
}

export default PlayerMultiProgress