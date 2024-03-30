// styles
import 'react-big-calendar/lib/css/react-big-calendar.css'
import { Dialog, DialogContent, DialogActions, Button } from '@mui/material';

// styled components
import { Header} from './styles';

// components
import Spring from '@components/Spring';
import ViewNavigator from './ViewNavigator';


// hooks
import React, {useState, useEffect} from 'react';
import {useThemeProvider} from '@contexts/themeContext';


import { FiCheckCircle } from "react-icons/fi";
import {GiCancel, GiNextButton, GiPreviousButton} from "react-icons/gi";

import { Navigation } from './styles';
import PropTypes from 'prop-types';
import { FaSearch } from "react-icons/fa";
import { FaEdit } from "react-icons/fa";


const PAGE_SIZE = 5;

const AffichageCrud = () => {
    const { direction } = useThemeProvider();
    const [editDialogOpen, setEditDialogOpen] = useState(false);
    const [selectedPayment, setSelectedPayment] = useState(null);
    const [payments, setPayments] = useState([]);
    const [tournaments, setTournaments] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(1);



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

    const displayAmount = (amount) => {
        return amount < 20 ? 'Amount with GSC '+amount : amount+'  TND';
    };
    const displayAmountt = (amount) => {
        return amount < 20 ? amount+'  GSC' : amount+'  TND';
    };

    const filteredPayments = payments.filter(payment => {
        return (
            (payment.user?.fullname ?? '').toLowerCase().includes(searchTerm.toLowerCase()) ||
            (payment.user?.email ?? '').toLowerCase().includes(searchTerm.toLowerCase()) ||
            (payment.user?.addressWallet ?? '').toLowerCase().includes(searchTerm.toLowerCase())
        );
    });

    const getPaginatedPayment = () => {
        if (!payments || !payments.length) {
            return [];
        }

        const startIndex = (currentPage - 1) * PAGE_SIZE;
        const endIndex = startIndex + PAGE_SIZE;
        return filteredPayments.slice(startIndex, endIndex);
    };
    const handlePageChange = (newPage) => {
        setCurrentPage(newPage);
    };

    const handleEditPaymentStatus = async (paymentId, currentStatus) => {
        try {
            const newStatus = currentStatus === 'unpaid' ? 'paid' : 'unpaid';

            const response = await fetch(`http://localhost:3000/Payment/${paymentId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ payment_status: newStatus })

            });
            if (!response.ok) {
                throw new Error('Failed to update payment status');
            }

            // Mettre à jour l'état des paiements localement si nécessaire
            const updatedPayment = await response.json();
            setPayments(prevPayments => {
                const updatedPayments = prevPayments.map(payment => {
                    if (payment._id === paymentId) {
                        return { ...payment, payment_status: updatedPayment.payment_status };
                    }
                    return payment;
                });
                return updatedPayments;
            });
        } catch (error) {
            console.error('Error updating payment status:', error);
        }
    };
    return (
        <Spring className="card h-fit card-padded">
            <div className="card h-fit card-padded">

                <Header>
                    <Navigation className="tab-nav">
                        <div style={{ display: 'flex', alignItems: 'center', width: '30%',paddingLeft:'1150px' }}>

                            <input
                                type="text"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                placeholder="To research..."
                                style={{ flex: '1', fontSize: '15px', padding: '5px', borderBottom: '2px solid #ddd', alignItems: 'center' }}
                            />
                            <Button style={{ backgroundColor: 'yellow', color: 'black', borderRadius: '20%' }}>
                                <FaSearch />
                            </Button>
                        </div>

                    </Navigation>
                </Header>

                <div style={{ width: '100%', overflowX: 'auto', padding: '10px' }}>
                    {payments && payments.length > 0 ? (
                        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                            <thead>
                            <tr>
                                <th style={{ padding: '10px', textAlign: 'left', fontWeight: 'bold', borderBottom: '1px solid #ddd' }}>User Name</th>
                                <th style={{ padding: '10px', textAlign: 'left', fontWeight: 'bold', borderBottom: '1px solid #ddd' }}>User Email</th>
                                <th style={{ padding: '10px', textAlign: 'left', fontWeight: 'bold', borderBottom: '1px solid #ddd' }}>User Address Wallet</th>

                                <th style={{ padding: '10px', textAlign: 'left', fontWeight: 'bold', borderBottom: '1px solid #ddd' }}>Payment Status</th>
                                <th style={{ padding: '10px', textAlign: 'left', fontWeight: 'bold', borderBottom: '1px solid #ddd' }}>Amount Paid</th>
                                <th style={{ padding: '10px', textAlign: 'left', fontWeight: 'bold', borderBottom: '1px solid #ddd' }}>Tournament Title</th>
                                <th style={{ padding: '10px', textAlign: 'left', fontWeight: 'bold', borderBottom: '1px solid #ddd' }}>Action</th>
                            </tr>
                            </thead>
                            <tbody>
                            {getPaginatedPayment().map(payment => (
                                <tr key={payment._id}>
                                    {/*     */}
                                    <td style={{ padding: '20px', borderBottom: '1px solid #ddd' }}>{payment.user?.fullname} </td>
                                    <td style={{ padding: '10px', borderBottom: '1px solid #ddd' }}>{payment.user?.email || ''}</td>
                                    <td style={{ padding: '10px', borderBottom: '1px solid #ddd' }}>{payment.user?.addressWallet || 'No Address Wallet'}</td>

                                    <td style={{ padding: '10px', borderBottom: '1px solid #ddd', color: payment.payment_status === 'paid' ? 'green' : 'red' }}>

                                        {payment.payment_status === 'paid' ? (
                                            <FiCheckCircle style={{ color: 'green', marginRight: '8px' }} />

                                        ) : (
                                            <GiCancel style={{ color: 'red', marginRight: '8px' }} />
                                        )}
                                        <b>{payment.payment_status}</b>
                                        <FaEdit
                                            style={{ marginLeft: '20px', cursor: 'pointer' }}
                                            onClick={() => handleEditPaymentStatus(payment._id, payment.payment_status)}
                                        />
                                    </td>
                                    <td style={{ padding: '10px', borderBottom: '1px solid #ddd' }}>{displayAmountt(payment.amount)}</td>
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

                    ) : (
                        <p>No payment available.</p>
                    )}
                    <div style={{ marginTop: '20px', textAlign: 'center', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <Button
                            style={{ marginRight: '10px', backgroundColor: '#4285f4', color: 'white' }}
                            disabled={currentPage === 1}
                            onClick={() => handlePageChange(currentPage - 1)}
                        >
                            <GiPreviousButton />
                        </Button>
                        <span style={{ fontSize: '12px', fontWeight: 'bold' }}>
                            Page {currentPage}
                        </span>
                        <Button
                            style={{ marginLeft: '10px', backgroundColor: '#4285f4', color: 'white' }}
                            disabled={currentPage * PAGE_SIZE >= payments.length}
                            onClick={() => handlePageChange(currentPage + 1)}
                        >
                            <GiNextButton />
                        </Button>
                    </div>
                </div>
            </div>

            <Dialog open={editDialogOpen} onClose={closeEditDialog} maxWidth="sm" fullWidth>
                <DialogActions>
                    <h2 style={{ paddingRight:'150px',marginBottom: '15px', color: '#333' }}>Payment Details</h2>
                    <Button onClick={closeEditDialog} style={{ borderBottom: '1px solid #ddd', backgroundColor: 'red' }}>
                        <b style={{ color: 'white' }}>Close</b>
                    </Button>
                </DialogActions>
                <DialogContent>
                    {selectedPayment && (
                        <div>

                            <div style={{ marginBottom: '10px' }}>
                                <strong>Tournament Title:</strong> {getTournamentTitle(selectedPayment.tournament?._id)}
                            </div>
                            <div style={{ marginBottom: '10px' }}>
                                <strong>User Name:</strong> {selectedPayment.user?.fullname}
                            </div>
                            <div style={{ marginBottom: '10px' }}>
                                <strong>User Email:</strong> {selectedPayment.user?.email}
                            </div>
                            <div style={{ marginBottom: '10px' }}>
                                <strong>Amount Paid:</strong> {displayAmount(selectedPayment.amount)}
                            </div>
                            <div style={{ marginBottom: '10px' }}>
                                <strong>Address Wallet:</strong> {selectedPayment.user?.addressWallet}
                            </div>
                            <div style={{ marginBottom: '10px' }}>
                                <strong>Payment Date:</strong> {selectedPayment.paymentDate}
                            </div>
                        </div>
                    )}
                </DialogContent>
            </Dialog>

        </Spring>
    );
};

export default AffichageCrud;