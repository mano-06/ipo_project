import { useState } from 'react';
import '../App.css';
import { useNavigate } from 'react-router-dom';
import bluestockLogo from '../bluestock_logo.png';

function AdminSignup() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
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
                <div className="auth-logo">
                    <img src={bluestockLogo} alt="Bluestock Logo" className="auth-logo-img" />
                </div>
                <h2 className="auth-title auth-title-center">Create an account</h2>
                <form onSubmit={handleSubmit}>
                    <div className="auth-form-group">
                        <label htmlFor="nameInput" className="auth-label">Name</label>
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
                        <label htmlFor="emailInput" className="auth-label">Email Address</label>
                        <input
                            type="email"
                            className="auth-input"
                            id="emailInput"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div className="auth-form-group password-input-group">
                        <label htmlFor="passwordInput" className="auth-label">Password</label>
                        <input
                            type={showPassword ? 'text' : 'password'}
                            className="auth-input"
                            id="passwordInput"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                        <button type="button" className="password-toggle" onClick={() => setShowPassword(!showPassword)} aria-label="Toggle password visibility">
                            <i class="fa-regular fa-eye"></i>
                        </button>
                    </div>
                    <div className="auth-terms">
                        By continuing, you agree to our <a href="#" className="auth-terms-link">terms of service</a>.
                    </div>
                    <div className="recaptcha-container">
                        <input type="checkbox" checked readOnly className="recaptcha-checkbox" /> I'm not a robot
                        <span className="recaptcha-label">reCAPTCHA</span>
                    </div>
                    {error && <div className="auth-error">{error}</div>}
                    {success && <div className="auth-success">Signup successful! Please login.</div>}
                    <button type="submit" className="auth-button">Sign up</button>
                    <div className="auth-divider"><span>or sign up with</span></div>
                    <button type="button" className="google-signin-btn">
                        Continue with Google
                    </button>
                </form>
                <div className="auth-links">
                    Already have an account? <a href="/admin/login">Sign in here</a>
                </div>
            </div>
        </div>
    );
}

export default AdminSignup;