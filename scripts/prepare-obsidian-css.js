import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const srcPath = path.resolve(__dirname, '../../solarservice/dist/_astro/BaseLayout.BwsHQSlA.css');
const targetPath = path.resolve(__dirname, '../src/templates/obsidian/obsidian.compiled.css');

let css = fs.readFileSync(srcPath, 'utf-8');

// 1. Scope theme tokens
css = css.replace('@layer theme{:root,:host{', '@layer theme{.obsidian-theme, :root:has(.obsidian-theme){');

// 2. Scope base styles so body doesn't bleed into other templates
css = css.replace(
  'body{font-family:var(--font-sans);color:#0b0b0c;-webkit-font-smoothing:antialiased;text-rendering:optimizelegibility;background-color:#fafaf8}',
  '.obsidian-theme{font-family:var(--font-sans);color:var(--color-onyx,#0b0b0c);-webkit-font-smoothing:antialiased;text-rendering:optimizelegibility;background-color:var(--color-cloud,#fafaf8)}'
);

// 3. Add display & responsive overrides scoped to .obsidian-theme to guarantee Next.js Tailwind specificity
const overrides = `
/* Display & Specificity Overrides for .obsidian-theme */
.obsidian-theme .hidden { display: none !important; }
.obsidian-theme .block { display: block !important; }
.obsidian-theme .flex { display: flex !important; }
.obsidian-theme .grid { display: grid !important; }
.obsidian-theme .inline-flex { display: inline-flex !important; }
.obsidian-theme .inline-block { display: inline-block !important; }

@media (min-width: 768px) {
  .obsidian-theme .md\\:flex { display: flex !important; }
  .obsidian-theme .md\\:hidden { display: none !important; }
  .obsidian-theme .md\\:grid { display: grid !important; }
}

@media (max-width: 767px) {
  .obsidian-theme .md\\:hidden { display: block !important; }
}

@media (min-width: 1024px) {
  .obsidian-theme .lg\\:flex { display: flex !important; }
  .obsidian-theme .lg\\:hidden { display: none !important; }
  .obsidian-theme .lg\\:grid { display: grid !important; }
}
`;

fs.writeFileSync(targetPath, css + '\n' + overrides, 'utf-8');
console.log('Successfully prepared obsidian.compiled.css');
