# Tasks: Responsive Design Complet

**Branch**: `002-responsive-design` | **Date**: 2026-02-25
**Spec**: [spec.md](./spec.md) | **Plan**: [plan.md](./plan.md)

## Phase 1: Setup

No setup tasks required. The project is already initialized with all dependencies (Astro 5.x, Starlight, React 19, Recharts, chart.js). No new packages are needed — this feature is CSS-first.

## Phase 2: Foundation (Blocking)

All subsequent user story phases depend on these foundational CSS changes.

**Goal**: Establish the responsive design token system and global CSS rules that all components will rely on.

- [x] T001 Add responsive design CSS custom properties (breakpoints, touch targets) to `src/styles/custom.css` — Define `:root` variables `--rd-bp-mobile: 30rem`, `--rd-touch-min: 2.75rem`, `--rd-touch-comfortable: 3rem` per contracts/responsive-breakpoints.md
- [x] T002 Add global mobile breakpoint media query (`@media (max-width: 30rem)`) with base rules to `src/styles/custom.css` — Include: table wrapper `overflow-x: auto` with `-webkit-overflow-scrolling: touch`, `img { max-width: 100%; height: auto; }`, reduce body padding on mobile
- [x] T003 Add hover/touch media queries to `src/styles/custom.css` — Add `@media (hover: hover)` section for mouse-only hover effects and `@media (hover: none)` section for touch-specific `:active` states; add global rule ensuring all `button, a, [role="button"]` have `min-height: var(--rd-touch-min)` on touch devices
- [x] T004 Add global typography minimum rules to `src/styles/custom.css` — Ensure `input, select, textarea { font-size: 1rem; }` (iOS zoom prevention per research R7); set minimum body font-size guardrails

## Phase 3: User Story 1 — Consulter le framework sur mobile (P1)

**Goal**: A visitor on smartphone (320px-428px) can browse all framework sections fluidly — no horizontal scroll, readable text, responsive grids, and navigable content.

**Independent Test**: Navigate all 8 framework sections on a 320px viewport. No horizontal scrollbar appears. All text is at least 14px. Grid cards stack to single column. Tables scroll horizontally within their container only.

- [x] T005 [P] [US1] Fix grid overflow in `src/components/QuickNavigation.astro` — Change `grid-template-columns: repeat(auto-fill, minmax(220px, 1fr))` to `repeat(auto-fill, minmax(min(100%, 220px), 1fr))` per research R3; this ensures cards stack to 1 column on phones < 220px container width
- [x] T006 [P] [US1] Add `:active` touch feedback and guard `:hover` in `src/components/QuickNavigation.astro` — Wrap existing `.quick-nav-card:hover` rule inside `@media (hover: hover) { }` block; add `.quick-nav-card:active { border-color: var(--sl-color-accent); background: var(--sl-color-accent-low); opacity: 0.9; }` for touch devices per research R8
- [x] T007 [P] [US1] Fix grid overflow in `src/components/RoleCard.tsx` — Change inline style `gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))'` to `'repeat(auto-fill, minmax(min(100%, 240px), 1fr))'` per research R3
- [x] T008 [P] [US1] Fix font sizes in `src/components/RoleCard.tsx` — Increase `.question` text from `0.85rem` to `0.9375rem` (15px); increase `.focus` badge from `0.8rem` to `0.875rem` (14px) per typography contract minimums
- [x] T009 [P] [US1] Fix font sizes in `src/components/DashboardMockup.tsx` — Increase MetricRow font-size from `0.85rem` to `0.9375rem` (15px) per typography contract
- [x] T010 [P] [US1] Fix font sizes in `src/components/RoleInteractions.tsx` — Increase description font-size from `0.9rem` to `1rem`; increase collaboration tag font-size from `0.85rem` to `0.9375rem` per typography contract

## Phase 4: User Story 2 — Interagir avec les composants sur écran tactile (P1)

**Goal**: All interactive React components (diagnostic, configurator, role cards, dashboards) work comfortably on touch screens with adequate touch targets (44px+), readable charts, and responsive layouts.

