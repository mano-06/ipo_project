import { useState, useEffect } from 'react';
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
        <div className="card">
            <div className="ipo-card">
                <div class="company-header">
                    <img src={ipo.logo} alt={`${ipo.company_name} Logo`} className='company-logo'/>
                    <h3 class="company-name">{ ipo.company_name }</h3>
                </div>
                <div class="ipo-details">
                    <div class="detail-item">
                        <span class="detail-label">Price Band</span>
                        <span class="detail-value price-band">{ipo.price_band }</span>
                    </div>
                    <div class="detail-item">
                        <span class="detail-label">Issue Size</span>
                        <span class="detail-value">{ ipo.issue_size }</span>
                    </div>
                    <div class="detail-item">
                        <span class="detail-label">Opening Date</span>
                        <span class="detail-value">{ ipo.open_date }</span>
                    </div>
                    <div class="detail-item">
                        <span class="detail-label">Closing Date</span>
                        <span class="detail-value">{ ipo.close_date }</span>
                    </div>
                    <div class="detail-item">
                        <span class="detail-label">Issue Type</span>
                        <span class="detail-value">{ ipo.issue_type }</span>
                    </div>
                    <div class="detail-item">
                        <span class="detail-label">Status</span>
                        <span class="detail-value">{ ipo.status }</span>
                    </div>
                </div>

                <div className="pdf-download">
                    {ipo.rhp_pdf && <a href={ipo.rhp_pdf} target="_blank" rel="noopener noreferrer" className="rhp-button">RHP</a>}
                    {ipo.drhp_pdf && <a href={ipo.drhp_pdf} target="_blank" rel="noopener noreferrer" className="drhp-button">DRHP</a>}
                </div>
            </div>
        </div>
    );
}

export default IPODetail;