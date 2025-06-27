import { Link, useLocation } from 'react-router-dom';

function AdminSidebar() {
    const location = useLocation();
    const isActive = (path) => location.pathname.startsWith(path);

    return (
        <aside className="dashboard-sidebar">
            <nav className="sidebar-nav">
                <div className="sidebar-section-title">MENU</div>
                <ul className="sidebar-list">
                    <li className={`sidebar-list-item ${isActive('/admin/dashboard') ? 'active' : ''}`}>
                        <Link to="/admin/dashboard">Dashboard</Link>
                    </li>
                    <li className={`sidebar-list-item ${isActive('/admin/ipos') ? 'active' : ''}`}>
                        <Link to="/admin/ipos">Manage IPO</Link>
                    </li>
                    <li className="sidebar-list-item"><Link>IPO Subscription</Link></li>
                    <li className="sidebar-list-item"><Link>IPO Allotment</Link></li>
                </ul>
                <div className="sidebar-section-title">OTHERS</div>
                <ul className="sidebar-list">
                    <li className="sidebar-list-item"><Link>Settings</Link></li>
                    <li className="sidebar-list-item"><Link>API Manager</Link></li>
                    <li className="sidebar-list-item"><Link>Accounts</Link></li>
                    <li className="sidebar-list-item"><Link>Help</Link></li>
                </ul>
            </nav>
        </aside>
    );
}

export default AdminSidebar;