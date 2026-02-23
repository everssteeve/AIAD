# Tasks: AIAD Framework Web Application

**Input**: Design documents from `/specs/001-aiad-framework-webapp/`
**Prerequisites**: plan.md (required), spec.md (required), research.md, data-model.md, contracts/routes.md, quickstart.md

**Tests**: Test tasks are included as E2E validation at the end of each user story phase, not as TDD (not explicitly requested in spec).

**Organization**: Tasks are grouped by user story to enable independent implementation and testing of each story.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (e.g., US1, US2, US3)
- Include exact file paths in descriptions

---

## Phase 1: Setup

**Purpose**: Project initialization, Astro + Starlight scaffolding, and base configuration

- [X] T001 Initialize Astro project with `npm create astro@latest` in repository root
- [X] T002 Install core dependencies: @astrojs/starlight, @astrojs/react, @astrojs/tailwind, react, react-dom, tailwindcss (package.json)
- [X] T003 Configure Astro with Starlight integration, French locale, and site metadata in astro.config.mjs
- [X] T004 [P] Configure Tailwind CSS with Starlight preset in tailwind.config.mjs
- [X] T005 [P] Configure TypeScript strict mode in tsconfig.json
- [X] T006 [P] Create custom Starlight style overrides in src/styles/custom.css

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Content infrastructure and shared components that ALL user stories depend on

**CRITICAL**: No user story work can begin until this phase is complete

- [X] T007 Define Content Collections schema with Zod validation for docs frontmatter (title, description, sidebar, readingTime, prev, next, centralQuestion, focus, owner, templateFile) in src/content/config.ts
- [X] T008 Create the homepage src/content/docs/fr/index.mdx with hero section, framework overview, "Commencer" CTA, and quick navigation by question ("C'est quoi AIAD ?", "Qui fait quoi ?", etc.)
- [X] T009 [P] Create QuickNavigation.astro component with FAQ-style links mapped to framework sections in src/components/QuickNavigation.astro
- [X] T010 [P] Create DownloadButton.astro component that generates a download link for a given template file path in src/components/DownloadButton.astro
- [X] T011 Configure Starlight sidebar navigation with all sections, roles, artefacts, and metriques groups in astro.config.mjs sidebar property
- [X] T012 Configure redirect from `/` to `/fr/` in astro.config.mjs redirects property

**Checkpoint**: Foundation ready — Astro builds, homepage loads, sidebar navigation works, Pagefind search functional

---

## Phase 3: User Story 1 — Découvrir le framework AIAD (Priority: P1) MVP

**Goal**: A visitor can navigate the 8 framework sections with prev/next links, progress indicator, search, and cross-references

**Independent Test**: Navigate all 8 sections sequentially, verify content renders, prev/next links work, search returns results, progress indicator updates

### Implementation for User Story 1

- [X] T013 [P] [US1] Create src/content/docs/fr/01-preambule.mdx with full Préambule content adapted from AIADwebsite framework, frontmatter (title, description, sidebar order:1, readingTime:8, next link)
- [X] T014 [P] [US1] Create src/content/docs/fr/02-vision-philosophie.mdx with full Vision et Philosophie content, frontmatter (sidebar order:2, readingTime:10, prev/next links)
- [X] T015 [P] [US1] Create src/content/docs/fr/03-ecosysteme.mdx with Ecosystème overview content (role details deferred to US2), frontmatter (sidebar order:3, readingTime:12, prev/next links)
- [X] T016 [P] [US1] Create src/content/docs/fr/04-artefacts.mdx with Artefacts overview content (template details deferred to US3), frontmatter (sidebar order:4, readingTime:15, prev/next links)
- [X] T017 [P] [US1] Create src/content/docs/fr/05-boucles-iteratives.mdx with full Boucles Itératives content, frontmatter (sidebar order:5, readingTime:12, prev/next links)
- [X] T018 [P] [US1] Create src/content/docs/fr/06-synchronisations.mdx with full Synchronisations content, frontmatter (sidebar order:6, readingTime:10, prev/next links)
- [X] T019 [P] [US1] Create src/content/docs/fr/07-metriques.mdx with Métriques overview content (dashboard details deferred to US4), frontmatter (sidebar order:7, readingTime:12, prev/next links)
- [X] T020 [P] [US1] Create src/content/docs/fr/08-annexes.mdx with Annexes index content, frontmatter (sidebar order:8, readingTime:5, prev link)
- [X] T021 [US1] Verify all prev/next links form a complete chain across all 8 sections (01→02→03→04→05→06→07→08) and all cross-references between sections are working internal links
- [X] T022 [US1] Verify Pagefind search indexes all 8 sections by running `npm run build` and testing search in preview mode

