const fs = require('fs');
const path = require('path');

const targetPath = path.join(__dirname, '..', 'dist', 'cjs', 'generated', 'client.js');

if (!fs.existsSync(targetPath)) {
  console.warn(`[patch-prisma-cjs] Skipping: ${targetPath} not found.`);
  process.exit(0);
}

const source = fs.readFileSync(targetPath, 'utf8');

// In CJS, __dirname is already a global - we just need to remove the ESM-style declaration
// The ESM pattern uses import.meta.url to compute __dirname, but CJS already has it built-in
const fromGlobal = 'globalThis[\'__dirname\'] = path.dirname((0, node_url_1.fileURLToPath)(import.meta.url));';
const fromConst = 'const __dirname = path.dirname((0, node_url_1.fileURLToPath)(import.meta.url));';
// Replace with a comment since __dirname is already available in CommonJS
const to = '// __dirname is already available in CommonJS - no need to redeclare';

let updated = source;
if (updated.includes(fromGlobal)) {
  updated = updated.replace(fromGlobal, to);
} else if (updated.includes(fromConst)) {
  updated = updated.replace(fromConst, to);
} else {
  console.warn('[patch-prisma-cjs] Expected import.meta.url pattern not found.');
  process.exit(0);
}
fs.writeFileSync(targetPath, updated);
console.log('[patch-prisma-cjs] Patched CJS Prisma client __dirname resolution.');
