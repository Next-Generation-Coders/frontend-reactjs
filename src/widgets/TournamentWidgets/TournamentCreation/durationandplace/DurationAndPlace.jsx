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
    const {handleSubmit,register, formState: {errors}, control} = useForm({
        defaultValues: {
            startDate: '',
            endDate: '',
          
        }
    });

    
    const Wrapper = standalone ? 'div' : Spring;
    const wrapperProps = standalone ? {  } : {className: 'card card-padded'};
    
    
    const handleFormSubmit = () => {
       
        const startDateObject = new Date(startDate);
        const endDateObject = new Date(endDate);
        if (startDateObject >= endDateObject) {
            
            toast.error("Start date should be before the end date");
            return;

           
        }
        
        if (!selectedCountry) {
            toast.error("Please select the country");
            return;
        }

        if (!selectedCity) {
            toast.error("Please select the city");
            return;
        }

        
        
        
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
    const selectedDate = new Date(e.target.value); 
    setStartDate({
        startDay: selectedDate.getDate(),
        startMonth: selectedDate.getMonth() + 1,
        startYear: selectedDate.getFullYear(),
    });
};

const handleEndDateChange = (e) => {
    const selectedDate = new Date(e.target.value);
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
                        <h2>Tournament Duration and Place</h2>
                        <p className="text-12">Fill out the form below to create a new Tournament</p>
                    </div>
            <form onSubmit={handleSubmit(handleFormSubmit)} className="d-flex flex-column g-40">
                <div className="d-flex flex-column g-20">
                
                <CountryCitySelector
                  onSelectedCountry={handleSelectedCountry}
                  onSelectedCity={handleSelectedCity}
              />
                <input
                            className={classNames('field', { 'field--error': errors.startDate })}
                            type="date" 
                            placeholder="Start Date"
                            onChange={handleStartDateChange} 
                            required
                            
                        />
                        {errors.startDate && <p className="error-message">Please select a start date</p>}

                <input
                            className={classNames('field', { 'field--error': errors.startDate })}
                            type="date" c
                            placeholder="End Date"
                            onChange={handleEndDateChange} 
                            required
                        />
           
                  
                
                  
                    
                </div>
                <button class="btn" type='onSubmit'>Validate    <span style={{ marginLeft: '10px' }} className='text-xl font-bold text-white'>&#10003;</span></button>
                   
            </form>
            </Wrapper>
            </div>

      
    )
}

export default DurationAndPlace