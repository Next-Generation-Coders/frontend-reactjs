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
import user from '@assets/user.webp';
import placeholder from '@assets/placeholder.webp';

const Profile = () => {
    // State and refs
    const { register, handleSubmit, formState: { errors }, reset } = useForm();
    const inputRef = useRef(null);

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
    

    // Form submission handler
    const onSubmit = async (data) => {
        let newPlayerData = {};
        
        if (showBasicForm) {
            newPlayerData = {
                fullname: data.fullname,
                email: data.email,
                phone: data.phone,
                age: data.age,
                position: data.position,
                jersyNumber: data.jersyNumber,
                password: generateRandomPassword() // Use the random password generator function here
            };
        } else {
            newPlayerData = {
                email: data.email
            };
        }
    
        await addNewPlayer("65e3b04de506da5b7fdff654", newPlayerData);
        reset(); // Clear the form fields
    };


    const [showBasicForm, setShowBasicForm] = useState(true); // State to toggle between forms


    const handleToggleForm = () => {
        setShowBasicForm(!showBasicForm); // Toggle the form
    };


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
                            type="text"
                            placeholder="Full Name"
                            {...register('fullname', {required: true})} />
                        <input className={classNames('field', {'field--error': errors.phone})}
                            type="text"
                            placeholder="Phone"
                            {...register('phone', {required: true})} />
                    </div>
                    <div className={styles.row}>
                        <input className={classNames('field', {'field--error': errors.email})}
                            type="text"
                            placeholder="Email"
                            {...register('email', {required: true, pattern: /^\S+@\S+$/i})} />
                        <input className={classNames('field', {'field--error': errors.age})}
                            type="number"
                            placeholder="Age"
                            {...register('age', {required: true})} />
                    </div>
                    <div className={styles.row}>
                        <div className={styles.select}>
                        <select
                                className={classNames('field', {'field--error': errors.position})}
                                {...register('position', { required: true })}
                            >
                            <option value="">Select Position</option>
                            <option value="GK">Goalkeeper (GK)</option>
                            <option value="CB">Centre-back (CB)</option>
                            <option value="RB">Right-back (RB)</option>
                            <option value="LB">Left-back (LB)</option>
                            <option value="RWB">Right wing-back (RWB)</option>
                            <option value="LWB">Left wing-back (LWB)</option>
                            <option value="CM">Central midfielder (CM)</option>
                            <option value="CDM">Defensive midfielder (CDM)</option>
                            <option value="CAM">Attacking midfielder (CAM)</option>
                            <option value="RM">Right midfielder (RM)</option>
                            <option value="LM">Left midfielder (LM)</option>
                            <option value="ST">Striker (ST)</option>
                            <option value="CF">Centre forward (CF)</option>
                            <option value="RF">Right forward (RF)</option>
                            <option value="LF">Left forward (LF)</option>
                            <option value="RW">Right winger (RW)</option>
                            <option value="LW">Left winger (LW)</option>
                        </select>
                        </div>
                        <input className={classNames('field', {'field--error': errors.jersyNumber})}
                            type="number"
                            placeholder="Jersey Number"
                            min="0"
                            max="99"
                            {...register('jersyNumber')} />
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
                    <div className={styles.row}>
                        <input className={classNames('field', {'field--error': errors.email})}
                            type="text"
                            placeholder="Email"
                            {...register('email', {required: true, pattern: /^\S+@\S+$/i})} />
                    </div>
                    <div className={styles.footer}>
                        <button className="btn" type="submit">Send Request</button>
                        <button className="btn btn--outlined" type="reset" onClick={reset}>Cancel</button>
                    </div>
                </>
            )}
            
        </form>
    
    )
}

export default Profile