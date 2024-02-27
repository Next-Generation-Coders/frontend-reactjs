// components
import TruncatedText from '@components/TruncatedText';

// hooks
import useMeasure from 'react-use-measure';

// utils
import {getClubInfo} from '@utils/helpers';
import PropTypes from 'prop-types';
//


import { Dialog, DialogTitle, DialogContent, DialogActions, Button } from '@mui/material';
import { FaEllipsisV } from 'react-icons/fa';
import React, { useState } from 'react';
import { HiOutlineSwitchHorizontal } from "react-icons/hi";
import { MdDeleteForever } from "react-icons/md";
import { FaEdit } from "react-icons/fa";


const Item = ({isLeader, withLogo, team, variant}) => {
    const [ref, {width}] = useMeasure();
    const [showDialog, setShowDialog] = useState(false);
    const itemStyles = {
        fontFamily: 'var(--heading-font)',
        lineHeight: 1,
        fontSize: variant === 'card' ? '1rem' : '1.125rem',
        color: variant === 'card' ? (isLeader ? 'var(--header)' : 'var(--text)') : 'var(--header-dark)'
    }

    const logoStyles = {
        height: 20,
        width: 20,
    }

    const handleClick = () => {
        setShowDialog(true);
    }
    const handleClose = () => {
        setShowDialog(false);
    }


    return (
        <div className={`${isLeader ? 'text-700 h3' : ''} d-flex justify-content-between align-items-center g-20`}
             style={itemStyles}>
            <div className="d-flex align-items-center g-8 flex-1" ref={ref}>
                {
                    withLogo &&
                    <img style={logoStyles} src={getClubInfo(team.id).logo} alt={getClubInfo(team.id).name}/>
                }
                <TruncatedText width={width - 30} text={getClubInfo(team.id).name} lines={1}/>
            </div>
            <button className="icon-button" onClick={handleClick}>
                    <FaEllipsisV className="ellipsis-icon" />
                </button>      
                
                <Dialog
                    open={showDialog}
                    onClose={handleClose}
                    PaperProps={{
                        style: {
                            backgroundColor: 'black',
                            boxShadow: 'none',
                            border:'2.5px dashed #fff',
                            borderRadius:'50px',
                        },
                    }}
                >
                   <DialogTitle style={{ color: 'black', right: '0', fontSize: '1.5rem', top: '7px' }}></DialogTitle>
                <DialogContent style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <Button onClick={() => alert("EDIT YOUR TEAM")} style={{ marginBottom: '10px', padding: '10px 20px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}> <FaEdit style={{ right: '0', fontSize: '2.2rem', top: '7px', paddingRight: '6px' }} /><b style={{ fontSize: '1.2rem' }}>EDIT YOUR TEAM</b></Button>
                    <Button onClick={() => alert("DELETE YOUR TEAM")} style={{ marginBottom: '10px', padding: '10px 20px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><MdDeleteForever style={{ right: '0', fontSize: '2.5rem', top: '7px', color: 'red', paddingRight: '6px' }} /><b style={{ color: 'red', fontSize: '1.2rem' }}>DELETE YOUR TEAM</b></Button>
                </DialogContent>
                <DialogActions style={{ justifyContent: 'center' }}>
                <Button onClick={handleClose} style={{ marginRight: '10px', right: '0', fontSize: '0.9rem', bottom: '3px', border: '1px solid black', backgroundColor: '#FDCA40', borderRadius: '20%' }}><b style={{ color: 'black' }}>Cancel</b></Button>                </DialogActions>
               </Dialog>
                  </div>
    )
}

const MatchScoreItem = ({match, variant = 'card', withLogo}) => {
    const getLeader = () => {
        if (match.team1.score > match.team2.score) {
            return match.team1.id;
        } else if (match.team1.score < match.team2.score) {
            return match.team2.id;
        } else {
            return null;
        }
    }

    return (
        <div className={`d-flex flex-column ${variant === 'card' ? 'g-6' : 'g-8'}`}>
            
            <Item isLeader={getLeader()}
                  withLogo={withLogo}
                  variant={variant}
                  team={match.team2}/>
        </div>
    )
}

MatchScoreItem.propTypes = {
    match: PropTypes.object.isRequired,
    variant: PropTypes.oneOf(['card', 'thumb']),
    withLogo: PropTypes.bool
}

export default MatchScoreItem