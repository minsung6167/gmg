import './FilterSummary.css'

function FilterSummary({ filters, onClick }) {
    return (
        <div className="filter-summary" onClick={onClick}>
            <div className="filter-summary-icon-box">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                    <line x1="4" y1="7" x2="20" y2="7" stroke="#fff" strokeWidth="2" />
                    <circle cx="9" cy="7" r="2.5" fill="#fff" />
                    <line x1="4" y1="17" x2="20" y2="17" stroke="#fff" strokeWidth="2" />
                    <circle cx="15" cy="17" r="2.5" fill="#fff" />
                </svg>
            </div>

            <div className="filter-summary-content">
                <div className="filter-summary-top">
                    <div className="filter-summary-text">
                        <span className="filter-summary-title">여행 조건</span>
                        <span className="filter-summary-date">{filters.startDate} ~ {filters.endDate}</span>
                    </div>
                    <span className="filter-summary-arrow">›</span>
                </div>

                <div className="filter-summary-chips">
                    <span className="filter-chip">{filters.headcount}명</span>
                    {filters.companionType && <span className="filter-chip">{filters.companionType}</span>}
                    {filters.theme && <span className="filter-chip">{filters.theme}</span>}
                    <span className="filter-chip">{filters.hasCar ? '자차' : '대중교통'}</span>
                </div>
            </div>
        </div>
    )
}

export default FilterSummary
