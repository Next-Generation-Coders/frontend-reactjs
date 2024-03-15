// components
import Spring from '@components/Spring';
import { useForm} from 'react-hook-form';

import TournamentStatusSelector from './TournamentTypeselector';
// hooks
import {useState} from 'react';
import classNames from 'classnames';

const OnGoing = ({ standalone = true, formData, setFormData,onSubmit }) => {
    const { register, formState: { errors }, handleSubmit: handleSubmitForm } = useForm({
        defaultValues: formData
    });

    const Wrapper = standalone ? 'div' : Spring;
    const wrapperProps = standalone ? {className: 'card card-padded'} : {};

    const [selectedTournamentType, setSelectedTournamentType] = useState(null);
    
    const handleSelectTournamentType = (access) => {
        setSelectedTournamentType(access);
    };

    
    const handleFormSubmit = (data) => {
        const formattedData = {
            ...data,
            TournamentType:(selectedTournamentType.toString()),
            numberOfTeams: parseInt(data.numberOfTeams),
            numberOfPlayers: parseInt(data.numberOfPlayers)
        };
        console.log("Received data in parent:", formattedData);
        onSubmit({ ...formData, ...formattedData });
    }

 
        return (
            <div className="container">
                <Wrapper {...wrapperProps}>
                    <div className="d-flex flex-column g-4">
                        <h2>Tournament Details</h2>
                        <p className="text-12">Fill out the form below to create a new Tournament</p>
                    </div>
                    <form onSubmit={handleSubmitForm(handleFormSubmit)}>
                        <div className="d-flex flex-column g-20" style={{ margin: '20px 0 30px' }}>
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
                            <TournamentStatusSelector onSelectTournamentType={handleSelectTournamentType} />
                            
                        </div>
                        <button type='onSubmit'>sumbit</button>
                    </form>
                </Wrapper>
            </div>
        );
}

export default OnGoing