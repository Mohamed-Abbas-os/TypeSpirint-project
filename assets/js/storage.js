const KEY = 'typesprint:v1';
const defaults = { preferences: { theme: 'light', duration: 60, difficulty: 'beginner' }, history: [], daily: {}, stats: { totalTests: 0, bestWpm: 0, bestAccuracy: 0 } };

function clone(value) { return JSON.parse(JSON.stringify(value)); }
function read() {
  try {
    const parsed = JSON.parse(localStorage.getItem(KEY) || 'null');
    if (!parsed || typeof parsed !== 'object') return clone(defaults);
    return { ...clone(defaults), ...parsed, preferences: { ...defaults.preferences, ...(parsed.preferences || {}) }, stats: { ...defaults.stats, ...(parsed.stats || {}) }, history: Array.isArray(parsed.history) ? parsed.history : [], daily: parsed.daily && typeof parsed.daily === 'object' ? parsed.daily : {} };
  } catch { return clone(defaults); }
}
function write(state) { try { localStorage.setItem(KEY, JSON.stringify(state)); return true; } catch { return false; } }
export function getState() { return read(); }
export function updateState(mutator) { const state = read(); mutator(state); write(state); return state; }
export function getPreferences() { return getState().preferences; }
export function savePreferences(prefs) { return updateState(s => { s.preferences = { ...s.preferences, ...prefs }; }); }
export function saveResult(result) {
  return updateState(s => {
    s.history.unshift({ ...result, id: `${Date.now()}-${Math.random().toString(16).slice(2)}`, at: new Date().toISOString() });
    s.history = s.history.slice(0, 30);
    s.stats.totalTests += 1;
    s.stats.bestWpm = Math.max(Number(s.stats.bestWpm) || 0, Number(result.netWpm) || 0);
    s.stats.bestAccuracy = Math.max(Number(s.stats.bestAccuracy) || 0, Number(result.accuracy) || 0);
  });
}
export function getBestFor(scope) { return getState().history.filter(item => item.scope === scope).reduce((best, item) => Math.max(best, Number(item.netWpm) || 0), 0); }
export function saveDailyResult(key, result) { return updateState(s => { const current = s.daily[key] || { bestWpm: 0, bestAccuracy: 0, attempts: 0 }; current.attempts += 1; current.bestWpm = Math.max(current.bestWpm, Number(result.netWpm) || 0); current.bestAccuracy = Math.max(current.bestAccuracy, Number(result.accuracy) || 0); current.lastResult = result; s.daily[key] = current; }); }
export function clearHistory() { return updateState(s => { s.history = []; s.stats.totalTests = 0; s.stats.bestWpm = 0; s.stats.bestAccuracy = 0; }); }
export function resetAll() { try { localStorage.removeItem(KEY); return true; } catch { return false; } }
export function exportCSV() {
  const rows = [['Date', 'Mode', 'Duration (s)', 'Gross WPM', 'Net WPM', 'Accuracy', 'Correct', 'Incorrect', 'Total']];
  getState().history.forEach(r => rows.push([r.at, r.scope || 'test', r.duration, r.grossWpm, r.netWpm, r.accuracy, r.correct, r.incorrect, r.total]));
  return rows.map(row => row.map(cell => `"${String(cell ?? '').replaceAll('"', '""')}"`).join(',')).join('\n');
}
