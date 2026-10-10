import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const required = ['index.html','typing-test.html','typing-practice.html','typing-lessons.html','about.html','contact.html','privacy-policy.html','terms.html','404.html','assets/css/style.css','assets/js/app.js','assets/js/typing-engine.js','assets/data/passages.json','manus-routes.json','robots.txt','sitemap.xml'];
const missing = required.filter(file => !fs.existsSync(path.join(root, file)));
if (missing.length) throw new Error(`Missing required files: ${missing.join(', ')}`);
JSON.parse(fs.readFileSync(path.join(root, 'assets/data/passages.json'), 'utf8'));
const manifest = JSON.parse(fs.readFileSync(path.join(root, 'manus-routes.json'), 'utf8'));
if (!Array.isArray(manifest.routes) || manifest.routes.some(route => !route.path.startsWith('/'))) throw new Error('Invalid manus-routes.json');
const htmlFiles = [];
function walk(dir) { for (const entry of fs.readdirSync(dir, { withFileTypes: true })) { if (['.git','node_modules'].includes(entry.name)) continue; const full = path.join(dir, entry.name); if (entry.isDirectory()) walk(full); else if (entry.name.endsWith('.html')) htmlFiles.push(full); } }
walk(root);
const errors = [];
if (fs.readFileSync(path.join(root, 'assets/js/site-config.js'), 'utf8').includes('example.com')) errors.push('site-config.js still contains the example.com placeholder');
if (fs.readFileSync(path.join(root, 'robots.txt'), 'utf8').includes('Disallow: /assets/')) errors.push('robots.txt must not block CSS/JavaScript assets from crawlers');
for (const file of htmlFiles) {
  const html = fs.readFileSync(file, 'utf8');
  if (!/<title>[^<]+<\/title>/i.test(html)) errors.push(`${path.relative(root, file)} has no title`);
  if (!/<h1[ >]/i.test(html)) errors.push(`${path.relative(root, file)} has no h1`);
  for (const match of html.matchAll(/(?:href|src)=["']([^"'#?]+)["']/g)) {
    const ref = match[1]; if (/^(https?:|mailto:|data:|javascript:)/i.test(ref)) continue;
    const target = path.resolve(path.dirname(file), ref);
    if (!fs.existsSync(target)) errors.push(`${path.relative(root, file)} references missing ${ref}`);
  }
}
if (errors.length) throw new Error(errors.join('\n'));
console.log(`TypeSprint smoke check passed: ${htmlFiles.length} HTML files, ${manifest.routes.length} routes, required assets present, local HTML references valid.`);
