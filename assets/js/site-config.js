export const SITE = {
  name: 'TypeSprint',
  tagline: 'Type Faster. Focus Better. Improve Every Day.',
  // Replace this with the real public origin before production deployment.
  publicOrigin: 'https://mohamed-abbas-os.github.io/TypeSpirint-project',
  ads: { enabled: false, publisherId: '', units: {} }
};

export function siteUrl(path = '/') {
  return `${SITE.publicOrigin.replace(/\/$/, '')}${path.startsWith('/') ? path : `/${path}`}`;
}

export function relativeRoot() {
  return document.documentElement.dataset.root || '';
}
