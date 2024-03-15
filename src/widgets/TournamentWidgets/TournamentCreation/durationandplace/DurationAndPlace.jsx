// components
import Spring from '@components/Spring';

import { useForm} from 'react-hook-form';
import {toast} from 'react-toastify';
import CountryCitySelector from './tournamentplaceSelector';
// hooks
import {useState} from 'react';
import classNames from 'classnames';

const DurationAndPlace = ({standalone,onSubmit}) => {
    const [open, setOpen] = useState(false);
    const {handleSubmit,register, formState: {errors}, reset, control} = useForm({
        defaultValues: {
            startDate: '',
            endDate: '',
          
        }
    });

    
    const Wrapper = standalone ? 'div' : Spring;
    const wrapperProps = standalone ? {  } : {className: 'card card-padded'};
    
    
    const handleFormSubmit = () => {
    
        
        // Now you can include startDay, startMonth, startYear, endDay, endMonth, and endYear in the form data object
        const formDataToSend = {
         
            startDay: parseInt(startDate.startDay),
            startMonth: parseInt(startDate.startMonth),
            startYear: parseInt(startDate.startYear),
            endDay: parseInt(endDate.endDay),
            endMonth: parseInt(endDate.endMonth),
            endYear: parseInt(endDate.endYear),
            Country: selectedCountry ? selectedCountry.label : null,
            City: selectedCity ? selectedCity.label : null
        };
        
        // Call the onSubmit function from props and pass the modified form data
        onSubmit(formDataToSend);
        
        console.log('Data from details title:', formDataToSend);
    };
    


    const [selectedCountry, setSelectedCountry] = useState(null);
const [selectedCity, setSelectedCity] = useState(null);

const handleSelectedCountry = (country) => {
    setSelectedCountry(country);
  };
  
  const handleSelectedCity = (city) => {
    setSelectedCity(city);
  };
const [startDate, setStartDate] = useState({ day: null, month: null, year: null });
const [endDate, setEndDate] = useState({ day: null, month: null, year: null });



const handleStartDateChange = (e) => {
    const selectedDate = new Date(e.target.value); // Parse the selected date string into a Date object
    setStartDate({
        startDay: selectedDate.getDate(),
        startMonth: selectedDate.getMonth() + 1,
        startYear: selectedDate.getFullYear(),
    });
};

const handleEndDateChange = (e) => {
    const selectedDate = new Date(e.target.value); // Parse the selected date string into a Date object
    setEndDate({
        endDay: selectedDate.getDate(),
        endMonth: selectedDate.getMonth() + 1,
        endYear: selectedDate.getFullYear(),
    });
};






    return (
        <div className="container">
        <Wrapper {...wrapperProps}>
            <div className="d-flex flex-column g-4">
                        <h2>Tournament Details</h2>
                        <p className="text-12">Fill out the form below to create a new Tournament</p>
                    </div>
            <form onSubmit={handleSubmit(handleFormSubmit)} className="d-flex flex-column g-40">
                <div className="d-flex flex-column g-20">
                <input
                            className={classNames('field', { 'field--error': errors.startDate })}
                            type="date" // Use type="date" to display a date picker
                            placeholder="Start Date"
                            onChange={handleStartDateChange} // Call handleDateChange on date selection change
                            required
                        />

                <input
                            className={classNames('field', { 'field--error': errors.startDate })}
                            type="date" // Use type="date" to display a date picker
                            placeholder="End Date"
                            onChange={handleEndDateChange} // Call handleDateChange on date selection change
                            required
                        />
           
                  
                  <CountryCitySelector
                  onSelectedCountry={handleSelectedCountry}
                  onSelectedCity={handleSelectedCity}
              />
                  
                    
                </div>
                <button type='onSubmit' >validate</button>
                   
            </form>
            </Wrapper>
            </div>

      
    )
}

export default DurationAndPlace