export const getMonthTx = (transactions, month, year) => {
    return transactions.filter(t => {
        const d = new Date(t.date);
        return d.getMonth() === month && d.getFullYear() === year;
    });
};

export const calcSummary = txs => {
    const income = txs.filter(t => t.type === 'income').reduce((s, t) => s + t.amount, 0);
    const expense = txs.filter(t => t.type === 'expense').reduce((s, t) => s + t.amount, 0);
    return { 
        income, 
        expense, 
        balance: income - expense, 
        savingsRate: income > 0 ? ((income - expense) / income * 100) : 0 
    };
};

export const groupByDate = txs => {
    const grouped = {};
    txs.forEach(t => {
        const d = new Date(t.date).toISOString().split('T')[0];
        if (!grouped[d]) grouped[d] = [];
        grouped[d].push(t);
    });
    return Object.entries(grouped)
        .sort((a, b) => new Date(b[0]) - new Date(a[0]))
        .map(([date, items]) => ({ date, items: items.sort((a, b) => new Date(b.date) - new Date(a.date)) }));
};
