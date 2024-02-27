// styles
import 'react-big-calendar/lib/css/react-big-calendar.css'
import { Dialog, DialogTitle, DialogContent, DialogActions, Button } from '@mui/material';
import TabButton from '@ui/TabButton';

// styled components
import {StyledEventsCalendar, Header} from './styles';

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

    const users = [
        { id: 1, name: 'Alice Smith', paymentStatus: 'Paid', amountPaid: '$50',nbrTournoi:'1' },
        { id: 2, name: 'Bob Johnson', paymentStatus: 'Not Paid', amountPaid: '-',nbrTournoi:'0' },
        { id: 3, name: 'Charlie Brown', paymentStatus: 'Paid', amountPaid: '$150',nbrTournoi:'3' },
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
                <h1 style={{ position: 'relative' }}></h1>
                    <ViewNavigator /> 
                                   
                </Header>
                <div style={{ width: '100%', overflowX: 'auto', padding: '10px' }}>
                    <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                        <thead>
                            <tr>
                                <th style={{ padding: '10px', textAlign: 'left', fontWeight: 'bold', borderBottom: '1px solid #ddd' }}>ID</th>
                                <th style={{ padding: '10px', textAlign: 'left', fontWeight: 'bold', borderBottom: '1px solid #ddd' }}>Nom</th>
                                <th style={{ padding: '10px', textAlign: 'left', fontWeight: 'bold', borderBottom: '1px solid #ddd' }}>PaymentStatus</th>
                                <th style={{ padding: '10px', textAlign: 'left', fontWeight: 'bold', borderBottom: '1px solid #ddd' }}>AmountPaid</th>
                                <th style={{ padding: '10px', textAlign: 'left', fontWeight: 'bold', borderBottom: '1px solid #ddd' }}>Tournoi Number</th>
                                <th style={{ padding: '10px', textAlign: 'left', fontWeight: 'bold', borderBottom: '1px solid #ddd' }}>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.map(users => (
                                <tr key={users.id}>
                                    <td style={{ padding: '10px', borderBottom: '1px solid #ddd' }}>{users.id}</td>
                                    <td style={{ padding: '10px', borderBottom: '1px solid #ddd' }}>{users.name}</td>
                                    <td style={{ padding: '10px', borderBottom: '1px solid #ddd' }}>{users.paymentStatus}</td>
                                    <td style={{ padding: '10px', borderBottom: '1px solid #ddd' }}>{users.amountPaid}</td>
                                    <td style={{ padding: '10px', borderBottom: '1px solid #ddd' }}>{users.nbrTournoi}</td>
                                    <td style={{ padding: '10px', borderBottom: '1px solid #ddd' }}>
                                        <Button style={{ backgroundColor: 'green' }} ><b style={{ color: 'white' }}>See more</b></Button>
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