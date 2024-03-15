// styling
import styles from '../styles.module.scss';

// components
import CustomSelect from '@ui/CustomSelect';
import {PatternFormat} from 'react-number-format';
import {toast} from 'react-toastify';
import LazyImage from '@components/LazyImage';

// hooks
import {useState,useEffect} from 'react';

// utils
import classNames from 'classnames';
import countryList from 'react-select-country-list';
import {City} from 'country-state-city';

// assets
import user from '@assets/user.webp';
import placeholder from '@assets/placeholder.webp';

const Profile = () => {
    // do something with the form data
    const onSubmit = (data) => {
        toast.success('Your changes have been successfully saved!')
    }

    const [data, setData] = useState([]);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            // Fetch data from API or database
            const response = await fetch('https://api.example.com/profile');
            const jsonData = await response.json();
            setData(jsonData);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    return (
        <table>
    <thead>
        <tr>
            <th>Full Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Age</th>
            <th>Position</th>
            <th>Jersey Number</th>
        </tr>
    </thead>
    <tbody>
        {data.map((item, index) => (
            <tr key={index}>
                <td>{item.FullName}</td>
                <td>{item.email}</td>
                <td>{item.phone}</td>
                <td>{item.age}</td>
                <td>{item.position}</td>
                <td>{item.jersyNumber}</td>
            </tr>
        ))}
    </tbody>
</table>

    
    )
}

export default Profile