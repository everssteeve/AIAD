# URL Routes Contract: AIAD Framework Web Application

## Overview

All routes are static pages generated at build time by Astro/Starlight. The base URL is `/fr/` (French locale). All routes return HTML pages with zero JavaScript unless they contain interactive islands.

## Route Map

### Framework Sections (US1)

| Route | Page | Content Source | Interactive |
|-------|------|---------------|-------------|
| `/` | Redirect to `/fr/` | — | No |
| `/fr/` | Page d'accueil | `index.mdx` | No |
| `/fr/01-preambule/` | Préambule | `01-preambule.mdx` | No |
| `/fr/02-vision-philosophie/` | Vision et Philosophie | `02-vision-philosophie.mdx` | No |
| `/fr/03-ecosysteme/` | L'Écosystème AIAD | `03-ecosysteme.mdx` | No |
| `/fr/04-artefacts/` | Les Artefacts | `04-artefacts.mdx` | No |
| `/fr/05-boucles-iteratives/` | Les Boucles Itératives | `05-boucles-iteratives.mdx` | No |
| `/fr/06-synchronisations/` | Les Synchronisations | `06-synchronisations.mdx` | No |
| `/fr/07-metriques/` | Les Métriques | `07-metriques.mdx` | No |
| `/fr/08-annexes/` | Les Annexes | `08-annexes.mdx` | No |

### Role Guides (US2)

| Route | Page | Interactive Components |
|-------|------|-----------------------|
| `/fr/roles/` | Vue d'ensemble des rôles | RoleCard (selector) |
| `/fr/roles/product-manager/` | Guide PM | RoleInteractions, TeamConfigurator |
| `/fr/roles/product-engineer/` | Guide PE | RoleInteractions, TeamConfigurator |
| `/fr/roles/agents-engineer/` | Guide AE | RoleInteractions, TeamConfigurator |
| `/fr/roles/qa-engineer/` | Guide QA | RoleInteractions, TeamConfigurator |
| `/fr/roles/tech-lead/` | Guide Tech Lead | RoleInteractions, TeamConfigurator |

### Artifact Templates (US3)

| Route | Page | Download Available |
|-------|------|--------------------|
| `/fr/artefacts/` | Vue d'ensemble des artefacts | No |
| `/fr/artefacts/prd/` | Template PRD | prd-template.md |
| `/fr/artefacts/architecture/` | Template ARCHITECTURE | architecture-template.md |
| `/fr/artefacts/agent-guide/` | Template AGENT-GUIDE | agent-guide-template.md |
| `/fr/artefacts/specs/` | Template SPECS | specs-template.md |
| `/fr/artefacts/dood/` | Template DoOD | dood-template.md |
| `/fr/artefacts/dooud/` | Template DoOuD | dooud-template.md |

### Metrics & Dashboards (US4)

| Route | Page | Interactive Components |
|-------|------|-----------------------|
| `/fr/metriques/` | Vue d'ensemble des métriques | No |
| `/fr/metriques/productivite/` | Métriques Productivité | DashboardMockup |
| `/fr/metriques/qualite/` | Métriques Qualité | DashboardMockup |
| `/fr/metriques/efficacite-ia/` | Métriques Efficacité IA | DashboardMockup |
| `/fr/metriques/outcomes/` | Métriques Outcomes | DashboardMockup |
| `/fr/metriques/equipe/` | Métriques Équipe | DashboardMockup |

### Static Assets

| Path | Type | Description |
|------|------|-------------|
| `/templates/prd-template.md` | Download | PRD template Markdown |
| `/templates/architecture-template.md` | Download | ARCHITECTURE template Markdown |
| `/templates/agent-guide-template.md` | Download | AGENT-GUIDE template Markdown |
| `/templates/specs-template.md` | Download | SPECS template Markdown |
| `/templates/dood-template.md` | Download | DoOD template Markdown |
| `/templates/dooud-template.md` | Download | DoOuD template Markdown |

## Behavior

### Navigation

- Every framework section page includes prev/next links
- Sidebar shows all sections with current section highlighted
- Progress indicator shows current position in the reading flow

### Search

- Pagefind indexes all content at build time
- Search input available in Starlight header
- Results display page title, matched excerpt with highlights, and link

### 404 Handling

- Invalid routes display Starlight's default 404 page
- Redirect from `/` to `/fr/` via Astro redirect configuration

### Download

- Template download links point to `/templates/*.md` static files
- Browser triggers native file download (Content-Disposition not needed for static .md files)
