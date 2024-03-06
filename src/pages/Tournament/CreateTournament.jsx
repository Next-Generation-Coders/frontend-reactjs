// components
import PageHeader from '@layout/PageHeader';
import AppGrid from '@layout/AppGrid';
import DetailsForm from '@widgets/TournamentWidgets/TournamentCreation/details/Details';
import DurationAndPlace from '@widgets/TournamentWidgets/TournamentCreation/durationandplace/DurationAndPlace';
import OnGoing from '@widgets/TournamentWidgets/TournamentCreation/Ongoing/OnGoing';
import {  useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthContext } from '@hooks/useAuthContext';

const CreateTournament = () => {
    const navigate = useNavigate();
    const { USER } = useAuthContext(); // Destructure USER from the context
    const [formData, setFormData] = useState({});
    const handleFormData = (data) => {
        console.log("Received data in parent:", data);
        setFormData({ ...formData, ...data });
    };

    const handleSubmit = () => {
        

        // Check if the user is logged in and get the ID
        //const userId = USER ? USER.id : null;
    
        const dataToSend = {
            ...formData,
            user: "65da0cb23917a5e0dd33f202" // Add userId to the form data
        };
        
        console.log("Final form data:", dataToSend);
        fetch('http://localhost:3000/Tournament/add', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(dataToSend)
    })
    .catch(error => {
        console.error("Error sending data to backend:", error);
        // Handle error if needed
    });

    navigate("/TournamentCreated")
    };



    const widgets = {
        details: <DetailsForm   onSubmit={handleFormData} />,
        payments: <OnGoing  onSubmit={handleFormData} />,
        password: <DurationAndPlace  onSubmit={handleFormData} />,
    }
  

    
    return (
        <>
            <PageHeader title="Create Tournament" />
            <AppGrid id="tournamentFormLayout" widgets={widgets}/>

            <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
  <button className='btn' style={{ width: '75px', borderRadius:'15px' }} onClick={handleSubmit}>Submit</button>
</div>
        </>
    )
}

export default CreateTournament