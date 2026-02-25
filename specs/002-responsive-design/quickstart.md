# Quickstart: Responsive Design Complet

**Branch**: `002-responsive-design` | **Date**: 2026-02-25

## Prerequisites

- Node.js 20+
- npm

## Setup

```bash
# Clone and checkout
git checkout 002-responsive-design
npm install

# Start dev server
npm run dev
```

## Development Workflow

### Testing Responsive Changes

1. Open browser DevTools (F12)
2. Toggle device toolbar (Ctrl+Shift+M / Cmd+Shift+M)
3. Test at these viewport widths:
   - **320px** — Small phone (iPhone SE)
   - **375px** — Standard phone (iPhone 12/13/14)
   - **428px** — Large phone (iPhone 14 Pro Max)
   - **768px** — Tablet portrait (iPad)
   - **1024px** — Tablet landscape (iPad)
   - **1440px** — Desktop

### Key Files to Modify

| File | Purpose |
|------|---------|
| `src/styles/custom.css` | Add responsive breakpoints and global mobile overrides |
| `src/components/AIMaturityDiagnostic.tsx` | Largest component: fix container widths, font sizes, touch targets, chart sizing |
| `src/components/TeamConfigurator.tsx` | Fix table responsiveness, button touch targets |
| `src/components/RoleCard.tsx` | Fix grid minmax, add touch feedback |
| `src/components/QuickNavigation.astro` | Fix grid minmax, add :active state |
| `src/components/RoleInteractions.tsx` | Fix tag touch targets, font sizes |
| `src/components/DashboardMockup.tsx` | Minor font size fixes |
| `src/components/DownloadButton.astro` | Minor touch target improvements |

### Validation Checklist

After each component change:

- [ ] No horizontal scrollbar at 320px width
- [ ] All buttons/links are at least 44x44px touch target
- [ ] Text is at least 14px (0.875rem)
- [ ] Charts resize without label clipping
- [ ] Tables readable without horizontal page scroll

## Build & Preview

```bash
# Build static site
npm run build

# Preview production build
npm run preview
```
