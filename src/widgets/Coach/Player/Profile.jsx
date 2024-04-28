// styling
import styles from '../styles.module.scss';

// components
import CustomSelect from '@ui/CustomSelect';
import {PatternFormat} from 'react-number-format';
import {toast} from 'react-toastify';
import LazyImage from '@components/LazyImage';
import Submenu from '@ui/Submenu';

// hooks
import {useForm, Controller} from 'react-hook-form';
import {useState} from 'react';
import {useRef} from 'react';
import useFileReader from '@hooks/useFileReader';
import useSubmenu from '@hooks/useSubmenu';

// utils
import classNames from 'classnames';
import countryList from 'react-select-country-list';
import {City} from 'country-state-city';

// assets
import PlayerListWithNoTeam from '@widgets/Team/Player_List_With_No_Team/PlayerListWithNoTeam'


import {useAuthContext} from "@hooks/useAuthContext";
import axios from 'axios';

const Profile = () => {
    // State and refs
    const { register, handleSubmit, formState: { errors }, reset ,control} = useForm();
    const inputRef = useRef(null);
    const {USER} = useAuthContext();
    const [preferredFoot, setPreferredFoot] = useState('');
    const value = sessionStorage.getItem('playerName');
    const Agevalue = sessionStorage.getItem('playerAge');


    // Function to add a new player
    const addNewPlayer = async (coachId, newPlayerData) => {
        try {
            const response = await fetch(`http://localhost:3000/Team/addPlayer/${coachId}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(newPlayerData)
                
            });console.log(JSON.stringify(newPlayerData))
            /* if (!response.ok) {
                throw new Error('Failed to add new player');
            } */
            const data = await response.json();
            console.log("New player added:", data);
            // Add any additional logic here after adding the player
            toast.success('New player added successfully!');
        } catch (error) {
            console.error(error);
            toast.error('Failed to add new player');
        }
    };

    const updatePlayer = async (coachId, newPlayerData) => {
        try {
            const response = await fetch(`http://localhost:3000/User/update/${coachId}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(newPlayerData)
                
            });console.log(JSON.stringify(newPlayerData))
            const data = await response.json();
            console.log(newPlayerData?.fullname +"has been updated to a player:", data);
            // Add any additional logic here after adding the player
            toast.success(newPlayerData?.fullname +" has been updated to a player successfully!");
        } catch (error) {
            console.error(error);
            toast.error('Failed to update player');
        }
    };
    
    const generateRandomPassword = () => {
        const length = 10; // Adjust the length of the password as needed
        const charset = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789-_'; // !@#$%^&*()_+{}|:<>?'; // Characters to include in the password
        let password = '';
        for (let i = 0; i < length; i++) {
            const randomIndex = Math.floor(Math.random() * charset.length);
            password += charset[randomIndex];
        }
        return password;
    };

    async function getUser(email) {
        try {
          const response = await axios.get(`http://localhost:3000/User/getbyemail?email=${email}`);
          const userdata = response.data._id;
          return userdata ;
        } catch (error) {
          console.error(error);
        }
    }
    

    // Form submission handler
    const onSubmit = async (data) => {
        let newPlayerData = {};
        
        const userResponse = await axios.get(`http://localhost:3000/User/getbyemail?email=${USER.email}`);
        const userId = userResponse.data._id;
        console.log(data+".......................000000")
        const userData = await getUser(data.email);
        if (userData) {
            /* const userConfirmation =  prompt("Email exists. Do you want to update the user data? \nPlease enter 'yes' or 'no':");

                if (userConfirmation && userConfirmation.toLowerCase() === "yes") {
                    newPlayerData = {
                    email: data.email,
                    position: data.position?.value,
                    jersyNumber: data.jersyNumber,
                    height: data.height,
                    country: {
                        value: data.country && data.country.value ? data.country.value : data.nationality,
                        label: data.country && data.country.label ? data.country.label : data.nationality
                    },
                    preferedFoot: preferredFoot,
                    };
                    await addNewPlayer(userId, newPlayerData);
                } else {
                    console.log("Update canceled. Player data not updated.");
                } */
                toast.error('Email already exists. Please use a different email address.');
          } else {
            newPlayerData = {
              fullname: data.fullname,
              email: data.email,
              phone: data.phone,
              age: data.age,
              position: data.position?.value,
              jersyNumber: data.jersyNumber,
              height: data.height,
              country: {
                value: data.country && data.country.value ? data.country.value : data.nationality,
                label: data.country && data.country.label ? data.country.label : data.nationality
              },
              preferedFoot: preferredFoot,
              password: generateRandomPassword()
            };
            await addNewPlayer(userId, newPlayerData);
            reset(); // Clear the form fields
          }
        

    };


    const [showBasicForm, setShowBasicForm] = useState(true); // State to toggle between forms


    const handleToggleForm = () => {
        setShowBasicForm(!showBasicForm); // Toggle the form
    };

    const getCountriesOptions = () => {
        let countries = countryList().getData();
        for (let i = 0; i < countries.length; i++) {
            if (countries[i].value === 'RU') {
                countries[i].label = 'Russia [terrorist state]';
            }
        }
        return countries;
    }

   /*  const handleCountryChange = (country) => {
        setSelectedCountry(country);
        setSelectedCity(null);
        let options = [];
        const rawData = City.getCitiesOfCountry(country.value);
        rawData.map(item => options.push({ value: item.name, label: item.name }));
        setCities(options);
    } */
    sessionStorage.removeItem('playerName');
    sessionStorage.removeItem('playerAge');

    return (
        <form className="d-flex flex-column g-100" onSubmit={handleSubmit(onSubmit)}>
            {showBasicForm ? (
                <>
                    <div className={styles.toggleSwitch}>
                        <input
                            type="checkbox"
                            id="toggleSwitch"
                            className={styles.checkbox}
                            checked={showBasicForm}
                            onChange={handleToggleForm}
                        />
                        <label htmlFor="toggleSwitch" className={styles.label}>
                            <div className={styles.toggle}></div>
                        </label>
                        <span className={styles.toggleText}>
                            {showBasicForm ? 'Add new player!' : 'Add excesting player!'}
                        </span>
                    </div>
                    <div className={styles.row}>
                        <input className={classNames('field', {'field--error': errors.fullname})}
                            value={value}
                            type="text"
                            placeholder={errors.fullname ? 'Name is required' : 'Full Name'}
                            {...register('fullname', {required: true})} />
                        <input className={classNames('field', {'field--error': errors.phone})}
                            type="text"
                            placeholder={errors.phone ? 'Phone Number is required' : "Phone"}
                            {...register('phone', {required: true})} />
                    </div>
                    <div className={styles.row}>
                        <input className={classNames('field', {'field--error': errors.email})}
                            type="text"
                            placeholder={errors.email ? 'Email is required' : "Email"}
                            {...register('email', {required: true, pattern: /^\S+@\S+$/i})} />
                        <input className={classNames('field', {'field--error': errors.age})}
                            value={Agevalue}
                            type="number"
                            placeholder={errors.age ? 'Age is required' : "Age"}
                            {...register('age', {required: true})} />
                    </div>
                    <div className={styles.row}>
                            <Controller
                                name="position"
                                control={control}
                                render={({ field }) => (
                                <CustomSelect
                                    className={classNames('field', { 'field--error': errors.position })}
                                    options={[
                                    { value: 'GK', label: 'Goalkeeper (GK)' },
                                    { value: 'CB', label: 'Centre-back (CB)' },
                                    { value: 'RB', label: 'Right-back (RB)' },
                                    { value: 'LB', label: 'Left-back (LB)' },
                                    { value: 'RWB', label: 'Right wing-back (RWB)' },
                                    { value: 'LWB', label: 'Left wing-back (LWB)' },
                                    { value: 'CM', label: 'Central midfielder (CM)' },
                                    { value: 'CDM', label: 'Defensive midfielder (CDM)' },
                                    { value: 'CAM', label: 'Attacking midfielder (CAM)' },
                                    { value: 'RM', label: 'Right midfielder (RM)' },
                                    { value: 'LM', label: 'Left midfielder (LM)' },
                                    { value: 'ST', label: 'Striker (ST)' },
                                    { value: 'CF', label: 'Centre forward (CF)' },
                                    { value: 'RF', label: 'Right forward (RF)' },
                                    { value: 'LF', label: 'Left forward (LF)' },
                                    { value: 'RW', label: 'Right winger (RW)' },
                                    { value: 'LW', label: 'Left winger (LW)' },
                                    ]}
                                    value={field.value}
                                    onChange={(value) => {
                                    field.onChange(value);
                                    /* handlePositionChange(value); */
                                    }}
                                    placeholder={errors.position ? 'Position is required' : "Select Position"}
                                    isSearchable={false}
                                    variant="basic"
                                    innerRef={field.ref}
                                />
                                )}
                            />
                        <input className={classNames('field', {'field--error': errors.jersyNumber})}
                            type="number"
                            placeholder={errors.jersyNumber ? 'Jersy number is required' : "Jersey Number"}
                            min="0"
                            max="99"
                            {...register('jersyNumber',{required: true})} />
                    </div>
                    <div className={styles.row}>
                        <Controller
                            name="country"
                            control={control}
                            className={classNames('field', {'field--error': errors.nationality})}
                            render={({ field }) => (
                                <CustomSelect
                                    options={getCountriesOptions()}
                                    value={field.value}
                                    onChange={(value) => {
                                        field.onChange(value);
                                        /* handleCountryChange(value); */
                                    }}
                                    placeholder={errors.nationality ? 'Nationality is required' : "Nationality"}
                                    isSearchable={true}
                                    variant="basic"
                                    innerRef={field.ref}
                                />
                            )}
                        />
                        <input className={classNames('field', {'field--error': errors.height})}
                            type="text"
                            placeholder={errors.height ? 'Height is required #cm' : "Height"}
                            {...register('height', { required: true, pattern: /^\d{2,3}\s?cm$/ })} />
                    </div>
                    <div className={styles.row}>
                    <div>
                        <label>Preferred Foot:  </label>
                        <input
                            type="radio"
                            id="left"
                            name="preferredFoot"
                            value="left"
                            /* {...register('preferredFoot', { required: true })} */
                            checked={preferredFoot === 'left'}
                            onChange={() => setPreferredFoot('L')}
                        />
                        <label >L</label>

                        <input
                            type="radio"
                            id="right"
                            name="preferredFoot"
                            value="right"
                            /* {...register('preferredFoot', { required: true })} */
                            checked={preferredFoot === 'right'}
                            onChange={() => setPreferredFoot('R')}
                        />
                        <label >R</label>
                    </div>

                    </div>
                    <div className={styles.footer}>
                        <button className="btn" type="submit">Save Player</button>
                        <button className="btn btn--outlined" type="reset" onClick={reset}>Cancel</button>
                    </div>
                </>
            ) : (
                <>
                    <div className={styles.toggleSwitch}>
                        <input
                            type="checkbox"
                            id="toggleSwitch"
                            className={styles.checkbox}
                            checked={showBasicForm}
                            onChange={handleToggleForm}
                        />
                        <label htmlFor="toggleSwitch" className={styles.label}>
                            <div className={styles.toggle}></div>
                        </label>
                        <span className={styles.toggleText}>
                            {showBasicForm ? 'Add new player!' : 'Add excesting player!'}
                        </span>
                    </div>
                    {/* <div className={styles.row}>
                        <input className={classNames('field', {'field--error': errors.email})}
                            type="text"
                            placeholder="Email"
                            {...register('email', {required: true, pattern: /^\S+@\S+$/i})} />
                    </div> */}

                    <PlayerListWithNoTeam/>
                    {/* <div className={styles.footer}>
                        <button className="btn" type="submit">Send Request</button>
                        <button className="btn btn--outlined" type="reset" onClick={reset}>Cancel</button>
                    </div> */}
                </>
            )}
            
        </form>
    
    )
}

export default Profile