**Independent Test**: Complete the AI maturity diagnostic quiz on a 375px viewport. Select team configurations. Tap role cards. View dashboard charts. All interactions respond to tap, buttons are easy to hit, charts are legible.

- [x] T011 [US2] Convert TeamConfigurator table to responsive card layout on mobile in `src/components/TeamConfigurator.tsx` — Add CSS class names to table elements (`rd-team-table`, `rd-team-row`, `rd-team-cell-person`, `rd-team-cell-responsibilities`); add corresponding `@media (max-width: 30rem)` rules in `src/styles/custom.css` that set `table, thead, tbody, tr, td { display: block; }`, hide `thead`, and style each `tr` as a stacked card with person name as header; add `data-label` attributes to `<td>` elements for mobile labels per research R5
- [x] T012 [P] [US2] Fix TeamConfigurator button row in `src/components/TeamConfigurator.tsx` — Add `flexWrap: 'wrap'` to button container div; increase button padding from `0.4rem 1rem` to `0.625rem 1.25rem` to meet 44px min touch target; increase font-size from `0.85rem` to `0.9375rem`
- [x] T013 [P] [US2] Fix TeamConfigurator table font sizes in `src/components/TeamConfigurator.tsx` — Increase responsibility tag font-size from `0.8rem` to `0.875rem`; increase tag padding from `0.15rem 0.5rem` to `0.25rem 0.625rem`
- [x] T014 [US2] Fix AIMaturityDiagnostic container widths for mobile in `src/components/AIMaturityDiagnostic.tsx` — Replace hardcoded `maxWidth: "32rem"` (HOME/QUIZ pages) and `maxWidth: "42rem"` (RESULTS page) with responsive approach: use `maxWidth: "100%"` base with `@media` padding adjustments; on desktop, apply max-width via CSS class or conditional style using `window.matchMedia` or a CSS class with media query in `src/styles/custom.css`
- [x] T015 [P] [US2] Fix AIMaturityDiagnostic font sizes in `src/components/AIMaturityDiagnostic.tsx` — Replace all instances of `fontSize: "0.75rem"` with `"0.875rem"` minimum; replace `fontSize: "0.8rem"` with `"0.875rem"`; replace `fontSize: "0.85rem"` with `"0.9375rem"` per typography contract; keep `fontSize: "2.25rem"` for h1 title but ensure it scales (consider `clamp(1.5rem, 5vw, 2.25rem)`)
- [x] T016 [P] [US2] Fix AIMaturityDiagnostic navigation button touch targets in `src/components/AIMaturityDiagnostic.tsx` — Increase Precedent/Suivant button padding from `0.625rem 1.25rem` to `0.75rem 1.5rem` to meet 44px min touch target height; ensure buttons have `min-height: 2.75rem` (44px)
- [x] T017 [P] [US2] Fix AIMaturityDiagnostic input field iOS zoom in `src/components/AIMaturityDiagnostic.tsx` — Change input `fontSize: "0.875rem"` to `fontSize: "1rem"` (16px) to prevent iOS Safari auto-zoom on focus per research R7
- [x] T018 [US2] Fix AIMaturityDiagnostic radar chart responsiveness in `src/components/AIMaturityDiagnostic.tsx` — Replace hardcoded `height: 320` on chart container with responsive height: use a custom hook or CSS approach to set height to 240px on mobile (<480px), 280px on tablet, 320px on desktop; reduce `outerRadius` from `"72%"` to `"65%"` on mobile for label legibility per research R6
- [x] T019 [P] [US2] Fix AIMaturityDiagnostic hero section padding in `src/components/AIMaturityDiagnostic.tsx` — Reduce RESULTS page hero `padding: "2rem"` to responsive: `padding: "1.25rem 1rem"` on mobile, `padding: "2rem"` on desktop; add CSS class `rd-diagnostic-hero` and corresponding media query in `src/styles/custom.css`
- [x] T020 [P] [US2] Fix AIMaturityDiagnostic dimension pills readability in `src/components/AIMaturityDiagnostic.tsx` — Increase dimension pill font-size from `0.75rem` to `0.875rem`; increase padding from `0.25rem 0.625rem` to `0.375rem 0.75rem` for better touch targets
- [x] T021 [US2] Replace RoleCard hover handlers with CSS in `src/components/RoleCard.tsx` — Remove `onMouseEnter`/`onMouseLeave` inline JavaScript handlers; add CSS class `rd-role-card` to each card; add CSS rules in `src/styles/custom.css`: `@media (hover: hover) { .rd-role-card:hover { border-color: var(--sl-color-accent); transform: translateY(-2px); } }` and `.rd-role-card:active { border-color: var(--sl-color-accent); }` per research R8
- [x] T022 [P] [US2] Increase RoleInteractions tag touch targets in `src/components/RoleInteractions.tsx` — Increase collaboration tag padding from `0.3rem 0.8rem` to `0.5rem 1rem` to approach 44px touch target height; increase gap from `0.5rem` to `0.625rem`

