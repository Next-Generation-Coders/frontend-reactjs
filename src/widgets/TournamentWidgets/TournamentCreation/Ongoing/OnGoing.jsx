// components
import Spring from '@components/Spring';
import { useForm} from 'react-hook-form';

import TournamentStatusSelector from './TournamentTypeselector';
import {toast} from 'react-toastify';
import React, {useState} from 'react';
import classNames from 'classnames';
import styles from "@widgets/TournamentWidgets/TournamentCreation/details/styles.module.scss";
import {RiVerifiedBadgeFill} from "react-icons/ri";


const OnGoing = ({ standalone = true, formData, setFormData,onSubmit }) => {
    const { register,
        formState: { errors },
        handleSubmit: handleSubmitForm } = useForm({
        defaultValues: formData
    });
    const [formSubmitted, setFormSubmitted] = useState(false);


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
        onSubmit({ ...formData, ...formattedData });
        setButtonText("Undo");
        toast.success("Form submitted successfully!");
        setFormSubmitted(true);

    }

 
        return (
            <div className={classNames("container", { [styles.blurred]: formSubmitted })}>


                <Wrapper {...wrapperProps}>
                    <div className="d-flex flex-column g-4">
                        <h2 style={{paddingLeft:"220px"}}>Tournament Ongoing
                            {formSubmitted ? (
                                <RiVerifiedBadgeFill style={{marginLeft:"20px",color:"green"}} />
                            ) : null}
                        </h2>
                    </div>
                    <form onSubmit={handleSubmitForm(handleFormSubmit)} className="d-flex flex-column g-40">
                        <div className="d-flex flex-column g-20" style={{ margin: '20px 0 30px' }}>
                        <TournamentStatusSelector onSelectTournamentType={handleSelectTournamentType} />
                            <bR></bR>
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
                        <bR></bR> <bR></bR> <bR></bR> <bR></bR> <bR></bR><bR></bR>

                        <button
                            className="btn"
                            type="submit"
                            style={{ backgroundColor: "#FDCA40", color: "black" }}
                            disabled={!selectedTournamentType }
                        >
                            Validate <span style={{ marginLeft: '10px' }} className='text-xl font-bold text-white'>&#10003;</span>
                        </button>

                    </form>
                </Wrapper>
            </div>
        );
}

export default OnGoing