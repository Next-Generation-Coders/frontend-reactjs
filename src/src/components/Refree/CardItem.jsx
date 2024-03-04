import React, { useState } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button } from '@mui/material';
import { FaEllipsisV } from 'react-icons/fa';
import { HiOutlineSwitchHorizontal } from "react-icons/hi";
import { GiCardJoker } from "react-icons/gi";
import backgroundImageVS from '@assets/players/8.webp';


interface CardItemProps {
    data: {
        id: number;
        name: string;
        status: string;
    };
    handleDragging: (dragging: boolean) => void;
}

export const CardItem: React.FC<CardItemProps> = ({ data, handleDragging }) => {
    const [showDialog, setShowDialog] = useState(false);

    const handleDragStart = (e: React.DragEvent<HTMLDivElement>) => {
        e.dataTransfer.setData('text', `${data.id}`)
        handleDragging(true)
    }

    const handleDragEnd = () => handleDragging(false)
    
    const handleClick = () => {
        setShowDialog(true);
    }

    const handleClose = () => {
        setShowDialog(false);
    }

    return (
        <div className='card-container' draggable onDragStart={handleDragStart} onDragEnd={handleDragEnd} style={{ padding: '4px', backgroundColor: data.status === 'Equipe A' ? '#436850' : (data.status === 'VS' ? '#0079FF' : '#E8C872') }}>           
            <div className='card-content' style={{ display: 'flex', alignItems: 'center', position: 'relative', padding: '4px', backgroundColor: data.status === 'VS' ? '#0079FF' : (data.status === 'Equipe A' ? '#436850' : '#E8C872') }}>           
                <img src={backgroundImageVS} alt="Nom du joueur" style={{ borderRadius: '50%', marginRight: '8px', height: '39px', width: '39px', paddingTop: '-20px' }} />
                <p>{data.name}</p>
                <div className="icon-container" style={{ position: 'absolute', right: '0', fontSize: '1.5rem' }}>
                    <button className="icon-button" onClick={handleClick}>
                        <FaEllipsisV className="ellipsis-icon" />
                    </button>
                </div>
            </div>
            <Dialog
                open={showDialog}
                onClose={handleClose}
                PaperProps={{
                    style: {
                        backdropFilter: 'blur(3px)', // Ajoute un flou
                        backgroundColor: 'rgba(255, 255, 255, 0.2)',
                        boxShadow: 'none',
                        border: '2.5px dashed #fff',
                        borderRadius: '50px',
                    },
                }}
            >
                <DialogTitle style={{ color: 'black', right: '0', fontSize: '1.5rem', top: '7px' }}></DialogTitle>
                <DialogContent>
                    <Button onClick={() => alert("Switch player")}> <HiOutlineSwitchHorizontal style={{ right: '0', fontSize: '2.2rem', top: '7px' }} /><b>Switch Player</b></Button><br></br>
                    <Button onClick={() => alert("Change card color to red")}><GiCardJoker style={{ right: '0', fontSize: '2.5rem', top: '7px', color: 'red' }} /><b style={{ color: 'red' }}>Red Card</b></Button><br></br>
                    <Button onClick={() => alert("Change card color to yellow")}><GiCardJoker style={{ right: '0', fontSize: '2.5rem', top: '7px', color: '#fccb00' }} /><b style={{ color: '#fccb00' }}>Yellow Card</b></Button>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} style={{ marginRight: '57px', right: '0', fontSize: '0.9rem', bottom: '3px', border: '1px solid black', backgroundColor: 'black', borderRadius: '20%' }}><b style={{ color: 'white' }}>Cancel</b></Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}

export default CardItem;
