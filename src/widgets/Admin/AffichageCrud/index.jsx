// styles
import 'react-big-calendar/lib/css/react-big-calendar.css'
import { Button } from '@mui/material';

// styled components
import { Header} from './styles';

// components
import Spring from '@components/Spring';
import {Calendar, momentLocalizer} from 'react-big-calendar';
import ViewNavigator from './ViewNavigator';
import Navigator from './Navigator';
import Event from './Event';

// hooks
import {useState, useEffect} from 'react';
import {useWindowSize} from 'react-use';
import {useThemeProvider} from '@contexts/themeContext';

import { FaSearch } from "react-icons/fa";


// utils
import moment from 'moment';

// events
import schedule from '@db/schedule';

const AffichageCrud = () => {
    const {direction} = useThemeProvider();
    const [currentView, setCurrentView] = useState('day');
    const localizer = momentLocalizer(moment);
    const [currentDate, setCurrentDate] = useState(moment().toDate());
    const [currentTime, setCurrentTime] = useState(moment().format('HH:mm'));
    const {width} = useWindowSize();

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentTime(moment().format('HH:mm'));
        }, 1000);
        return () => clearInterval(interval);
    }, [currentTime]);



    const [searchTerm, setSearchTerm] = useState('');

    const handleSearch = () => {
        console.log("Recherche effectuée :", searchTerm);
    };


    const handleNavigation = (action) => {
        switch (action) {
            case 'NEXT':
                setCurrentDate(moment(currentDate).add(1, currentView).toDate());
                break;
            case 'PREV':
                setCurrentDate(moment(currentDate).subtract(1, currentView).toDate());
                break;
            default:
                setCurrentDate(moment().toDate());
        }
    }

    const getWeek = (date) => {
        const start = moment(date).startOf('week');
        const end = moment(date).endOf('week');
        return [start, end];
    }

    const getTitleFormat = () => {
        switch (currentView) {
            case 'month':
                return 'MMMM YYYY';
            case 'week':
                return width < 768 ? 'DD.MM.YY' : 'DD MMMM YYYY';
            case 'day':
                return 'DD MMMM YYYY';
            default:
                return 'MMMM YYYY';
        }
    }

    const getDayFormat = () => {
        switch (true) {
            case width < 768:
                return 'D';
            case width < 1600:
                return 'ddd, D';
            default:
                return 'dddd D MMMM';
        }
    }

    const players = [
        
        { id: 1, name: 'Franz Beckenbauer', Team: 'FC Bayern', nationalite: 'Argentine',position:'Right side defender'},
        { id: 2, name: 'David Beckham', Team: 'PSG', nationalite: 'France',position:'Left side defender' },
        { id: 3, name: 'Éric Cantona', Team: 'Man United', nationalite: 'Espagne',position:'right attacking midfielder' },
    ];
    const config = {
        as: Calendar,
        className: currentView,
        views: ['month', 'week', 'day'],
        view: currentView,
        date: currentDate,
        localizer: localizer,
        startAccessor: 'start',
        endAccessor: 'end',
        onNavigate: handleNavigation,
        onView: setCurrentView,
        min: moment().startOf('year').set({hour: 8, minute: 0}).toDate(),
        max: moment().endOf('year').set({hour: 22, minute: 0}).toDate(),
        step: 30,
        events: schedule,
        formats: {
            timeGutterFormat: 'HH:mm',
            dayFormat: getDayFormat(),
        },
        
      
    }

    return (
        <Spring className="card h-fit card-padded">
            <div className="card h-fit card-padded">
                <Header>
            <div style={{ display: 'flex', alignItems: 'center', width: '30%' }}>
                    <input
                        type="text"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        placeholder="To research..."
                        style={{ flex: '1', fontSize: '15px', padding: '5px', borderBottom: '2px solid #ddd',alignItems: 'center' }}
                    />
                    <Button onClick={handleSearch} style={{ backgroundColor: 'yellow', color: 'black', borderRadius: '20%' }}>
                        <FaSearch />
                    </Button>
            </div>

                    <ViewNavigator /> 
                                  
                </Header>
                <div style={{ width: '100%', overflowX: 'auto', padding: '10px' }}>
                    <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                        <thead>
                            <tr>
                                <th style={{ padding: '10px', textAlign: 'left', fontWeight: 'bold', borderBottom: '1px solid #ddd' }}>ID</th>
                                <th style={{ padding: '10px', textAlign: 'left', fontWeight: 'bold', borderBottom: '1px solid #ddd' }}>Nom</th>
                                <th style={{ padding: '10px', textAlign: 'left', fontWeight: 'bold', borderBottom: '1px solid #ddd' }}>Team</th>
                                <th style={{ padding: '10px', textAlign: 'left', fontWeight: 'bold', borderBottom: '1px solid #ddd' }}>Nationalite</th>
                                <th style={{ padding: '10px', textAlign: 'left', fontWeight: 'bold', borderBottom: '1px solid #ddd' }}>Position</th>
                                <th style={{ padding: '10px', textAlign: 'left', fontWeight: 'bold', borderBottom: '1px solid #ddd' }}>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {players.map(player => (
                                <tr key={player.id}>
                                    <td style={{ padding: '10px', borderBottom: '1px solid #ddd' }}>{player.id}</td>
                                    <td style={{ padding: '10px', borderBottom: '1px solid #ddd' }}>{player.name}</td>
                                    <td style={{ padding: '10px', borderBottom: '1px solid #ddd' }}>{player.Team}</td>
                                    <td style={{ padding: '10px', borderBottom: '1px solid #ddd' }}>{player.nationalite}</td>
                                    <td style={{ padding: '10px', borderBottom: '1px solid #ddd' }}>{player.position}</td>
                                    <td style={{ padding: '10px', borderBottom: '1px solid #ddd' }}>
                                        <Button style={{ backgroundColor: 'red' }} ><b style={{ color: 'white' }}>DELETE</b></Button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </Spring>
    );
};

export default AffichageCrud