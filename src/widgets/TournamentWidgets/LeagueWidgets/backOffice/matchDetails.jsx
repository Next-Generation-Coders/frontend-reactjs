import React, { useState, useEffect } from 'react';
import classNames from 'classnames';
import { useForm } from 'react-hook-form';


const MatchDetails = ({ matchId }) => {
  const [match, setMatch] = useState(null);
  const [team1Name, setTeam1Name] = useState(null);
  const [team2Name, setTeam2Name] = useState(null);
  const [startDate, setStartDate] = useState({ day: null, month: null, year: null });
  const [startHour, setStartHour] = useState('');
  const [startMinutes, setStartMinutes] = useState('');
  const [stadium, setStadium] = useState('');
  const [referee, setReferee] = useState('');

  const { handleSubmit, register, formState: { errors }, control } = useForm({
    defaultValues: {}
  });

  useEffect(() => {
    const fetchMatch = async () => {
      try {

        const response = await fetch(`http://localhost:3000/Match/getbyid/${matchId}`);
        if (!response.ok) {
          throw new Error('Failed to fetch match details');
        }
        const data = await response.json();
        setMatch(data);


        const team1Response = await fetch(`http://localhost:3000/Team/getbyid/${data.team1}`);
        if (!team1Response.ok) {
          throw new Error('Failed to fetch team details');
        }
        const team1Data = await team1Response.json();
        setTeam1Name(team1Data.name);


        const team2Response = await fetch(`http://localhost:3000/Team/getbyid/${data.team2}`);
        if (!team2Response.ok) {
          throw new Error('Failed to fetch team details');
        }
        const team2Data = await team2Response.json();
        setTeam2Name(team2Data.name);

      } catch (error) {
        console.error('Error fetching match details:', error);
      }
    };

    fetchMatch();
  }, [matchId]);

  if (!match || !team1Name || !team2Name) {
    return <div>Loading...</div>;
  }

  const handleStartDateChange = (e) => {
    const selectedDate = new Date(e.target.value);
    setStartDate({
      startDay: selectedDate.getDate(),
      startMonth: selectedDate.getMonth() + 1,
      startYear: selectedDate.getFullYear(),
    });
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
   
    const formDataToSend = {
      startDay: parseInt(startDate.startDay),
      startMonth: parseInt(startDate.startMonth),
      startYear: parseInt(startDate.startYear),
      startHour: parseInt(startHour),
      startMinutes: parseInt(startMinutes),
      stadium: stadium,
      referee: referee,
    };


    onSubmit(formDataToSend);
    
    
  };

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
        throw new Error('Failed to update match details');
      }
      
    } catch (error) {
      console.error('Error updating match details:', error);
    }
  };

  return (
    <div style={{ display: 'flex' }}>
      <h3>Match Details</h3>
      <p>Match ID: {match._id}</p>
      <p>{team1Name} vs {team2Name}</p>
      <form onSubmit={handleFormSubmit}>
        <div style={{ display: 'flex', flexWrap: 'wrap' }}>
          <div style={{ display: 'flex' }}>
            <div style={{ flex: 1, margin: '10px' }}>
              <input
                className={classNames('field', { 'field--error': errors.startDate })}
                type="date"
                placeholder="Start Date"
                onChange={handleStartDateChange}
                required
              />
            </div>
            <div style={{ flex: 1, margin: '10px' }}>
              <label htmlFor="matchStartHour">Match Start Hour:</label>
              <input
                className={classNames('field', { 'field--error': errors.startHour })}
                type="number"
                id="matchStartHour"
                name="matchStartHour"
                placeholder="00"
                min="0"
                max="23"
                step="1"
                value={startHour}
                onChange={(e) => setStartHour(e.target.value)}
                required
              />
            </div>
            <div style={{ flex: 1, margin: '10px' }}>
              <label>Match Start Minute:</label>
              <input
                className={classNames('field', { 'field--error': errors.startMinutes })}
                type="number"
                id="matchStartMinute"
                name="matchStartMinute"
                placeholder="00"
                min="0"
                max="59"
                step="1"
                value={startMinutes}
                onChange={(e) => setStartMinutes(e.target.value)}
                required
              />
            </div>
            <div style={{ flex: 1, margin: '10px' }}>
              <label>Stadium:</label>
              <input
                className={classNames('field', { 'field--error': errors.stadium })}
                type="text"
                placeholder="Stadium"
                value={stadium}
                onChange={(e) => setStadium(e.target.value)}
                required
              />
            </div>
            <div style={{ flex: 1, margin: '10px' }}>
              <label>Referee:</label>
              <input
                className={classNames('field', { 'field--error': errors.referee })}
                type="text"
                placeholder="Referee"
                value={referee}
                onChange={(e) => setReferee(e.target.value)}
                required
              />
            </div>
            <button className="btn" style={{ flex: 1, margin: '10px' }}>Set the Match details</button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default MatchDetails;