**Checkpoint**: All 8 framework sections navigable with working prev/next, search, and cross-references. MVP is functional.

---

## Phase 4: User Story 2 — Explorer les rôles et responsabilités (Priority: P2)

**Goal**: A visitor can select a role, view its detailed guide (responsibilities, KPIs, anti-patterns), see role interactions, and explore team configurations

**Independent Test**: Select each of the 5 roles, verify guide content displays correctly, role interaction visualization renders, team configurator shows correct distributions for all 3 team sizes

### Implementation for User Story 2

- [X] T023 [US2] Create RoleCard.tsx interactive component in src/components/RoleCard.tsx — displays a selectable card for each role with icon, name, central question, and focus area
- [X] T024 [P] [US2] Create RoleInteractions.tsx component in src/components/RoleInteractions.tsx — SVG/CSS visualization showing how a selected role collaborates with the 4 other responsibilities
- [X] T025 [P] [US2] Create TeamConfigurator.tsx component in src/components/TeamConfigurator.tsx — interactive selector for team size (2-3, 4-6, 7+) displaying recommended responsibility distribution per person
- [X] T026 [US2] Create src/content/docs/fr/roles/index.mdx with roles overview, summary table (Responsabilité / Question centrale / Focus), and RoleCard selector using `<RoleCard client:load />`
- [X] T027 [P] [US2] Create src/content/docs/fr/roles/product-manager.mdx with full PM guide: essence, actions table, competencies, indicators (>70% outcome criteria, <2 weeks insight-to-release), anti-pattern, and `<RoleInteractions client:visible role="pm" />` and `<TeamConfigurator client:visible />`
- [X] T028 [P] [US2] Create src/content/docs/fr/roles/product-engineer.mdx with full PE guide: essence, actions table, competencies, indicators (>70% first-time success, >80/20 ratio, >80% coverage), anti-pattern, and interactive components
- [X] T029 [P] [US2] Create src/content/docs/fr/roles/agents-engineer.mdx with full AE guide: essence, agent ecosystem levels diagram, selection principles, indicators (>90% adoption, <20% false positives, >8/10 satisfaction), anti-pattern, and interactive components
- [X] T030 [P] [US2] Create src/content/docs/fr/roles/qa-engineer.mdx with full QA guide: essence, 4 validation levels table, actions table, indicators (decreasing bugs, <24h detection, <5% regression), anti-pattern, and interactive components
- [X] T031 [P] [US2] Create src/content/docs/fr/roles/tech-lead.mdx with full Tech Lead guide: essence, decision types table, actions table, indicators (stable debt, <10% revisited decisions, <2h reviews), anti-pattern, and interactive components
- [X] T032 [US2] Update src/content/docs/fr/03-ecosysteme.mdx to add internal links to each role guide page under `/fr/roles/`

**Checkpoint**: All 5 role guides accessible with interactive components. Role interactions and team configurator functional on each role page.

---

## Phase 5: User Story 3 — Accéder aux templates d'artefacts (Priority: P3)

**Goal**: A visitor can view artifact descriptions, browse template structure, and download each template as Markdown

**Independent Test**: Access each of the 6 artifact pages, verify description and quality criteria render, click download on each template and confirm a valid .md file is obtained

### Implementation for User Story 3

