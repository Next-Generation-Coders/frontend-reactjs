// styling
import styles from './styles.module.scss';

// components
import Spring from '@components/Spring';
import axios from 'axios'
// assets
import match from '@assets/match.mp4';

const MatchLiveReport = () => {

    // const scan =()=>{

    //     axios.post("http://127.0.0.1:5000/run");
    // }
    return (
        <Spring className="card">
            <div className={styles.main}> 
                <div className="d-flex align-items-center justify-content-between">
                    <div>
                        <h2 className="h1">Match Record</h2>
                       
                    </div>
                   
                </div>
                <video className={`${styles.main_media} border-4`}  controls  muted playsInline >
                    <source src={match} type="video/mp4" />
                </video>
                <div className={styles.main_buttons}>
                    {/* <button className="btn btn--icon" onClick={scan()}> */}
                    <button className="btn btn--icon">

                        Scan
                    </button>
                </div>
            </div>
        </Spring>
    )
}

export default MatchLiveReport