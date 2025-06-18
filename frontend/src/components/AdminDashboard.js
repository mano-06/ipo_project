import React from 'react';
import '../App.css'; // Assuming shared CSS for now

function AdminDashboard() {
    return (
        <div className="admin-dashboard-container">
            <h2 className="admin-dashboard-title">Admin Dashboard</h2>
            <div className="admin-dashboard-grid">
                <div className="admin-dashboard-card">
                    <div className="admin-dashboard-card-content">
                        <h5 className="admin-dashboard-card-title">Total IPOs</h5>
                        <p className="admin-dashboard-card-value">XX</p>
                    </div>
                </div>
                <div className="admin-dashboard-card">
                    <div className="admin-dashboard-card-content">
                        <h5 className="admin-dashboard-card-title">Upcoming IPOs</h5>
                        <p className="admin-dashboard-card-value">YY</p>
                    </div>
                </div>
                <div className="admin-dashboard-card">
                    <div className="admin-dashboard-card-content">
                        <h5 className="admin-dashboard-card-title">Listed IPOs</h5>
                        <p className="admin-dashboard-card-value">ZZ</p>
                    </div>
                </div>
            </div>

            <h3 className="admin-dashboard-section-title">Quick Actions</h3>
            <div className="admin-dashboard-actions">
                <a href="/admin/ipos/upcoming" className="admin-dashboard-button primary">View Upcoming IPOs</a>
                <a href="/admin/ipo/register" className="admin-dashboard-button success">Register New IPO</a>
            </div>

            {/* More sections as per Component #2 design, e.g., recent activities, charts */}
        </div>
    );
}

export default AdminDashboard;