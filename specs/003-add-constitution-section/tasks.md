# Tasks: Add Constitution Section

**Input**: Design documents from `/specs/003-add-constitution-section/`
**Prerequisites**: plan.md, spec.md, research.md, data-model.md, quickstart.md

**Tests**: Tests are included — the project has existing navigation tests that MUST be updated.

**Organization**: Tasks are grouped by user story to enable independent implementation and testing of each story.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (e.g., US1, US2, US3)
- Include exact file paths in descriptions

## Path Conventions

- **Web app**: Source files in `src/` at AIADwebsite root (`c:\Users\steeve.evers\OneDrive - CONSERTO\projets\AIADwebsite`)
- **Tests**: `tests/unit/` at AIADwebsite root

---

## Phase 1: Foundational (Schema & Type Layer)

**Purpose**: Schema and type changes that MUST be complete before any content, navigation or UI work can begin. These files are imported by everything else.

**CRITICAL**: No user story work can begin until this phase is complete.

- [x] T001 [P] Add `'constitution'` to section enum in `src/schemas/docs.ts` — insert after `'framework'` in the `z.enum()` array
- [x] T002 [P] Add `'constitution'` to `NAVIGATION_SECTIONS` tuple and add `constitution: NavigationItem[]` property to `NavigationTree` interface in `src/types/navigation.ts`
- [x] T003 Add `constitution` to `navigationTreeSchema` in `src/schemas/navigation.ts` — add `constitution: z.array(navigationItemSchema)` to the `z.object()`, include `tree.constitution` in all 3 `.refine()` callbacks (R1 depth, R2 IDs, R3 order), and update `SECTION_INVALID` error message to include 'constitution'
- [x] T004 Add `constitutionCollection` to `src/content/config.ts` — define `defineCollection({ type: 'content', schema: docsSchema })` and add `constitution: constitutionCollection` to the `collections` export

**Checkpoint**: Schema foundation ready — all types, schemas and content config now support the 'constitution' section.

---

## Phase 2: User Story 1 — Naviguer vers la section Constitution (Priority: P1) + User Story 2 — Lire le contenu complet (Priority: P1) MVP

**Goal**: A visitor can access the Constitution section from the main navigation, see the list of all articles, click on any article, and read the exact founding text of the Constitution AIAD v1.0 on dedicated pages with sidebar and TOC.

**Independent Test**: Navigate to `/constitution`, verify the index page lists all 11 articles. Click on any article, verify the full text is displayed with sidebar navigation and TOC. Verify the Constitution dropdown appears in the header between Framework and Mode Operatoire.

### Navigation Data

- [x] T005 [US1] Create `CONSTITUTION_NAV` array (11 items) in `src/data/navigation.ts` — IDs prefixed `const-`, section `'constitution'`, hrefs `/constitution/[slug]`, orders 1-11, badges `essential` on `const-preambule` and `const-article-ii`. Add `CONSTITUTION_CHAPTERS: 11` to `NAVIGATION_COUNTS` and update `TOTAL_ITEMS` from 71 to 82. Add `constitution: CONSTITUTION_NAV` to `rawNavigationTree`.

### Content Files (11 MDX files)

