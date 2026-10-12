# Dev Kabir — Portfolio

A personal developer portfolio designed with a Facebook-inspired profile and feed layout. Built with SvelteKit 2, Svelte 5 (Runes), Tailwind CSS v4, and mdsvex.

## Features

- **Facebook-Inspired Profile UI**: Cover photo, avatar, collapsible featured projects carousel, profile tabs, and responsive two-column layout (sidebar details + post feed).
- **Projects & Posts**: Projects presented as interactive feed cards with image lightboxes, stats, tags, and detail pages.
- **Content Pipeline**: Markdown-driven content with `mdsvex`, typed frontmatter, and publication controls.
- **Theme & Accessibility**: System/dark/light theme support with high-contrast text and keyboard navigation.
- **Fast & Static**: Prerendered static site built using `@sveltejs/adapter-static`.

## Getting Started

### Prerequisites

- Node.js (v20+ recommended)
- [pnpm](https://pnpm.io/) (v10+ recommended)

### Installation

```sh
pnpm install
```

### Development

Start the development server:

```sh
pnpm dev
```

Or open directly in your browser:

```sh
pnpm dev -- --open
```

### Type Checking & Linting

```sh
# Type check with svelte-check
pnpm check

# Lint with ESLint and Prettier
pnpm lint

# Format code
pnpm format
```

### Building for Production

Build static production output:

```sh
pnpm build
```

Preview the production build:

```sh
pnpm preview
```
