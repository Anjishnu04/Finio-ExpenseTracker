import { useState, useEffect } from 'react';
import DonutChart from '../components/charts/DonutChart';
import BarChart from '../components/charts/BarChart';
import { getMonthTx, calcSummary } from '../utils/calculations';
import { fmt, fmtDate } from '../utils/formatting';
import { getCat } from '../utils/categories';
import '../index.css';

export default function Dashboard({ transactions, viewMonth, viewYear }) {
  const txs = getMonthTx(transactions, viewMonth, viewYear);
  const { income, expense, balance, savingsRate } = calcSummary(txs);
  
  // Last month comparison
  let lm = viewMonth - 1, ly = viewYear;
  if (lm < 0) { lm = 11; ly--; }
  const lastTxs = getMonthTx(transactions, lm, ly);
  const { balance: lastBal } = calcSummary(lastTxs);

  const recent = [...transactions]
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    .slice(0, 8);

  const expenses = txs.filter(t => t.type === 'expense');

  return (
    <>
      <div className="summary-grid">
        <div className="summary-card balance-card">
          <div className="card-header">
            <span className="card-label">Net Balance</span>
            <div className="card-icon balance-icon">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M11.8 10.9c-2.27-.59-3-1.2-3-2.15 0-1.09 1.01-1.85 2.7-1.85 1.78 0 2.44.85 2.5 2.1h2.21c-.07-1.72-1.12-3.3-3.21-3.81V3h-3v2.16c-1.94.42-3.5 1.68-3.5 3.61 0 2.31 1.91 3.46 4.7 4.13 2.5.6 3 1.48 3 2.41 0 .69-.49 1.79-2.7 1.79-2.06 0-2.87-.92-2.98-2.1h-2.2c.12 2.19 1.76 3.42 3.68 3.83V21h3v-2.15c1.95-.37 3.5-1.5 3.5-3.55 0-2.84-2.43-3.81-4.7-4.4z"/></svg>
            </div>
          </div>
          <div className="card-amount">{fmt(balance)}</div>
          <div className="card-trend">
            {lastBal !== 0
              ? `${balance >= lastBal ? '▲' : '▼'} ${fmt(Math.abs(balance - lastBal))} vs last month`
              : 'No data last month'}
          </div>
        </div>

        <div className="summary-card income-card">
          <div className="card-header">
            <span className="card-label">Income</span>
            <div className="card-icon income-icon">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M16 6l2.29 2.29-4.88 4.88-4-4L2 16.59 3.41 18l6-6 4 4 6.3-6.29L22 12V6z"/></svg>
            </div>
          </div>
          <div className="card-amount">{fmt(income)}</div>
          <div className="card-trend income-trend">this month</div>
        </div>

        <div className="summary-card expense-card">
          <div className="card-header">
            <span className="card-label">Expenses</span>
            <div className="card-icon expense-icon">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M7 18c-1.1 0-1.99.9-1.99 2S5.9 22 7 22s2-.9 2-2-0.9-2-2-2zM1 2v2h2l3.6 7.59-1.35 2.45c-.16.28-.25.61-.25.96 0 1.1 0.9 2 2 2h12v-2H7.42c-.14 0-.25-.11-.25-.25l0.03-.12 0.9-1.63h7.45c0.75 0 1.41-.41 1.75-1.03l3.58-6.49c0.08-.14 0.12-.31 0.12-0.48 0-0.55-0.45-1-1-1H5.21l-0.94-2H1zm16 16c-1.1 0-1.99 0.9-1.99 2s0.89 2 1.99 2 2-0.9 2-2-0.9-2-2-2z"/></svg>
            </div>
          </div>
          <div className="card-amount">{fmt(expense)}</div>
          <div className="card-trend expense-trend">this month</div>
        </div>

        <div className="summary-card savings-card">
          <div className="card-header">
            <span className="card-label">Savings Rate</span>
            <div className="card-icon savings-icon">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/></svg>
            </div>
          </div>
          <div className="card-amount">{savingsRate.toFixed(1)}%</div>
          <div className="card-trend">of income saved</div>
        </div>
      </div>

      <div className="charts-row">
        <div className="chart-card">
          <div className="chart-card-header">
            <div>
              <div className="chart-title">Expenses</div>
              <div className="chart-sub">by category</div>
            </div>
          </div>
          <DonutChart expenses={expenses} />
          <div className="donut-legend">
            {(() => {
              const catMap = {};
              expenses.forEach(t => {
                catMap[t.category] = (catMap[t.category] || 0) + t.amount;
              });
              const total = Object.values(catMap).reduce((s, v) => s + v, 0);
              return Object.entries(catMap)
                .sort((a, b) => b[1] - a[1])
                .slice(0, 6)
                .map(([catId, val]) => {
                  const cat = getCat(catId);
                  const pct = ((val / total) * 100).toFixed(1);
                  return (
                    <div key={catId} className="legend-item">
                      <div className="legend-dot" style={{ background: cat.color }}></div>
                      <span>{cat.emoji} {cat.label} {pct}%</span>
                    </div>
                  );
                });
            })()}
          </div>
        </div>

        <div className="chart-card">
          <div className="chart-card-header">
            <div>
              <div className="chart-title">Income vs Expenses</div>
              <div className="chart-sub">last 6 months</div>
            </div>
          </div>
          <BarChart 
            transactions={transactions}
            viewMonth={viewMonth}
            viewYear={viewYear}
            months={6}
          />
        </div>
      </div>

      <div className="section-card">
        <div className="section-card-header">
          <div className="chart-title">Recent Transactions</div>
        </div>
        {recent.length === 0 ? (
          <div className="empty-state">
            <div className="empty-icon">📝</div>
            <h4>No transactions</h4>
            <p>Add your first transaction to get started</p>
          </div>
        ) : (
          <div>
            {recent.map(tx => {
              const cat = getCat(tx.category);
              return (
                <div key={tx.id} className="tx-item">
                  <div className="tx-cat-icon" style={{ background: cat.color + '20' }}>
                    {cat.emoji}
                  </div>
                  <div className="tx-info">
                    <div className="tx-name">{tx.description || cat.label}</div>
                    <div className="tx-detail">{fmtDate(tx.date)}</div>
                  </div>
                  <div className={`tx-amount ${tx.type}`}>
                    {tx.type === 'income' ? '+' : '-'}{fmt(tx.amount)}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </>
  );
}
