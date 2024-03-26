import React, { useState } from 'react';
import { Navigation } from './styles';
import PropTypes from 'prop-types';
import {  Button } from '@mui/material';
import { FaSearch } from "react-icons/fa";

const ViewNavigator = ({ current, handler }) => {
    const [searchTerm, setSearchTerm] = useState('');

    const handleSearch = () => {
        console.log("Recherche effectuée :", searchTerm);
    };

    return (
        <Navigation className="tab-nav">
            <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="To research..."
                style={{ marginRight: '10px', padding: '5px',borderBottom: '1px solid #ddd' }}
            />
            <Button  onClick={handleSearch} style={{ backgroundColor: 'yellow', color: 'black' ,borderRadius:'20%' }}>
            <FaSearch />
            </Button>
        </Navigation>
    );
};

ViewNavigator.propTypes = {
    current: PropTypes.string.isRequired,
    handler: PropTypes.func.isRequired
};

export default ViewNavigator;
