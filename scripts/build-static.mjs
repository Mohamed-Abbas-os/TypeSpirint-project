import fs from 'node:fs';
import path from 'node:path';
const root = process.cwd(); const out = path.join(root, 'dist');
fs.rmSync(out, { recursive: true, force: true }); fs.mkdirSync(out, { recursive: true });
const files = ['index.html','typing-test.html','typing-practice.html','typing-lessons.html','about.html','contact.html','privacy-policy.html','terms.html','404.html','robots.txt','sitemap.xml','manus-routes.json'];
for (const file of files) fs.copyFileSync(path.join(root, file), path.join(out, file));
for (const dir of ['assets','lessons']) fs.cpSync(path.join(root, dir), path.join(out, dir), { recursive: true });
console.log(`Static build copied ${files.length} root files plus assets and lessons into dist/`);
