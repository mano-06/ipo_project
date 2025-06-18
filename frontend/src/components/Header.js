import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../bluestock_logo.png'; // Assuming you'll add a bluestock_logo.png in src

function Header() {
    return (
        <header>
            <div className="image-container">
                <Link to="/">
                    <img src={process.env.PUBLIC_URL + logo} alt="Bluestock Logo" />
                </Link>
            </div>
            <div className="nav-container">
                <nav className="nav-list">
                    <ul className="nav-list-items">
                        <li className="nav-list-item"><Link to="/">PRODUCTS</Link></li>
                        <li className="nav-list-item"><Link to="/">PRICING</Link></li>
                        <li className="nav-list-item"><Link to="/">COMMUNITY</Link></li>
                        <li className="nav-list-item"><Link to="/">MEDIA<i className="dropdown-arrow fa-solid fa-caret-down"></i></Link></li>
                        <li className="nav-list-item"><Link to="/">SUPPORT<i className="dropdown-arrow fa-solid fa-caret-down"></i></Link></li>
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