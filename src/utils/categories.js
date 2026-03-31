export const EXPENSE_CATS = [
    { id: 'food',         label: 'Food',        emoji: '🍔', color: '#f97316' },
    { id: 'transport',    label: 'Transport',   emoji: '🚗', color: '#06b6d4' },
    { id: 'shopping',     label: 'Shopping',    emoji: '🛍️', color: '#ec4899' },
    { id: 'entertainment',label: 'Fun',         emoji: '🎮', color: '#8b5cf6' },
    { id: 'health',       label: 'Health',      emoji: '💊', color: '#10b981' },
    { id: 'bills',        label: 'Bills',       emoji: '⚡', color: '#f59e0b' },
    { id: 'housing',      label: 'Housing',     emoji: '🏠', color: '#6366f1' },
    { id: 'education',    label: 'Education',   emoji: '📚', color: '#14b8a6' },
    { id: 'subscriptions',label: 'Subs',        emoji: '📱', color: '#a855f7' },
    { id: 'others',       label: 'Others',      emoji: '💸', color: '#64748b' },
];

export const INCOME_CATS = [
    { id: 'salary',       label: 'Salary',      emoji: '💼', color: '#10b981' },
    { id: 'freelance',    label: 'Freelance',   emoji: '💻', color: '#06b6d4' },
    { id: 'investment',   label: 'Investment',  emoji: '📈', color: '#8b5cf6' },
    { id: 'gift',         label: 'Gift',        emoji: '🎁', color: '#f43f5e' },
    { id: 'rental',       label: 'Rental',      emoji: '🏘️', color: '#f59e0b' },
    { id: 'other_income', label: 'Others',      emoji: '💰', color: '#64748b' },
];

export const ALL_CATS = [...EXPENSE_CATS, ...INCOME_CATS];

export const getCat = id => ALL_CATS.find(c => c.id === id) || { label: id, emoji: '💳', color: '#64748b' };
