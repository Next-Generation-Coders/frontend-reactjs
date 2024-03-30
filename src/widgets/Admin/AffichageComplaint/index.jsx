import { Button } from '@mui/material';


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
import axios from 'axios';

import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import { toast } from 'react-toastify';
import { GiNextButton } from "react-icons/gi";
import { GiPreviousButton } from "react-icons/gi";
import { FaRegEye } from "react-icons/fa";

const PAGE_SIZE = 5;
const AffichageCrud = () => {
    const [complaints, setComplaints] = useState([]);
    const [selectedComplaint, setSelectedComplaint] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [openDialog, setOpenDialog] = useState(false);
    const [response, setResponse] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [openDialogDescription, setOpenDialogDescription] = useState(false);
    const [selectedDescription, setSelectedDescription] = useState('');



    const handleViewDescription = (description) => {
        setSelectedDescription(description);
        setOpenDialogDescription(true);
    };

    const getPaginatedComplaints = () => {
        if (!complaints || !complaints.length) {
            return [];
        }

        const startIndex = (currentPage - 1) * PAGE_SIZE;
        const endIndex = startIndex + PAGE_SIZE;
        return complaints.slice(startIndex, endIndex);
    };


    const handlePageChange = (newPage) => {
        setCurrentPage(newPage);
    };
    const handleSearch = () => {
        console.log("Recherche effectuée :", searchTerm);

        if (!searchTerm) {
            const fetchData = async () => {
                try {
                    const response = await axios.get('http://localhost:3000/api/AllComplaints');
                    setComplaints(response.data.complaints);
                } catch (error) {
                    console.error('Error fetching complaints:', error.message);
                }
            };

            fetchData();
        } else {
            const filteredComplaints = complaints.filter((complaint) => {
                const fullName = complaint.user?.fullname?.toLowerCase() || '';
                const email = complaint.user?.email?.toLowerCase() || '';
                const searchTermLower = searchTerm.toLowerCase();

                return fullName.includes(searchTermLower) || email.includes(searchTermLower);
            });

            setComplaints(filteredComplaints);
        }
    };


    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:3000/api/AllComplaints');
                setComplaints(response.data.complaints);
            } catch (error) {
                console.error('Error fetching complaints:', error.message);
            }
        };


        fetchData();
    }, []);

    useEffect(() => {
        console.log('Complaints:', complaints);
    }, [complaints]);

    const handleAnswer = (complaint) => {
        try {
            if (complaint && complaint._id) {
                setSelectedComplaint(complaint);
                setOpenDialog(true);
            } else {
                console.error('No valid complaint selected for answering.', complaint);
            }
        } catch (error) {
            console.error('Error opening answer modal:', error.message);
        }
    };


    const handleDeleteComplaint = async (complaintId) => {
        try {
            const confirmed = window.confirm("Are you sure you want to delete this complaint?");

            if (confirmed) {
                const apiResponse = await axios.delete(`http://localhost:3000/api/complaints/${complaintId}`);

                const updatedComplaints = apiResponse.data.complaints;

                if (Array.isArray(updatedComplaints)) {
                    setComplaints(updatedComplaints);
                } else {
                    console.error('Invalid response from the server:', apiResponse.data);
                }

                console.log(`Complaint with ID ${complaintId} deleted successfully`);
                window.location.reload();

            }
        } catch (error) {
            console.error('Error deleting complaint:', error.message);
        }
    };

    const handleSubmitResponse = async () => {
        try {
            console.log('Selected Complaint:', selectedComplaint);

            if (!selectedComplaint || !selectedComplaint._id) {
                console.error('No valid complaint selected for responding.');
                return;
            }

            const responseValue = response;

            console.log('Request Payload:', {
                complaintId: selectedComplaint._id,
                response: responseValue,
            });

            const apiResponse = await axios.put('http://localhost:3000/api/complaints/respond', {
                complaintId: selectedComplaint._id,
                response: responseValue,
            });

            toast.success('Response submitted successfully!', { autoClose: 5000 });

            setOpenDialog(false);

            window.location.reload();
        } catch (error) {
            console.error('Error responding to complaint:', error.message);
            console.log('Error Details:', error.response.data);

            toast.error('Error submitting response. Please try again.', { autoClose: 5000 });
        }
    };





    return (
        <Spring className="card h-fit card-padded">
            <div className="card h-fit card-padded">
                <Header>
                    <div style={{ display: 'flex', alignItems: 'center', width: '30%',paddingLeft:'1150px' }}>

                        <input
                            type="text"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            placeholder="To research..."
                            style={{ flex: '1', fontSize: '15px', padding: '5px', borderBottom: '2px solid #ddd', alignItems: 'center' }}
                        />
                        <Button onClick={handleSearch} style={{ backgroundColor: 'yellow', color: 'black', borderRadius: '20%' }}>
                            <FaSearch />
                        </Button>
                    </div>
                </Header>
                <div style={{ width: '100%', overflowX: 'auto', padding: '10px' }}>
                    {complaints && complaints.length > 0 ? (
                        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                            <thead>
                            <tr>
                                <th style={{ padding: '10px', textAlign: 'left', fontWeight: 'bold', borderBottom: '1px solid #ddd' }}>Name</th>
                                <th style={{ padding: '10px', textAlign: 'left', fontWeight: 'bold', borderBottom: '1px solid #ddd' }}>Email</th>
                                <th style={{ padding: '10px', textAlign: 'left', fontWeight: 'bold', borderBottom: '1px solid #ddd' }}>Phone</th>
                                <th style={{ padding: '10px', textAlign: 'left', fontWeight: 'bold', borderBottom: '1px solid #ddd' }}>Title</th>
                                <th style={{ padding: '10px', textAlign: 'left', fontWeight: 'bold', borderBottom: '1px solid #ddd' }}>Description</th>
                                <th style={{ padding: '10px', textAlign: 'left', fontWeight: 'bold', borderBottom: '1px solid #ddd' }}>Status</th>
                                <th style={{ padding: '10px', textAlign: 'left', fontWeight: 'bold', borderBottom: '1px solid #ddd',paddingLeft:'50px'  }}>Action</th>
                            </tr>
                            </thead>
                            <tbody>
                            {getPaginatedComplaints().map((complaint) => (
                                <tr key={complaint.id}>
                                    <td style={{ padding: '10px', borderBottom: '1px solid #ddd' }}>{complaint.user?.fullname || 'N/A'}</td>
                                    <td style={{ padding: '10px', borderBottom: '1px solid #ddd' }}>{complaint.user?.email || 'N/A'}</td>
                                    <td style={{ padding: '10px', borderBottom: '1px solid #ddd' }}>{complaint.user?.phone || 'N/A'}</td>
                                    <td style={{ padding: '10px', borderBottom: '1px solid #ddd' }}>{complaint.title}</td>
                                    <td style={{ padding: '10px', borderBottom: '1px solid #ddd' }}>
                                        <span>
                                            <FaRegEye style={{ cursor: 'pointer', marginLeft: '30px' }} onClick={() => handleViewDescription(complaint.description)} />
                                        </span>
                                    </td>
                                    <td style={{ padding: '10px', borderBottom: '1px solid #ddd' }}>{complaint.status}</td>
                                    <td style={{ padding: '10px', borderBottom: '1px solid #ddd',paddingLeft:'50px' }}>
                                        <Button
                                            style={{ backgroundColor: 'red' }}
                                            onClick={() => handleDeleteComplaint(complaint._id)}
                                        >
                                            <b style={{ color: 'white' }}>DELETE</b>
                                        </Button>                                     <Button
                                        style={{ backgroundColor: 'green', marginLeft: '15px' }}
                                        onClick={() => handleAnswer(complaint)}
                                    >
                                        <b style={{ color: 'white' }}>ANSWER</b>
                                    </Button>
                                    </td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    ) : (
                        <p>No complaints available.</p>
                    )}
                    <br />
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
                            disabled={currentPage * PAGE_SIZE >= complaints.length}
                            onClick={() => handlePageChange(currentPage + 1)}
                        >
                            <GiNextButton />
                        </Button>
                    </div>
                </div>
                <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
                    <DialogTitle>Answer Complaint</DialogTitle>
                    <DialogContent>
            <textarea
                value={response}
                onChange={(e) => setResponse(e.target.value)}
                placeholder="Enter your response here..."
                style={{ width: '100%', height: '100px' }}
            />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={() => setOpenDialog(false)} variant="contained" color="secondary">Cancel</Button>
                        <Button onClick={handleSubmitResponse} variant="contained" color="primary">
                            Submit
                        </Button>
                    </DialogActions>
                </Dialog>
                <Dialog open={openDialogDescription} onClose={() => setOpenDialogDescription(false)}>
                    <DialogTitle>Description</DialogTitle>
                    <DialogContent>
                        <p>{selectedDescription}</p>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={() => setOpenDialogDescription(false)} variant="contained" color="primary">
                            Close
                        </Button>
                    </DialogActions>
                </Dialog>

            </div>
        </Spring>
    );
};

export default AffichageCrud;