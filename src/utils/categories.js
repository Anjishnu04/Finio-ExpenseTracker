export const EXPENSE_CATS = [
    { id: 'Food',         label: 'Food',        emoji: '🍔', color: '#f97316' },
    { id: 'Transport',    label: 'Transport',   emoji: '🚗', color: '#06b6d4' },
    { id: 'Shopping',     label: 'Shopping',    emoji: '🛍️', color: '#ec4899' },
    { id: 'Entertainment',label: 'Entertainment', emoji: '🎮', color: '#8b5cf6' },
    { id: 'Health',       label: 'Health',      emoji: '💊', color: '#10b981' },
    { id: 'Bills',        label: 'Bills',       emoji: '⚡', color: '#f59e0b' },
    { id: 'Housing',      label: 'Housing',     emoji: '🏠', color: '#6366f1' },
    { id: 'Education',    label: 'Education',   emoji: '📚', color: '#14b8a6' },
    { id: 'Subscriptions',label: 'Subscriptions', emoji: '📱', color: '#a855f7' },
    { id: 'Others',       label: 'Others',      emoji: '💸', color: '#64748b' },
];

export const INCOME_CATS = [
    { id: 'Income',       label: 'Income',      emoji: '💰', color: '#10b981' },
    { id: 'Salary',       label: 'Salary',      emoji: '💼', color: '#10b981' },
    { id: 'Freelance',    label: 'Freelance',   emoji: '💻', color: '#06b6d4' },
    { id: 'Investment',   label: 'Investment',  emoji: '📈', color: '#8b5cf6' },
    { id: 'Gift',         label: 'Gift',        emoji: '🎁', color: '#f43f5e' },
    { id: 'Rental',       label: 'Rental',      emoji: '🏘️', color: '#f59e0b' },
];

export const ALL_CATS = [...EXPENSE_CATS, ...INCOME_CATS];

export const getCat = id => ALL_CATS.find(c => c.id === id) || { label: id, emoji: '💳', color: '#64748b' };
