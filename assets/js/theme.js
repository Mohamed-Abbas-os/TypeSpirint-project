import { getPreferences, savePreferences } from './storage.js';

export function applyTheme(theme = getPreferences().theme) {
  const selected = theme === 'dark' ? 'dark' : 'light';
  document.documentElement.dataset.theme = selected;
  document.querySelectorAll('[data-theme-toggle]').forEach(button => {
    button.setAttribute('aria-label', `Switch to ${selected === 'dark' ? 'light' : 'dark'} theme`);
    button.title = selected === 'dark' ? 'Use light theme' : 'Use dark theme';
    button.textContent = selected === 'dark' ? '☼' : '☾';
  });
  savePreferences({ theme: selected });
}
export function initTheme() {
  applyTheme(getPreferences().theme);
  document.querySelectorAll('[data-theme-toggle]').forEach(button => button.addEventListener('click', () => applyTheme(document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark')));
}
