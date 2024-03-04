// styles
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


const AffichageCrud = () => {
    const [complaints, setComplaints] = useState([]);
    const [selectedComplaint, setSelectedComplaint] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [openDialog, setOpenDialog] = useState(false);
    const [response, setResponse] = useState('');


    const handleSearch = () => {
        console.log("Recherche effectuée :", searchTerm);
    };
    

    useEffect(() => {
        console.log("AffichageCrud component mounted");
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:3000/api/AllComplaints');
    
                console.log('Response Status:', response.status);
                console.log('Response Data:', response.data);
    
                if (response.status !== 200) {
                    throw new Error(`Unexpected status code: ${response.status}`);
                }
                console.log('Fetched complaints data:', response.data.complaints);
                setComplaints(response.data.complaints); 
            } catch (error) {
                console.error('Error fetching complaints:', error.message);
            }
        };
    
        fetchData();
    }, []);
    
    

    /*const fetchData = async () => {
        try {
            const response = await axios.get('http://localhost:3000/api/complaints');
            
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
    
            const data = await response.json();
            console.log('Fetched complaints data:', data); // Log the fetched data
            setComplaints(data);
        } catch (error) {
            console.error('Error fetching complaints:', error);
        }
    };
    */
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
    
    const handleSubmitResponse = async () => {
        try {
            console.log('Selected Complaint:', selectedComplaint);
    
            if (!selectedComplaint || !selectedComplaint._id) {
                console.error('No valid complaint selected for responding.');
                return;
            }
    
            const responseValue = response;  // Use response directly
    
            console.log('Request Payload:', {
                complaintId: selectedComplaint._id,
                response: responseValue,
            });
    
            const apiResponse = await axios.put('http://localhost:3000/api/complaints/respond', {
                complaintId: selectedComplaint._id,
                response: responseValue,  // Use response directly
            });
    
            console.log('Server Response:', apiResponse.data);
    
            const updatedComplaint = apiResponse.data.complaint;
            setComplaints((prevComplaints) =>
                prevComplaints.map((complaint) =>
                    complaint._id === updatedComplaint._id ? updatedComplaint : complaint
                )
            );
    
            console.log('Selected Complaint 2:', selectedComplaint);
    
            // Close the dialog
            setOpenDialog(false);
        } catch (error) {
            console.error('Error responding to complaint:', error.message);
            console.log('Error Details:', error.response.data); // Log the error details
        }
    };
    
    
    
    

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
                            style={{ flex: '1', fontSize: '15px', padding: '5px', borderBottom: '2px solid #ddd', alignItems: 'center' }}
                        />
                        <Button onClick={handleSearch} style={{ backgroundColor: 'yellow', color: 'black', borderRadius: '20%' }}>
                            <FaSearch />
                        </Button>
                    </div>
                </Header>
                <div style={{ width: '100%', overflowX: 'auto', padding: '10px' }}>
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
                            {Array.isArray(complaints) && complaints.map(complaint => (
                                <tr key={complaint.id}>
                                    <td style={{ padding: '10px', borderBottom: '1px solid #ddd' }}>{complaint.user?.fullname || 'N/A'}</td>
                                    <td style={{ padding: '10px', borderBottom: '1px solid #ddd' }}>{complaint.user?.email || 'N/A'}</td>
                                    <td style={{ padding: '10px', borderBottom: '1px solid #ddd' }}>{complaint.user?.phone || 'N/A'}</td>
                                    <td style={{ padding: '10px', borderBottom: '1px solid #ddd' }}>{complaint.title}</td>
                                    <td style={{ padding: '10px', borderBottom: '1px solid #ddd' }}>{complaint.description}</td>
                                    <td style={{ padding: '10px', borderBottom: '1px solid #ddd' }}>{complaint.status}</td>
                                    <td style={{ padding: '10px', borderBottom: '1px solid #ddd',paddingLeft:'50px' }}>
                                        <Button style={{ backgroundColor: 'red' }} ><b style={{ color: 'white' }}>DELETE</b></Button>
 <Button
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
            <Button onClick={() => setOpenDialog(false)}>Cancel</Button>
            <Button onClick={handleSubmitResponse} variant="contained" color="primary">
              Submit
            </Button>
          </DialogActions>
        </Dialog>
            </div>
        </Spring>
    );
};

export default AffichageCrud;

