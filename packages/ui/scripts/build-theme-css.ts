import { existsSync, readFileSync, writeFileSync } from "node:fs";
import { resolve } from "node:path";
import * as prettier from "prettier";

import { darkTheme, defaultTheme, toCssVarMap, type ThemeTokens } from "../src/theme/tokens";

// `themes.scss` adalah cermin statis dari token JS: ThemeProvider memakai
// `toCssVarMap()` saat runtime, sedangkan halaman tanpa provider mengandalkan
// CSS statis. Dulu keduanya disalin manual dan bisa melenceng, jadi file itu
// kini di-generate dan diperiksa di CI lewat `--check`.

const TARGET = resolve(process.cwd(), "src/styles/themes.scss");

const HEADER = `// ---------------------------------------------------------------------------
// AUTO-GENERATED FILE — jangan diedit manual.
//
// Sumber nilai : src/theme/tokens.ts (defaultTheme, darkTheme, toCssVarMap)
// Regenerate   : pnpm tokens:build
// Verifikasi CI: pnpm tokens:check
// ---------------------------------------------------------------------------
`;

const FONT_FACE = `// Inter font — Google Fonts, gratis untuk komersial.
// Dokumentasi: https://fonts.google.com/specimen/Inter
@font-face {
  font-family: "Inter";
  font-style: normal;
  font-weight: 400 900;
  font-display: swap;
  src: url(https://fonts.gstatic.com/s/inter/v15/UcC73Firl7l6czZJVmBLJeQTUBR7o.ttf) format("ttf");
}`;

const FONT_FAMILY = '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", system-ui, sans-serif';

function sectionLabel(key: string): string {
  if (key.startsWith("--nemo-primary-")) return "Colors — primary";
  if (key.startsWith("--nemo-secondary-")) return "Colors — secondary";
  if (key.startsWith("--nemo-neutral-")) return "Colors — neutral";
  if (/^--nemo-(success|warning|error|info)$/.test(key)) return "Colors — semantic";
  if (key.startsWith("--nemo-surface-")) return "Colors — surfaces";
  if (/-fill$/.test(key) || /-text$/.test(key)) return "Colors — mode-aware tones";
  if (key.startsWith("--nemo-spacing-")) return "Spacing";
  if (key.startsWith("--nemo-radius-")) return "Radius";
  if (key.startsWith("--nemo-shadow-")) return "Shadows";
  if (key.startsWith("--nemo-opacity-")) return "Opacity";
  return "Other";
}

/**
 * Tone `*-text`/`*-fill` memakai `var(--nemo-<tone>-500)` (bukan hex hasil
 * `toCssVarMap`) supaya override satu warna brand lewat CSS otomatis ikut
 * menggeser turunannya.
 */
function withToneReferences(key: string, value: string, tokens: ThemeTokens): string {
  const match = key.match(/^--nemo-(primary|secondary|success|warning|error|info)-(?:text|fill)$/);
  if (!match) return value;
  const name = match[1] as "primary" | "secondary" | "success" | "warning" | "error" | "info";
  const isScale = name === "primary" || name === "secondary";
  const hex = isScale
    ? tokens.colors[name as "primary" | "secondary"]["500"]
    : tokens.colors[name as "success" | "warning" | "error" | "info"];
  const reference = isScale ? `var(--nemo-${name}-500)` : `var(--nemo-${name})`;
  return value.replace(hex, reference);
}

function renderDeclarations(
  tokens: ThemeTokens,
  keys: string[],
  indent: string,
  referenceTones: boolean,
): string {
  const map = toCssVarMap(tokens);
  const lines: string[] = [];
  let section = "";

  for (const key of keys) {
    const next = sectionLabel(key);
    if (next !== section) {
      if (section) lines.push("");
      lines.push(`${indent}// ${next}`);
      section = next;
    }
    const value = referenceTones ? withToneReferences(key, map[key], tokens) : map[key];
    lines.push(`${indent}${key}: ${value};`);
  }

  return lines.join("\n");
}

/** Hanya token yang benar-benar berbeda dari tema terang. */
function changedKeys(): string[] {
  const light = toCssVarMap(defaultTheme);
  const dark = toCssVarMap(darkTheme);
  return Object.keys(light).filter((key) => dark[key]?.toLowerCase() !== light[key].toLowerCase());
}

export function generateThemesScss(): string {
  const lightKeys = Object.keys(toCssVarMap(defaultTheme));
  const darkKeys = changedKeys();

  const lightBlock = `${renderDeclarations(defaultTheme, lightKeys, "  ", true)}

  color-scheme: light;
  --nemo-font-family: ${FONT_FAMILY};`;

  const darkBlock = `${renderDeclarations(darkTheme, darkKeys, "  ", false)}

  color-scheme: dark;`;

  const mediaBlock = `${renderDeclarations(darkTheme, darkKeys, "    ", false)}

    color-scheme: dark;`;

  return [
    HEADER,
    FONT_FACE,
    "",
    ":root {",
    lightBlock,
    "}",
    "",
    "// Dark theme — atribut eksplisit.",
    ':root[data-theme="dark"],',
    '[data-theme="dark"] {',
    darkBlock,
    "}",
    "",
    "// Ikuti preferensi OS ketika tidak ada data-theme eksplisit (mencegah FOUC).",
    "@media (prefers-color-scheme: dark) {",
    '  :root:not([data-theme="light"]) {',
    mediaBlock,
    "  }",
    "}",
    "",
  ].join("\n");
}

// File hasil generate ikut aturan Prettier repo (mis. hex lowercase, pembungkusan
// baris), supaya `pnpm format` tidak mengubahnya dan CI tetap stabil.
async function formatScss(css: string): Promise<string> {
  const config = (await prettier.resolveConfig(TARGET)) ?? {};
  return prettier.format(css, { ...config, parser: "scss" });
}

async function main(): Promise<void> {
  const check = process.argv.includes("--check");
  const next = await formatScss(generateThemesScss());
  const current = existsSync(TARGET) ? readFileSync(TARGET, "utf8") : "";

  if (check) {
    if (current !== next) {
      console.error(
        "themes.scss tidak sinkron dengan tokens.ts.\nJalankan `pnpm tokens:build` lalu commit hasilnya.",
      );
      process.exit(1);
    }
    console.log("themes.scss sudah sinkron dengan tokens.ts");
    return;
  }

  if (current === next) {
    console.log("themes.scss tidak berubah");
    return;
  }

  writeFileSync(TARGET, next, "utf8");
  console.log("themes.scss ditulis ulang dari tokens.ts");
}

void main();
