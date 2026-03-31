import { useState, useEffect } from 'react';
import { EXPENSE_CATS, INCOME_CATS } from '../../utils/categories';
import { today } from '../../utils/formatting';
import '../../index.css';

export default function TransactionModal({ isOpen, onClose, onSave, editingTransaction }) {
  const [txType, setTxType] = useState(editingTransaction?.type || 'expense');
  const [category, setCategory] = useState(editingTransaction?.category || '');
  const [amount, setAmount] = useState(editingTransaction?.amount.toString() || '');
  const [description, setDescription] = useState(editingTransaction?.description || '');
  const [date, setDate] = useState(editingTransaction?.date || today());

  useEffect(() => {
    if (editingTransaction) {
      setTxType(editingTransaction.type);
      setCategory(editingTransaction.category);
      setAmount(editingTransaction.amount.toString());
      setDescription(editingTransaction.description);
      setDate(editingTransaction.date);
    } else {
      setTxType('expense');
      setCategory('');
      setAmount('');
      setDescription('');
      setDate(today());
    }
  }, [editingTransaction, isOpen]);

  const cats = txType === 'expense' ? EXPENSE_CATS : INCOME_CATS;

  const handleSave = () => {
    if (!category || !amount) return;
    onSave({
      type: txType,
      category,
      amount: parseFloat(amount),
      description,
      date
    });
  };

  return (
    <div className={`modal ${isOpen ? 'show' : ''}`}>
      <div className="modal-overlay" onClick={onClose}></div>
      <div className="modal-box">
        <div className="modal-header">
          <h2 className="modal-title">{editingTransaction ? 'Edit' : 'Add'} Transaction</h2>
          <button className="modal-close" onClick={onClose}>✕</button>
        </div>

        <div className="type-toggle">
          <button 
            className={`type-btn ${txType === 'expense' ? 'active' : ''}`}
            onClick={() => { setTxType('expense'); setCategory(''); }}
          >
            Expense
          </button>
          <button 
            className={`type-btn ${txType === 'income' ? 'active' : ''}`}
            onClick={() => { setTxType('income'); setCategory(''); }}
          >
            Income
          </button>
        </div>

        <div className="form-group">
          <label className="form-label">Category</label>
          <div className="category-grid">
            {cats.map(cat => (
              <button
                key={cat.id}
                className={`cat-btn ${category === cat.id ? 'selected' : ''}`}
                onClick={() => setCategory(cat.id)}
              >
                <span className="cat-emoji">{cat.emoji}</span>
                <span>{cat.label}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label className="form-label">Amount</label>
            <input
              type="number"
              className="form-input"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="0"
              min="0"
            />
          </div>
          <div className="form-group">
            <label className="form-label">Date</label>
            <input
              type="date"
              className="form-input"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
          </div>
        </div>

        <div className="form-group">
          <label className="form-label">Description</label>
          <input
            type="text"
            className="form-input"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Optional description"
          />
        </div>

        <div className="form-actions">
          <button className="btn-cancel" onClick={onClose}>Cancel</button>
          <button className="btn-save" onClick={handleSave}>Save</button>
        </div>
      </div>
    </div>
  );
}
