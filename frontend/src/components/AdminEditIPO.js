import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import '../App.css';

function AdminEditIPO() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        company_name: '',
        logo: null,
        price_band: '',
        open_date: '',
        close_date: '',
        issue_size: '',
        issue_type: '',
        listing_date: '',
        status: 'upcoming',
        ipo_price: '',
        listing_price: '',
        current_market_price: '',
        rhp_pdf: null,
        drhp_pdf: null,
    });
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchIPOData();
    }, [id]);

    const fetchIPOData = async () => {
        try {
            const response = await fetch(`/api/ipos/${id}/`);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();

            // Format dates to YYYY-MM-DD for input fields
            const formattedData = {
                ...data,
                open_date: data.open_date ? new Date(data.open_date).toISOString().split('T')[0] : '',
                close_date: data.close_date ? new Date(data.close_date).toISOString().split('T')[0] : '',
                listing_date: data.listing_date ? new Date(data.listing_date).toISOString().split('T')[0] : '',
            };

            setFormData(formattedData);
            setLoading(false);
        } catch (error) {
            setError(error.message);
            setLoading(false);
        }
    };

    const handleChange = (e) => {
        const { name, value, type, files } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'file' ? files[0] : value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        setSuccess(false);

        const formPayload = new FormData();
        for (const key in formData) {
            if (formData[key] !== null) {
                formPayload.append(key, formData[key]);
            }
        }

        // Handle empty strings for nullable fields
        if (formPayload.get('listing_date') === '') formPayload.set('listing_date', '');
        if (formPayload.get('ipo_price') === '') formPayload.set('ipo_price', '');
        if (formPayload.get('listing_price') === '') formPayload.set('listing_price', '');
        if (formPayload.get('current_market_price') === '') formPayload.set('current_market_price', '');

        try {
            const response = await fetch(`/api/ipos/${id}/`, {
                method: 'PUT',
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('authToken')}`,
                },
                body: formPayload,
            });

            if (!response.ok) {
                const errorData = await response.json();
                const errorMessage = errorData.detail ? errorData.detail : JSON.stringify(errorData);
                throw new Error(`Failed to update IPO: ${errorMessage}`);
            }

            setSuccess(true);
            // Redirect to IPO list after successful update
            setTimeout(() => {
                navigate('/admin/ipos/upcoming');
            }, 2000);
        } catch (err) {
            setError(err.message);
        }
    };

    const handleCancel = () => {
        navigate('/admin/ipos/upcoming');
    }

    if (loading) {
        return <div className="ipo-form-container">Loading IPO data...</div>;
    }

    return (
        <div className="ipo-form-container">
            <h2 className="ipo-form-title">Register IPO Details</h2>
            <form onSubmit={handleSubmit}>
                <div className="ipo-form-grid">
                    <div className="ipo-form-group">
                        <label htmlFor="company_name" className="ipo-form-label">Company Name</label>
                        <input type="text" className="ipo-form-input" id="company_name" name="company_name" value={formData.company_name} onChange={handleChange} required />
                    </div>
                    <div className="ipo-form-group">
                        <label htmlFor="logo" className="ipo-form-label">Company Logo</label>
                        <input type="file" className="ipo-form-input" id="logo" name="logo" onChange={handleChange} accept="image/*" />
                    </div>
                    <div className="ipo-form-group">
                        <label htmlFor="price_band" className="ipo-form-label">Price Band</label>
                        <input type="text" className="ipo-form-input" id="price_band" name="price_band" value={formData.price_band} onChange={handleChange} required />
                    </div>
                    <div className="ipo-form-group">
                        <label htmlFor="open_date" className="ipo-form-label">Open Date</label>
                        <input type="date" className="ipo-form-input" id="open_date" name="open_date" value={formData.open_date} onChange={handleChange} required />
                    </div>
                    <div className="ipo-form-group">
                        <label htmlFor="close_date" className="ipo-form-label">Close Date</label>
                        <input type="date" className="ipo-form-input" id="close_date" name="close_date" value={formData.close_date} onChange={handleChange} required />
                    </div>
                    <div className="ipo-form-group">
                        <label htmlFor="issue_size" className="ipo-form-label">Issue Size</label>
                        <input type="text" className="ipo-form-input" id="issue_size" name="issue_size" value={formData.issue_size} onChange={handleChange} required />
                    </div>
                    <div className="ipo-form-group">
                        <label htmlFor="issue_type" className="ipo-form-label">Issue Type</label>
                        <input type="text" className="ipo-form-input" id="issue_type" name="issue_type" value={formData.issue_type} onChange={handleChange} required />
                    </div>
                    <div className="ipo-form-group">
                        <label htmlFor="listing_date" className="ipo-form-label">Listing Date</label>
                        <input type="date" className="ipo-form-input" id="listing_date" name="listing_date" value={formData.listing_date} onChange={handleChange} />
                    </div>
                    <div className="ipo-form-group">
                        <label htmlFor="status" className="ipo-form-label">Status</label>
                        <select className="ipo-form-select" id="status" name="status" value={formData.status} onChange={handleChange} required>
                            <option value="upcoming">Upcoming</option>
                            <option value="ongoing">Ongoing</option>
                            <option value="listed">Listed</option>
                        </select>
                    </div>
                    <div className="ipo-form-group">
                        <label htmlFor="ipo_price" className="ipo-form-label">IPO Price</label>
                        <input type="number" step="0.01" className="ipo-form-input" id="ipo_price" name="ipo_price" value={formData.ipo_price} onChange={handleChange} />
                    </div>
                    <div className="ipo-form-group">
                        <label htmlFor="listing_price" className="ipo-form-label">Listing Price</label>
                        <input type="number" step="0.01" className="ipo-form-input" id="listing_price" name="listing_price" value={formData.listing_price} onChange={handleChange} />
                    </div>
                    <div className="ipo-form-group">
                        <label htmlFor="current_market_price" className="ipo-form-label">Current Market Price</label>
                        <input type="number" step="0.01" className="ipo-form-input" id="current_market_price" name="current_market_price" value={formData.current_market_price} onChange={handleChange} />
                    </div>
                    <div className="ipo-form-group">
                        <label htmlFor="rhp_pdf" className="ipo-form-label">RHP PDF</label>
                        <input type="file" className="ipo-form-input" id="rhp_pdf" name="rhp_pdf" onChange={handleChange} accept=".pdf" />
                    </div>
                    <div className="ipo-form-group">
                        <label htmlFor="drhp_pdf" className="ipo-form-label">DRHP PDF</label>
                        <input type="file" className="ipo-form-input" id="drhp_pdf" name="drhp_pdf" onChange={handleChange} accept=".pdf" />
                    </div>
                </div>
                {error && <div className="ipo-form-error">{error}</div>}
                {success && <div className="ipo-form-success">IPO Updated successfully!</div>}
                <button type="submit" className="ipo-form-submit">Update IPO</button>
                <button onClick={handleCancel} className="ipo-form-cancel">Cancel</button>
            </form>
        </div>
    );
}

export default AdminEditIPO;