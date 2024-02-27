import { useState } from "react"; 


export const Status = ['Equipe A', 'B', 'bbbbbb'];

export const Data = {
    id: 0,
    content: '',
    status: 'nn'
};

export const useDragAndDrop = (initialState) => {
    const [isDragging, setIsDragging] = useState(false);
    const [listItems, setListItems] = useState(initialState);

    const handleUpdateList = (id, status) => {
        let card = listItems.find(item => item.id === id);

        if (card && card.status !== status) {
            card.status = status;
            if (Array.isArray(listItems)) {
                setListItems(prev => ([
                    card,
                    ...prev.filter(item => item.id !== id)
                ]));
            }
        }
    };

    const handleDragging = (dragging) => setIsDragging(dragging);

    return {
        isDragging,
        listItems,
        handleUpdateList,
        handleDragging,
    };
};