- [X] T033 [P] [US3] Create src/assets/templates/prd-template.md with the PRD template content (sections: Contexte et Problème, Outcome Criteria, Personas, Hors Périmètre, Trade-offs, Dépendances)
- [X] T034 [P] [US3] Create src/assets/templates/architecture-template.md with the ARCHITECTURE template content (sections: Principes, Vue d'Ensemble, Stack, Structure, Conventions, Patterns, Sécurité, Performance, ADR)
- [X] T035 [P] [US3] Create src/assets/templates/agent-guide-template.md with the AGENT-GUIDE template content (sections: Identité, Documentation, Stack, Règles Absolues, Conventions, Vocabulaire, Patterns, Anti-Patterns, Notes)
- [X] T036 [P] [US3] Create src/assets/templates/specs-template.md with the SPECS template content (sections: Contexte, Périmètre, Fichiers, Interface, Comportement, Validation, Business Rules, Tests, Exemples, DoD)
- [X] T037 [P] [US3] Create src/assets/templates/dood-template.md with the DoOD checklist template (categories: Techniques, Sécurité, Performance, Fonctionnels, Déploiement, Review)
- [X] T038 [P] [US3] Create src/assets/templates/dooud-template.md with the DoOuD template (categories: User Outcomes, Business Outcomes, Learning Outcomes, measurement process)
- [X] T039 [US3] Create src/content/docs/fr/artefacts/index.mdx with artefacts overview, summary table (Artefact / Question centrale / Responsable), 4 quality criteria, and links to each artifact page
- [X] T040 [P] [US3] Create src/content/docs/fr/artefacts/prd.mdx with PRD description, content table, best practices, indicators, anti-pattern, template preview, and `<DownloadButton file="/templates/prd-template.md" label="Télécharger le template PRD" />`
- [X] T041 [P] [US3] Create src/content/docs/fr/artefacts/architecture.mdx with ARCHITECTURE description, content table, best practices, indicators, anti-pattern, template preview, and DownloadButton
- [X] T042 [P] [US3] Create src/content/docs/fr/artefacts/agent-guide.mdx with AGENT-GUIDE description, content table, best practices, indicators, anti-pattern, template preview, and DownloadButton
- [X] T043 [P] [US3] Create src/content/docs/fr/artefacts/specs.mdx with SPECS description, 4 quality criteria table, content table, best practices, indicators, anti-pattern, template preview, and DownloadButton
- [X] T044 [P] [US3] Create src/content/docs/fr/artefacts/dood.mdx with DoOD description, criteria categories, "NOT Done" table, non-negotiable principle, template preview, and DownloadButton
- [X] T045 [P] [US3] Create src/content/docs/fr/artefacts/dooud.mdx with DoOuD description, metric categories, measurement process, indicators, template preview, and DownloadButton
- [X] T046 [US3] Update src/content/docs/fr/04-artefacts.mdx to add internal links to each artifact detail page under `/fr/artefacts/`
- [X] T047 [US3] Verify all 6 template files are served correctly at `/templates/*.md` by running `npm run build` and checking the dist/ output

**Checkpoint**: All 6 artifact pages with descriptions, previews, and working download links. Templates downloadable as .md files.

---

## Phase 6: User Story 4 — Consulter les métriques et dashboards (Priority: P4)

**Goal**: A visitor can explore the 5 metric categories with targets, frequencies, interpretation signals, and visual dashboard mockups

**Independent Test**: Navigate each of the 5 metric category pages, verify tables render correctly, Chart.js dashboard mockups load and display sample data

### Implementation for User Story 4

- [X] T048 [US4] Install chart.js and react-chartjs-2 dependencies, verify React island hydration works with Chart.js by creating a minimal test chart
- [X] T049 [US4] Create DashboardMockup.tsx component in src/components/DashboardMockup.tsx — renders Chart.js visualizations (bar, line, radar charts) with sample AIAD metric data, accepting a `category` prop to display category-specific charts
- [X] T050 [US4] Create src/content/docs/fr/metriques/index.mdx with metrics overview, summary table (Catégorie / Question centrale / Fréquence), and links to each category page
- [X] T051 [P] [US4] Create src/content/docs/fr/metriques/productivite.mdx with Productivité metrics table (Cycle Time, Lead Time, Throughput, Release Frequency, Deployment Success Rate), signal interpretation table, and `<DashboardMockup client:visible category="productivite" />`
- [X] T052 [P] [US4] Create src/content/docs/fr/metriques/qualite.mdx with Qualité metrics table (Couverture Tests, Bugs Production, MTTD, MTTR, Dette Technique, First-Time Success), signal interpretation, and DashboardMockup
- [X] T053 [P] [US4] Create src/content/docs/fr/metriques/efficacite-ia.mdx with Efficacité IA metrics table (Adoption, First-Time Success, Ratio Généré/Manuel, Itérations, Faux Positifs, Temps Résolution, Satisfaction), signal interpretation, and DashboardMockup
- [X] T054 [P] [US4] Create src/content/docs/fr/metriques/outcomes.mdx with Outcomes metrics table (Atteinte Criteria, NPS/CSAT, Adoption, Time to Value, Retention, Business Impact), signal interpretation, and DashboardMockup
- [X] T055 [P] [US4] Create src/content/docs/fr/metriques/equipe.mdx with Équipe metrics table (Satisfaction, Psychological Safety, Temps en Flow, Turnover, Sick Days), signal interpretation, and DashboardMockup
- [X] T056 [US4] Update src/content/docs/fr/07-metriques.mdx to add internal links to each metric category page under `/fr/metriques/`

**Checkpoint**: All 5 metric categories with tables, interpretation signals, and interactive Chart.js dashboard mockups.

---

## Phase 7: Polish & Cross-Cutting Concerns

**Purpose**: Final quality pass, cross-references, responsive validation, and build verification

- [X] T057 [P] Audit all cross-references between sections: verify every "Voir section X" or "Voir Annexe Y" is a working internal link across all .mdx files
- [X] T058 [P] Verify responsive design on mobile (320px), tablet (768px), and desktop (1280px) for all page types (section, role, artifact, metrics)
- [X] T059 [P] Verify Pagefind search indexes all content pages (sections, roles, artifacts, metrics) and returns relevant French-language results
- [X] T060 Run full `npm run build` and verify dist/ output: all routes from contracts/routes.md exist, all template files present in dist/templates/, no build errors or warnings
- [X] T061 Run Lighthouse audit on built site preview and verify score >95 for Performance, Accessibility, Best Practices, and SEO
- [X] T062 Validate quickstart.md verification checklist: all items pass on a clean checkout

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies — can start immediately
- **Foundational (Phase 2)**: Depends on Setup completion — BLOCKS all user stories
- **User Story 1 (Phase 3)**: Depends on Foundational — core content pages
- **User Story 2 (Phase 4)**: Depends on Foundational — can run in parallel with US1
- **User Story 3 (Phase 5)**: Depends on Foundational — can run in parallel with US1 and US2
- **User Story 4 (Phase 6)**: Depends on Foundational — can run in parallel with US1, US2, US3
- **Polish (Phase 7)**: Depends on ALL user stories being complete

### User Story Dependencies

- **US1 (P1)**: Can start after Foundational (Phase 2) — No dependencies on other stories
- **US2 (P2)**: Can start after Foundational (Phase 2) — T032 updates the US1 ecosystem page but is not blocked by it
- **US3 (P3)**: Can start after Foundational (Phase 2) — T046 updates the US1 artefacts page but is not blocked by it
- **US4 (P4)**: Can start after Foundational (Phase 2) — T056 updates the US1 metriques page but is not blocked by it

### Within Each User Story

- Content pages marked [P] can all be created in parallel (different files)
- React components must be created before the .mdx pages that import them
- Index/overview pages should be created after detail pages (to verify links)
- Cross-reference update tasks (T021, T032, T046, T056) run last in their phase

### Parallel Opportunities

- All 8 framework section pages (T013–T020) can be created in parallel
- All 5 role guide pages (T027–T031) can be created in parallel (after T023–T025 components)
- All 6 template files (T033–T038) can be created in parallel
- All 6 artifact pages (T040–T045) can be created in parallel (after templates exist)
- All 5 metric pages (T051–T055) can be created in parallel (after T049 DashboardMockup)

---

## Parallel Example: User Story 1

```bash
# Launch all 8 framework sections together:
Task: "Create 01-preambule.mdx in src/content/docs/fr/01-preambule.mdx"
Task: "Create 02-vision-philosophie.mdx in src/content/docs/fr/02-vision-philosophie.mdx"
Task: "Create 03-ecosysteme.mdx in src/content/docs/fr/03-ecosysteme.mdx"
Task: "Create 04-artefacts.mdx in src/content/docs/fr/04-artefacts.mdx"
Task: "Create 05-boucles-iteratives.mdx in src/content/docs/fr/05-boucles-iteratives.mdx"
Task: "Create 06-synchronisations.mdx in src/content/docs/fr/06-synchronisations.mdx"
Task: "Create 07-metriques.mdx in src/content/docs/fr/07-metriques.mdx"
Task: "Create 08-annexes.mdx in src/content/docs/fr/08-annexes.mdx"
```

---

## Parallel Example: User Story 3

```bash
# Launch all 6 template files together:
Task: "Create prd-template.md in src/assets/templates/prd-template.md"
Task: "Create architecture-template.md in src/assets/templates/architecture-template.md"
Task: "Create agent-guide-template.md in src/assets/templates/agent-guide-template.md"
Task: "Create specs-template.md in src/assets/templates/specs-template.md"
Task: "Create dood-template.md in src/assets/templates/dood-template.md"
Task: "Create dooud-template.md in src/assets/templates/dooud-template.md"

# Then launch all 6 artifact pages together:
Task: "Create prd.mdx in src/content/docs/fr/artefacts/prd.mdx"
Task: "Create architecture.mdx in src/content/docs/fr/artefacts/architecture.mdx"
Task: "Create agent-guide.mdx in src/content/docs/fr/artefacts/agent-guide.mdx"
Task: "Create specs.mdx in src/content/docs/fr/artefacts/specs.mdx"
Task: "Create dood.mdx in src/content/docs/fr/artefacts/dood.mdx"
Task: "Create dooud.mdx in src/content/docs/fr/artefacts/dooud.mdx"
```

---

## Implementation Strategy

### MVP First (User Story 1 Only)

1. Complete Phase 1: Setup
2. Complete Phase 2: Foundational (CRITICAL — blocks all stories)
3. Complete Phase 3: User Story 1
4. **STOP and VALIDATE**: Test all 8 sections navigable with search
5. Deploy/demo if ready

### Incremental Delivery

1. Complete Setup + Foundational → Foundation ready
2. Add User Story 1 → Test independently → Deploy/Demo (MVP!)
3. Add User Story 2 → Test independently → Deploy/Demo
4. Add User Story 3 → Test independently → Deploy/Demo
5. Add User Story 4 → Test independently → Deploy/Demo
6. Polish phase → Final validation → Production release

### Parallel Team Strategy

With multiple developers:

1. Team completes Setup + Foundational together
2. Once Foundational is done:
   - Developer A: User Story 1 (8 content pages)
   - Developer B: User Story 2 (components + 5 role pages)
   - Developer C: User Story 3 (6 templates + 6 artifact pages)
   - Developer D: User Story 4 (DashboardMockup + 5 metric pages)
3. Stories complete and integrate independently

---

## Notes

- [P] tasks = different files, no dependencies
- [Story] label maps task to specific user story for traceability
- Each user story should be independently completable and testable
- Commit after each task or logical group
- Stop at any checkpoint to validate story independently
- Content for .mdx files should be adapted from the AIADwebsite repository framework/ Markdown files
- React components use `client:visible` for lazy hydration (except RoleCard which uses `client:load`)
