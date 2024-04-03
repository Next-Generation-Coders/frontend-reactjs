// styling
import styles from './styles.module.scss';

// components
import CustomSelect from '@ui/CustomSelect';
import {PatternFormat} from 'react-number-format';

// hooks
import {useForm, Controller} from 'react-hook-form';
import {useState} from 'react';

// utils
import classNames from 'classnames';
import countryList from 'react-select-country-list';
import {City} from 'country-state-city';
import {useAuthContext} from "@hooks/useAuthContext";
import {useUpdateProfile} from "@hooks/useUpdateProfile";

const UserSettings = () => {
    const formatAddressWallet = (addressWallet) => {
        if (!addressWallet) return '';
        const visibleLength = 8;
        const ellipsis = '...';
        const start = addressWallet.substring(0, 10);
        const end = addressWallet.substring(addressWallet.length - 9);
        const formattedAddressWallet = `${start}${ellipsis}${end}`;
        return formattedAddressWallet;
    };


    const {USER} = useAuthContext();
    const [country,setSelectedCountry] = useState();
    const [city,setSelectedCity] = useState();
    const [cities, setCities] = useState([]);
    const {register,
        handleSubmit,
        formState: {errors},
        reset, control} = useForm({
        defaultValues: {
            fullname: USER ? USER.fullname : '',
            phone: USER ? USER.phone : '',
            email: USER ? USER.email : '',
            age: USER ? USER.age : '',
            country: USER ? USER.country : null,
            city: USER ? USER.city : null,
            addressWallet: USER ? formatAddressWallet(USER.addressWallet) : '',
        }
    });
    const getCountriesOptions = () => {
        let countries = countryList().getData();
        for (let i = 0; i < countries.length; i++) {
            if (countries[i].value === 'RU') {
                countries[i].label = 'Russia [terrorist state]';
            }
        }
        return countries
    }

    const handleCountryChange = (country) => {
        let options = [];
        const rawData = City.getCitiesOfCountry(country.value);
        rawData.map(item => options.push({value: item.name, label: item.name}));
        setCities(options);
    }

    const {update,isLoading} = useUpdateProfile()
    // do something with the form data
    const onSubmit = async (data) => {
        const user = {
            fullname: data.fullname,
            email:USER.email,
            phone: data.phone,
            age: data.age,
            country: data.country,
            city: data.city,
            addressWallet: formatAddressWallet(data.addressWallet)
        }
        await update(user);
    }



    return (
        <form className="d-flex flex-column g-20" onSubmit={handleSubmit(onSubmit)}>
            <div className={styles.row}>
                <input className={classNames('field', {'field--error': errors.fullname})}
                       type="text"
                       defaultValue=""
                       placeholder="Fullname"
                       {...register('fullname', {required: true})} />
                <Controller name="phone"
                            control={control}
                            defaultValue={USER ? USER.phone : ''}
                            render={({field}) => (
                                <PatternFormat className={classNames('field', {'field--error': errors.phone})}
                                               placeholder="Phone"
                                               format="+216 ########"
                                               mask="-"
                                               getInputRef={field.ref}
                                               value={field.value}
                                               onValueChange={(values) => field.onChange(values.value)}
                                />
                            )}
                />
            </div>
            <div className={styles.row}>
                <input className={classNames('field', {'field--error': errors.email})}
                       type="text"
                       disabled
                       placeholder="Email"
                       {...register('email', {pattern: /^\S+@\S+$/i})} />
                <input className={classNames('field', {'field--error': errors.age})}
                       type="text"
                       placeholder="Age"
                       {...register('age', {required: true})} />
            </div>
            <div className={styles.row}>
                <Controller
                    name="country"
                    control={control}
                    render={({field}) => {
                        return (
                            <CustomSelect
                                options={getCountriesOptions()}
                                value={field.value}
                                onChange={(value) => {
                                    field.onChange(value);
                                    handleCountryChange(value);
                                }}
                                placeholder="Country"
                                isSearchable={true}
                                defaultValue={USER ? USER.country : ''}
                                variant="basic"
                                innerRef={field.ref}
                            />
                        )
                    }}
                />
                <Controller
                    name="city"
                    control={control}
                    render={({field}) => {
                        return (
                            <CustomSelect
                                options={cities}
                                value={field.value}
                                onChange={(value) => {
                                    field.onChange(value);
                                    setSelectedCity(value);
                                }}
                                defaultValue={USER ? USER.city : ''}
                                placeholder="City"
                                isSearchable={true}
                                variant="basic"
                                innerRef={field.ref}
                            />
                        )
                    }}
                />
            </div>
            <div>
                <input
                    className={classNames('field', { 'field--error': errors.addressWallet })}
                    type="text"
                    defaultValue={USER ? formatAddressWallet(USER.addressWallet) : ''}
                    placeholder="Address Wallet"
                    {...register('addressWallet', { required: true })}
                />
            </div>
           {/* <div className={styles.row}>
                <input className={classNames('field', {'field--error': errors.address})}
                       type="text"
                       placeholder="Address"
                       {...register('address')} />
                <input className={classNames('field', {'field--error': errors.zip})}
                       type="text"
                       placeholder="Postal code"
                       {...register('zip')} />
            </div>*/}

            <div className={styles.footer}>
                <button className="btn" type="submit" disabled={isLoading}>Update Profile</button>
                <button className="btn btn--outlined" type="reset" onClick={reset}>Cancel</button>
            </div>
        </form>
    )
}

export default UserSettings