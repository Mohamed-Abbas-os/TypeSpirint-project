import { pickPassage, getDailyChallenge } from './passages.js';
import { getState, saveDailyResult } from './storage.js';

let passage = ''; let startedAt = 0; let category = 'common'; let dailyKey = ''; let completed = false;
const $ = selector => document.querySelector(selector);
function render() {
  if (completed) return;
  const typed = $('[data-practice-input]').value; const correct = [...typed].filter((char, i) => char === passage[i]).length; const incorrect = Math.max(0, typed.length - correct); const accuracy = typed.length ? (correct / typed.length) * 100 : 0;
  $('[data-practice-progress]').textContent = `${typed.length} / ${passage.length} characters`; $('[data-practice-accuracy]').textContent = typed.length ? `${accuracy.toFixed(1)}% accuracy` : 'Accuracy appears after you type';
  $('[data-practice-feedback]').textContent = typed.length ? (accuracy >= 96 ? 'Excellent control. Keep the rhythm comfortable.' : accuracy >= 85 ? 'Good work. Slow down slightly to make the next line cleaner.' : 'Try a softer pace and look one word ahead.') : 'Choose a passage and begin without a countdown.';
  if (typed.length >= passage.length && passage.length) { completed = true; $('[data-practice-input]').disabled = true; const seconds = Math.max(.1, (performance.now() - startedAt) / 1000); const wpm = (typed.length / 5) / (seconds / 60); $('[data-practice-feedback]').textContent = `Complete — ${wpm.toFixed(1)} WPM at ${accuracy.toFixed(1)}% accuracy. Try another passage to reinforce it.`; if (category === 'daily' && dailyKey) saveDailyResult(dailyKey, { netWpm: wpm, accuracy, correct, incorrect, total: typed.length, duration: seconds }); }
}
async function load(categoryName = category) {
  category = categoryName; completed = false; $('[data-practice-input]').disabled = false; const custom = $('[data-practice-custom]')?.value || ''; const daily = category === 'daily' ? await getDailyChallenge() : null; dailyKey = daily?.key || '';
  passage = daily ? daily.text : await pickPassage(category, 'intermediate', custom); $('[data-practice-passage]').textContent = passage; $('[data-practice-input]').value = ''; $('[data-practice-input]').focus(); $('[data-practice-progress]').textContent = `0 / ${passage.length} characters`; $('[data-practice-accuracy]').textContent = 'Accuracy appears after you type'; $('[data-practice-feedback]').textContent = 'Choose a passage and begin without a countdown.'; $('[data-daily-title]') && ($('[data-daily-title]').textContent = daily ? daily.title : 'Practice passage'); startedAt = performance.now();
}
export async function initPractice() {
  document.querySelectorAll('[data-practice-category]').forEach(button => button.addEventListener('click', () => { document.querySelectorAll('[data-practice-category]').forEach(b => b.setAttribute('aria-pressed', String(b === button))); load(button.dataset.value); }));
  $('[data-practice-input]')?.addEventListener('input', render); $('[data-practice-custom]')?.addEventListener('change', () => { if (category === 'custom') load('custom'); }); $('[data-practice-reset]')?.addEventListener('click', () => load(category));
  await load('common'); const state = getState(); const total = state.stats.totalTests || 0; $('[data-session-note]') && ($('[data-session-note]').textContent = `${total} saved test${total === 1 ? '' : 's'} on this browser.`);
}
