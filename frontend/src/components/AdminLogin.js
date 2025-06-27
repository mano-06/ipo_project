import { useState } from 'react';
import '../App.css'; // Assuming shared CSS for now
import { useNavigate } from 'react-router-dom';
import bluestockLogo from '../bluestock_logo.png';

function AdminLogin() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [keepSignedIn, setKeepSignedIn] = useState(false);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        console.log('Login attempt:', { username, password });
        try {
            const response = await fetch('/api/admin/login/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username: username, password }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.non_field_errors || errorData.detail || 'Login failed');
            }

            const data = await response.json();
            console.log('Login successful:', data);
            localStorage.setItem('authToken', data.token);
            localStorage.setItem('username', username);
            navigate('/admin/dashboard');
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
                <form onSubmit={handleSubmit}>
                    <div className="auth-form-group">
                        <label htmlFor="usernameInput" className="auth-label">Username</label>
                        <input
                            type="text"
                            className="auth-input"
                            id="usernameInput"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                        />
                    </div>
                    <div className="auth-form-group password-input-group">
                        <label htmlFor="passwordInput" className="auth-label">Password <span className="forgot-password"><a href="/admin/forgot-password">Forgot Password?</a></span></label>
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
                    <div className="recaptcha-container">
                        <input type="checkbox" checked readOnly className="recaptcha-checkbox" /> I'm not a robot
                        <span className="recaptcha-label">reCAPTCHA</span>
                    </div>
                    <div className="keep-signed-in">
                        <input
                            type="checkbox"
                            id="keepSignedIn"
                            checked={keepSignedIn}
                            onChange={() => setKeepSignedIn(!keepSignedIn)}
                        />
                        <label htmlFor="keepSignedIn">Keep me signed in</label>
                    </div>
                    {error && <div className="auth-error">{error}</div>}
                    <button type="submit" className="auth-button">Login</button>
                    <div className="auth-divider"><span>or sign in with</span></div>
                    <button type="button" className="google-signin-btn">
                        Continue with Google
                    </button>
                </form>
                <div className="auth-links">
                    <a href="/admin/signup">Create an account</a>
                </div>
            </div>
        </div>
    );
}

export default AdminLogin;