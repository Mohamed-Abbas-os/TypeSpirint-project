import { relativeRoot } from './site-config.js';

let cache;
export const categories = {
  common: 'Common English words', sentences: 'Everyday sentences', punctuation: 'Punctuation practice', numbers: 'Numbers practice', vocabulary: 'Advanced vocabulary', programming: 'Programming-related text'
};
export async function loadPassages() {
  if (!cache) cache = fetch(`${relativeRoot()}/assets/data/passages.json`).then(r => { if (!r.ok) throw new Error('Passage data could not be loaded.'); return r.json(); });
  return cache;
}
export async function pickPassage(category, difficulty, custom = '') {
  if (category === 'custom') return custom.trim() || 'Type your own passage here.';
  const data = await loadPassages();
  const list = data[category]?.[difficulty] || data.common.beginner;
  return list[Math.floor(Math.random() * list.length)];
}
export async function getDailyChallenge(date = new Date()) {
  const data = await loadPassages();
  const key = date.toISOString().slice(0, 10);
  const dayNumber = Math.floor(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()) / 86400000);
  return { key, ...data.daily[Math.abs(dayNumber) % data.daily.length] };
}
