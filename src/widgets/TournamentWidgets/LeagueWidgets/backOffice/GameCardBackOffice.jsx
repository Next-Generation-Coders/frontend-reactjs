// styling
import styles from './styles.module.scss';
import classNames from 'classnames';
import { FaMapMarkerAlt, FaClock, FaUser } from 'react-icons/fa';
import Spring from '@components/Spring';
import Lineups from '@components/Lineups';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

import defaultLogo1 from "../../../../assets/Def1.png";
import defaultLogo2 from "../../../../assets/Def2.png";
import defaultLogo3 from "../../../../assets/Def3.png";
import defaultLogo4 from "../../../../assets/Def4.png";
import {useThemeProvider} from '@contexts/themeContext';
import {useWindowSize} from 'react-use';


import PropTypes from 'prop-types';
import Popup from '@components/Popup';
import { useForm } from 'react-hook-form';



const GameCardBackOffice = ({matchId, index, variant = 'basic',selectedTournamentId}) => {
    const {width} = useWindowSize();
    const {theme} = useThemeProvider();
    const defaultLogos = [defaultLogo1, defaultLogo2, defaultLogo3, defaultLogo4];
    const [match , setMatch] =useState();
    const[stadiums, setStadiums] =useState();
    const[referees, setReferees] =useState();
    const [StadiumInfo ,setStadiumsInfo] = useState();
    const [refereeInfo ,setRefereesInfo] = useState();
    const [startDate, setStartDate] = useState({ day: null, month: null, year: null });
    const [startHour, setStartHour] = useState('');
    const [startMinutes, setStartMinutes] = useState('');
    const { handleSubmit, register, formState: { errors }, control } = useForm({
      defaultValues: {}
    });
useEffect(() => {
  const fetchStaduimsAndRefs = async () => {
try{

        const StaduimsAndRefs = await fetch(`http://localhost:3000/Tournament/getRefereesAndStadiumsForTournament/${selectedTournamentId}`);
        if (!StaduimsAndRefs.ok) {
       toast.error('Failed to fetch  details');
         }
        else{
            const data =await StaduimsAndRefs.json();
            setStadiums(data.Staduims);
            setReferees(data.referees) ;

        }

  }catch{
  }
  }
  if(selectedTournamentId){
  fetchStaduimsAndRefs()}
}, [selectedTournamentId])

useEffect(() => {
    const fetchStadiumAndRefereeDetails = async () => {
        try {

            if (stadiums && stadiums.length > 0) {
                const stadiumPromises = stadiums.map(async (stadiumId) => {
                    const response = await fetch(`http://localhost:3000/Stadium/getbyid/${stadiumId}`);
                    if (!response.ok) {
                       toast.error(`Failed to fetch stadium details for ID ${stadiumId}`);
                    }
                    return response.json();
                });
                const stadiumData = await Promise.all(stadiumPromises);
                setStadiumsInfo(stadiumData);
            }


            if (referees && referees.length > 0) {
                const refereePromises = referees.map(async (refereeId) => {
                    const response = await fetch(`http://localhost:3000/User/getbyid/${refereeId}`);
                    if (!response.ok) {
                        toast.error(`Failed to fetch referee details for ID ${refereeId}`);
                    }
                    return response.json();
                });
                const refereeData = await Promise.all(refereePromises);
                setRefereesInfo(refereeData);
            }
        } catch (error) {
            toast.error('Error fetching stadium and referee details:', error);
        }
    };

    if (stadiums && referees) {
        fetchStadiumAndRefereeDetails();
    }
}, [stadiums, referees]);
const handleStartDateChange = (e) => {
  const selectedDate = new Date(e.target.value);
  setStartDate({
    startDay: selectedDate.getDate(),
    startMonth: selectedDate.getMonth() + 1,
    startYear: selectedDate.getFullYear(),
  });
};


    useEffect(() => {

         const fetchMatchDetails = async () => {
        try {

          const team1Response = await fetch(`http://localhost:3000/Match/getbyid/${matchId}`);
          if (!team1Response.ok) {
            throw new Error('Failed to fetch team details');
          }
          const MatchData = await team1Response.json();
          setMatch(MatchData);
          const teamResponse = await fetch(`http://localhost:3000/Team/getbyid/${MatchData.team1}`);
          if (!team1Response.ok) {
            throw new Error('Failed to fetch team details');
          }
          const team1Data = await teamResponse.json();
          setTeam1Name(team1Data.name);
          setteam1Logo(team1Data.logo || getRandomDefaultLogo(team1Data.logo))

          const team2Response = await fetch(`http://localhost:3000/Team/getbyid/${MatchData.team2}`);
          if (!team2Response.ok) {
            throw new Error('Failed to fetch team details');
          }
          const team2Data = await team2Response.json();
          setTeam2Name(team2Data.name);
          setteam2Logo(team2Data.logo || getRandomDefaultLogo(team2Data.logo));
        }
          catch{

          } };
          fetchMatchDetails();
}, [matchId])

    const getRandomDefaultLogo = (prevLogo) => {
        let randomIndex = Math.floor(Math.random() * defaultLogos.length);

        if (defaultLogos.length === 1) return defaultLogos[0];


        while (defaultLogos[randomIndex] === prevLogo) {
          randomIndex = Math.floor(Math.random() * defaultLogos.length);
        }
        return defaultLogos[randomIndex];
      };
    const [team1Name, setTeam1Name] = useState(null);
    const [team2Name, setTeam2Name] = useState(null);
    const [team2Logo, setteam2Logo] = useState(null);
    const [team1Logo, setteam1Logo] = useState(null);


    const [showPopup, setShowPopup] = useState(false);

  const togglePopup = () => {
    setShowPopup(!showPopup);
  };


 /*   useEffect(() => {
      const fetchTeamDetails = async () => {
        try {
          console.log(match);
          const team1Response = await fetch(`http://localhost:3000/Team/getbyid/${match.team1}`);
          if (!team1Response.ok) {
            throw new Error('Failed to fetch team details');
          }
          const team1Data = await team1Response.json();
          setTeam1Name(team1Data.name);
          setteam1Logo(team1Data.logo || getRandomDefaultLogo(team1Data.logo));
          // Fetch team details for team2
          const team2Response = await fetch(`http://localhost:3000/Team/getbyid/${match.team2}`);
          if (!team2Response.ok) {
            throw new Error('Failed to fetch team details');
          }
          const team2Data = await team2Response.json();
          setTeam2Name(team2Data.name);
          setteam2Logo(team2Data.logo || getRandomDefaultLogo(team2Data.logo));
        } catch (error) {
          console.error('Error fetching team details:', error);
        }
      };
      if(match){
      fetchTeamDetails();}
    }, [match]);


*/


const onSubmit = async (formDataToSend) => {
  try {
    const response = await fetch(`http://localhost:3000/Match/update/${match._id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formDataToSend),
    });
    if (!response.ok) {
        toast.error('Failed to update match details');
    }

  } catch (error) {
    toast.error('Error updating match details:', error);
  }
};


const [selectedRefereeId, setSelectedRefereeId] = useState(null);
const [selectedstadiumId, setSelectedstadiumId] = useState(null);
const handleFormSubmit = (e) => {


  const formDataToSend = {
    startDay: parseInt(startDate.startDay),
    startMonth: parseInt(startDate.startMonth),
    startYear: parseInt(startDate.startYear),
    startHour: parseInt(startHour),
    startMinutes: parseInt(startMinutes),
    stadium: selectedstadiumId,
    _ref: selectedRefereeId,
  };

  onSubmit(formDataToSend);

    toast.success("Match Details Updated Successfully");

};

    return (
        <Spring className={`${styles.container} ${styles[theme]} h-100`} type="slideUp" index={index}>
          {team1Name && team2Name && (
            <div className="card-padded d-flex flex-column g-20" style={{ paddingBottom: variant !== 'extended' ? 'var(--card-padding)' : 10 }}>
              <div className="d-flex align-items-center justify-content-between p-relative">
                <img className="club-logo" src={team1Logo} alt={team1Name} />

                    <button className='btn' style={{backgroundColor:"#FDCA40",color:"black"}} onClick={togglePopup}> Match Details <br />
                        <FaMapMarkerAlt style={{marginLeft:"8px"}} className="icon"/></button>

                <img className="club-logo" src={team2Logo} alt={team2Name} />

              </div>

               {width >= 414 && (
                <div className="d-flex justify-content-between g-30">

                      <div style={{ minWidth: 0 }}>
                        <h3>{team1Name}</h3>
                      </div>
                      <div className="text-right" style={{ minWidth: 0 }}>
                        <h3>{team2Name}</h3>
                      </div>
                </div>


                   )}


                      <Popup  open={showPopup} onClose={togglePopup}>
                      <h2 style={{margin : '22px',marginLeft:"70px"}}>Match Details</h2>
                      <form onSubmit={handleSubmit(handleFormSubmit)}>
                        <div className={styles.inputGroup}>
                          <label>
                            Referee:
                            <select  className={classNames('field', { 'field--error': errors.referee })}
                                     style={{backgroundColor : 'transparent',color:"#A1A3A6"}}
                            onChange={(e) => setSelectedRefereeId(e.target.value)}>
                              {refereeInfo && refereeInfo.map(referee => (
                                <option key={referee._id} value={referee._id}>
                                  {referee.fullname}
                                </option>
                              ))}
                            </select>
                          </label>
                          {errors.referee && <span className="error-message">Referee is required</span>}
                        </div>
                        <div className={styles.inputGroup}>
                          <label>
                            Stadium:
                            <select className={classNames('field', { 'field--error': errors.stadium })}
                                    style={{backgroundColor : "transparent",color:"#A1A3A6"}}
                              onChange={(e) => setSelectedstadiumId(e.target.value)}>
                              {StadiumInfo && StadiumInfo.map(stadium => (
                                <option key={stadium._id} value={stadium._id}>
                                  {stadium.name}
                                </option>
                              ))}
                            </select>
                          </label>
                          {errors.stadium && <span className="error-message">Stadium is required</span>}
                        </div>
                        <div className={styles.inputGroup}>
                          <label style={{margin : '2px'}}>
                            Match Day:
                            <input
                              type="date"
                             required
                              className={classNames('field', { 'field--error': errors.matchDay })}
                              onChange={handleStartDateChange}
                            />
                            {errors.matchDay && <span className="error-message">Match Day is required</span>}
                          </label >
                        </div>
                        <div className={styles.inputGroup}>
                          <label style={{margin : '2px'}}>Match Start Hour:</label>
                          <input
                            type="number"
                          required
                            className={classNames('field', { 'field--error': errors.matchStartHour })}
                            min="0"
                            max="23"
                            value={startHour}
                                    onChange={(e) => setStartHour(e.target.value)}
                          />
                          {errors.matchStartHour && <span className="error-message">Match Start Hour is required</span>}
                        </div>
                        <div className={styles.inputGroup}>
                          <label style={{margin : '2px'}}>Match Start Minute:</label>
                          <input
                            type="number"
                              required
                                className={classNames('field', { 'field--error': errors.matchStartMinute })}
                                min="0"
                                max="59"
                                value={startMinutes}
                                        onChange={(e) => setStartMinutes(e.target.value)}
                          />
                          {errors.matchStartMinute && <span className="error-message">Match Start Minute is required</span>}
                        </div>
                        <button style={{width : '100%', marginTop : '15px',backgroundColor:"#FDCA40",color:"black"}}    className="btn" type="submit">Confirm</button>
                      </form>
                    </Popup>
            </div>
          )}
          {
            variant === 'extended' && (
              <div className="border-top">
                <Lineups wrapperClass={styles.field} isCompact />
              </div>
            )
          }

        </Spring>
      )

}

GameCardBackOffice.propTypes = {
    match: PropTypes.object,
    index: PropTypes.number,
    variant: PropTypes.oneOf(['basic', 'extended'])
}

export default GameCardBackOffice;