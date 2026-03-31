import { getCat } from '../utils/categories';
import '../index.css';

const PAGE_ICONS = {
  dashboard: <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M3 13h8V3H3v10zm0 8h8v-6H3v6zm10 0h8V11h-8v10zm0-18v6h8V3h-8z"/></svg>,
  transactions: <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M20 4H4c-1.11 0-2 .89-2 2v12c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V6c0-1.11-.89-2-2-2zm0 14H4v-6h16v6zm0-10H4V6h16v2z"/></svg>,
  budgets: <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-7 3c1.93 0 3.5 1.57 3.5 3.5S13.93 13 12 13s-3.5-1.57-3.5-3.5S10.07 6 12 6zm7 13H5v-.23c0-.62.28-1.2.76-1.58C7.47 15.82 9.64 15 12 15s4.53.82 6.24 2.19c.48.38.76.97.76 1.58V19z"/></svg>,
  reports: <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M3.5 18.49l6-6.01 4 4L22 6.92l-1.41-1.41-7.09 7.97-4-4L2 16.99z"/></svg>
};

export default function Sidebar({ currentPage, onPageChange, viewMonth, viewYear, onMonthChange }) {
  const pages = ['dashboard', 'transactions', 'budgets', 'reports'];
  
  const monthLabel = new Date(viewYear, viewMonth).toLocaleDateString('en-IN', { 
    month: 'long', 
    year: 'numeric' 
  });

  const handlePrevMonth = () => {
    let m = viewMonth - 1;
    let y = viewYear;
    if (m < 0) { m = 11; y--; }
    onMonthChange(m, y);
  };

  const handleNextMonth = () => {
    let m = viewMonth + 1;
    let y = viewYear;
    if (m > 11) { m = 0; y++; }
    onMonthChange(m, y);
  };

  return (
    <aside className="sidebar">
      <div className="brand">
        <div className="brand-icon">
          <svg width="40" height="40" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <linearGradient id="logoGradient2" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" style={{stopColor: '#a855f7', stopOpacity: 1}} />
                <stop offset="50%" style={{stopColor: '#7c3aed', stopOpacity: 1}} />
                <stop offset="100%" style={{stopColor: '#3b82f6', stopOpacity: 1}} />
              </linearGradient>
              <filter id="logoGlow2">
                <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
                <feMerge>
                  <feMergeNode in="coloredBlur"/>
                  <feMergeNode in="SourceGraphic"/>
                </feMerge>
              </filter>
            </defs>
            
            {/* Background rounded square */}
            <rect
              x="6"
              y="6"
              width="52"
              height="52"
              rx="12"
              fill="url(#logoGradient2)"
              filter="url(#logoGlow2)"
            />
            
            {/* Wallet shape */}
            <g transform="translate(32, 32)">
              {/* Main wallet body */}
              <rect
                x="-16"
                y="-10"
                width="32"
                height="20"
                rx="3"
                fill="white"
                opacity="0.95"
              />
              {/* Card slot */}
              <rect
                x="-14"
                y="-6"
                width="24"
                height="4"
                rx="1"
                fill="url(#logoGradient2)"
              />
              {/* Money symbol */}
              <text
                x="0"
                y="8"
                fill="url(#logoGradient2)"
                fontSize="16"
                fontWeight="bold"
                textAnchor="middle"
                dominantBaseline="middle"
              >
                $
              </text>
            </g>
          </svg>
        </div>
        <div>
          <span className="brand-name">Finio</span>
          <span className="brand-subtitle">Expense Tracking</span>
        </div>
      </div>

      <nav className="sidebar-nav">
        {pages.map(page => (
          <button
            key={page}
            className={`nav-link ${currentPage === page ? 'active' : ''}`}
            onClick={() => onPageChange(page)}
          >
            {PAGE_ICONS[page]}
            <span>{page.charAt(0).toUpperCase() + page.slice(1)}</span>
          </button>
        ))}
      </nav>

      <div className="sidebar-footer">
        <div className="month-picker">
          <button className="month-btn" onClick={handlePrevMonth}>‹</button>
          <span className="month-label">{monthLabel}</span>
          <button className="month-btn" onClick={handleNextMonth}>›</button>
        </div>
      </div>
    </aside>
  );
}
