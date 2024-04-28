import React, { useState } from 'react';
import PageHeader from '@layout/PageHeader';
import AppGrid from '@layout/AppGrid';
import DetailsForm from '@widgets/TournamentWidgets/TournamentCreation/details/Details';
import DurationAndPlace from '@widgets/TournamentWidgets/TournamentCreation/durationandplace/DurationAndPlace';
import OnGoing from '@widgets/TournamentWidgets/TournamentCreation/Ongoing/OnGoing';
import { useNavigate } from 'react-router-dom';
import useTourLogo from '@hooks/useTourLogo';
import {toast} from 'react-toastify';

const CreateTournament = () => {
    const navigate = useNavigate();
    const { file } = useTourLogo();
    const [formData, setFormData] = useState(new FormData());
    const [widgetsCompleted, setWidgetsCompleted] = useState({
        details: false,
        payments: false,
        password: false
    });

    const handleFormData = (data, widgetName) => {
        setFormData({ ...formData, ...data });
        setWidgetsCompleted(prevState => ({
            ...prevState,
            [widgetName]: true
        }));
    };

    const handleSubmit = async () => {
        try {
            if (!widgetsCompleted.details || !widgetsCompleted.payments || !widgetsCompleted.password) {
                console.error("Not all widgets are completed.");
                return;
            }

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

            // Display success toast
            toast.success("Tournament created successfully!");
        } catch (error) {
            console.error("Error sending data to backend:", error);
        }
        toast.success("Form submitted successfully!");

    };

    const widgets = {
        details: <DetailsForm onSubmit={(data) => handleFormData(data, 'details')} />,
        payments: <OnGoing onSubmit={(data) => handleFormData(data, 'payments')} />,
        password: <DurationAndPlace onSubmit={(data) => handleFormData(data, 'password')} />,
    }

    const allWidgetsCompleted = Object.values(widgetsCompleted).every(value => value);

    return (
        <>
            <PageHeader title="Create Tournament" />
            <AppGrid id="player_profilee" widgets={widgets} />

            <div style={{ display: 'flex', justifyContent: 'flex-end', paddingTop: "100px" }}>
                <button
                    className="btn"
                    onClick={handleSubmit}
                    type="button"
                    style={{
                        width: "100%",
                        backgroundColor: allWidgetsCompleted ? "#FDCA40" : "black",
                        color: allWidgetsCompleted ? "black" : "white"
                    }}
                    disabled={!allWidgetsCompleted}
                >
                    Submit <span style={{ marginLeft: '10px' }} className='text-xl font-bold text-white'>&#10003;</span>
                </button>
            </div>

        </>
    )
}

export default CreateTournament;
