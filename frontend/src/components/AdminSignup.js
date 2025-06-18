import React, { useState } from 'react';
import '../App.css';
import { useNavigate } from 'react-router-dom';

function AdminSignup() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        setSuccess(false);
        try {
            const response = await fetch('/api/admin/signup/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username: name, email, password }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.username || errorData.email || errorData.password || errorData.detail || 'Signup failed');
            }

            setSuccess(true);
            navigate('/admin/login');
        } catch (err) {
            setError(err.message);
        }
    };

    return (
        <div className="auth-container">
            <div className="auth-card">
                <h2 className="auth-title">Create an account</h2>
                <form onSubmit={handleSubmit}>
                    <div className="auth-form-group">
                        <label htmlFor="nameInput" className="auth-label">Full name</label>
                        <input
                            type="text"
                            className="auth-input"
                            id="nameInput"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                        />
                    </div>
                    <div className="auth-form-group">
                        <label htmlFor="emailInput" className="auth-label">Email address</label>
                        <input
                            type="email"
                            className="auth-input"
                            id="emailInput"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div className="auth-form-group">
                        <label htmlFor="passwordInput" className="auth-label">Password</label>
                        <input
                            type="password"
                            className="auth-input"
                            id="passwordInput"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    {error && <div className="auth-error">{error}</div>}
                    {success && <div className="auth-success">Signup successful! Please login.</div>}
                    <button type="submit" className="auth-button">Sign Up</button>
                </form>
                <div className="auth-links">
                    <p>Already have an account? <a href="/admin/login">Sign In</a></p>
                </div>
            </div>
        </div>
    );
}

export default AdminSignup;