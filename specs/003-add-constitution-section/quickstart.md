# Quickstart: Add Constitution Section

**Feature**: 003-add-constitution-section
**Date**: 2026-03-02

## Prerequisites

- Node.js 20+
- npm
- Accès au repo AIADwebsite (`c:\Users\steeve.evers\OneDrive - CONSERTO\projets\AIADwebsite`)

## Setup

```bash
cd "c:\Users\steeve.evers\OneDrive - CONSERTO\projets\AIADwebsite"
npm install
```

## Implementation Sequence

### 1. Schema Layer (foundation)

Modify these files in order:
1. `src/schemas/docs.ts` — Add `'constitution'` to section enum
2. `src/types/navigation.ts` — Add `'constitution'` to `NAVIGATION_SECTIONS`, add `constitution` property to `NavigationTree` interface
3. `src/schemas/navigation.ts` — Add `constitution` to `navigationTreeSchema` and update all `.refine()` callbacks + error message
4. `src/content/config.ts` — Add `constitutionCollection` and export it

### 2. Navigation Data

5. `src/data/navigation.ts` — Add `CONSTITUTION_NAV` (11 items), update `NAVIGATION_COUNTS`, update `rawNavigationTree`

### 3. Content Files

6. Create `src/content/constitution/` directory with 11 `.mdx` files containing the exact Constitution AIAD v1.0 text

### 4. Pages

7. Create `src/pages/constitution/index.astro` (copy from framework/index.astro, adapt)
8. Create `src/pages/constitution/[...slug].astro` (copy from framework/[...slug].astro, adapt)

### 5. UI Components

9. `src/components/layout/Header.astro` — Add Constitution DropdownMenu
10. `src/components/layout/MobileMenu.astro` — Add constitution section + detection
11. `src/components/layout/Sidebar.astro` — Add constitution section + detection

### 6. Tests

12. `tests/unit/data/navigation.test.ts` — Add constitution tests, update counts
13. `tests/unit/schemas/navigation.test.ts` — Add 'constitution' to valid sections

## Validation

```bash
npm run lint
npm test
npm run build
```

## Key Files Reference

| Pattern source | New file |
|---------------|----------|
| `src/content/framework/preambule.mdx` | `src/content/constitution/preambule.mdx` |
| `src/pages/framework/index.astro` | `src/pages/constitution/index.astro` |
| `src/pages/framework/[...slug].astro` | `src/pages/constitution/[...slug].astro` |
