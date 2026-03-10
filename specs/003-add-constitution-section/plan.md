# Implementation Plan: Add Constitution Section

**Branch**: `003-add-constitution-section` | **Date**: 2026-03-02 | **Spec**: [spec.md](./spec.md)
**Input**: Feature specification from `/specs/003-add-constitution-section/spec.md`

## Summary

Ajouter une section "Constitution" au site web AIAD, répliquant exactement le pattern de la section "Framework" existante. Le contenu est le texte fondateur de la Constitution AIAD v1.0, découpé en 11 pages MDX (Préambule + Articles I-IX + Signature). L'implémentation touche la couche de données (collection Astro, schémas, types), la navigation (sidebar, header, mobile menu), les pages (index + dynamique), et les tests existants.

## Technical Context

**Language/Version**: TypeScript 5.x, Node.js 20+
**Primary Dependencies**: Astro 5.x, @astrojs/react, Tailwind CSS 4.x, Zod
**Storage**: Fichiers MDX sur le filesystem (Astro Content Collections)
**Testing**: Vitest (tests unitaires navigation existants)
**Target Platform**: Site statique (SSG) — navigateur web
**Project Type**: Web application (site documentaire Astro/Starlight)
**Performance Goals**: Pages statiques < 3s de chargement
**Constraints**: Réutiliser exactement les patterns existants (Framework), pas de nouveau layout/composant
**Scale/Scope**: 11 pages de contenu, ~10 fichiers à modifier, ~13 fichiers à créer

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

| Principle | Status | Justification |
|-----------|--------|---------------|
| I. Intention over Execution | PASS | Spec complète avec user stories, requirements, success criteria avant implémentation |
| II. Empirisme Radical | PASS | Feature de publication de contenu, résultat directement observable et testable |
| III. Orchestration Systémique | PASS | Réutilisation des patterns existants (Framework), pas de nouvelle configuration agent |
| IV. Excellence Produit | PASS | SC-001 à SC-005 définissent des critères mesurables, contenu à valeur directe pour les utilisateurs |
| V. Qualité Intégrée | PASS | Tests unitaires navigation existants à étendre, build Astro valide le contenu, lint existant |

**Gate result**: PASS — Aucune violation.

## Project Structure

### Documentation (this feature)

```text
specs/003-add-constitution-section/
├── plan.md              # This file
├── research.md          # Phase 0 output
├── data-model.md        # Phase 1 output
├── quickstart.md        # Phase 1 output
└── tasks.md             # Phase 2 output (/speckit.tasks)
```

### Source Code (repository root — AIADwebsite)

```text
src/
├── content/
│   ├── config.ts                          # MODIFY: add constitutionCollection
│   ├── constitution/                      # CREATE: entire directory
│   │   ├── preambule.mdx                  # CREATE
│   │   ├── article-i-raison-detre.mdx     # CREATE
│   │   ├── article-ii-valeurs-fondatrices.mdx    # CREATE
│   │   ├── article-iii-ruptures-technologiques.mdx # CREATE
│   │   ├── article-iv-numerique-durable.mdx       # CREATE
│   │   ├── article-v-composantes.mdx              # CREATE
│   │   ├── article-vi-gouvernance.mdx             # CREATE
│   │   ├── article-vii-alis.mdx                   # CREATE
│   │   ├── article-viii-droits-responsabilites.mdx # CREATE
│   │   ├── article-ix-evolution.mdx               # CREATE
│   │   └── signature.mdx                          # CREATE
│   └── framework/                         # (reference pattern — no changes)
├── schemas/
│   ├── docs.ts                            # MODIFY: add 'constitution' to section enum
│   └── navigation.ts                      # MODIFY: add constitution to navigationTreeSchema + refines + error msg
├── types/
│   └── navigation.ts                      # MODIFY: add 'constitution' to NAVIGATION_SECTIONS, update NavigationTree interface
├── data/
│   └── navigation.ts                      # MODIFY: add CONSTITUTION_NAV, update rawNavigationTree + NAVIGATION_COUNTS
├── pages/
│   └── constitution/                      # CREATE: entire directory
│       ├── index.astro                    # CREATE: landing page (copy framework pattern)
│       └── [...slug].astro                # CREATE: dynamic page renderer (copy framework pattern)
├── components/
│   └── layout/
│       ├── Header.astro                   # MODIFY: add Constitution DropdownMenu
│       ├── MobileMenu.astro               # MODIFY: add constitution to sections + detectActiveSection
│       └── Sidebar.astro                  # MODIFY: add constitution to sections + detectActiveSection
└── layouts/
    └── DocsLayout.astro                   # NO CHANGE (generic, works automatically)

tests/
└── unit/
    ├── data/
    │   └── navigation.test.ts             # MODIFY: add constitution chapter count + ID convention + total items
    └── schemas/
        └── navigation.test.ts             # MODIFY: add 'constitution' to section schema test
```

**Structure Decision**: Le site AIADwebsite est un projet Astro existant avec une architecture bien définie. La section Constitution réplique exactement le pattern de la section Framework : collection de contenu → pages dynamiques → navigation centralisée. Aucune nouvelle abstraction n'est nécessaire.

## File Modification Details

### Layer 1 — Data Schema (foundation, must be done first)

**`src/schemas/docs.ts`** — Ajouter `'constitution'` à l'enum `section` (après `'framework'`).

**`src/types/navigation.ts`** — Ajouter `'constitution'` au tuple `NAVIGATION_SECTIONS`. Ajouter la propriété `constitution: NavigationItem[]` à l'interface `NavigationTree`.