- [x] T006 [P] [US2] Create `src/content/constitution/preambule.mdx` with frontmatter (title: "Préambule", description: "Introduction à la Constitution AIAD — contexte, opportunités et risques de l'ère des agents IA.", order: 1, section: "constitution", isEssential: true) and exact text from Constitution v1.0: epigraph quote + Préambule section
- [x] T007 [P] [US2] Create `src/content/constitution/article-i-raison-detre.mdx` with frontmatter (title: "Article I — Raison d'être", description: "AIAD existe pour rendre le développement logiciel plus humain à l'ère des agents IA.", order: 2, section: "constitution") and exact Article I text including ODD alignment
- [x] T008 [P] [US2] Create `src/content/constitution/article-ii-valeurs-fondatrices.mdx` with frontmatter (title: "Article II — Les Valeurs Fondatrices", description: "Les six valeurs immuables du projet AIAD : Primauté de l'Intention Humaine, Honnêteté, Sobriété, Ouverture, Empirisme, Responsabilité.", order: 3, section: "constitution", isEssential: true) and exact Article II text with all 6 values
- [x] T009 [P] [US2] Create `src/content/constitution/article-iii-ruptures-technologiques.mdx` with frontmatter (title: "Article III — Vision des Ruptures Technologiques", description: "Position d'AIAD sur l'IA, l'informatique quantique et les interfaces cerveau-machine.", order: 4, section: "constitution") and exact Article III text
- [x] T010 [P] [US2] Create `src/content/constitution/article-iv-numerique-durable.mdx` with frontmatter (title: "Article IV — Numérique Durable", description: "L'engagement de la contradiction : mesurer et réduire l'empreinte des workflows AIAD.", order: 5, section: "constitution") and exact Article IV text
- [x] T011 [P] [US2] Create `src/content/constitution/article-v-composantes.mdx` with frontmatter (title: "Article V — Les Composantes du Projet", description: "Les trois composantes interdépendantes : AIAD, SDD Mode et ALIS.", order: 6, section: "constitution") and exact Article V text
- [x] T012 [P] [US2] Create `src/content/constitution/article-vi-gouvernance.mdx` with frontmatter (title: "Article VI — Gouvernance", description: "Deux sphères de gouvernance : la sphère des valeurs (Gardien) et la sphère des pratiques (Communauté).", order: 7, section: "constitution") and exact Article VI text
- [x] T013 [P] [US2] Create `src/content/constitution/article-vii-alis.mdx` with frontmatter (title: "Article VII — ALIS comme Mécanisme Constitutionnel", description: "Le rythme lunaire comme principe de gouvernance et les limites de l'automatisation.", order: 8, section: "constitution") and exact Article VII text
- [x] T014 [P] [US2] Create `src/content/constitution/article-viii-droits-responsabilites.mdx` with frontmatter (title: "Article VIII — Droits et Responsabilités des Membres", description: "Ce que la communauté peut attendre du projet et ce que le projet attend de la communauté.", order: 9, section: "constitution") and exact Article VIII text
- [x] T015 [P] [US2] Create `src/content/constitution/article-ix-evolution.mdx` with frontmatter (title: "Article IX — Évolution de cette Constitution", description: "Processus d'amendement, articles amendables et versioning de la Constitution.", order: 10, section: "constitution") and exact Article IX text
- [x] T016 [P] [US2] Create `src/content/constitution/signature.mdx` with frontmatter (title: "Signature", description: "Signature du texte fondateur par Steeve Evers, fondateur du projet AIAD.", order: 11, section: "constitution") and exact Signature text

### Pages (Astro routing)

- [x] T017 [P] [US1] Create `src/pages/constitution/index.astro` — copy pattern from `src/pages/framework/index.astro`, replace collection `'framework'` with `'constitution'`, adapt title to "Constitution AIAD" and description to introduce the founding text
- [x] T018 [P] [US1] Create `src/pages/constitution/[...slug].astro` — copy pattern from `src/pages/framework/[...slug].astro`, replace collection type `'framework'` with `'constitution'`

### UI Components (Navigation)

- [x] T019 [P] [US1] Add Constitution `<DropdownMenu>` in `src/components/layout/Header.astro` — insert between Framework and Mode Opératoire dropdowns with label "Constitution", section "constitution", items `tree.constitution`, href "/constitution"
- [x] T020 [P] [US1] Add constitution to `src/components/layout/Sidebar.astro` — add `if (currentPath.startsWith('/constitution')) return 'constitution'` to `detectActiveSection()` and add `{ key: 'constitution', label: 'Constitution', items: [...tree.constitution].sort((a, b) => a.order - b.order), href: '/constitution' }` to the `sections` array
- [x] T021 [P] [US1] Add constitution to `src/components/layout/MobileMenu.astro` — add `if (currentPath.startsWith('/constitution')) return 'constitution'` to `detectActiveSection()` and add `{ key: 'constitution', label: 'Constitution', items: [...tree.constitution].sort((a, b) => a.order - b.order), href: '/constitution' }` to the `sections` array

**Checkpoint**: At this point, US1 + US2 should be fully functional — Constitution section visible in navigation, index page lists all 11 articles, each article page displays the full founding text with sidebar and TOC.

---

## Phase 3: User Story 3 — Naviguer entre les articles séquentiellement (Priority: P2)

**Goal**: A visitor reading the Constitution can navigate from one article to the next/previous without returning to the index page.

**Independent Test**: Open any article (e.g., Article III), verify "Précédent" links to Article II and "Suivant" links to Article IV. Verify first article has no "Précédent" and last article has no "Suivant".

- [x] T022 [US3] Verify prev/next navigation works correctly on Constitution pages — the existing `DocsLayout.astro` handles prev/next automatically from `NAVIGATION_TREE`. Verify by building the site and checking that prev/next links appear on all Constitution article pages with correct targets. If prev/next does not work automatically, investigate the `PrevNext` component logic and fix the section detection.

**Checkpoint**: All user stories (US1, US2, US3) should now be independently functional and testable.

---

## Phase 4: Tests

**Purpose**: Update existing navigation tests and schema tests to include the Constitution section.

