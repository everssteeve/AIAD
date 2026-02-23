# Implementation Plan: AIAD Framework Web Application

**Branch**: `001-aiad-framework-webapp` | **Date**: 2026-02-23 | **Spec**: [spec.md](./spec.md)
**Input**: Feature specification from `/specs/001-aiad-framework-webapp/spec.md`

## Summary

Build a static web application in French that presents the AIAD framework methodology as interactive documentation. The app features navigable framework sections (8 chapters), interactive role guides for the 5 AIAD responsibilities, downloadable artifact templates, and metric dashboards. Built with Astro 5 + Starlight for zero-JS content pages, Pagefind for search, and React islands for interactive visualizations.

## Technical Context

**Language/Version**: TypeScript 5.x, Node.js 20+
**Primary Dependencies**: Astro 5.x, @astrojs/starlight, @astrojs/react, @astrojs/tailwind, react 19, react-chartjs-2, chart.js 4.x, tailwindcss 4.x
**Storage**: N/A (static Markdown files via Astro Content Collections)
**Testing**: Vitest (unit), Playwright (E2E)
**Target Platform**: Static web (browser — modern evergreen browsers)
**Project Type**: Static web application (documentation site)
**Performance Goals**: <3s initial load, <1s search results, Lighthouse score >95
**Constraints**: French language only, no server-side runtime, no authentication, fully responsive (320px+)
**Scale/Scope**: 8 framework sections, 5 role guides, 6 artifact templates, 5 metric categories, ~15 pages total

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

| Principle | Gate | Status |
|-----------|------|--------|
| I. Intention over Execution | Spec defines why/what before how; outcome criteria defined | PASS |
| II. Empirisme Radical | Observable outcomes defined (SC-001 to SC-007); measurable targets set | PASS |
| III. Orchestration Systémique | AGENT-GUIDE to be updated with Astro/Starlight context for agent use | PASS |
| IV. Excellence Produit | User value is primary focus; feature adoption measurable via success criteria | PASS |
| V. Qualité Intégrée | Testing strategy defined (Vitest + Playwright); responsive design required | PASS |

No violations. All gates pass.

## Project Structure

### Documentation (this feature)

```text
specs/001-aiad-framework-webapp/
├── plan.md              # This file
├── research.md          # Phase 0 output
├── data-model.md        # Phase 1 output
├── quickstart.md        # Phase 1 output
├── contracts/           # Phase 1 output (URL routes)
└── tasks.md             # Phase 2 output (/speckit.tasks)
```

### Source Code (repository root)

```text
src/
├── content/
│   ├── docs/
│   │   └── fr/
│   │       ├── index.mdx                # Page d'accueil
│   │       ├── 01-preambule.mdx         # Section 01
│   │       ├── 02-vision-philosophie.mdx # Section 02
│   │       ├── 03-ecosysteme.mdx        # Section 03
│   │       ├── 04-artefacts.mdx         # Section 04
│   │       ├── 05-boucles-iteratives.mdx # Section 05
│   │       ├── 06-synchronisations.mdx  # Section 06
│   │       ├── 07-metriques.mdx         # Section 07
│   │       ├── 08-annexes.mdx           # Section 08
│   │       ├── roles/
│   │       │   ├── index.mdx            # Vue d'ensemble des rôles
│   │       │   ├── product-manager.mdx
│   │       │   ├── product-engineer.mdx
│   │       │   ├── agents-engineer.mdx
│   │       │   ├── qa-engineer.mdx
│   │       │   └── tech-lead.mdx
│   │       ├── artefacts/
│   │       │   ├── index.mdx            # Vue d'ensemble des artefacts
│   │       │   ├── prd.mdx
│   │       │   ├── architecture.mdx
│   │       │   ├── agent-guide.mdx
│   │       │   ├── specs.mdx
│   │       │   ├── dood.mdx
│   │       │   └── dooud.mdx
│   │       └── metriques/
│   │           ├── index.mdx            # Vue d'ensemble des métriques
│   │           ├── productivite.mdx
│   │           ├── qualite.mdx
│   │           ├── efficacite-ia.mdx
│   │           ├── outcomes.mdx
│   │           └── equipe.mdx
│   └── config.ts                        # Content Collections schema
├── components/
│   ├── RoleCard.tsx                      # Interactive role selector
│   ├── RoleInteractions.tsx             # Role collaboration visualization
│   ├── TeamConfigurator.tsx             # Team size configurator
│   ├── DashboardMockup.tsx             # Chart.js dashboard visualizations
│   ├── DownloadButton.astro            # Template download component
│   └── QuickNavigation.astro           # FAQ-style navigation
├── assets/
│   └── templates/                       # Downloadable Markdown templates
│       ├── prd-template.md
│       ├── architecture-template.md
│       ├── agent-guide-template.md
│       ├── specs-template.md
│       ├── dood-template.md
│       └── dooud-template.md
├── styles/
│   └── custom.css                       # Starlight style overrides
astro.config.mjs                         # Astro + Starlight configuration
tailwind.config.mjs                      # Tailwind configuration
tsconfig.json
package.json
tests/
├── unit/
│   ├── components/
│   │   ├── RoleCard.test.tsx
│   │   ├── TeamConfigurator.test.tsx
│   │   └── DashboardMockup.test.tsx
│   └── content/
│       └── schema.test.ts
└── e2e/
    ├── navigation.spec.ts
    ├── search.spec.ts
    ├── download.spec.ts
    └── responsive.spec.ts
```

**Structure Decision**: Single Astro project with Starlight. Content organized under `src/content/docs/fr/` following the framework's natural structure. Interactive React components in `src/components/`. Downloadable templates in `src/assets/templates/`. Tests split between Vitest (unit) and Playwright (E2E).

## Complexity Tracking

No violations to justify. The project uses a single framework (Astro + Starlight) with minimal dependencies. React islands are scoped to 4 interactive components only.
