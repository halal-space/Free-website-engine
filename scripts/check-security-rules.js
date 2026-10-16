/**
 * Security Rule & Static Analysis Checker
 *
 * Verifies Security §8 requirements:
 * 1. Banning `dangerouslySetInnerHTML` in source code
 * 2. Banning `.innerHTML` DOM assignments in source code
 * 3. Preventing server environment access inside client components.
 */

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const srcDir = path.resolve(__dirname, '../src');

function getAllFiles(dirPath, arrayOfFiles = []) {
  const files = fs.readdirSync(dirPath);

  for (const file of files) {
    const fullPath = path.join(dirPath, file);
    if (fs.statSync(fullPath).isDirectory()) {
      getAllFiles(fullPath, arrayOfFiles);
    } else if (file.endsWith('.ts') || file.endsWith('.tsx')) {
      arrayOfFiles.push(fullPath);
    }
  }

  return arrayOfFiles;
}

const allFiles = getAllFiles(srcDir);
let hasError = false;

for (const filePath of allFiles) {
  const content = fs.readFileSync(filePath, 'utf8');
  const relPath = path.relative(srcDir, filePath);
  const lines = content.split('\n');

  lines.forEach((line, index) => {
    const lineNum = index + 1;
    const trimmed = line.trim();

    // Skip comment lines for DOM check
    if (!trimmed.startsWith('*') && !trimmed.startsWith('//') && !trimmed.startsWith('/*')) {
      if (line.includes('dangerouslySetInnerHTML')) {
        console.error(`[SECURITY VIOLATION] dangerouslySetInnerHTML found in ${relPath}:${lineNum}`);
        hasError = true;
      }
      if (line.includes('.innerHTML')) {
        console.error(`[SECURITY VIOLATION] .innerHTML assignment found in ${relPath}:${lineNum}`);
        hasError = true;
      }
    }

    if (content.startsWith("'use client'") && /process\.env\.[A-Z_]+/.test(line)) {
      console.error(`[SECURITY VIOLATION] Server environment accessed in client component ${relPath}:${lineNum}`);
      hasError = true;
    }
  });
}

if (hasError) {
  console.error('\nSecurity rule verification failed.');
  process.exit(1);
} else {
  console.log('Security check passed: No direct HTML injection or server environment access in client components.');
  process.exit(0);
}
