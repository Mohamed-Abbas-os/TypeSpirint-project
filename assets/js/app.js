import { initTheme } from './theme.js';
import { SITE, relativeRoot, siteUrl } from './site-config.js';

function pagePath() { return location.pathname.replace(/\\/g, '/'); }
function isCurrent(href) { const normalized = href.replace('./', '').replace(/index\.html$/, ''); return pagePath().endsWith(normalized) || (normalized === '' && /\/$/.test(pagePath())); }
export function initShell() {
  initTheme();
  const root = relativeRoot();
  const nav = document.querySelector('[data-site-nav]');
  if (nav) nav.querySelectorAll('a').forEach(link => { if (isCurrent(link.getAttribute('href'))) link.setAttribute('aria-current', 'page'); });
  document.querySelector('[data-menu-toggle]')?.addEventListener('click', () => { nav?.classList.toggle('is-open'); document.querySelector('[data-menu-toggle]')?.setAttribute('aria-expanded', String(nav?.classList.contains('is-open'))); });
  document.querySelectorAll('[data-year]').forEach(el => { el.textContent = new Date().getFullYear(); });
  document.querySelectorAll('[data-ad-slot]').forEach(slot => { if (SITE.ads.enabled && SITE.ads.publisherId) { slot.hidden = false; slot.className = 'ad-slot'; slot.textContent = 'Advertisement'; } else slot.remove(); });
  const toast = document.querySelector('[data-toast]');
  window.typeSprintToast = (message) => { if (!toast) return; toast.textContent = message; toast.classList.add('is-visible'); window.clearTimeout(window.typeSprintToast.timer); window.typeSprintToast.timer = window.setTimeout(() => toast.classList.remove('is-visible'), 2600); };
  document.querySelector('[data-contact-form]')?.addEventListener('submit', e => { e.preventDefault(); const status = document.querySelector('[data-form-status]'); status.textContent = 'Thanks — this static demo does not transmit messages. Please use the owner email configured before launch.'; e.target.reset(); });
}
export { SITE, siteUrl };
