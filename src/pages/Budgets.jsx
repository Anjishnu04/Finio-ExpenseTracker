import { useState } from 'react';
import { EXPENSE_CATS } from '../utils/categories';
import { getMonthTx, calcSummary } from '../utils/calculations';
import { fmt } from '../utils/formatting';
import '../index.css';

export default function Budgets({ budgets, transactions, onAddBudget, onDeleteBudget }) {
  const [showBudgetModal, setShowBudgetModal] = useState(false);
  const [selectedCat, setSelectedCat] = useState('');
  const [budgetAmount, setBudgetAmount] = useState('');

  const currentMonth = new Date().getMonth();
  const currentYear = new Date().getFullYear();
  const monthTxs = getMonthTx(transactions, currentMonth, currentYear);
  
  // Calculate spent per category
  const categorySpent = {};
  monthTxs.filter(t => t.type === 'expense').forEach(t => {
    categorySpent[t.category] = (categorySpent[t.category] || 0) + t.amount;
  });

  const handleSaveBudget = () => {
    if (!selectedCat || !budgetAmount) return;
    onAddBudget({ category: selectedCat, limit: parseFloat(budgetAmount) });
    setSelectedCat('');
    setBudgetAmount('');
    setShowBudgetModal(false);
  };

  return (
    <>
      <div className="budgets-header">
        <div>
          <h2 className="chart-title">Monthly Budgets</h2>
          <p className="budgets-desc">Set spending limits for each category</p>
        </div>
        <button className="add-budget-btn" onClick={() => setShowBudgetModal(true)}>
          + Add Budget
        </button>
      </div>

      {budgets.length === 0 ? (
        <div className="empty-state">
          <div className="empty-icon">💰</div>
          <h4>No budgets yet</h4>
          <p>Create your first budget to track spending</p>
        </div>
      ) : (
        <div className="budgets-grid">
          {budgets.map(budget => {
            const spent = categorySpent[budget.category] || 0;
            const cat = EXPENSE_CATS.find(c => c.id === budget.category) || { label: budget.category, emoji: '💳', color: '#64748b' };
            const pct = Math.min((spent / budget.limit) * 100, 100);
            const status = spent > budget.limit ? 'over' : spent / budget.limit > 0.8 ? 'near' : 'ok';

            return (
              <div key={budget.category} className="budget-card">
                <div className="budget-card-header">
                  <div className="budget-cat">
                    <span>{cat.emoji}</span> {cat.label}
                  </div>
                  <button className="budget-del" onClick={() => onDeleteBudget(budget.category)}>✕</button>
                </div>
                <div className="budget-amounts">
                  <span className={`budget-spent ${status}`}>{fmt(spent)}</span>
                  <span className="budget-limit">{fmt(budget.limit)}</span>
                </div>
                <div className="budget-bar-track">
                  <div className={`budget-bar-fill ${status}`} style={{ width: pct + '%' }}></div>
                </div>
                <div className="budget-status">
                  {status === 'over' 
                    ? `${fmt(spent - budget.limit)} over budget`
                    : `${((budget.limit - spent) / budget.limit * 100).toFixed(0)}% remaining`
                  }
                </div>
              </div>
            );
          })}
        </div>
      )}

      {showBudgetModal && (
        <div className="modal show">
          <div className="modal-overlay" onClick={() => setShowBudgetModal(false)}></div>
          <div className="modal-box">
            <div className="modal-header">
              <h2 className="modal-title">Add Budget</h2>
              <button className="modal-close" onClick={() => setShowBudgetModal(false)}>✕</button>
            </div>

            <div className="form-group">
              <label className="form-label">Category</label>
              <select 
                className="form-input"
                value={selectedCat}
                onChange={(e) => setSelectedCat(e.target.value)}
              >
                <option value="">Select category...</option>
                {EXPENSE_CATS.map(cat => (
                  <option key={cat.id} value={cat.id}>{cat.emoji} {cat.label}</option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label className="form-label">Monthly Limit</label>
              <input
                type="number"
                className="form-input"
                value={budgetAmount}
                onChange={(e) => setBudgetAmount(e.target.value)}
                placeholder="Amount"
                min="0"
              />
            </div>

            <div className="form-actions">
              <button className="btn-cancel" onClick={() => setShowBudgetModal(false)}>Cancel</button>
              <button className="btn-save" onClick={handleSaveBudget}>Save Budget</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
