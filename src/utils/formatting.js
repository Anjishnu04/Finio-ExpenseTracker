export const fmt = n => '₹' + Math.abs(n).toLocaleString('en-IN', { minimumFractionDigits: 0, maximumFractionDigits: 0 });

export const fmtFull = n => '₹' + n.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 });

export const fmtDate = d => new Date(d).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });

export const fmtDateGroup = d => new Date(d).toLocaleDateString('en-IN', { weekday: 'long', day: 'numeric', month: 'long' });

export const today = () => new Date().toISOString().split('T')[0];

export const genId = () => Date.now().toString(36) + Math.random().toString(36).slice(2);
