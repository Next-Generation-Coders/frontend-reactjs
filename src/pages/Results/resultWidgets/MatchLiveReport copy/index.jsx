// styling
import styles from './styles.module.scss';

// components
import Spring from '@components/Spring';

// assets
import match from '@assets/match.mp4';

const MatchLiveReportScan = () => {
    return (
        <Spring className="card">
            <div className={styles.main}>
                <div className="d-flex align-items-center justify-content-between">
                    <div>
                        <h2 className="h1">Total passes</h2>
                    </div>
                </div>
                <video className={`${styles.main_media} border-4`}  controls  muted playsInline disablePictureInPicture>
                    <source src={match} type="video/mp4" />
                </video>
                <div className={styles.main_buttons}>
                    <button className="btn">Upload</button>
                </div>
            </div>
        </Spring>
    )
}

export default MatchLiveReportScan