import { Link } from 'react-router-dom';
import bluestockLogo from '../bluestock_logo.png'; // Assuming you'll add bluestock_logo.png in src
import startupIndiaLogo from '../startup_india.png'; // Assuming you'll add startup_india.png in src

function Footer() {
    return (
        <footer>
            <div className="container footer-container">
                <div className="footer-links">
                    <div className="footer-section">
                        <h4>Resources</h4>
                        <ul>
                            <li><Link to="/">Trading View</Link></li>
                            <li><Link to="/">NSE Holidays</Link></li>
                            <li><Link to="/">e-Voting CDSL</Link></li>
                            <li><Link to="/">e-Voting NSDL</Link></li>
                            <li><Link to="/">Market Timings</Link></li>
                        </ul>
                    </div>
                    <div className="footer-section">
                        <h4>Company</h4>
                        <ul>
                            <li><Link to="/">Careers</Link></li>
                            <li><Link to="/">Contact Us</Link></li>
                            <li><Link to="/">About Us</Link></li>
                            <li><Link to="/">Community</Link></li>
                            <li><Link to="/">Blogs</Link></li>
                        </ul>
                    </div>
                    <div className="footer-section">
                        <h4>Offerings</h4>
                        <ul>
                            <li><Link to="/">Compare Broker</Link></li>
                            <li><Link to="/">Fin Calculators</Link></li>
                            <li><Link to="/">IPO</Link></li>
                            <li><Link to="/">All Brokers</Link></li>
                            <li><Link to="/">Products</Link></li>
                        </ul>
                    </div>
                    <div className="footer-section">
                        <h4>Links</h4>
                        <ul>
                            <li><Link to="/">Shark Investor</Link></li>
                            <li><Link to="/">Mutual Funds</Link></li>
                            <li><Link to="/">Sitemap</Link></li>
                            <li><Link to="/">Indian Indices</Link></li>
                            <li><Link to="/">Bug Bounty Program</Link></li>
                        </ul>
                    </div>
                    <div className="footer-section">
                        <h4>Policy</h4>
                        <ul>
                            <li><Link to="/">Terms & Conditions</Link></li>
                            <li><Link to="/">Privacy Policy</Link></li>
                            <li><Link to="/">Refund Policy</Link></li>
                            <li><Link to="/">Disclaimer</Link></li>
                            <li><Link to="/">Trust & Security</Link></li>
                        </ul>
                    </div>
                </div>
                <div className="footer-bottom">
                    <div className="footer-left">
                        <div className="social-icons">
                            <a href="/"><i className="fa-brands fa-x-twitter"></i></a>
                            <a href="/"><i className="fa-brands fa-facebook"></i></a>
                            <a href="/"><i className="fa-brands fa-youtube"></i></a>
                            <a href="/"><i className="fa-brands fa-linkedin"></i></a>
                            <a href="/"><i className="fa-brands fa-instagram"></i></a>
                            <a href="/"><i className="fa-brands fa-telegram"></i></a>
                        </div>
                        <div className="bluestock-info">
                            <img src={bluestockLogo} alt="Bluestock Logo" className="bluestock-footer-logo" />
                            <p>Bluestock Fintech</p>
                            <p>Pune, Maharashtra</p>
                            <p>MSME Registration No:</p>
                            <p>UDYAM-MH-01-v038001</p>
                        </div>
                        <img src={startupIndiaLogo} alt="#startupindia" className="startup-india-logo" />
                    </div>
                    <div className="footer-right">
                        <p className="disclaimer-text">Investment in securities markets are subject to market risks, read all the related documents carefully before investing as prescribed by SEBI. Issued in the interest of the investors.</p>
                        <p className="contact-text">The users can write to <a href="mailto:hello@bluestock.in">hello@bluestock.in</a> for any app, website related queries. Also you can send IT / Tech related feedback to <a href="mailto:cto@bluestock.in">cto@bluestock.in</a></p>
                        <p className="disclaimer-text">Disclaimer: We are not a SEBI registered research analyst company. We do not provide any kind of stock recommendations, buy/ sell stock tips, or investment and trading advice. All the stock scripts shown in the Bluestock app, website, all social media handles are for educational purposes only. Before making any investment in the financial market, it is advisable to consult with your financial advisor. Remember that stock markets are subject to market risks.</p>
                    </div>
                </div>
                <div className="footer-credits">
                    <p>Bluestock Fintech All Rights Reserved.</p>
                    <p>Made with ❤️ in Pune, Maharashtra</p>
                </div>
            </div>
        </footer>
    );
}

export default Footer;