import { useEffect, useRef } from 'react';
import { getCat } from '../../utils/categories';
import '../../index.css';

export default function DonutChart({ expenses }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    if (!canvasRef.current) return;
    
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const W = 240, H = 240;
    const cx = W / 2, cy = H / 2;
    const R = Math.min(W, H) / 2 - 10;
    const inner = R * 0.6;

    ctx.clearRect(0, 0, W, H);

    // Group by category
    const catMap = {};
    expenses.forEach(t => {
      catMap[t.category] = (catMap[t.category] || 0) + t.amount;
    });
    const total = Object.values(catMap).reduce((s, v) => s + v, 0);

    if (!total) {
      ctx.beginPath();
      ctx.arc(cx, cy, R, 0, Math.PI * 2);
      ctx.strokeStyle = 'rgba(255,255,255,0.06)';
      ctx.lineWidth = R - inner;
      ctx.stroke();
      return;
    }

    const entries = Object.entries(catMap).sort((a, b) => b[1] - a[1]);
    let startAngle = -Math.PI / 2;
    const gap = 0.03;

    entries.forEach(([catId, val]) => {
      const cat = getCat(catId);
      const slice = (val / total) * Math.PI * 2;
      const endAngle = startAngle + slice - gap;

      ctx.beginPath();
      ctx.arc(cx, cy, R, startAngle + gap / 2, endAngle);
      ctx.arc(cx, cy, inner, endAngle, startAngle + gap / 2, true);
      ctx.closePath();
      ctx.fillStyle = cat.color;
      ctx.fill();

      startAngle += slice;
    });
  }, [expenses]);

  return (
    <div className="donut-area">
      <canvas 
        ref={canvasRef} 
        width={240} 
        height={240} 
        style={{ maxWidth: '100%' }}
      />
      <div className="donut-center">
        <span className="donut-total-label">Total</span>
        <span className="donut-total">
          ₹{expenses.reduce((s, t) => s + t.amount, 0).toLocaleString('en-IN', { maximumFractionDigits: 0 })}
        </span>
      </div>
    </div>
  );
}
