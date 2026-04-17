import React, { useState, useEffect } from 'react';
import './Collections.css';

const Collections = () => {
    const [collections, setCollections] = useState([]);
    const [filter, setFilter] = useState('');

    useEffect(() => {
        // Fetching collections data from an API or local file
        const fetchCollections = async () => {
            const response = await fetch('/api/collections'); // Update the API endpoint accordingly
            const data = await response.json();
            setCollections(data);
        };

        fetchCollections();
    }, []);

    const filteredCollections = collections.filter(collection => 
        collection.name.toLowerCase().includes(filter.toLowerCase())
    );

    return (
        <div className="collections">
            <h1>Product Collections</h1>
            <input 
                type="text" 
                placeholder="Filter collections" 
                value={filter} 
                onChange={e => setFilter(e.target.value)} 
            />
            <ul>
                {filteredCollections.map(collection => (
                    <li key={collection.id} className="collection-item">
                        <h2>{collection.name}</h2>
                        <p>{collection.description}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Collections;