// components
import Spring from '@components/Spring';
import { useForm} from 'react-hook-form';

import TournamentStatusSelector from './TournamentTypeselector';
import {toast} from 'react-toastify';
import {useState} from 'react';
import classNames from 'classnames';

const OnGoing = ({ standalone = true, formData, setFormData,onSubmit }) => {
    const { register, formState: { errors }, handleSubmit: handleSubmitForm } = useForm({
        defaultValues: formData
    });

    const Wrapper = standalone ? 'div' : Spring;
    const wrapperProps = standalone ? {className: 'card card-padded'} : {};

    const [selectedTournamentType, setSelectedTournamentType] = useState(null);
    const [buttonText, setButtonText] = useState("Submit");
    const handleSelectTournamentType = (access) => {
        setSelectedTournamentType(access);
    };

    
    const handleFormSubmit = (data) => {
        if(!selectedTournamentType){
            toast.error("Select your tournament type Please");
            return; 
        }
        
        if(data.numberOfTeams<0){
            toast.error("Select a valid number of teams");
            return; 
        }

        if(selectedTournamentType.toString()==="League" && data.numberOfTeams ){
            const numberOfTeams = parseInt(data.numberOfTeams);

            if ((numberOfTeams & (numberOfTeams % 2) !== 0)) {
                toast.error("The number of your teams must be divided by 2");
            }
            
        };

        if(selectedTournamentType.toString()==="Knockout" && data.numberOfTeams ){
            const numberOfTeams = parseInt(data.numberOfTeams);

            if ((numberOfTeams & (numberOfTeams - 1)) !== 0) {
                toast.error("Select a valid number of teams that is a power of 2");
            }
            
        };
        if(selectedTournamentType.toString()==="Championship" && data.numberOfTeams ){
            const numberOfTeams = parseInt(data.numberOfTeams);

            if ((numberOfTeams & (numberOfTeams % 4) !== 0)) {
                toast.error("The number of your teams must be divided by 4 ");
            }
            
        }

        if (data.numberOfPlayers){
           const  numberOfPlayers =  parseInt(data.numberOfPlayers);
           if (numberOfPlayers < 1 || numberOfPlayers > 11) {
            toast.error("Players in the pitch must be less than 11 and more than 0");
           }
        }
        const formattedData = {
            ...data,
            TournamentType:(selectedTournamentType.toString()),
            numberOfTeams: parseInt(data.numberOfTeams),
            numberOfPlayers: parseInt(data.numberOfPlayers),
            
        };
        console.log("Received data in parent:", formattedData);
        onSubmit({ ...formData, ...formattedData });
        setButtonText("Undo");
    }

 
        return (
            <div className="container">
                <Wrapper {...wrapperProps}>
                    <div className="d-flex flex-column g-4">
                        <h2>Tournament Ongoing</h2>
                        <p className="text-12">Fill out the form below to create a new Tournament</p>
                    </div>
                    <form onSubmit={handleSubmitForm(handleFormSubmit)} className="d-flex flex-column g-40">
                        <div className="d-flex flex-column g-20" style={{ margin: '20px 0 30px' }}>
                        <TournamentStatusSelector onSelectTournamentType={handleSelectTournamentType} />
                           
                            <input
                                className={classNames('field', { 'field--error': errors.numberOfTeams })}
                                type="number"
                                placeholder="Number Of teams"
                                {...register('numberOfTeams', { required: true })}
                            />
                            <input
                                className={classNames('field', { 'field--error': errors.numberOfPlayers })}
                                type="number"
                                placeholder="Number of players in the field"
                                {...register('numberOfPlayers', { required: true })}
                            />
                           
                            
                        </div>
                        <button className="btn" type='onSubmit'>Validate    <span style={{ marginLeft: '10px' }} className='text-xl font-bold text-white'>&#10003;</span></button>
                    </form>
                </Wrapper>
            </div>
        );
}

export default OnGoing