- [x] T023 [P] Add Constitution chapter count test in `tests/unit/data/navigation.test.ts` — add `it('Constitution contient exactement 11 chapitres')` checking `NAVIGATION_TREE.constitution` length equals `NAVIGATION_COUNTS.CONSTITUTION_CHAPTERS` and equals 11
- [x] T024 [P] Add Constitution ID naming convention test in `tests/unit/data/navigation.test.ts` — add `it('les IDs Constitution commencent par "const-"')` checking all items match `/^const-/`
- [x] T025 [P] Add Constitution section and href tests in `tests/unit/data/navigation.test.ts` — add tests checking all items have `section: 'constitution'` and hrefs match `/^\/constitution\/[a-z0-9-]+$/`
- [x] T026 Update total items count test in `tests/unit/data/navigation.test.ts` — update the `'le nombre total d'items dans l'arbre est 71'` test to include `...NAVIGATION_TREE.constitution` in the total count and change expected value from 71 to 82
- [x] T027 [P] Add `'constitution'` to valid sections test in `tests/unit/schemas/navigation.test.ts` — add `'constitution'` to the `it.each` array in the `navigationSectionSchema` test

**Checkpoint**: All tests pass, Constitution section is fully covered by existing test infrastructure.

---

## Phase 5: Polish & Validation

**Purpose**: Final build validation and cross-cutting checks.

- [x] T028 Run `npm run lint` in AIADwebsite root and fix any linting errors
- [x] T029 Run `npm test` in AIADwebsite root and verify all tests pass (including new Constitution tests)
- [x] T030 Run `npm run build` in AIADwebsite root and verify the site builds successfully with all 11 Constitution pages generated

---

## Dependencies & Execution Order

### Phase Dependencies

- **Foundational (Phase 1)**: No dependencies — can start immediately. BLOCKS all other phases.
- **US1+US2 (Phase 2)**: Depends on Phase 1 completion
- **US3 (Phase 3)**: Depends on Phase 2 completion (needs navigation data and pages)
- **Tests (Phase 4)**: Depends on Phase 2 completion (needs navigation data in place)
- **Polish (Phase 5)**: Depends on all previous phases

### User Story Dependencies

- **US1+US2 (P1)**: Merged into Phase 2 because they are co-dependent — navigation requires content to test, content requires pages to display
- **US3 (P2)**: Depends on US1+US2 — prev/next requires navigation tree and pages to exist

### Within Phase 2

- T005 (navigation data) must complete before T019-T021 (UI components reference `tree.constitution`)
- T006-T016 (MDX content) can all run in parallel — each is an independent file
- T017-T018 (pages) can run in parallel with T006-T016 — different directories
- T019-T021 (UI components) can all run in parallel — different files

### Parallel Opportunities

```text
Phase 1: T001 || T002 (then T003 depends on T002, T004 independent)
Phase 2: After T005 →
  Content:    T006 || T007 || T008 || T009 || T010 || T011 || T012 || T013 || T014 || T015 || T016
  Pages:      T017 || T018
  Components: T019 || T020 || T021
Phase 4: T023 || T024 || T025 || T027 (then T026 after verifying counts)
```

---

## Parallel Example: Phase 2 (US1+US2)

```bash
# After T005 (navigation data), launch all content files in parallel:
Task: "Create preambule.mdx in src/content/constitution/"
Task: "Create article-i-raison-detre.mdx in src/content/constitution/"
Task: "Create article-ii-valeurs-fondatrices.mdx in src/content/constitution/"
# ... (all 11 MDX files simultaneously)

# Simultaneously, create pages:
Task: "Create index.astro in src/pages/constitution/"
Task: "Create [...slug].astro in src/pages/constitution/"

# Simultaneously, update UI components:
Task: "Add Constitution to Header.astro"
Task: "Add Constitution to Sidebar.astro"
Task: "Add Constitution to MobileMenu.astro"
```

---

## Implementation Strategy

### MVP First (US1 + US2)

1. Complete Phase 1: Foundational (4 tasks — schema layer)
2. Complete Phase 2: US1+US2 (17 tasks — navigation + content + pages + UI)
3. **STOP and VALIDATE**: Build site, navigate to `/constitution`, verify all 11 articles render correctly
4. Deploy/demo if ready — visitors can now access and read the full Constitution

### Incremental Delivery

1. Phase 1 (Foundational) → Schema ready
2. Phase 2 (US1+US2) → Navigation + Content → **MVP deployed**
3. Phase 3 (US3) → Verify prev/next → Complete reading experience
4. Phase 4 (Tests) → Regression safety net
5. Phase 5 (Polish) → Clean build, lint, tests all green

---

## Notes

- [P] tasks = different files, no dependencies
- [Story] label maps task to specific user story for traceability
- US1 and US2 are merged in Phase 2 because they are co-dependent (navigation needs content, content needs pages)
- US3 should work automatically via DocsLayout prev/next — T022 is a verification/fix task
- The Constitution text MUST be copied exactly as provided — no modifications, no summaries
- Commit after each phase completion
- The AIADwebsite project root is at `c:\Users\steeve.evers\OneDrive - CONSERTO\projets\AIADwebsite`
