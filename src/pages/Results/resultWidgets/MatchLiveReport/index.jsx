// styling
import styles from './styles.module.scss';

// components
import Spring from '@components/Spring';
import axios from 'axios'
// assets
import match from '@assets/match.mp4';
import { useState } from 'react';

const MatchLiveReport = ({loading,scan}) => {

 
//   const[loading,setLoading]=useState(false)

//   const[video,setVideo]=useState(false)

//     const scan =()=>{

//         setLoading(true)

//         axios.post("http://127.0.0.1:5000/run").then((res)=> {return res.data ; }).catch((error) => {
//             // Handle error if needed
//             console.log(error)
           
//         }) .finally(() => {

//             setVideo(true)
//             setLoading(false); // Set loading to false when scan is completed
//         });

//     }
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
                    <button className="btn btn--icon" onClick={scan}>
                    {/* <button className="btn btn--icon"> */}

                        Scan
                    </button>
{/*  
                    {loading  && 
 <h2 className="h1">Match  loading</h2>                    } */}
                </div>
            </div>
        </Spring>
    )
}

export default MatchLiveReport