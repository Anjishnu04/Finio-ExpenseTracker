import BarChart from '../components/charts/BarChart';
import { getCat, EXPENSE_CATS } from '../utils/categories';
import { getMonthTx, calcSummary } from '../utils/calculations';
import { fmt } from '../utils/formatting';
import '../index.css';

export default function Reports({ transactions, viewYear }) {
  const yearExp = transactions.filter(t => new Date(t.date).getFullYear() === viewYear && t.type === 'expense');
  const yearInc = transactions.filter(t => new Date(t.date).getFullYear() === viewYear && t.type === 'income');

  // Category breakdown
  const catMap = {};
  yearExp.forEach(t => {
    catMap[t.category] = (catMap[t.category] || 0) + t.amount;
  });
  const sorted = Object.entries(catMap).sort((a, b) => b[1] - a[1]).slice(0, 8);
  const maxSpent = sorted[0]?.[1] || 100;

  return (
    <>
      <div className="charts-row">
        <div className="chart-card">
          <div className="chart-card-header">
            <div>
              <div className="chart-title">12-Month Overview</div>
              <div className="chart-sub">{viewYear} vs {viewYear - 1}</div>
            </div>
          </div>
          <BarChart 
            transactions={transactions}
            viewMonth={11}
            viewYear={viewYear}
            months={12}
          />
        </div>
      </div>

      <div className="reports-grid">
        <div className="section-card">
          <div className="chart-card-header">
            <div className="chart-title">Top Expenses</div>
          </div>
          {sorted.length === 0 ? (
            <div className="empty-state">
              <div className="empty-icon">📊</div>
              <h4>No expenses yet</h4>
            </div>
          ) : (
            <div>
              {sorted.map(([catId, spent]) => {
                const cat = getCat(catId);
                const pct = (spent / maxSpent) * 100;
                return (
                  <div key={catId} className="category-bar-item">
                    <div className="cat-bar-header">
                      <span className="cat-bar-name">{cat.emoji} {cat.label}</span>
                      <span className="cat-bar-amount">{fmt(spent)}</span>
                    </div>
                    <div className="cat-bar-track">
                      <div className="cat-bar-fill" style={{ width: pct + '%', background: cat.color }}></div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        <div className="section-card">
          <div className="chart-card-header">
            <div className="chart-title">Year Summary</div>
          </div>
          <div style={{ padding: '16px 0' }}>
            <div className="category-bar-item">
              <div className="cat-bar-header">
                <span className="cat-bar-name">💰 Total Income</span>
                <span className="cat-bar-amount" style={{ color: '#10b981' }}>
                  +{fmt(yearInc.reduce((s, t) => s + t.amount, 0))}
                </span>
              </div>
            </div>
            <div className="category-bar-item">
              <div className="cat-bar-header">
                <span className="cat-bar-name">💸 Total Expenses</span>
                <span className="cat-bar-amount" style={{ color: '#f43f5e' }}>
                  -{fmt(yearExp.reduce((s, t) => s + t.amount, 0))}
                </span>
              </div>
            </div>
            <div className="category-bar-item">
              <div className="cat-bar-header">
                <span className="cat-bar-name">📈 Net Savings</span>
                <span className="cat-bar-amount" style={{ 
                  color: yearInc.reduce((s, t) => s + t.amount, 0) - yearExp.reduce((s, t) => s + t.amount, 0) >= 0 ? '#10b981' : '#f43f5e'
                }}>
                  {fmt(yearInc.reduce((s, t) => s + t.amount, 0) - yearExp.reduce((s, t) => s + t.amount, 0))}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
