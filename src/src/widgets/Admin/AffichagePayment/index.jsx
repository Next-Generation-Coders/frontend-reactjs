// styles
import 'react-big-calendar/lib/css/react-big-calendar.css'
import { Dialog, DialogTitle, DialogContent, DialogActions, Button } from '@mui/material';
import TabButton from '@ui/TabButton';

// styled components
import {StyledEventsCalendar, Header} from './styles';
import { FaWindowClose } from "react-icons/fa";

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

//import CheckCircleIcon from '@mui/icons-material/CheckCircleOutline';
//import CancelIcon from '@mui/icons-material/Cancel';

import { FiCheckCircle } from "react-icons/fi";
import { GiCancel } from "react-icons/gi";




const AffichageCrud = () => {
    const { direction } = useThemeProvider();
    const [editDialogOpen, setEditDialogOpen] = useState(false);
    const [selectedPayment, setSelectedPayment] = useState(null);
    const [payments, setPayments] = useState([]);
    const [tournaments, setTournaments] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('http://localhost:3000/Payment');
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }

                const data = await response.json();
                setPayments(data);
            } catch (error) {
                console.error('Error fetching payments:', error);
            }
        };

        fetchData();
    }, []);

    useEffect(() => {
        const fetchTournaments = async () => {
            try {
                const response = await fetch("http://localhost:3000/Tournament/getall");

                if (!response.ok) {
                    console.error("Server error:", response.statusText);
                    return;
                }

                const data = await response.json();
                setTournaments(data);
            } catch (error) {
                console.error("Error fetching tournaments:", error.message);
            }
        };

        fetchTournaments();
    }, []);

    const openEditDialog = (payment) => {
        setSelectedPayment(payment);
        setEditDialogOpen(true);
    };

    const closeEditDialog = () => {
        setEditDialogOpen(false);
        setSelectedPayment(null);
    };

    const getTournamentTitle = (tournamentId) => {
        const tournament = tournaments.find(t => t._id === tournamentId);
        return tournament ? tournament.title : '';
    };
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
                                <th style={{ padding: '10px', textAlign: 'left', fontWeight: 'bold', borderBottom: '1px solid #ddd' }}>User Name</th>
                                <th style={{ padding: '10px', textAlign: 'left', fontWeight: 'bold', borderBottom: '1px solid #ddd' }}>User Email</th>
                                <th style={{ padding: '10px', textAlign: 'left', fontWeight: 'bold', borderBottom: '1px solid #ddd' }}>Payment Status</th>
                                <th style={{ padding: '10px', textAlign: 'left', fontWeight: 'bold', borderBottom: '1px solid #ddd' }}>Amount Paid</th>
                                <th style={{ padding: '10px', textAlign: 'left', fontWeight: 'bold', borderBottom: '1px solid #ddd' }}>Tournament Title</th>
                                <th style={{ padding: '10px', textAlign: 'left', fontWeight: 'bold', borderBottom: '1px solid #ddd' }}>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {payments.map(payment => (
                                <tr key={payment._id}>
                                    {/*     */}                              
                                     <td style={{ padding: '20px', borderBottom: '1px solid #ddd' }}>{payment.user.fullname} </td>
                                    <td style={{ padding: '10px', borderBottom: '1px solid #ddd' }}>{payment.user?.email || ''}</td>
                                    <td style={{ padding: '10px', borderBottom: '1px solid #ddd', color: payment.payment_status === 'paid' ? 'green' : 'red' }}>
                                    {payment.payment_status === 'paid' ? (
                                        <FiCheckCircle style={{ color: 'green', marginRight: '8px' }} />
                                    ) : (
                                        <GiCancel style={{ color: 'red', marginRight: '8px' }} />
                                    )}
                                    <b>{payment.payment_status}</b>
                                    </td>                                  
                                    <td style={{ padding: '10px', borderBottom: '1px solid #ddd' }}>{payment.amount}</td>
                                    <td style={{ padding: '10px', borderBottom: '1px solid #ddd' }}>{getTournamentTitle(payment.tournament?._id)}</td>
                                    <td>
                                    <Button onClick={() => openEditDialog(payment)} style={{   borderBottom: '1px solid #ddd',backgroundColor: 'green' }} >
                                            <b style={{ color: 'white' }}>See more</b>
                                    </Button>

                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            <Dialog open={editDialogOpen} onClose={closeEditDialog} >
                 <DialogActions>
                    <Button onClick={closeEditDialog}  style={{   borderBottom: '1px solid #ddd',backgroundColor: 'red' }}> <b style={{ color: 'white' }}>Close</b></Button>
                </DialogActions>
                <DialogContent>
               

                    {selectedPayment && (
                        <div>
                            <h2>Tournament Details</h2>
                            <p><strong>Tournament Title:</strong> {getTournamentTitle(selectedPayment.tournament?._id)}</p>
                        </div>
                        
                    )}
                </DialogContent>
               
            </Dialog>
        </Spring>
    );
};

export default AffichageCrud;
