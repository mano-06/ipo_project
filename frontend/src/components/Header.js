import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import logo from '../bluestock_logo.png'; // Assuming you'll add a bluestock_logo.png in src

function Header() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [username, setUsername] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('authToken');
        if (token) {
            setIsLoggedIn(true);
            const storedUsername = localStorage.getItem('username');
            if (storedUsername) {
                setUsername(storedUsername);
            }
        } else {
            setIsLoggedIn(false);
        }
        // This effect could also listen to a global state change or storage event
    }, [navigate]); // Rerun on navigation

    const handleLogout = () => {
        localStorage.removeItem('authToken');
        localStorage.removeItem('username');
        setIsLoggedIn(false);
        navigate('/admin/login');
    };

    if (isLoggedIn) {
        return (
            <header className="admin-header">
                <div className="admin-header-left">
                    <div className="sidebar-logo-circle">BF</div>
                    <span className="sidebar-brand">Bluestock Fintech</span>
                </div>
                <div className="admin-header-center">
                    <div className="dashboard-search-container">
                        <i className="fa fa-search search-icon"></i>
                        <input className="dashboard-search" type="text" placeholder="Search" />
                    </div>
                </div>
                <div className="admin-header-right">
                    <div className="dashboard-user-info">
                        <div className="dashboard-user-avatar">{username.charAt(0).toUpperCase() || 'U'}</div>
                        <span className="dashboard-user-greeting">Hi, {username || 'User'}</span>
                        <i className="fa fa-caret-down"></i>
                    </div>
                    <div className="notification-icon">
                        <i className="fa fa-bell"></i>
                        <span className="notification-dot"></span>
                    </div>
                    <button onClick={handleLogout} className="logout-button">Logout</button>
                </div>
            </header>
        );
    }

    return (
        <header>
            <div className="image-container">
                <Link to="/">
                    <img src={process.env.PUBLIC_URL + logo} alt="Bluestock Logo" />
                </Link>
            </div>
            <div className="nav-container">
                <nav className="nav-list">
                    <ul className="nav-list-items left">
                        <li className="nav-list-item"><Link to="/">PRODUCTS</Link></li>
                        <li className="nav-list-item"><Link to="/">PRICING</Link></li>
                        <li className="nav-list-item"><Link to="/">COMMUNITY</Link></li>
                        <li className="nav-list-item"><Link to="/">MEDIA<i className="dropdown-arrow fa-solid fa-caret-down"></i></Link></li>
                        <li className="nav-list-item"><Link to="/">SUPPORT<i className="dropdown-arrow fa-solid fa-caret-down"></i></Link></li>
                    </ul>
                    <ul className="nav-list-items">
                        <li className="nav-list-item"><Link to="/admin/login">Sign In</Link></li>
                        <li className="nav-list-item"><Link to="/admin/signup" className="btn-sign-up">Sign Up Now</Link></li>
                        <li className="nav-list-item burger-menu"><i className="fa-solid fa-bars"></i></li>
                    </ul>
                </nav>
            </div>
        </header>
    );
}

export default Header;