## Phase 5: User Story 3 — Consulter l'application sur tablette (P2)

**Goal**: On tablet (768px-1024px) the layout adapts intelligently — sidebar is accessible, content uses available width efficiently, grid cards show appropriate column count (2 columns on portrait, 2-3 on landscape).

**Independent Test**: Browse the application at 768px (portrait) and 1024px (landscape). Sidebar is toggleable at 768px and visible at 1024px. Grid cards show 2 columns minimum. Rotate between orientations — layout adapts without reload or scroll position loss.

- [x] T023 [P] [US3] Verify and adjust grid column behavior at tablet widths in `src/components/QuickNavigation.astro` and `src/components/RoleCard.tsx` — With the `min(100%, <base>)` fix from T005/T007, verify that grids show 2+ columns at 768px and 3 columns at 1024px; adjust base width values if needed (e.g., lower from 240px to 220px for RoleCard if only 1 column shows at 768px)
- [x] T024 [P] [US3] Verify AIMaturityDiagnostic container width at tablet in `src/components/AIMaturityDiagnostic.tsx` — Ensure `maxWidth: "32rem"` (512px) centers properly at 768px with adequate side margins; verify radar chart at 280px height is legible at tablet width; adjust if needed
- [x] T025 [US3] Add tablet-specific spacing adjustments to `src/styles/custom.css` — If needed after T023-T024 verification, add `@media (min-width: 30rem) and (max-width: 50rem)` rules for tablet-portrait specific padding/margin optimizations; ensure Starlight's sidebar toggle works correctly at this range (no custom overrides needed for sidebar — Starlight handles it)

## Phase 6: User Story 4 — Télécharger des templates sur mobile (P2)

**Goal**: Download buttons for artifact templates are easily findable and tappable on mobile with clear visual feedback.

**Independent Test**: On a 375px viewport, navigate to any artifact page (e.g., PRD), find the download button, tap it — the button is large enough to tap comfortably (44px+), responds with visual feedback, and triggers the download.

- [x] T026 [P] [US4] Improve DownloadButton touch target in `src/components/DownloadButton.astro` — Increase button padding from `0.6rem 1.2rem` to `0.75rem 1.5rem` for better touch target (achieves ~44px height); increase SVG icon from `width="16" height="16"` to `width="18" height="18"` for better visibility
- [x] T027 [US4] Add mobile full-width display for DownloadButton in `src/styles/custom.css` — Add `@media (max-width: 30rem) { .download-btn { display: flex; width: 100%; justify-content: center; padding: 0.875rem 1.5rem; } }` to make download button full-width and more prominent on mobile; add `.download-btn:active { opacity: 0.7; transform: scale(0.98); }` for touch feedback

## Phase 7: Polish & Cross-Cutting Concerns

