import React from 'react';

const FootballField = ({ data, handleDragging, handleCardDragStart }) => {
    const handleDragEnd = () => {
        handleDragging(false);
    };

    return (
        <div
            className='football-field'
            draggable
            onDragStart={(e) => handleCardDragStart(e, data.id)}
            onDragEnd={handleDragEnd}
        >
            {/* Votre contenu du terrain de football ici */}
            <p>Joueur: {data.name}</p>
        </div>
    );
};

export default FootballField;
