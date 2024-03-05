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

const ContainerCards: React.FC<ContainerCardsProps> = ({ items = [], status, isDragging, handleDragging,handleSave }) => {

    const [showDialog, setShowDialog] = useState(false);


    const handleCardDragEnd = () => {
        handleDragging(false);
    };



    const handleClick = () => {
        setShowDialog(true);
    }


    return (
        <div>
            <p className="layout-cardss">{status === 'VS' ? 'VS' : status}</p>
            {status === 'VS' && (
            <>
                  <Button onClick={handleSave} style={{ left: '470px', marginTop: '-80px', border: '1px solid black', backgroundColor: 'GREEN', borderRadius: '20%' }}>
                    <b style={{ color: 'white' }}>SAVE</b>
                </Button>
                <Button onClick={handleClick} style={{ right: '55px', marginTop: '-80px', border: '1px solid black', backgroundColor: 'RED', borderRadius: '20%' }}>
                    <b style={{ color: 'white' }}>LIVE</b>
                </Button>

                
            </>
        )}
        
            
            {items.map(item => (
                status === item.status && (
                    <div key={item.id} onDragEnd={handleCardDragEnd}>
                        <CardItem
                            data={item}
                            handleDragging={handleDragging}
                           
                        />
                    </div>
                )
            ))}
        </div>
    );
    
    
};

export default ContainerCards;
