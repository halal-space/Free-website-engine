const fs = require('fs');
const path = require('path');

const srcCssPath = '/home/farooq-ashiru/Desktop/Projects/template folder/groceries/dist/_astro/Footer.C_A5vXWx.css';
const outCssPath = path.join(__dirname, '../src/templates/terra/terra.compiled.css');

if (!fs.existsSync(srcCssPath)) {
  console.error('Source CSS not found:', srcCssPath);
  process.exit(1);
}

const rawCss = fs.readFileSync(srcCssPath, 'utf8');

// The display overrides that ensure responsive visibility and layout integrity
const overrides = `

/* Display & Specificity Overrides for .terra-theme */
.terra-theme .hidden { display: none !important; }
.terra-theme .block { display: block !important; }
.terra-theme .flex { display: flex !important; }
.terra-theme .grid { display: grid !important; }
.terra-theme .inline-flex { display: inline-flex !important; }
.terra-theme .inline-block { display: inline-block !important; }

@media (min-width: 640px) {
  .terra-theme .sm\\:flex { display: flex !important; }
  .terra-theme .sm\\:hidden { display: none !important; }
  .terra-theme .sm\\:inline-flex { display: inline-flex !important; }
  .terra-theme .sm\\:grid { display: grid !important; }
  .terra-theme .sm\\:block { display: block !important; }
}

@media (max-width: 639px) {
  .terra-theme .sm\\:hidden.flex { display: flex !important; }
  .terra-theme .sm\\:hidden.grid { display: grid !important; }
  .terra-theme .sm\\:hidden.inline-flex { display: inline-flex !important; }
  .terra-theme .sm\\:hidden:not(.grid):not(.flex):not(.inline-flex):not(.hidden) { display: block !important; }
}

@media (min-width: 768px) {
  .terra-theme .md\\:flex { display: flex !important; }
  .terra-theme .md\\:hidden { display: none !important; }
  .terra-theme .md\\:grid { display: grid !important; }
  .terra-theme .md\\:block { display: block !important; }
}

@media (max-width: 767px) {
  .terra-theme .md\\:hidden.flex { display: flex !important; }
  .terra-theme .md\\:hidden.grid { display: grid !important; }
  .terra-theme .md\\:hidden.inline-flex { display: inline-flex !important; }
  .terra-theme .md\\:hidden:not(.grid):not(.flex):not(.inline-flex):not(.hidden) { display: block !important; }
}

@media (min-width: 1024px) {
  .terra-theme .lg\\:flex { display: flex !important; }
  .terra-theme .lg\\:hidden { display: none !important; }
  .terra-theme .lg\\:grid { display: grid !important; }
  .terra-theme .lg\\:block { display: block !important; }
}

@media (max-width: 1023px) {
  .terra-theme .lg\\:hidden.flex { display: flex !important; }
  .terra-theme .lg\\:hidden.grid { display: grid !important; }
  .terra-theme .lg\\:hidden.inline-flex { display: inline-flex !important; }
  .terra-theme .lg\\:hidden:not(.grid):not(.flex):not(.inline-flex):not(.hidden) { display: block !important; }
}
`;

fs.writeFileSync(outCssPath, rawCss + overrides, 'utf8');
console.log('Successfully written terra.compiled.css:', fs.statSync(outCssPath).size, 'bytes');
