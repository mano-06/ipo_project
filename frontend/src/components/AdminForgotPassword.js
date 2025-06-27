import { useState } from 'react';
import '../App.css'; // Assuming shared CSS for now

function AdminForgotPassword() {
    const [email, setEmail] = useState('');
    const [error, setError] = useState(null);
    const [message, setMessage] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        setMessage(null);
        // TODO: Implement actual forgot password logic with Django API
        console.log('Forgot password attempt for:', { email });
        try {
            const response = await fetch('/api/admin/forgot-password/', { // Assuming a forgot password API endpoint
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.detail || 'Failed to send reset link');
            }

            setMessage('Password reset link sent to your email.');
        } catch (err) {
            setError(err.message);
        }
    };

    return (
        <div className="auth-container">
            <div className="auth-card">
                <h2 className="auth-title">Forgot Password</h2>
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
                    {error && <div className="auth-error">{error}</div>}
                    {message && <div className="auth-success">{message}</div>}
                    <button type="submit" className="auth-button">Send Reset Link</button>
                </form>
                <div className="auth-links">
                    <p><a href="/admin/login">Back to Login</a></p>
                </div>
            </div>
        </div>
    );
}

export default AdminForgotPassword; 