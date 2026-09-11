<div align="center">

# Nemo UI

[![npm version](https://img.shields.io/npm/v/@nemo/ui?style=flat-square)](https://www.npmjs.com/package/@nemo/ui)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=flat-square)](https://opensource.org/licenses/MIT)

**A modern, production-ready React component library with CSS Variables theming, dark mode, and full TypeScript support.**

[Getting Started](#getting-started) • [Theming](#theming) • [Components](#components) • [Storybook](#storybook) • [Scripts](#available-scripts)

</div>

---

## Features

- **Type-Safe** — Full TypeScript support with strict types
- **CSS Variables Theming** — Runtime token override via `ThemeProvider` / `useTheme`, static fallback in CSS
- **Dark Mode** — Built-in dark palette, automatic `prefers-color-scheme` detection, manual toggle via `ThemeProvider` or Storybook toolbar
- **Modular** — Import only what you need; tree-shaking friendly
- **SCSS Modules + Inline Styles** — Dual-track styling: Button/Input use SCSS with `var(--nemo-*)` + fallbacks, Typography uses `useTheme()` inline
- **Storybook v8** — Interactive component explorer with dark mode toolbar
- **Accessible** — WCAG 2.1 AA patterns (a11y addon)

---

## Getting Started

### Prerequisites

- **Node.js**: >= 18
- **pnpm**: >= 9

### Install & Run

```bash
git clone https://github.com/garfieldvans/nemo-ui.git
cd nemo-ui
pnpm install
pnpm dev          # start playground
pnpm storybook    # open Storybook on port 6006
```

### Basic Usage

```tsx
import { ThemeProvider, Button, Input, Typography } from "@nemo/ui";

function App() {
  return (
    <ThemeProvider mode="dark">
      <Typography variant="h1" color="primary">Hello Nemo UI</Typography>
      <Input label="Email" placeholder="you@example.com" />
      <Button>Submit</Button>
    </ThemeProvider>
  );
}
```

---

## Theming

Nemo UI uses **CSS Custom Properties** for theming. Tokens are defined in TypeScript (`src/theme/tokens.ts`) and emitted as static CSS in `src/styles/themes.scss`.

### ThemeProvider / useTheme

```tsx
import { ThemeProvider, useTheme } from "@nemo/ui";

// Wrap your app (sets data-theme + inline CSS vars on wrapper)
<ThemeProvider mode="dark" theme={{ colors: { primary: { 500: "#FF5722" } } }}>
  <YourApp />
</ThemeProvider>

// Inside any component — read the current theme
function StatusBadge() {
  const { theme, mode } = useTheme();
  return <span style={{ color: theme.colors.success }}>{mode} mode</span>;
}
```

### CSS Variable Pattern

All component SCSS uses `var(--nemo-*)` with hex fallbacks:

```scss
background: var(--nemo-primary-500, #4285F4);
color: var(--nemo-neutral-900, #202124);
// color-mix for opacity (rgba doesn't work with var())
box-shadow: 0 0 0 3px color-mix(in srgb, var(--nemo-primary-500) 20%, transparent);
```

### Dark Mode

Dark vars are applied three ways (safely layered):

| Layer | Mechanism |
|-------|-----------|
| **Static CSS** | `:root[data-theme="dark"]` block in `themes.scss` |
| **System preference** | `@media (prefers-color-scheme: dark)` on `:root:not([data-theme="light"])` |
| **Runtime** | `ThemeProvider` renders wrapper with `data-theme` attr + inline `style` |

---

## Components

| Component | Styling | Description |
|-----------|---------|-------------|
| **Button** | SCSS Module | `filled` / `outlined` / `text` variants, 3 sizes, color props |
| **Input** | SCSS Module | `outlined` / `filled` / `ghost` variants, floating label, icons, prefix/suffix, clearable |
| **Textarea** | SCSS Module | Extends Input patterns, character count, rows |
| **Typography** | Inline + `useTheme()` | 12 variants (h1–h6, body, caption, overline, button), semantic `as` prop |

---

## Storybook

Interactive component explorer with **dark/light mode toggle** in the toolbar.

```bash
pnpm storybook        # dev server at http://localhost:6006
pnpm build-storybook  # static build → storybook-static/
```

Stories are located at `packages/ui/src/components/**/*.stories.tsx`.

---

## Available Scripts

| Script | Description |
|--------|-------------|
| `pnpm dev` | Start playground dev server |
| `pnpm build` | Build UI library + playground |
| `pnpm build:ui` | Build UI library only |
| `pnpm build:playground` | Build playground only |
| `pnpm test` | Run vitest in watch mode |
| `pnpm test:run` | Run vitest once |
| `pnpm lint` | ESLint on `packages/ui/src` + `apps/playground/src` |
| `pnpm typecheck` | TypeScript type-check all packages |
| `pnpm storybook` | Start Storybook dev server (port 6006) |
| `pnpm build-storybook` | Static Storybook build |
| `pnpm clean` | Remove all build artifacts |
| `pnpm format` | Format with Prettier |

---

## Project Structure

```
nemo-ui/
├── apps/
│   └── playground/               # Vite + React demo app
├── packages/
│   └── ui/                       # @nemo/ui library
│       └── src/
│           ├── components/       # Button, Input, Typography (+ stories)
│           ├── foundations/      # Static token objects (colors, spacing, etc.)
│           ├── theme/            # ThemeTokens, ThemeProvider, useTheme
│           ├── styles/           # SCSS: _variables, themes.scss, mixins, reset
│           └── utils/            # isNil, isFunction, composeRefs, mergeProps
├── .storybook/                   # Storybook v8 config (main.ts, preview.ts)
├── eslint.config.js              # Root ESLint flat config
└── LICENSE                       # MIT
```

---

## Design Tokens

Tokens live in two places:

| Location | Purpose |
|----------|---------|
| `packages/ui/src/theme/tokens.ts` | **Source of truth** — `ThemeTokens` type, `defaultTheme`, `darkTheme`, `toCssVarMap()` |
| `packages/ui/src/styles/themes.scss` | **Static mirror** — `:root` + `[data-theme="dark"]` blocks, manually kept in sync |

### Available Tokens

- `colors.primary[50–900]`, `colors.neutral[0–900]`
- `colors.success`, `colors.warning`, `colors.error`, `colors.info`
- `colors.surface.{success,warning,error}` — tinted backgrounds for status states
- `spacing[0–24]`, `radius.{none,sm,md,lg,xl,full}`
- `shadow.{sm,md,lg,xl}`, `opacity.{disabled,hover,pressed}`

---

## Project Roadmap

### Sprint 1 (Completed)

- [x] Project setup (pnpm monorepo, Vite, TypeScript)
- [x] Foundation tokens (colors, spacing, radius, shadows, typography)
- [x] Button, Input, Textarea, Typography components
- [x] CSS Variables theming system + dark mode
- [x] ThemeProvider / useTheme runtime API
- [x] Storybook v8 + dark mode toolbar
- [x] ESLint flat config + Vitest
- [x] Utility functions (isNil, isFunction, composeRefs, mergeProps)

### Future

- [ ] More components (Card, Modal, Select, Tabs, etc.)
- [ ] CI/CD pipeline + visual regression tests
- [ ] Codegen: auto-generate `themes.scss` from `tokens.ts`
- [ ] npm publish (`@nemo/ui`)

---

## License

MIT — see [LICENSE](LICENSE)

---

<div align="center">

Made with ❤️ by the Nemo UI team

</div>