**`src/schemas/navigation.ts`** — Ajouter `constitution: z.array(navigationItemSchema)` au `navigationTreeSchema`. Mettre à jour les 3 `.refine()` pour inclure `tree.constitution` dans les vérifications R1, R2, R3. Mettre à jour le message d'erreur `SECTION_INVALID`.

**`src/content/config.ts`** — Ajouter `constitutionCollection` (même pattern que `frameworkCollection`), l'exporter dans `collections`.

### Layer 2 — Navigation Data

**`src/data/navigation.ts`** — Créer `CONSTITUTION_NAV: NavigationItem[]` avec 11 entrées (IDs préfixés `const-`, section `'constitution'`, hrefs `/constitution/[slug]`). Ajouter `CONSTITUTION_CHAPTERS: 11` à `NAVIGATION_COUNTS`, mettre à jour `TOTAL_ITEMS` (71 → 82). Ajouter `constitution: CONSTITUTION_NAV` au `rawNavigationTree`.

### Layer 3 — Content (11 fichiers MDX)

Chaque fichier dans `src/content/constitution/` suit le frontmatter :
```yaml
title: "[Titre]"
description: "[Description courte]"
order: [1-11]
section: "constitution"
isEssential: [true pour Préambule et Art. II]
```

Le corps de chaque fichier contient le texte exact de la Constitution v1.0.

### Layer 4 — Pages (routing)

**`src/pages/constitution/index.astro`** — Copier le pattern de `src/pages/framework/index.astro`, remplacer `'framework'` par `'constitution'`, adapter titre et description.

**`src/pages/constitution/[...slug].astro`** — Copier le pattern de `src/pages/framework/[...slug].astro`, remplacer `'framework'` par `'constitution'`.

### Layer 5 — UI Components (navigation visible)

**`src/components/layout/Header.astro`** — Ajouter un `<DropdownMenu>` pour Constitution entre Framework et Mode Opératoire.

**`src/components/layout/MobileMenu.astro`** — Ajouter constitution à la liste `sections` et à `detectActiveSection()`.

**`src/components/layout/Sidebar.astro`** — Ajouter constitution à la liste `sections` et à `detectActiveSection()`.

### Layer 6 — Tests

**`tests/unit/data/navigation.test.ts`** — Ajouter test "Constitution contient exactement 11 chapitres". Ajouter test "IDs Constitution commencent par const-". Ajouter test section/href. Mettre à jour le test total items (71 → 82). Inclure `...NAVIGATION_TREE.constitution` dans le calcul du total.

**`tests/unit/schemas/navigation.test.ts`** — Ajouter `'constitution'` au `it.each` des sections valides.

## Content Mapping (11 pages)

| # | Slug | Title | Order | isEssential |
|---|------|-------|-------|-------------|
| 1 | `preambule` | Préambule | 1 | true |
| 2 | `article-i-raison-detre` | Article I — Raison d'être | 2 | false |
| 3 | `article-ii-valeurs-fondatrices` | Article II — Les Valeurs Fondatrices | 3 | true |
| 4 | `article-iii-ruptures-technologiques` | Article III — Vision des Ruptures Technologiques | 4 | false |
| 5 | `article-iv-numerique-durable` | Article IV — Numérique Durable | 5 | false |
| 6 | `article-v-composantes` | Article V — Les Composantes du Projet | 6 | false |
| 7 | `article-vi-gouvernance` | Article VI — Gouvernance | 7 | false |
| 8 | `article-vii-alis` | Article VII — ALIS comme Mécanisme Constitutionnel | 8 | false |
| 9 | `article-viii-droits-responsabilites` | Article VIII — Droits et Responsabilités des Membres | 9 | false |
| 10 | `article-ix-evolution` | Article IX — Évolution de cette Constitution | 10 | false |
| 11 | `signature` | Signature | 11 | false |

## Navigation Data (CONSTITUTION_NAV)

| ID | Label | Href | Order | Badge |
|----|-------|------|-------|-------|
| `const-preambule` | Préambule | `/constitution/preambule` | 1 | essential |
| `const-article-i` | Article I — Raison d'être | `/constitution/article-i-raison-detre` | 2 | — |
| `const-article-ii` | Article II — Les Valeurs Fondatrices | `/constitution/article-ii-valeurs-fondatrices` | 3 | essential |
| `const-article-iii` | Article III — Ruptures Technologiques | `/constitution/article-iii-ruptures-technologiques` | 4 | — |
| `const-article-iv` | Article IV — Numérique Durable | `/constitution/article-iv-numerique-durable` | 5 | — |
| `const-article-v` | Article V — Les Composantes | `/constitution/article-v-composantes` | 6 | — |
| `const-article-vi` | Article VI — Gouvernance | `/constitution/article-vi-gouvernance` | 7 | — |
| `const-article-vii` | Article VII — ALIS | `/constitution/article-vii-alis` | 8 | — |
| `const-article-viii` | Article VIII — Droits & Responsabilités | `/constitution/article-viii-droits-responsabilites` | 9 | — |
| `const-article-ix` | Article IX — Évolution | `/constitution/article-ix-evolution` | 10 | — |
| `const-signature` | Signature | `/constitution/signature` | 11 | — |

## Implementation Order

1. **Layer 1** — Data Schema (schemas, types, config) — fondation
2. **Layer 2** — Navigation data (CONSTITUTION_NAV, counts, tree)
3. **Layer 3** — Content MDX files (11 fichiers)
4. **Layer 4** — Pages Astro (index + dynamic)
5. **Layer 5** — UI Components (Header, Sidebar, MobileMenu)
6. **Layer 6** — Tests (navigation, schemas)
7. **Validation** — `npm run lint && npm test && npm run build`

## Complexity Tracking

> No Constitution Check violations. No complexity justifications needed.
