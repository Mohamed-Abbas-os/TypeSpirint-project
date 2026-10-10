import { getState, clearHistory, exportCSV, resetAll } from './storage.js';

export function initDashboard() {
  const state = getState();
  const best = document.querySelector('[data-best-wpm]'); if (!best) return;
  best.textContent = `${Number(state.stats.bestWpm || 0).toFixed(1)} WPM`; document.querySelector('[data-best-accuracy]').textContent = `${Number(state.stats.bestAccuracy || 0).toFixed(1)}%`; document.querySelector('[data-total-tests]').textContent = state.stats.totalTests || 0;
  const history = document.querySelector('[data-history]'); history.replaceChildren();
  if (!state.history.length) { history.innerHTML = '<li><span class="muted">No saved tests yet.</span><span class="muted">Start a test to build your local history.</span></li>'; } else state.history.slice(0, 6).forEach(item => { const li = document.createElement('li'); const date = new Date(item.at).toLocaleDateString(undefined, { month: 'short', day: 'numeric' }); li.innerHTML = `<span><strong>${Number(item.netWpm).toFixed(1)}</strong> WPM<br><span class="small muted">${date} · ${item.scope || 'test'}</span></span><span class="small muted">${Number(item.accuracy).toFixed(1)}%</span>`; history.appendChild(li); });
  const bar = document.querySelector('[data-progress-fill]'); if (bar) bar.style.width = `${Math.min(100, (Number(state.stats.bestAccuracy) || 0))}%`;
  document.querySelector('[data-export-csv]')?.addEventListener('click', () => { const blob = new Blob([exportCSV()], { type: 'text/csv;charset=utf-8' }); const url = URL.createObjectURL(blob); const link = document.createElement('a'); link.href = url; link.download = 'typesprint-history.csv'; link.click(); URL.revokeObjectURL(url); });
  document.querySelector('[data-clear-history]')?.addEventListener('click', () => { if (window.confirm('Clear saved test history on this browser?')) { clearHistory(); initDashboard(); } });
  document.querySelector('[data-reset-data]')?.addEventListener('click', () => { if (window.confirm('Reset all TypeSprint preferences and history on this browser?')) { resetAll(); location.reload(); } });
}
