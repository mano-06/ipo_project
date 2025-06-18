import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

function IPODetail() {
    const { id } = useParams();
    const [ipo, setIpo] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetch(`/api/ipos/${id}/`)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                return response.json();
            })
            .then(data => {
                setIpo(data);
                setLoading(false);
            })
            .catch(error => {
                setError(error);
                setLoading(false);
            });
    }, [id]);

    if (loading) {
        return <div>Loading IPO details...</div>;
    }

    if (error) {
        return <div>Error: {error.message}</div>;
    }

    if (!ipo) {
        return <div>IPO not found.</div>;
    }

    return (
        <div className="container mt-4">
            <div className="card mb-4">
                <div className="card-body">
                    <h1 className="card-title">{ipo.company_name}</h1>
                    <div className="row">
                        <div className="col-md-4">
                            {ipo.logo && <img src={ipo.logo} alt={`${ipo.company_name} Logo`} className="img-fluid mb-3" />}
                        </div>
                        <div className="col-md-8">
                            <p><strong>Status:</strong> {ipo.status}</p>
                            <p><strong>Price Band:</strong> {ipo.price_band}</p>
                            <p><strong>Open Date:</strong> {ipo.open_date}</p>
                            <p><strong>Close Date:</strong> {ipo.close_date}</p>
                            <p><strong>Issue Size:</strong> {ipo.issue_size}</p>
                            <p><strong>Issue Type:</strong> {ipo.issue_type}</p>
                            {ipo.listing_date && <p><strong>Listing Date:</strong> {ipo.listing_date}</p>}
                            {ipo.ipo_price && <p><strong>IPO Price:</strong> {ipo.ipo_price}</p>}
                            {ipo.listing_price && <p><strong>Listing Price:</strong> {ipo.listing_price}</p>}
                            {ipo.current_market_price && <p><strong>Current Market Price:</strong> {ipo.current_market_price}</p>}
                            {ipo.listing_gain && <p><strong>Listing Gain:</strong> {ipo.listing_gain}%</p>}
                            {ipo.current_return && <p><strong>Current Return:</strong> {ipo.current_return}%</p>}

                            <div className="mt-3">
                                {ipo.rhp_pdf && <a href={ipo.rhp_pdf} target="_blank" rel="noopener noreferrer" className="btn btn-secondary me-2">View RHP PDF</a>}
                                {ipo.drhp_pdf && <a href={ipo.drhp_pdf} target="_blank" rel="noopener noreferrer" className="btn btn-secondary">View DRHP PDF</a>}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <a href="/" className="btn btn-primary">Back to IPO List</a>
        </div>
    );
}

export default IPODetail; 