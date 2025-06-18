import React, { useState, useEffect } from 'react';
import IPOCard from './IPOCard';

function IPOList() {
    const [ipos, setIpos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetch('/api/ipos/')
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                return response.json();
            })
            .then(data => {
                setIpos(data);
                setLoading(false);
            })
            .catch(error => {
                setError(error);
                setLoading(false);
            });
    }, []);

    if (loading) {
        return <div>Loading IPOs...</div>;
    }

    if (error) {
        return <div>Error: {error.message}</div>;
    }

    return (
        <div className="ipo-list-container">
            <h1>Upcoming IPOs...</h1>
            <div className="ipo-grid">
                {ipos.map(ipo => (
                    <div key={ipo.id}>
                        <IPOCard ipo={ipo} />
                    </div>
                ))}
            </div>
        </div>
    );
}

export default IPOList;