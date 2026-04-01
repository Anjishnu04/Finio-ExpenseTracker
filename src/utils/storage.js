// Sample transactions for initial load
const SAMPLE_TRANSACTIONS = [
  {
    id: 1,
    description: 'Salary',
    category: 'Income',
    amount: 50000,
    type: 'income',
    date: new Date(new Date().getFullYear(), new Date().getMonth(), 1).toISOString()
  },
  {
    id: 2,
    description: 'Rent Payment',
    category: 'Bills',
    amount: 15000,
    type: 'expense',
    date: new Date(new Date().getFullYear(), new Date().getMonth(), 5).toISOString()
  },
  {
    id: 3,
    description: 'Grocery Shopping',
    category: 'Food',
    amount: 1200,
    type: 'expense',
    date: new Date(new Date().getFullYear(), new Date().getMonth(), 3).toISOString()
  },
  {
    id: 4,
    description: 'Movie & Entertainment',
    category: 'Entertainment',
    amount: 2500,
    type: 'expense',
    date: new Date(new Date().getFullYear(), new Date().getMonth(), 8).toISOString()
  },
  {
    id: 5,
    description: 'Shopping',
    category: 'Shopping',
    amount: 3000,
    type: 'expense',
    date: new Date(new Date().getFullYear(), new Date().getMonth(), 10).toISOString()
  },
  {
    id: 6,
    description: 'Internet Bill',
    category: 'Bills',
    amount: 1500,
    type: 'expense',
    date: new Date(new Date().getFullYear(), new Date().getMonth(), 2).toISOString()
  },
  {
    id: 7,
    description: 'Freelance Project',
    category: 'Income',
    amount: 5000,
    type: 'income',
    date: new Date(new Date().getFullYear(), new Date().getMonth(), 15).toISOString()
  },
  {
    id: 8,
    description: 'Gym Membership',
    category: 'Health',
    amount: 800,
    type: 'expense',
    date: new Date(new Date().getFullYear(), new Date().getMonth(), 7).toISOString()
  },
  {
    id: 9,
    description: 'Restaurant',
    category: 'Food',
    amount: 2200,
    type: 'expense',
    date: new Date(new Date().getFullYear(), new Date().getMonth(), 12).toISOString()
  },
  {
    id: 10,
    description: 'Gas',
    category: 'Transport',
    amount: 1500,
    type: 'expense',
    date: new Date(new Date().getFullYear(), new Date().getMonth(), 6).toISOString()
  },
  {
    id: 11,
    description: 'Office Supplies',
    category: 'Shopping',
    amount: 450,
    type: 'expense',
    date: new Date(new Date().getFullYear(), new Date().getMonth(), 4).toISOString()
  }
];

const SAMPLE_BUDGETS = [
  { category: 'Food', limit: 5000 },
  { category: 'Transport', limit: 5000 },
  { category: 'Entertainment', limit: 5000 },
  { category: 'Shopping', limit: 10000 },
  { category: 'Bills', limit: 25000 },
  { category: 'Health', limit: 3000 }
];

// Load transactions from localStorage
export const loadTransactions = () => {
  try {
    const stored = localStorage.getItem('fn_tx');
    
    if (!stored) {
      // Initialize with sample data on first load
      localStorage.setItem('fn_tx', JSON.stringify(SAMPLE_TRANSACTIONS));
      return SAMPLE_TRANSACTIONS;
    }
    
    const parsed = JSON.parse(stored);
    
    // Ensure it's an array and has data
    if (!Array.isArray(parsed) || parsed.length === 0) {
      localStorage.setItem('fn_tx', JSON.stringify(SAMPLE_TRANSACTIONS));
      return SAMPLE_TRANSACTIONS;
    }
    
    return parsed;
  } catch (error) {
    console.error('Error loading transactions:', error);
    localStorage.setItem('fn_tx', JSON.stringify(SAMPLE_TRANSACTIONS));
    return SAMPLE_TRANSACTIONS;
  }
};

// Load budgets from localStorage
export const loadBudgets = () => {
  try {
    const stored = localStorage.getItem('fn_bud');
    
    if (!stored) {
      // Initialize with sample budgets on first load
      localStorage.setItem('fn_bud', JSON.stringify(SAMPLE_BUDGETS));
      return SAMPLE_BUDGETS;
    }
    
    const parsed = JSON.parse(stored);
    
    // Ensure it's an array and has data
    if (!Array.isArray(parsed) || parsed.length === 0) {
      localStorage.setItem('fn_bud', JSON.stringify(SAMPLE_BUDGETS));
      return SAMPLE_BUDGETS;
    }
    
    return parsed;
  } catch (error) {
    console.error('Error loading budgets:', error);
    localStorage.setItem('fn_bud', JSON.stringify(SAMPLE_BUDGETS));
    return SAMPLE_BUDGETS;
  }
};

// Save transactions to localStorage
export const saveTransactions = (transactions) => {
  localStorage.setItem('fn_tx', JSON.stringify(transactions));
};

// Save budgets to localStorage
export const saveBudgets = (budgets) => {
  localStorage.setItem('fn_bud', JSON.stringify(budgets));
};
