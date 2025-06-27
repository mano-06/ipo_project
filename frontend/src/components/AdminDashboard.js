import AdminSidebar from './AdminSidebar';
import '../App.css';
import nse from '../nse.webp';
import bse from '../bse.jpg';
import sebi from '../sebi.avif';
import moneycontrol from '../moneycontrol.jpeg';

function AdminDashboard() {
  return (
    <div className="dashboard-root">
      <AdminSidebar />
      <main className="dashboard-main-content">
        <h1 className="main-title">Dashboard</h1>
        <div className="dashboard-widgets-grid">
          {/* IPO Dashboard Widget */}
          <section className="dashboard-widget">
            <h3 className="widget-title">IPO Dashboard India</h3>
            <p className="widget-subtitle gain">↑ 20 IPO in Gain</p>
            <div className="widget-content circle-container">
              <div className="stat-circle loss">
                <span className="circle-value">10</span>
                <span className="circle-label">IPO in Loss</span>
              </div>
              <div className="stat-circle total">
                <span className="circle-value">30</span>
                <span className="circle-label">Total IPO</span>
              </div>
              <div className="stat-circle gain">
                <span className="circle-value">20</span>
                <span className="circle-label">IPO in Gain</span>
              </div>
            </div>
          </section>

          {/* Quick Links Widget */}
          <section className="dashboard-widget">
            <h3 className="widget-title">Quick Links</h3>
            <p className="widget-subtitle">Adipiscing elit, sed do eiusmod tempor</p>
            <ul className="quick-links-list">
              <li className="quick-link-item">
                <img src={nse} className='quick-link-icon' alt='NSE'/>
                <span className="quick-link-label">NSE India</span>
                <a href="https://www.nseindia.com/" className="quick-link-action">Visit Now</a>
              </li>
              <li className="quick-link-item">
                <img src={bse} className='quick-link-icon' alt='BSE'/>
                <span className="quick-link-label">BSE India</span>
                <a href="https://www.bseindia.com/" className="quick-link-action">Visit Now</a>
              </li>
              <li className="quick-link-item">
                <img src={sebi} className='quick-link-icon' alt='SEBI'/>
                <span className="quick-link-label">SEBI</span>
                <a href="https://www.sebi.gov.in/" className="quick-link-action">Visit Now</a>
              </li>
              <li className="quick-link-item">
                <img src={moneycontrol} className='quick-link-icon' alt='MoneyControl'/>
                <span className="quick-link-label">Money Control</span>
                <a href="https://www.moneycontrol.com/" className="quick-link-action">Visit Now</a>
              </li>
            </ul>
          </section>

          {/* Main Board IPO Widget */}
          <section className="dashboard-widget">
            <div className="widget-header">
              <div>
                <h3 className="widget-title">Main Board IPO</h3>
                <p className="widget-subtitle">From 01 Jan 2024</p>
              </div>
              <a href="#" className="view-report-btn">View Report</a>
            </div>
            <div className="widget-legend">
              <div className="legend-item"><span className="legend-dot dot-1"></span>Upcoming <span className="legend-value">15</span></div>
              <div className="legend-item"><span className="legend-dot dot-2"></span>New Listed <span className="legend-value">25</span></div>
              <div className="legend-item"><span className="legend-dot dot-3"></span>Ongoing <span className="legend-value">2</span></div>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}

export default AdminDashboard;