import React, { useState, useEffect } from 'react';
import '../App.css';

function AdminIPOList() {
    const [ipos, setIpos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [deleteConfirm, setDeleteConfirm] = useState(null);

    useEffect(() => {
        fetchIPOs();
    }, []);

    const fetchIPOs = async () => {
        try {
            const response = await fetch('/api/ipos/');
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            setIpos(data);
            setLoading(false);
        } catch (error) {
            setError(error);
            setLoading(false);
        }
    };

    const handleEdit = (ipoId) => {
        // Navigate to edit page with the IPO ID
        window.location.href = `/admin/ipo/edit/${ipoId}`;
    };

    const handleDelete = async (ipoId) => {
        if (!deleteConfirm) {
            setDeleteConfirm(ipoId);
            return;
        }

        try {
            const response = await fetch(`/api/ipos/${ipoId}/`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('authToken')}`,
                },
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            // Remove the deleted IPO from the list
            setIpos(ipos.filter(ipo => ipo.id !== ipoId));
            setDeleteConfirm(null);
        } catch (error) {
            setError(error.message);
            setDeleteConfirm(null);
        }
    };

    if (loading) {
        return <div className="ipo-container">Loading IPOs...</div>;
    }

    if (error) {
        return <div className="ipo-container">Error: {error.message}</div>;
    }

    return (
        <div className="ipo-container">
            <h2 className="ipo-title">IPO Upcoming Screen</h2>
            <div className="ipo-table-wrapper">
                <table className="ipo-table">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Company Name</th>
                            <th>Status</th>
                            <th>Price Band</th>
                            <th>Open Date</th>
                            <th>Close Date</th>
                            <th>Issue Size</th>
                            <th>Issue Type</th>
                            <th>Listing Date</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {ipos.map(ipo => (
                            <tr key={ipo.id}>
                                <td>{ipo.id}</td>
                                <td>{ipo.company_name}</td>
                                <td>{ipo.status}</td>
                                <td>{ipo.price_band}</td>
                                <td>{ipo.open_date}</td>
                                <td>{ipo.close_date}</td>
                                <td>{ipo.issue_size}</td>
                                <td>{ipo.issue_type}</td>
                                <td>{ipo.listing_date || 'N/A'}</td>
                                <td>
                                    <button
                                        className="ipo-button edit-button"
                                        onClick={() => handleEdit(ipo.id)}
                                    >
                                        Edit
                                    </button>
                                    <button
                                        className={`ipo-button ${deleteConfirm === ipo.id ? 'delete-confirm' : 'delete-button'}`}
                                        onClick={() => handleDelete(ipo.id)}
                                    >
                                        {deleteConfirm === ipo.id ? 'Confirm Delete' : 'Delete'}
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default AdminIPOList;