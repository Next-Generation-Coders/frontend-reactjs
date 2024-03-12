// components

import Spring from '@components/Spring';

import { useState , } from 'react';
// hooks
import {useForm} from 'react-hook-form';

// utils
import classNames from 'classnames';

import TournamentAccessSelector from './selectorAccess';
import TournamentFORCSelector from './comOrfriendselector';
const DetailsForm  = ({ standalone = true, formData, setFormData,onSubmit }) => {
    const { register, formState: { errors }, handleSubmit } = useForm({
        defaultValues: formData
    });;

    const handleFormSubmit = (data) => {
        onSubmit({ ...data, access: selectedAccess,FriOrComp :selectedType });
        console.log('data from details titkle',data) // Call the onSubmit function from props and pass the form data
    };


    


    const Wrapper = standalone ? 'div' : Spring;
    const wrapperProps = standalone ? {className: 'card card-padded'} : {};
    

    
   

    
    const [selectedType, setSelectedType] = useState(null);
    const handleSelecFORCStatus = (status) => {
        setSelectedType(status);
    };

    const [selectedAccess, setSelectedAccess] = useState(null);
    
    const handleSelectAccess = (access) => {
        setSelectedAccess(access);
    };


    const handleFileChange = (e) => {
        // Store only the name of the selected logo file in formData
        onSubmit({ ...formData, logo: e.target.files[0].name });
    };
    

    return (
        <div className="container">
        <Wrapper {...wrapperProps}>
            <div className="d-flex flex-column g-4">
                        <h2>Tournament Details</h2>
                        <p className="text-12">Fill out the form below to create a new Tournament</p>
                    </div>
            <form onSubmit={handleSubmit(handleFormSubmit)}>
                <div className="d-flex flex-column g-20" style={{margin: '20px 0 30px'}}>
                    <input className={classNames('field', {'field--error': errors.title})}
                           type="text"
                           placeholder="Your tournament title"
                           {...register('title', {required: true})}/>
                   <input className={classNames('field', {'field--error': errors.trophy})}
                           type="text"
                           placeholder="Trophy"
                           {...register('trophy', {required: true})}/>
                  
                         <div >
                         <TournamentAccessSelector onSelectAccess={handleSelectAccess} />
                 <TournamentFORCSelector onSelecttournamentType={handleSelecFORCStatus}  />
<br></br> 
        <input type="file" accept="image/*" onChange={handleFileChange} />
                 </div>
                 <button type='onSubmit'>submit</button>
                </div>
                
                    


            </form>
        </Wrapper>
        </div>
    )
}

export default DetailsForm