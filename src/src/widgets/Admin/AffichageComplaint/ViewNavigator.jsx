// styled components
import {Navigation} from './styles';
import React, { useState } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button } from '@mui/material';
import { FaSearch } from "react-icons/fa";
// components
import TabButton from '@ui/TabButton';

// utils
import PropTypes from 'prop-types';

const ViewNavigator = ({current, handler}) => {
   
    
    return (
        <Navigation className="tab-nav">
           
            <TabButton title="CREATE" />
            <TabButton title="UPDATE" />

        </Navigation>
    )
}

ViewNavigator.propTypes = {
    current: PropTypes.string.isRequired,
    handler: PropTypes.func.isRequired
}

export default ViewNavigator