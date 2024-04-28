// styled components
import {CalendarContainer, Backdrop} from './styles';

// components
import Calendar from 'react-calendar';
import LegendItem from '@ui/LegendItem';
import Grow from '@mui/material/Grow';

// hooks
import React, { useState, useEffect } from 'react';
import axios from 'axios'; // Import axios for HTTP requests
import {useThemeProvider} from '@contexts/themeContext';

// utils
import dayjs from 'dayjs';

// data placeholder
import events from '@db/events.js';

const EventsList = ({matches, color}) => {
    //const sortedMatches = matches.sort((a, b) => dayjs(a.date).isAfter(dayjs(b.date)) ? 1 : -1);
    const sortedMatches = matches ? matches.sort((a, b) => dayjs(a.date).isAfter(dayjs(b.date)) ? 1 : -1) : [];
    console.log("L   Matches:", matches);

    return (
        <div className="d-flex flex-column g-8">
            {
                sortedMatches.map((match, index) => (
                    <>
                    
                    <div className="popup_event d-flex flex-column g-2" key={index}>
                        <h5 className="title">
                            <span className="title_color" style={{backgroundColor: `var(--${color(match.date)})`}}/>
                            {/* {match.tournament?.title} <br /> */}
                            {match ? (
                                <>{match.tournament?.title} : {match?.team1?.name} vs {match?.team2?.name}</>
                            ) : (
                                <span>Loading...</span>
                            )}

                        </h5>
                        <span className="time label h6">
                            {dayjs(match.date).format('HH:mm')}
                        </span>
                    </div>
                    </>
                ))
            }
        </div>
    )
}

const GamesCalendar = ({teamId}) => {
    console.log("teamid :" +teamId+"....")
    const {direction} = useThemeProvider();
    const [popupOpen, setPopupOpen] = useState(false);
    const [selectedDate, setSelectedDate] = useState(null);
    const legend = [
        {label: 'League', color: 'azure'},
        {label: 'Championship', color: 'grass'},
        {label: 'Cup', color: 'pink'},
        {label: 'Friendly', color: 'orange'},
    ]

    const [matches, setMatches] = useState([]); // State to store matches

    useEffect(() => {
        // Function to fetch matches based on teamId
        const fetchMatchesByTeam = async (teamId) => {
            try {
                const response = await axios.get(`http://localhost:3000/Team/getTournaments?teamId=${teamId}`);
                const data = response.data
                setMatches(response.data); 
            } catch (error) {
                console.error('Error fetching matches:', error);
            }
        };

        // Example: Fetch matches for a specific team (replace 'teamId' with the actual team ID)
        //const teamId = '65fbbd369c810a3046f40ed8'; // Example teamId
        fetchMatchesByTeam(teamId);
    }, []);
    useEffect(() => {
        // This code will run whenever the value of `matches` changes
        if (matches !== null) {
          console.log('Matches:', matches);
          // Any other code that depends on `matches` can be placed here
        }
      }, [matches]);

    //console.log(matches)
    if (matches.length===0){
        return <div></div>;
    }
    const dateEvents = (date) => {
        //console.log('Selected Date:', date);
        const selectedDatee = dayjs(date);
        //console.log('Parsed Selected Date:', selectedDate.format()); // Log parsed date
        const filteredMatches = matches.filter((match) => {
            const matchDate = dayjs(match.date);
            //console.log('Match Date:', matchDate.format()); // Log parsed match date
            return matchDate.isSame(selectedDatee, 'day'); // Compare without considering time
        });
        //console.log('Filtered Matches:', filteredMatches);
        return filteredMatches;
    };
    
    const dateColor = (date) => {
        const filteredEvents = dateEvents(date);
        console.log('Filtered Events:', filteredEvents);
        if (
            filteredEvents.length > 0 &&
            filteredEvents[0].tournament &&
            (
                filteredEvents[0].tournament?.TournamentType ||
                filteredEvents[0].tournament?.FriorCamp
            )
        ) {
            const tournamentType = filteredEvents[0].tournament?.TournamentType?.toLowerCase();
            const friorCamp = filteredEvents[0].tournament?.FriorCamp?.toLowerCase();
        
            // Check if the match is competitive based on TournamentType or FriorCamp
            const isCompetitive =
                tournamentType === 'league' ||
                tournamentType === 'cup' ||
                tournamentType === 'championship' ||
                friorCamp === 'competitive';
        
            // Find the matching legend item for competitive matches
            if (isCompetitive) {
                const matchingLegendItem = legend.find((item) =>
                    item.label.toLowerCase() === tournamentType
                );
                if (matchingLegendItem) {
                    return matchingLegendItem.color;
                }
            } else {
                // Find the matching legend item for friendly matches
                const matchingLegendItem = legend.find((item) =>
                    item.label.toLowerCase() === 'friendly'
                );
                if (matchingLegendItem) {
                    return matchingLegendItem.color;
                }
            }
        }        
        return null;
    };
    const config = {
        locale: 'en-AU',
        navigationLabel: ({date}) => `${dayjs(date).format('MMMM YYYY')}`,
        navigationAriaLabel: 'Current month',
        prevLabel: <i className="icon icon-chevron-left"/>,
        nextLabel: <i className="icon icon-chevron-right"/>,
        prev2Label: null,
        next2Label: null,
        nextAriaLabel: 'Next month',
        prevAriaLabel: 'Previous month',
        formatShortWeekday: (locale, date) => dayjs(date).format('dd'),
        tileContent: ({date}) =>
            dateEvents(date).length ?
                <span className="overlay">
                    <span className="overlay_bar" style={{backgroundColor: `var(--${dateColor(date)})`}}/>
                </span>
                :
                null,
        tileClassName: ({date}) => dateEvents(date).length ? 'active' : null,
        onClickDay: (value) => {
            setSelectedDate(value);
            setPopupOpen(true);
            console.log(selectedDate+" :            :       ")
        },
    }

    if (matches.length===0){
        return <div>Loading...</div>;
    }

    return (
        <CalendarContainer className="card h-2 p-relative">
            <div className="main">
                <h3>Games calendar</h3>
                <Calendar {...config}/>
            </div>
            <div className="d-flex flex-wrap g-14 card-padded border-top">
                {
                    legend.map((item, index) => (
                        <LegendItem key={index} text={item.label} color={item.color}/>
                    ))
                }
            </div>
            {
                matches !== null && // Check if matches is not null
                selectedDate &&
                <Backdrop className={popupOpen ? 'visible' : ''} onClick={() => setPopupOpen(false)}>
                    <Grow in={popupOpen} timeout={300} style={{transformOrigin: '0 0 0'}}>
                        <div className={`popup ${direction}`}>
                            <button className="popup_btn"
                                    onClick={() => setPopupOpen(false)}
                                    aria-label="Close">
                                <i className="icon icon-xmark"/>
                            </button>
                            <EventsList matches={dateEvents(selectedDate)} color={dateColor} />                        </div>
                    </Grow>
                </Backdrop>
            }
        </CalendarContainer>
    )
}

export default GamesCalendar