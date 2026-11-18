// TypeScript membuat deklarasi dengan specifier relatif tanpa ekstensi
// (`export * from './foundations'`). Itu sah untuk `moduleResolution: bundler`,
// tetapi konsumen dengan `node16`/`nodenext` mendapat TS2834. Skrip ini
// menambahkan `.js` (atau `/index.js` untuk folder) pada deklarasi hasil build.
import { existsSync, readdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join, resolve } from "node:path";

const DIST = resolve(process.cwd(), "dist");
const SPECIFIER = /(from\s+|import\(\s*)(["'])(\.\.?\/[^"']+)\2/g;
const HAS_EXTENSION = /\.(js|json|css|scss|sass)$/;

function collect(dir, files = []) {
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const full = join(dir, entry.name);
    if (entry.isDirectory()) collect(full, files);
    else if (entry.name.endsWith(".d.ts")) files.push(full);
  }
  return files;
}

/** `./x` → `./x.js` bila ada x.d.ts, atau `./x/index.js` bila x adalah folder. */
function resolveSpecifier(specifier, fromFile) {
  const base = resolve(dirname(fromFile), specifier);
  if (existsSync(`${base}.d.ts`)) return `${specifier}.js`;
  if (existsSync(join(base, "index.d.ts"))) return `${specifier}/index.js`;
  return null;
}

let updated = 0;

for (const file of collect(DIST)) {
  const source = readFileSync(file, "utf8");
  const next = source.replace(SPECIFIER, (match, prefix, quote, specifier) => {
    if (HAS_EXTENSION.test(specifier)) return match;
    const resolved = resolveSpecifier(specifier, file);
    return resolved ? `${prefix}${quote}${resolved}${quote}` : match;
  });

  if (next !== source) {
    writeFileSync(file, next, "utf8");
    updated += 1;
  }
}

console.log(`deklarasi dirapikan: ${updated} file`);
