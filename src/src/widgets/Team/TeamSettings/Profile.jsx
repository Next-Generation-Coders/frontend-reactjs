import styles from './styles.module.scss';
import Select from 'react-select';
// components
import CustomSelect from '@ui/CustomSelect';
import { PatternFormat } from 'react-number-format';
import { toast } from 'react-toastify';

// hooks
import { useForm, Controller } from 'react-hook-form';
import { useState } from 'react';

// utils
import classNames from 'classnames';
import countryList from 'react-select-country-list';
import { City } from 'country-state-city';

//

import Spring from '@components/Spring';
import LazyImage from '@components/LazyImage';
import Submenu from '@ui/Submenu';

// hooks
import {useRef} from 'react';
import useFileReader from '@hooks/useFileReader';
import useSubmenu from '@hooks/useSubmenu';

// assets
import user from '@assets/clubs/bvb.webp';
import placeholder from '@assets/placeholder.webp';
const Profile = () => {
    const [selectedCountry, setSelectedCountry] = useState();
    const [selectedCity, setSelectedCity] = useState();
    const [cities, setCities] = useState([]);
    const {anchorEl, open, handleClick, handleClose} = useSubmenu();
    const {file, setFile, handleFile} = useFileReader();
    const inputRef = useRef(null);

    const triggerInput = () => inputRef.current?.click();

    const submenuActions = [
        {
            label: 'Upload',
            icon: 'upload',
            onClick: triggerInput,
        },
        {
            label: 'Remove',
            icon: 'trash',
            onClick: () => setFile(placeholder)
        }
    ]
    const { register, handleSubmit, formState: { errors }, reset, control } = useForm({
        defaultValues: {
            username: '',
            teamName: '',
            playerList: [],
            email: '',
            nbrplayers:'',
            country: null,
            logo: ''
        }
    });
    const playerOptions = [
        { value: 'player1', label: 'Player 1' },
        { value: 'player2', label: 'Player 2' },
        { value: 'player3', label: 'Player 3' },
        // Add more player options as needed
    ];

    const getCountriesOptions = () => {
        let countries = countryList().getData();
        for (let i = 0; i < countries.length; i++) {
            if (countries[i].value === 'RU') {
                countries[i].label = 'Russia [terrorist state]';
            }
        }
        return countries;
    }

    const handleCountryChange = (country) => {
        setSelectedCountry(country);
        setSelectedCity(null);
        let options = [];
        const rawData = City.getCitiesOfCountry(country.value);
        rawData.map(item => options.push({ value: item.name, label: item.name }));
        setCities(options);
    }

    const onSubmit = (data) => {
        toast.success('Your changes have been successfully saved!');
    }

    const handleLogoUpload = (e) => {
        
    };
    return (
        <form className="d-flex flex-column " onSubmit={handleSubmit(onSubmit)}>
        
            <div className={styles.row}>
                <input
                    className={classNames('field', { 'field--error': errors.username })}
                    type="text"
                    placeholder="Team Name"
                    {...register('username', { required: true })}
                />
                <input
                    className={classNames('field', { 'field--error': errors.email })}
                    type="text"
                    placeholder="Email"
                    {...register('email', { pattern: /^\S+@\S+$/i })}
                />

            </div>
            <div className={styles.row}>
                <Controller
                    name="country"
                    control={control}
                    render={({ field }) => (
                        <CustomSelect
                            options={getCountriesOptions()}
                            value={field.value}
                            onChange={(value) => {
                                field.onChange(value);
                                handleCountryChange(value);
                            }}
                            placeholder="Country"
                            isSearchable={true}
                            variant="basic"
                            innerRef={field.ref}
                        />
                    )}
                />
                <Controller
                    name="city"
                    control={control}
                    render={({ field }) => (
                        <CustomSelect
                            options={cities}
                            value={field.value}
                            onChange={(value) => {
                                field.onChange(value);
                                setSelectedCity(value);
                            }}
                            placeholder="City"
                            isSearchable={true}
                            variant="basic"
                            innerRef={field.ref}
                        />
                    )}
                />
            </div>
            <div>
                <CustomSelect
                    classNamePrefix="react-select"
                    className={classNames('field', { 'field--error': errors.playerList })}
                    placeholder="Select Players"
                    options={playerOptions}
                    {...register('playerList', { required: true })}
                />
            </div>

            <div >
                {/* Replace this input with a component for selecting players */}
                <input
                    className={classNames('field', { 'field--error': errors.nbrplayers })}
                    type="number"
                    placeholder="number of players"
                    {...register('number of players', { pattern: /^\S+@\S+$/i })}
                />
               
            </div>
            
            <br></br>

             <div className={`${styles.container} d-flex align-items-center`}>
                <div className={styles.wrapper}>
                    <input type="file" onChange={handleFile} ref={inputRef} hidden/>
                    <div>
                        <LazyImage className={styles.img} src={file ? file : user} alt="Lottie Poole"/>
                    </div>
                    <button className={styles.button} onClick={handleClick} aria-label="Open menu">
                        <i className="icon-camera"/>
                    </button>
                    <Submenu open={open} onClose={handleClose} anchorEl={anchorEl} actions={submenuActions}/>
                </div>
                <div className="d-flex flex-column g-4">
                     {/*change avec user.name */}
                    
                    <h3 className="text-overflow">Borussia Dortmund</h3>
                      {/*change avec user.address */}
                    <span className="text-overflow">Germany</span>
                </div>
            </div>

            <div className={styles.footer}>
                <button className="btn" type="submit">Create</button>
                <button className="btn btn--outlined" type="reset" onClick={reset}>Cancel</button>
            </div>
        </form>
    );
}

export default Profile;
