# Quickstart: AIAD Framework Web Application

## Prerequisites

- Node.js 20+ installed
- npm or pnpm package manager

## Setup

```bash
# Clone and navigate to project
cd application

# Install dependencies
npm install

# Start development server
npm run dev
```

The development server starts at `http://localhost:4321/fr/`.

## Key Commands

| Command | Description |
|---------|-------------|
| `npm run dev` | Start dev server with hot reload |
| `npm run build` | Build static site to `dist/` |
| `npm run preview` | Preview the built site locally |
| `npm run test` | Run unit tests (Vitest) |
| `npm run test:e2e` | Run E2E tests (Playwright) |

## Adding Content

### New Framework Section

1. Create `src/content/docs/fr/<section-name>.mdx`
2. Add frontmatter with `title`, `description`, `sidebar.order`
3. Write content in MDX (Markdown + JSX components)
4. Update prev/next links on adjacent sections

### New Role Guide

1. Create `src/content/docs/fr/roles/<role-name>.mdx`
2. Add frontmatter with `title`, `description`, `centralQuestion`, `focus`
3. Import interactive components: `import { RoleInteractions } from '../../components/RoleInteractions'`
4. Use `<RoleInteractions client:visible role="role-name" />` for island hydration

### New Artifact Template

1. Add the template file to `src/assets/templates/<name>-template.md`
2. Create `src/content/docs/fr/artefacts/<name>.mdx`
3. Add frontmatter with `templateFile` pointing to the template
4. Use `<DownloadButton file="/templates/<name>-template.md" />` component

### New Metric Category

1. Create `src/content/docs/fr/metriques/<category>.mdx`
2. Add metrics tables in the MDX body
3. Use `<DashboardMockup client:visible category="<category>" />` for chart visualization

## Deployment

```bash
# Build the static site
npm run build

# The dist/ folder contains all static files
# Deploy to any static host:

# GitHub Pages (via GitHub Actions)
# Netlify (auto-detect from astro.config.mjs)
# Vercel (auto-detect from astro.config.mjs)
```

## Verification Checklist

After setup, verify:

- [ ] `npm run dev` starts without errors
- [ ] Homepage loads at `http://localhost:4321/fr/`
- [ ] Navigation sidebar shows all 8 framework sections
- [ ] Search returns results when typing a keyword
- [ ] Role guide pages load interactive components
- [ ] Template download links work
- [ ] Site is responsive on mobile viewport (320px)
- [ ] `npm run build` completes without errors
