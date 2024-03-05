import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AffichageCrud = () => {
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const response = await axios.get('URL_DE_VOTRE_API');
            setData(response.data);
            setIsLoading(false);
        } catch (error) {
            console.error('Error fetching data:', error);
            setIsLoading(false);
        }
    };

    const deleteItem = async (id) => {
        try {
            await axios.delete(`URL_DE_VOTRE_API/${id}`);
            fetchData(); // Re-fetch data after deletion
        } catch (error) {
            console.error('Error deleting item:', error);
        }
    };

    return (
        <div>
            <h1>Données CRUD</h1>
            {isLoading ? (
                <p>Loading...</p>
            ) : (
                <ul>
                    {data.map(item => (
                        <li key={item.id}>
                            <span>{item.name}</span>
                            <button onClick={() => deleteItem(item.id)}>Supprimer</button>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default AffichageCrud;
