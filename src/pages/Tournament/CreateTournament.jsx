// components
import PageHeader from '@layout/PageHeader';
import AppGrid from '@layout/AppGrid';
import DetailsForm from '@widgets/TournamentWidgets/TournamentCreation/details/Details';
import DurationAndPlace from '@widgets/TournamentWidgets/TournamentCreation/durationandplace/DurationAndPlace';
import OnGoing from '@widgets/TournamentWidgets/TournamentCreation/Ongoing/OnGoing';
import {  useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useTourLogo from '@hooks/useTourLogo';




const CreateTournament = () => {
    const navigate = useNavigate();
    const {file} = useTourLogo();
    const [formData, setFormData] = useState(new FormData());
    const handleFormData = (data) => {
        
        setFormData({ ...formData, ...data });
    };

    const handleSubmit = async () => {
        
        
        try {
          console.log(formData)
            const response = await fetch('http://localhost:3000/Tournament/add', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`,
                },
                body: JSON.stringify(formData)
            });
    
            if (!response.ok) {
                throw new Error('Failed to create tournament');
            }
    
            const responseData = await response.json();
            console.log(responseData); 
    
           
            navigate('/addTeams', { state: { responseData } });
        } catch (error) {
            console.error("Error sending data to backend:", error);
        }
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

  <button className="btn"  onClick={handleSubmit} type='onSubmit'>Submit    <span style={{ marginLeft: '10px' }} className='text-xl font-bold text-white'>&#10003;</span></button>
</div>
        </>
    )
}

export default CreateTournament