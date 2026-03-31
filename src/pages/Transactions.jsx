import { useState, useMemo } from 'react';
import { getCat } from '../utils/categories';
import { fmtDate, fmtDateGroup } from '../utils/formatting';
import { groupByDate } from '../utils/calculations';
import '../index.css';

export default function Transactions({ transactions, onDelete, onEdit }) {
  const [searchQ, setSearchQ] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [filterCat, setFilterCat] = useState('all');

  const categories = useMemo(() => {
    return [...new Set(transactions.map(t => t.category))];
  }, [transactions]);

  const filtered = useMemo(() => {
    return transactions.filter(t => {
      if (filterType !== 'all' && t.type !== filterType) return false;
      if (filterCat !== 'all' && t.category !== filterCat) return false;
      if (searchQ && !t.description?.toLowerCase().includes(searchQ.toLowerCase())) return false;
      return true;
    });
  }, [transactions, filterType, filterCat, searchQ]);

  const grouped = groupByDate(filtered);

  return (
    <>
      <div className="tx-controls">
        <div className="search-wrap">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor"><circle cx="11" cy="11" r="8"></circle><path d="m21 21-4.35-4.35"></path></svg>
          <input
            type="text"
            placeholder="Search transactions..."
            value={searchQ}
            onChange={(e) => setSearchQ(e.target.value)}
          />
        </div>
        <div className="filter-group">
          <select 
            className="filter-select"
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
          >
            <option value="all">All Types</option>
            <option value="expense">Expenses</option>
            <option value="income">Income</option>
          </select>
          <select 
            className="filter-select"
            value={filterCat}
            onChange={(e) => setFilterCat(e.target.value)}
          >
            <option value="all">All Categories</option>
            {categories.map(cat => {
              const c = getCat(cat);
              return <option key={cat} value={cat}>{c.emoji} {c.label}</option>;
            })}
          </select>
        </div>
      </div>

      <div className="section-card">
        {grouped.length === 0 ? (
          <div className="empty-state">
            <div className="empty-icon">📭</div>
            <h4>No transactions found</h4>
            <p>Try adjusting your filters or add a new transaction</p>
          </div>
        ) : (
          <div className="tx-list-full">
            {grouped.map(({ date, items }) => (
              <div key={date} className="tx-date-group">
                <div className="tx-date-label">{fmtDateGroup(date)}</div>
                {items.map(tx => {
                  const cat = getCat(tx.category);
                  return (
                    <div key={tx.id} className="tx-item">
                      <div className="tx-cat-icon" style={{ background: cat.color + '20' }}>
                        {cat.emoji}
                      </div>
                      <div className="tx-info">
                        <div className="tx-name">{tx.description || cat.label}</div>
                        <div className="tx-detail">{cat.label}</div>
                      </div>
                      <div className={`tx-amount ${tx.type}`}>
                        {tx.type === 'income' ? '+' : '-'}₹{Math.abs(tx.amount).toLocaleString('en-IN')}
                      </div>
                      <div className="tx-actions">
                        <button className="tx-action-btn" onClick={() => onEdit(tx.id)}>✏️</button>
                        <button className="tx-action-btn tx-del-btn" onClick={() => onDelete(tx.id)}>🗑️</button>
                      </div>
                    </div>
                  );
                })}
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
}
