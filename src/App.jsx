import { useState, useEffect } from 'react';
import './index.css';
import Sidebar from './components/Sidebar';
import Dashboard from './pages/Dashboard';
import Transactions from './pages/Transactions';
import Budgets from './pages/Budgets';
import Reports from './pages/Reports';
import TransactionModal from './components/modals/TransactionModal';
import Toast from './components/Toast';
import { loadTransactions, loadBudgets, saveTransactions, saveBudgets } from './utils/storage';

const Aurora = () => (
  <div className="aurora" aria-hidden="true">
    <div className="blob b1" style={{ animationDuration: '20s' }}></div>
    <div className="blob b2" style={{ animationDuration: '26s' }}></div>
    <div className="blob b3" style={{ animationDuration: '32s' }}></div>
  </div>
);

export default function App() {
  const [currentPage, setCurrentPage] = useState('dashboard');
  const [transactions, setTransactions] = useState(() => loadTransactions());
  const [budgets, setBudgets] = useState(() => loadBudgets());
  const [viewMonth, setViewMonth] = useState(new Date().getMonth());
  const [viewYear, setViewYear] = useState(new Date().getFullYear());
  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [toast, setToast] = useState(null);

  // Save to localStorage when transactions or budgets change
  useEffect(() => saveTransactions(transactions), [transactions]);
  useEffect(() => saveBudgets(budgets), [budgets]);

  const showToast = (msg, type = '') => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 2500);
  };

  const handleAddTransaction = (tx) => {
    if (editingId) {
      setTransactions(t => t.map(item => item.id === editingId ? { ...tx, id: editingId } : item));
      setEditingId(null);
      showToast('Transaction updated!', 'success');
    } else {
      setTransactions(t => [...t, { ...tx, id: Date.now().toString(36) + Math.random().toString(36).slice(2) }]);
      showToast('Transaction added!', 'success');
    }
    setShowModal(false);
  };

  const handleDeleteTransaction = (id) => {
    setTransactions(t => t.filter(tx => tx.id !== id));
    showToast('Transaction deleted!');
  };

  const handleEditTransaction = (id) => {
    setEditingId(id);
    setShowModal(true);
  };

  const handleAddBudget = (budget) => {
    setBudgets(b => {
      const existing = b.findIndex(x => x.category === budget.category);
      if (existing >= 0) {
        const updated = [...b];
        updated[existing] = budget;
        return updated;
      }
      return [...b, budget];
    });
    showToast('Budget saved!', 'success');
  };

  const handleDeleteBudget = (category) => {
    setBudgets(b => b.filter(x => x.category !== category));
    showToast('Budget deleted!');
  };

  const PAGE_META = {
    dashboard: { title: 'Dashboard', sub: 'Your financial overview' },
    transactions: { title: 'Transactions', sub: 'History & records' },
    budgets: { title: 'Budgets', sub: 'Spending limits by category' },
    reports: { title: 'Reports', sub: 'Trends & analytics' }
  };

  const meta = PAGE_META[currentPage];

  return (
    <>
      <Aurora />
      <div className="app-container">
        <Sidebar 
          currentPage={currentPage} 
          onPageChange={setCurrentPage}
          viewMonth={viewMonth}
          viewYear={viewYear}
          onMonthChange={(m, y) => {
            setViewMonth(m);
            setViewYear(y);
          }}
        />
        <div className="main-container">
          <header className="topbar">
            <div className="topbar-left">
              <h1 className="page-title">{meta.title}</h1>
              <span className="page-sub">{meta.sub}</span>
            </div>
            <button className="add-btn" onClick={() => {
              setEditingId(null);
              setShowModal(true);
            }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"/></svg>
              Add Transaction
            </button>
          </header>

          <div className="content">
            {currentPage === 'dashboard' && (
              <Dashboard 
                transactions={transactions}
                viewMonth={viewMonth}
                viewYear={viewYear}
              />
            )}
            {currentPage === 'transactions' && (
              <Transactions 
                transactions={transactions}
                onDelete={handleDeleteTransaction}
                onEdit={handleEditTransaction}
              />
            )}
            {currentPage === 'budgets' && (
              <Budgets 
                budgets={budgets}
                transactions={transactions}
                onAddBudget={handleAddBudget}
                onDeleteBudget={handleDeleteBudget}
              />
            )}
            {currentPage === 'reports' && (
              <Reports 
                transactions={transactions}
                viewYear={viewYear}
              />
            )}
          </div>
        </div>
      </div>

      <TransactionModal 
        isOpen={showModal}
        onClose={() => {
          setShowModal(false);
          setEditingId(null);
        }}
        onSave={handleAddTransaction}
        editingTransaction={editingId ? transactions.find(t => t.id === editingId) : null}
      />

      {toast && <Toast message={toast.msg} type={toast.type} />}
    </>
  );
}
