import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AdminSidebar from './AdminSidebar';
import '../App.css';

const Pagination = ({ itemsPerPage, totalItems, paginate }) => {
    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(totalItems / itemsPerPage); i++) {
        pageNumbers.push(i);
    }

    return (
        <nav className="pagination-container">
            <ul className="pagination">
                {pageNumbers.map(number => (
                    <li key={number} className="page-item">
                        <a onClick={() => paginate(number)} href="#!" className="page-link">
                            {number}
                        </a>
                    </li>
                ))}
            </ul>
        </nav>
    );
};

function AdminIPOList() {
    const [ipos, setIpos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(10);
    const navigate = useNavigate();

    useEffect(() => {
        fetchIPOs();
    }, []);

    const fetchIPOs = async () => {
        try {
            const response = await fetch('/api/ipos/');
            if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
            const data = await response.json();
            setIpos(data);
        } catch (e) {
            setError(e.message);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (ipoId) => {
        if (window.confirm('Are you sure you want to delete this IPO?')) {
            try {
                const response = await fetch(`/api/ipos/${ipoId}/`, {
                    method: 'DELETE',
                    headers: { 'Authorization': `Bearer ${localStorage.getItem('authToken')}` },
                });
                if (!response.ok) throw new Error('Failed to delete IPO.');
                setIpos(ipos.filter(ipo => ipo.id !== ipoId));
            } catch (error) {
                setError(error.message);
            }
        }
    };

    const handleView = (id) => navigate(`/ipo/${id}`);

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = ipos.slice(indexOfFirstItem, indexOfLastItem);
    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    const getStatusClass = (status) => {
        if (!status) return '';
        const lowerStatus = status.toLowerCase();
        if (lowerStatus.includes('listed')) return 'status-listed';
        if (lowerStatus.includes('ongoing')) return 'status-ongoing';
        if (lowerStatus.includes('comming')) return 'status-comming';
        return 'status-default';
    };

    return (
        <div className="dashboard-root">
            <AdminSidebar />
            <div className="dashboard-main-content">
                <div className="ipo-list-header">
                    <h2>Upcoming IPO | Dashboard</h2>
                    <Link to="/admin/ipo/register" className="btn btn-primary">Register IPO</Link>
                </div>

                {loading && <div>Loading...</div>}
                {error && <div className="auth-error">Error: {error}</div>}
                {!loading && !error && (
                    <div className="ipo-table-container">
                        <table className="ipo-table-modern">
                            <thead>
                                <tr>
                                    <th>Company</th>
                                    <th>Price Band</th>
                                    <th>Open</th>
                                    <th>Close</th>
                                    <th>Issue Size</th>
                                    <th>Issue Type</th>
                                    <th>Listing Date</th>
                                    <th>Status</th>
                                    <th>Action</th>
                                    <th>Delete/View</th>
                                </tr>
                            </thead>
                            <tbody>
                                {currentItems.map(ipo => (
                                    <tr key={ipo.id}>
                                        <td>{ipo.company_name}</td>
                                        <td>₹ {ipo.price_band}</td>
                                        <td>{ipo.open_date}</td>
                                        <td>{ipo.close_date}</td>
                                        <td>{ipo.issue_size}</td>
                                        <td>{ipo.issue_type}</td>
                                        <td>{ipo.listing_date || 'N/A'}</td>
                                        <td>
                                            <span className={`status-tag ${getStatusClass(ipo.status)}`}>
                                                {ipo.status}
                                            </span>
                                        </td>
                                        <td>
                                            <Link to={`/admin/ipo/edit/${ipo.id}`} className="action-btn update-btn">Update</Link>
                                        </td>
                                        <td className="action-icons">
                                            <button onClick={() => handleDelete(ipo.id)} className="icon-btn delete-btn">
                                                <i className="fa fa-trash"></i>
                                            </button>
                                            <button onClick={() => handleView(ipo.id)} className="icon-btn view-btn">
                                                <i className="fa fa-eye"></i>
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        <Pagination itemsPerPage={itemsPerPage} totalItems={ipos.length} paginate={paginate} />
                    </div>
                )}
            </div>
        </div>
    );
}

export default AdminIPOList;