- [x] T028 Run `npm run build` and verify zero build errors after all responsive changes in project root — Ensure all component modifications compile correctly; fix any TypeScript errors from style changes
- [ ] T029 **[MANUAL]** Responsive validation at 320px, 375px, 768px, 1024px viewports — Use browser DevTools device toolbar to verify: (1) no horizontal scrollbar at any viewport, (2) all text ≥ 14px, (3) all buttons ≥ 44px touch target, (4) TeamConfigurator shows card layout on mobile, (5) charts render and labels are visible, (6) download buttons are full-width on mobile, (7) grids stack to 1 column at 320px
- [ ] T030 **[MANUAL]** Verify no visual regressions at desktop (1440px) viewport — Ensure all responsive changes are scoped to mobile/tablet and do not affect the existing desktop layout; check: grid columns unchanged, hover effects still work, chart sizes unchanged, table layout unchanged

## Dependencies

```text
T001 ──┐
T002 ──┤
T003 ──┼── Foundation (must complete before user stories)
T004 ──┘
         │
         ├── US1 (T005-T010) ──── can start after Foundation
         │                         T005-T010 are all [P] (parallelizable)
         │
         ├── US2 (T011-T022) ──── can start after Foundation
         │     T011 → T012, T013 (table structure before button/font fixes)
         │     T014 → T015-T020 (container fix before child element fixes)
         │     T021 standalone (RoleCard CSS migration)
         │     T022 standalone (RoleInteractions)
         │
         ├── US3 (T023-T025) ──── depends on US1 (T005, T007) and US2 (T014)
         │     T023, T024 [P] → T025
         │
         ├── US4 (T026-T027) ──── can start after Foundation
         │     T026 [P] → T027
         │
         └── Polish (T028-T030) ── depends on all US phases
               T028 → T029 → T030
```

## Parallel Execution Opportunities

### Within US1 (Phase 3)
All 6 tasks (T005-T010) touch different files — execute all in parallel:
- T005: QuickNavigation.astro (grid)
- T006: QuickNavigation.astro (hover/active) — same file as T005, run after T005
- T007: RoleCard.tsx (grid)
- T008: RoleCard.tsx (fonts) — same file as T007, run after T007
- T009: DashboardMockup.tsx (fonts)
- T010: RoleInteractions.tsx (fonts)

**Parallel groups**: [T005, T007, T009, T10] then [T006, T008]

### Within US2 (Phase 4)
- **Group A** (TeamConfigurator): T011 → [T012, T013]
- **Group B** (AIMaturityDiagnostic): T014 → [T015, T016, T017, T019, T020] → T018
- **Group C** (RoleCard): T021
- **Group D** (RoleInteractions): T022

Groups A, B, C, D can run in parallel.

### Cross-Story Parallelism
- US1 and US2 can run in parallel (different components, only shared dependency is Foundation)
- US4 can run in parallel with US1 and US2
- US3 must wait for US1 (T005, T007) and US2 (T014) to verify grid/container behavior at tablet widths

## Implementation Strategy

### MVP Scope
**User Story 1 (Phase 3)** is the MVP — it fixes the most critical issue (horizontal overflow on mobile) and makes the documentation readable on phones. Foundation (Phase 2) + US1 (Phase 3) can be delivered as a first increment.

### Incremental Delivery Order
1. **Foundation + US1**: Core mobile readability (no horizontal scroll, readable text, responsive grids)
2. **US2**: Interactive component touch optimization (biggest effort — AIMaturityDiagnostic alone is 7 tasks)
3. **US4**: Download button mobile — quick win, independent
4. **US3**: Tablet verification — depends on prior work, mostly validation
5. **Polish**: Build verification, manual testing, regression check

### Estimated Task Distribution
| Phase | Tasks | Parallelizable | Effort |
|-------|-------|---------------|--------|
| Foundation | 4 | No (sequential, same file) | Small |
| US1 | 6 | 4 parallel groups | Small |
| US2 | 12 | 4 parallel groups | Medium-Large |
| US3 | 3 | 2 parallel → 1 | Small (mostly verification) |
| US4 | 2 | 1 parallel → 1 | Small |
| Polish | 3 | Sequential | Small (manual) |
| **Total** | **30** | | |
