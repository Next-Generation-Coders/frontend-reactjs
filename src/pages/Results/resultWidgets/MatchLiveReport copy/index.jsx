// styling
import styles from './styles.module.scss';

// components
import Spring from '@components/Spring';

// assets
import match from '@assets/match.mp4';
import matchout from '@assets/match_out.webm';

const MatchLiveReportScan = ({loading}) => {

    console.log(match)
    return (
        <Spring className="card">
            <div className={styles.main}>
                <div className="d-flex align-items-center justify-content-between">
                    <div>
                        <h2 className="h1">Total passes</h2>
                    </div>
                </div>
                <video className={`${styles.main_media} border-4`}   poster='https://static.vecteezy.com/system/resources/thumbnails/001/826/199/small_2x/progress-loading-bar-buffering-download-upload-and-loading-icon-vector.jpg'controls  muted playsInline disablePictureInPicture>

                    
<source src={matchout} type="video/webm" />
</video>

                 {loading && <h2 className="h1">Video loading ...   </h2>}


            </div>
        </Spring>
    )
}

export default MatchLiveReportScan