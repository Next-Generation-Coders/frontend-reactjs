 import PropTypes from 'prop-types';
 const ScoreMatch = ({team1 = 0, team2 = 0, variant = 'main' ,changed}) => {

     return (
         <div >
             <p> Match Start :
             <span  style={{marginLeft:"20px"}} className={`scoreNumber ${changed==='team1' || changed ===true ? 'changed' : ''}`} >
                {team1}</span>
                <span>:</span>
                <span className={`scoreNumber ${changed==='team2' || changed ===true ? 'changed' : ''}`} >
                {team2}</span>
             </p>
         </div>
     ) }
 ScoreMatch.propTypes = { team1: PropTypes.number, team2: PropTypes.number, variant: PropTypes.oneOf(['main', 'alt']), }


export default ScoreMatch