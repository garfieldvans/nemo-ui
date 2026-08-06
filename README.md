<div align="center">

# Nemo UI

[![npm version](https://img.shields.io/npm/v/nemo-ui?style=flat-square)](https://www.npmjs.com/package/nemo-ui)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=flat-square)](https://opensource.org/licenses/MIT)
[![Node.js Version](https://img.shields.io/badge/node-%3E%3D16.0.0-brightgreen?style=flat-square)](https://nodejs.org/)

**A modern, production-ready React component library built with TypeScript and Vite.**

Modern design system. Type-safe components. Zero dependencies on UI frameworks.

[Features](#features) • [Quick Start](#quick-start) • [Documentation](#documentation) • [Contributing](#contributing)

</div>

---

## Features

- 🎯 **Type-Safe** - Full TypeScript support with strict types
- 📦 **Modular** - Import only what you need
- 🎨 **Design System** - Comprehensive design tokens and foundations
- ⚡ **High Performance** - Optimized with Vite and tree-shaking support
- 🔧 **Developer Experience** - Clear API and excellent documentation
- 📱 **Responsive** - Mobile-first components
- ♿ **Accessible** - WCAG 2.1 AA compliant components

## Getting Started

### Prerequisites

- **Node.js**: 16.0.0 or higher
- **pnpm**: 8.0.0 or higher

### Installation

```bash
# Clone the repository
git clone https://github.com/garfieldvans/nemo-ui.git
cd nemo-ui

# Install dependencies
pnpm install

# Start development server
pnpm dev
```

### Basic Usage

```tsx
import { Typography } from '@nemo-ui/ui'

export function App() {
  return (
    <Typography variant="h1">
      Welcome to Nemo UI
    </Typography>
  )
}
```

## Project Structure

This monorepo uses `pnpm` workspaces for efficient package management:

```
nemo-ui/
├── apps/
│   └── playground/                 # 🎮 Demo and testing application
│       ├── src/
│       ├── index.html
│       ├── package.json
│       ├── tsconfig.json
│       └── vite.config.ts
│
├── packages/
│   └── ui/                         # 📦 Core UI library
│       ├── src/
│       │   ├── components/         # Reusable React components
│       │   ├── foundations/        # Design tokens (colors, spacing, etc.)
│       │   ├── hooks/              # Custom React hooks
│       │   ├── styles/             # Global and component styles
│       │   ├── types/              # Shared TypeScript types
│       │   ├── utils/              # Utility functions
│       │   └── index.ts            # Library entry point
│       ├── package.json
│       ├── tsconfig.json
│       └── vite.config.ts
│
├── tsconfig.base.json              # Base TypeScript configuration
├── pnpm-workspace.yaml             # Workspace configuration
└── package.json                    # Root package configuration
```

## Available Scripts

### Development

```bash
# Install all dependencies
pnpm install

# Start development environment (playground + watch mode)
pnpm dev

# Build all packages for production
pnpm build
```

### Playground Application

```bash
# Start dev server (from root)
pnpm --filter playground dev

# Build playground for production
pnpm --filter playground build

# Preview production build
pnpm --filter playground preview

# Run linter
pnpm --filter playground lint
```

### UI Package

```bash
# Build UI library
pnpm --filter @nemo-ui/ui build

# Watch mode for development
pnpm --filter @nemo-ui/ui dev
```

### Utilities

```bash
# Run linter across all packages
pnpm lint

# Format code with Prettier (if configured)
pnpm format

# Type check all packages
pnpm type-check
```

## Components

### Available Components

#### Typography
- Flexible text component with multiple variants and semantic HTML
- Supports custom styles and extends from design foundations
- **Location**: `packages/ui/src/components/Typography`

## Design System

Nemo UI includes a comprehensive design system with standardized design tokens:

### Foundations

Located in `packages/ui/src/foundations/`:

| File | Purpose |
|------|---------|
| `colors.ts` | Color palette (primary, secondary, neutral, semantic) |
| `typography.ts` | Font scales, weights, line heights, and letter spacing |
| `spacing.ts` | Spacing scale (4px base unit) |
| `radius.ts` | Border radius values |
| `shadows.ts` | Elevation shadows and effects |

### Using Design Tokens

```tsx
import { colors, spacing, typography } from '@nemo-ui/ui/foundations'

const styles = {
  backgroundColor: colors.primary[500],
  padding: spacing.md,
  fontSize: typography.sizes.body.md,
}
```

## Development Guide

### Adding a New Component

Follow the component structure for consistency:

```bash
# 1. Create component directory
mkdir packages/ui/src/components/YourComponent

# 2. Create component files
packages/ui/src/components/YourComponent/
├── index.ts                    # Exports
├── YourComponent.tsx           # Implementation
└── YourComponent.types.ts      # TypeScript types
```

**Example Component Structure**:

```tsx
// YourComponent.types.ts
export interface YourComponentProps {
  variant?: 'primary' | 'secondary'
  size?: 'sm' | 'md' | 'lg'
  children: React.ReactNode
}

// YourComponent.tsx
import { YourComponentProps } from './YourComponent.types'

export const YourComponent: React.FC<YourComponentProps> = ({
  variant = 'primary',
  size = 'md',
  children,
}) => {
  return <div className={`component component--${variant}`}>{children}</div>
}

// index.ts
export { YourComponent } from './YourComponent'
export type { YourComponentProps } from './YourComponent.types'
```

### Testing in Playground

The playground app is ideal for testing components:

```tsx
// apps/playground/src/App.tsx
import { YourComponent } from '@nemo-ui/ui'

export function App() {
  return <YourComponent variant="primary">Test</YourComponent>
}
```

## Documentation

### Component Documentation

- **TypeScript Definitions** - Inline type documentation for IDE intellisense
- **Playground App** - Live examples and interactive testing
- **Source Comments** - Detailed JSDoc comments in source files

### Storybook (Recommended for Future)

Consider adding Storybook for comprehensive component documentation:

```bash
pnpm add -D storybook @storybook/react @storybook/addon-docs
```

## Performance Considerations

- **Tree-shaking** - All exports are ES modules for proper tree-shaking
- **Code Splitting** - Playground app uses Vite's automatic code splitting
- **Build Output** - Check bundle size with `pnpm build`

## Contributing

We welcome contributions! Please follow these steps:

### Process

1. **Fork** the repository
2. **Create** a feature branch (`git checkout -b feature/amazing-feature`)
3. **Commit** your changes (`git commit -m 'Add amazing feature'`)
4. **Push** to the branch (`git push origin feature/amazing-feature`)
5. **Open** a Pull Request

### Guidelines

- Follow the existing code style (TypeScript + ESLint)
- Add components to appropriate directories
- Update types in `.types.ts` files
- Test thoroughly in the playground app
- Write clear commit messages
- Update documentation as needed

## Deployment

### Publishing to npm

```bash
# Update version in packages/ui/package.json
pnpm version patch|minor|major

# Build all packages
pnpm build

# Publish
pnpm publish
```

## Troubleshooting

### Common Issues

**Q: Dependencies not installing?**
```bash
pnpm install --force
```

**Q: Type errors after changes?**
```bash
pnpm type-check
```

**Q: Need to clean build?**
```bash
pnpm clean
pnpm install
pnpm build
```

## Project Roadmap

- [ ] Add more UI components (Button, Input, Card, etc.)
- [ ] Implement Storybook integration
- [ ] Add unit tests (Jest + React Testing Library)
- [ ] Create visual regression tests
- [ ] Publish to npm
- [ ] Add CI/CD pipeline
- [ ] Create component documentation site

## License

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.

## Support

- 📖 [View Documentation](#documentation)
- 🐛 [Report a Bug](https://github.com/garfieldvans/nemo-ui/issues)
- 💡 [Request a Feature](https://github.com/garfieldvans/nemo-ui/issues)
- 💬 [Discussions](https://github.com/garfieldvans/nemo-ui/discussions)

## Maintainers

- [@garfieldvans](https://github.com/garfieldvans)

---

<div align="center">

Made with ❤️ by the Nemo UI team

</div>
