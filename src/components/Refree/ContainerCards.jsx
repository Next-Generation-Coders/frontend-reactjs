import React, { useState } from "react";
import CardItem from "./CardItem";
import { Dialog, DialogTitle, DialogContent, DialogActions, Button } from '@mui/material';
import { FaEllipsisV } from 'react-icons/fa';
import { HiOutlineSwitchHorizontal } from "react-icons/hi";
import { GiCardJoker } from "react-icons/gi";
interface Item {
    id: number;
    name: string;
    status: string;
}


interface ContainerCardsProps {
    items: Item[];
    status: string;
    isDragging: boolean;
    handleUpdateList: (id: number, status: string) => void;
    handleDragging: (dragging: boolean) => void;
    handleSave: () => void; 

}

const ContainerCards: React.FC<ContainerCardsProps> = ({ items = [], status, isDragging, handleDragging, handleUpdateList,handleSave }) => {
    const handleCardDragStart = (e: React.DragEvent<HTMLDivElement>, id: number) => {
        e.dataTransfer.setData('text/plain', String(id));
        handleDragging(true);
    };
    const [showDialog, setShowDialog] = useState(false);


    const handleCardDragEnd = () => {
        handleDragging(false);
    };

    const handleCardDrop = (e: React.DragEvent<HTMLDivElement>, droppedItemId: number) => {
        e.preventDefault();
        handleDragging(false);

        const draggedItemId = parseInt(e.dataTransfer.getData('text/plain'), 10);

        handleUpdateList(draggedItemId, status);
    };

    const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
    };

    const handleClick = () => {
        setShowDialog(true);
    }

    const handleClose = () => {
        setShowDialog(false);
    }

    return (
        <div>
            <p className="layout-cardss">{status === 'VS' ? 'VS' : status}</p>
            {status === 'VS' && (
            <>
                  <Button onClick={handleSave} style={{ left: '380px', marginTop: '-80px', border: '1px solid black', backgroundColor: 'GREEN', borderRadius: '20%' }}>
                    <b style={{ color: 'white' }}>SAVE</b>
                </Button>
                <Button onClick={handleClick} style={{ right: '55px', marginTop: '-80px', border: '1px solid black', backgroundColor: 'RED', borderRadius: '20%' }}>
                    <b style={{ color: 'white' }}>LIVE</b>
                </Button>

                <Dialog
                    open={showDialog}
                    onClose={handleClose}
                    PaperProps={{
                        style: {
                            backdropFilter: 'blur(10px)', 
                            backgroundColor: 'rgba(255, 255, 255, 0.2)',
                            boxShadow: 'none',
                            border:'2.5px  #fff',
                            borderRadius:'50px',
                        },
                    }}
                >
                    <DialogTitle style={{ color: 'black', right: '0', fontSize: '1.5rem', top: '7px' }}></DialogTitle>
                    <DialogContent style={{ display: 'flex', flexDirection: 'column' }}>
                        <input type="number" placeholder="Durée du match" style={{ marginBottom: '10px', padding: '8px', border: '2px solid #FFF', borderRadius: '5px', fontSize: '20px',color:'black',fontWeight: 'bold' }} /><br />
                        <input type="datetime-local" placeholder="Date de début du match" style={{ marginBottom: '10px', padding: '8px', border: '2px solid #FFF', borderRadius: '5px', fontSize: '20px',color:'black',fontWeight: 'bold' }}/><br />
                        <input type="text" placeholder="Nom de l'équipe 1" style={{ marginBottom: '10px', padding: '8px', border: '2px solid #FFF', borderRadius: '5px', fontSize: '20px',color:'black',fontWeight: 'bold' }}/><br />
                        <input type="text" placeholder="Nom de l'équipe 2" style={{ marginBottom: '10px', padding: '8px', border: '2px solid #FFF', borderRadius: '5px', fontSize: '20px',color:'black',fontWeight: 'bold' }} /><br />
                        <input type="text" placeholder="Stade du match" style={{ marginBottom: '10px', padding: '8px', border: '2px solid #FFF', borderRadius: '5px', fontSize: '20px',color:'black',fontWeight: 'bold' }} /><br />
                        <Button onClick={() => alert("START")} style={{ marginTop: '10px', padding: '10px 20px', backgroundColor: '#007bff', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}> <b>START</b></Button><br />
                    </DialogContent>
                </Dialog>
            </>
        )}
        
            
            {items.map(item => (
                status === item.status && (
                    <div key={item.id} onDragEnd={handleCardDragEnd}>
                        <CardItem
                            data={item}
                            handleDragging={handleDragging}
                            handleCardDragStart={(e) => handleCardDragStart(e, item.id)}
                        />
                    </div>
                )
            ))}
        </div>
    );
    
    
};

export default ContainerCards;
