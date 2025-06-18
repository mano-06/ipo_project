import React, { useState } from 'react';
import '../App.css'; // Assuming shared CSS for now
import { useNavigate } from 'react-router-dom';

function AdminLogin() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        console.log('Login attempt:', { email, password });
        try {
            const response = await fetch('/api/admin/login/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username: email, password }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.non_field_errors || errorData.detail || 'Login failed');
            }

            const data = await response.json();
            console.log('Login successful:', data);
            localStorage.setItem('authToken', data.token);
            navigate('/admin/dashboard');
        } catch (err) {
            setError(err.message);
        }
    };

    return (
        <div className="auth-container">
            <div className="auth-card">
                <h2 className="auth-title">Sign In</h2>
                <form onSubmit={handleSubmit}>
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
                    <button type="submit" className="auth-button">Login</button>
                </form>
                <div className="auth-links">
                    <p>Don't have an account? <a href="/admin/signup">Sign Up</a></p>
                    <p><a href="/admin/forgot-password">Forgot Password?</a></p>
                </div>
            </div>
        </div>
    );
}

export default AdminLogin;