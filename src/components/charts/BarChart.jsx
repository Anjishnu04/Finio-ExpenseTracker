import { useEffect, useRef } from 'react';
import { getMonthTx, calcSummary } from '../../utils/calculations';
import '../../index.css';

export default function BarChart({ months = 6, viewMonth, viewYear, transactions }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    if (!canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const W = canvas.width, H = canvas.height;
    ctx.clearRect(0, 0, W, H);

    const data = [];
    for (let i = months - 1; i >= 0; i--) {
      let m = viewMonth - i, y = viewYear;
      while (m < 0) { m += 12; y--; }
      const txs = getMonthTx(transactions, m, y);
      const { income, expense } = calcSummary(txs);
      const label = new Date(y, m).toLocaleDateString('en-IN', { month: 'short' });
      data.push({ label, income, expense });
    }

    const maxVal = Math.max(...data.map(d => Math.max(d.income, d.expense)), 100);
    const padL = 10, padR = 10, padT = 20, padB = 36;
    const chartW = W - padL - padR;
    const chartH = H - padT - padB;
    const barGroupW = chartW / data.length;
    const barW = barGroupW * 0.3;
    const gap = barGroupW * 0.04;

    // Grid lines
    for (let r = 0; r <= 4; r++) {
      const y = padT + chartH - (r / 4) * chartH;
      ctx.strokeStyle = 'rgba(255,255,255,0.05)';
      ctx.lineWidth = 1;
      ctx.setLineDash([4, 4]);
      ctx.beginPath();
      ctx.moveTo(padL, y);
      ctx.lineTo(W - padR, y);
      ctx.stroke();
      ctx.setLineDash([]);
    }

    // Bars
    data.forEach((d, i) => {
      const groupX = padL + i * barGroupW + barGroupW / 2;
      
      // Income bar
      const incomeHeight = (d.income / maxVal) * chartH;
      ctx.fillStyle = '#10b981';
      ctx.fillRect(groupX - barW - gap / 2, padT + chartH - incomeHeight, barW, incomeHeight);
      
      // Expense bar
      const expenseHeight = (d.expense / maxVal) * chartH;
      ctx.fillStyle = '#f43f5e';
      ctx.fillRect(groupX + gap / 2, padT + chartH - expenseHeight, barW, expenseHeight);
    });

    // X-axis labels
    ctx.fillStyle = 'rgba(255,255,255,0.5)';
    ctx.font = '11px Space Grotesk';
    ctx.textAlign = 'center';
    data.forEach((d, i) => {
      const x = padL + i * barGroupW + barGroupW / 2;
      ctx.fillText(d.label, x, H - 10);
    });
  }, [months, viewMonth, viewYear, transactions]);

  return <canvas ref={canvasRef} width={500} height={240} style={{ maxWidth: '100%' }} />;
}
