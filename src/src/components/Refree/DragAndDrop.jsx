import React from "react"; 
import { useDragAndDrop } from "@hooks/useDragAndDrop"; 
import ContainerCards from "./ContainerCards"; 
import backgroundImageVS from '@assets/refree/terrain.jpeg';

const typesClub = ['Equipe A', 'VS', 'Equipe B'];

export const DragAndDrop = () => {
    const data = [
        {
            id: 1,
            name: 'Lionel Messi',
            status: 'Equipe A'
        },
        {
            id: 2,
            name: 'Cristiano Ronaldo',  
            status: 'Equipe B'
        },
        {
            id: 3,
            name: 'Neymar Jr.',
            status: 'Equipe A'
        },
        {
            id: 4,
            name: 'Virgil van Dijk',
            status: 'Equipe B'
        },
    ];

    const { isDragging, listItems, handleDragging, handleUpdateList } = useDragAndDrop(data);

    const handleDragOver = (e) => {
        e.preventDefault();
    };

    const handleDrop = (e, container) => {
        e.preventDefault();
        const draggedItemId = parseInt(e.dataTransfer.getData('text/plain'), 10);
        handleUpdateList(draggedItemId, container);
    };

    const getContainerStyle = (container) => {
        if (container === 'VS') {
            return {
                height: '900px', 
                backgroundImage: `url(${backgroundImageVS})`,
                backgroundSize: 'cover',
            };
        } 
    };

    return (
        <div className="grid" onDragOver={handleDragOver}>
            {typesClub.map(container => (
                <div className="layout-cards" key={container} style={getContainerStyle(container)} onDrop={(e) => handleDrop(e, container)}>
                    <ContainerCards
                        items={listItems}
                        status={container}
                        key={container}
                        isDragging={isDragging}
                        handleDragging={handleDragging}
                        handleUpdateList={handleUpdateList}
                    />
                </div>
            ))}
        </div>
    );
};

export default DragAndDrop;
