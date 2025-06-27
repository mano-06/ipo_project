function IPOCard({ ipo }) {
    return (
        <div className="card">
            <div className="ipo-card">
                <div class="company-header">
                    <img src={ipo.logo} alt={`${ipo.company_name} Logo`} className='company-logo'/>
                    <h3 class="company-name">{ ipo.company_name }</h3>
                </div>
                <div class="ipo-details">
                    <div class="detail-item">
                        <span class="detail-label">Price Band</span>
                        <span class="detail-value price-band">{ipo.price_band }</span>
                    </div>
                    <div class="detail-item">
                        <span class="detail-label">Issue Size</span>
                        <span class="detail-value">{ ipo.issue_size }</span>
                    </div>
                    <div class="detail-item">
                        <span class="detail-label">Opening Date</span>
                        <span class="detail-value">{ ipo.open_date }</span>
                    </div>
                    <div class="detail-item">
                        <span class="detail-label">Closing Date</span>
                        <span class="detail-value">{ ipo.close_date }</span>
                    </div>
                    <div class="detail-item">
                        <span class="detail-label">Issue Type</span>
                        <span class="detail-value">{ ipo.issue_type }</span>
                    </div>
                    <div class="detail-item">
                        <span class="detail-label">Status</span>
                        <span class="detail-value">{ ipo.status }</span>
                    </div>
                </div>

                <div className="pdf-download">
                    <a href={ipo.rhp_pdf} target="_blank" rel="noopener noreferrer" className="rhp-button">RHP</a>
                    <a href={ipo.drhp_pdf} target="_blank" rel="noopener noreferrer" className="drhp-button">DRHP</a>
                </div>
            </div>
        </div>
    );
}

export default IPOCard;