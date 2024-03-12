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
            <p className="layout-cardss">{status === 'Lineup' ? 'Lineup' : status}</p>
            {status === 'Lineup' && (
            <>
                  

                
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
