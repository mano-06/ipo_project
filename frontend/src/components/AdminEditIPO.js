import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import AdminSidebar from './AdminSidebar';

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
    const [logoPreview, setLogoPreview] = useState(null);

    useEffect(() => {
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
                if (data.logo) {
                    setLogoPreview(data.logo); // Assuming logo is a URL
                }
                setLoading(false);
            } catch (error) {
                setError(error.message);
                setLoading(false);
            }
        };
        fetchIPOData();
    }, [id]);

    const handleChange = (e) => {
        const { name, value, type, files } = e.target;
        if (name === 'logo' && files && files[0]) {
            setLogoPreview(URL.createObjectURL(files[0]));
            setFormData(prev => ({
                ...prev,
                [name]: files[0]
            }));
        } else {
            setFormData(prev => ({
                ...prev,
                [name]: type === 'file' ? files[0] : value
            }));
        }
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
                navigate('/admin/ipos/');
            }, 2000);
        } catch (err) {
            setError(err.message);
        }
    };

    const handleCancel = () => {
        navigate('/admin/ipos/');
    }

    const handleDeleteLogo = () => {
        setLogoPreview(null);
        setFormData(prev => ({ ...prev, logo: null }));
        document.getElementById('logo').value = null;
    };

    if (loading) {
        return <div className="ipo-form-container">Loading IPO data...</div>;
    }

    return (
        <div className='Register'>
            <AdminSidebar />
            <div className="ipo-admin-main-layout">
                <div className="ipo-admin-sidebar-tabs">
                    <div className="ipo-admin-tab active">IPO Information</div>
                    <div className="ipo-admin-tab">IPO Info</div>
                </div>
                <div className="ipo-admin-content">
                    <div className="ipo-form-card">
                        <div className="ipo-form-header-row">
                            <h2 className="ipo-form-title">IPO Information</h2>
                            <div className="ipo-form-header-actions">
                                <button className="ipo-form-header-btn" onClick={handleSubmit}>Register</button>
                                <button className="ipo-form-header-btn cancel" onClick={handleCancel}>Cancel</button>
                            </div>
                        </div>
                        <div className="ipo-form-section">
                            <div className="ipo-form-section-title">Enter IPO Details</div>
                            <div className="ipo-logo-upload-row">
                                <div className="ipo-logo-preview">
                                    {logoPreview && (
                                        <img src={logoPreview} alt="Logo Preview" />
                                    )}
                                </div>
                                <div className="ipo-logo-actions">
                                    <input type="file" id="logo" name="logo" accept="image/*" onChange={handleChange} style={{ display: 'none' }} />
                                    <button type="button" className="ipo-logo-upload-btn" onClick={() => document.getElementById('logo').click()}>Upload Logo</button>
                                    <button type="button" className="ipo-logo-delete-btn" onClick={handleDeleteLogo}>Delete</button>
                                </div>
                            </div>
                            <div className="ipo-form-grid">
                                <div className="ipo-form-group">
                                    <label>Company Name</label>
                                    <input type="text" name="company_name" value={formData.company_name} onChange={handleChange} placeholder="Vodafone Idea" />
                                </div>
                                <div className="ipo-form-group">
                                    <label>Price Band</label>
                                    <input type="text" name="price_band" value={formData.price_band} onChange={handleChange} placeholder="Not Issued" />
                                </div>
                                <div className="ipo-form-group">
                                    <label>Open</label>
                                    <input type="text" name="open_date" value={formData.open_date} onChange={handleChange} placeholder="Not Issued" />
                                </div>
                                <div className="ipo-form-group">
                                    <label>Close</label>
                                    <input type="text" name="close_date" value={formData.close_date} onChange={handleChange} placeholder="Not Issued" />
                                </div>
                                <div className="ipo-form-group">
                                    <label>Issue Size</label>
                                    <input type="text" name="issue_size" value={formData.issue_size} onChange={handleChange} placeholder="2300 Cr." />
                                </div>
                                <div className="ipo-form-group">
                                    <label>Issue Type</label>
                                    <select name="issue_type" value={formData.issue_type} onChange={handleChange}>
                                        <option value="">Select</option>
                                        <option value="book">Book Built</option>
                                        <option value="fixed">Fixed Price</option>
                                    </select>
                                </div>
                                <div className="ipo-form-group">
                                    <label>LISTING DATE</label>
                                    <input type="text" name="listing_date" value={formData.listing_date} onChange={handleChange} placeholder="Not Issued" />
                                </div>
                                <div className="ipo-form-group">
                                    <label>Status</label>
                                    <select name="status" value={formData.status} onChange={handleChange}>
                                        <option value="upcoming">Upcoming</option>
                                        <option value="ongoing">Ongoing</option>
                                        <option value="listed">Listed</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                        <div className="ipo-form-section">
                            <div className="ipo-form-section-title">NEW LISTED IPO DETAILS (WHEN IPO GET LISTED)</div>
                            <div className="ipo-form-grid">
                                <div className="ipo-form-group">
                                    <label>IPO PRICE</label>
                                    <input type="text" name="ipo_price" value={formData.ipo_price} onChange={handleChange} placeholder="₹ 383" />
                                </div>
                                <div className="ipo-form-group">
                                    <label>LISTING PRICE</label>
                                    <input type="text" name="listing_price" value={formData.listing_price} onChange={handleChange} placeholder="₹ 435" />
                                </div>
                                <div className="ipo-form-group">
                                    <label>LISTING GAIN</label>
                                    <input type="text" name="listing_gain" value={formData.listing_gain} onChange={handleChange} placeholder="13.58 %" />
                                </div>
                                <div className="ipo-form-group">
                                    <label>LISTING DATE</label>
                                    <input type="text" name="listing_date" value={formData.listing_date} onChange={handleChange} placeholder="2024-05-30" />
                                </div>
                                <div className="ipo-form-group">
                                    <label>CMP</label>
                                    <input type="text" name="cmp" value={formData.cmp} onChange={handleChange} placeholder="₹410" />
                                </div>
                                <div className="ipo-form-group">
                                    <label>CURRENT RETURN</label>
                                    <input type="text" name="current_return" value={formData.current_return} onChange={handleChange} placeholder="7.05 %" />
                                </div>
                                <div className="ipo-form-group">
                                    <label>RHP</label>
                                    <input type="text" name="rhp_pdf" value={formData.rhp_pdf} onChange={handleChange} placeholder="Enter RHP PDF Link" />
                                </div>
                                <div className="ipo-form-group">
                                    <label>DRHP</label>
                                    <input type="text" name="drhp_pdf" value={formData.drhp_pdf} onChange={handleChange} placeholder="Enter DRHP PDF Link" />
                                </div>
                            </div>
                        </div>
                        {error && <div className="ipo-form-error">{error}</div>}
                        {success && <div className="ipo-form-success">IPO registered successfully!</div>}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AdminEditIPO;