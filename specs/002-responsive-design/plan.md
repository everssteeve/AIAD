# Implementation Plan: Responsive Design Complet

**Branch**: `002-responsive-design` | **Date**: 2026-02-25 | **Spec**: [spec.md](./spec.md)
**Input**: Feature specification from `/specs/002-responsive-design/spec.md`

## Summary

Optimize the AIAD Framework web application for responsive design across all custom components. Starlight already provides a responsive base (sidebar toggle, navigation, page layout). This plan targets the 7 custom components (5 React, 2 Astro) and the custom CSS file, addressing 36 identified responsive issues (2 critical, 9 high, 11 medium, 15 low). The approach is CSS-first: add media queries in custom.css, fix grid patterns, increase touch targets, and convert the TeamConfigurator table to a responsive card layout.

## Technical Context

**Language/Version**: TypeScript 5.x, Node.js 20+
**Primary Dependencies**: Astro 5.x, @astrojs/starlight 0.37.x, React 19, Recharts (via AIMaturityDiagnostic), chart.js 4.x (via DashboardMockup)
**Storage**: N/A (static site, presentation-layer only changes)
**Testing**: Manual viewport testing (DevTools), Playwright E2E responsive tests
**Target Platform**: Static web (browsers — mobile Safari iOS, Chrome Android, desktop evergreen)
**Project Type**: Static web application (documentation site)
**Performance Goals**: No regression — <3s initial load, Lighthouse score >95
**Constraints**: No new dependencies, CSS-first approach, preserve Starlight breakpoint system, WCAG 2.5.5 touch targets
**Scale/Scope**: 7 components to fix, 1 CSS file to extend, 0 new files (except tests)

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

| Principle | Gate | Status |
|-----------|------|--------|
| I. Intention over Execution | Spec defines why (mobile users) and what (responsive components) before how | PASS |
| II. Empirisme Radical | Observable outcomes defined (SC-001 to SC-007); testable at 320px/768px/1024px viewports | PASS |
| III. Orchestration Systémique | No new tooling needed; leverages existing CSS + component patterns | PASS |
| IV. Excellence Produit | User value is primary: mobile readability, touch comfort, cross-device consistency | PASS |
| V. Qualité Intégrée | Responsive tests added; validation checklist per component; WCAG 2.5.5 compliance | PASS |

No violations. All gates pass.

## Post-Design Constitution Re-Check

| Principle | Gate | Status |
|-----------|------|--------|
| I. Intention over Execution | Research confirms targeted fixes (not rewrite); design tokens document "what" | PASS |
| II. Empirisme Radical | Breakpoint system is testable; component behavior map is verifiable | PASS |
| III. Orchestration Systémique | CSS custom properties integrate cleanly with Starlight's system | PASS |
| IV. Excellence Produit | Touch targets meet WCAG AAA; typography meets readability minimums | PASS |
| V. Qualité Intégrée | Contracts define testable responsive rules; quickstart includes validation checklist | PASS |

No violations after design phase.

## Project Structure

### Documentation (this feature)

```text
specs/002-responsive-design/
├── plan.md              # This file
├── research.md          # Phase 0 output — 8 research decisions
├── data-model.md        # Phase 1 output — design tokens & behavior map
├── quickstart.md        # Phase 1 output — dev workflow & validation
├── contracts/
│   └── responsive-breakpoints.md  # Phase 1 output — UI responsive contract
├── checklists/
│   └── requirements.md  # Spec quality checklist
└── tasks.md             # Phase 2 output (/speckit.tasks)
```

### Source Code Changes (files to modify)

```text
src/
├── styles/
│   └── custom.css                    # ADD: responsive breakpoints, media queries, touch/hover rules
├── components/
│   ├── AIMaturityDiagnostic.tsx      # FIX: container widths, font sizes, touch targets, chart height, input zoom
│   ├── TeamConfigurator.tsx          # FIX: table→card on mobile, button sizing, flex-wrap
│   ├── RoleCard.tsx                  # FIX: grid minmax, hover→touch, font sizes
│   ├── QuickNavigation.astro        # FIX: grid minmax, :active state
│   ├── RoleInteractions.tsx          # FIX: tag touch targets, font sizes
│   ├── DashboardMockup.tsx           # FIX: font sizes
│   └── DownloadButton.astro          # FIX: touch target padding
tests/
└── e2e/
    └── responsive.spec.ts            # NEW: Playwright responsive viewport tests
```

## Implementation Phases

### Phase A: Foundation — CSS Breakpoints & Design Tokens (custom.css)

**Priority**: Must be done first — other phases depend on these CSS custom properties and media queries.

**Changes to `src/styles/custom.css`**:
1. Add CSS custom properties for responsive design tokens (`--rd-bp-mobile`, `--rd-touch-min`)
2. Add `@media (max-width: 30rem)` mobile breakpoint rules
3. Add `@media (hover: hover)` and `@media (hover: none)` rules for hover/touch separation
4. Add global responsive fixes: table overflow containers, image max-width, minimum touch target on buttons/links

**Estimated scope**: ~50 lines of CSS added

### Phase B: Critical Component Fixes

**Priority**: CRITICAL and HIGH severity issues — components that are broken on mobile.

#### B1: TeamConfigurator.tsx (CRITICAL)
- Convert HTML `<table>` to responsive: stacked card layout on mobile via CSS classes
- Add `flexWrap: 'wrap'` to button row
- Increase button padding to meet 44px touch target
- Increase font sizes: 0.8rem → 0.875rem, 0.85rem → 0.9375rem

#### B2: AIMaturityDiagnostic.tsx (HIGH)
- Replace hardcoded `maxWidth: "32rem"` / `"42rem"` with responsive values (100% on mobile, capped on desktop)
- Increase navigation button padding to meet 44px touch target
- Fix font sizes: 0.75rem → 0.875rem minimum throughout
- Set radar chart height responsive: 240px on mobile, 320px on desktop
- Set input font-size to 1rem (16px) for iOS zoom prevention
- Reduce hero section padding on mobile: 2rem → 1rem

#### B3: RoleCard.tsx (HIGH)
- Fix grid: `minmax(240px, 1fr)` → `minmax(min(100%, 240px), 1fr)`
- Replace `onMouseEnter`/`onMouseLeave` with CSS class + `:hover`/`:active`
- Increase font sizes: 0.85rem → 0.9375rem, 0.8rem → 0.875rem

#### B4: QuickNavigation.astro (HIGH)
- Fix grid: `minmax(220px, 1fr)` → `minmax(min(100%, 220px), 1fr)`
- Add `:active` state alongside `:hover` with `@media (hover: hover)` guard

### Phase C: Medium & Low Priority Fixes

#### C1: RoleInteractions.tsx (MEDIUM)
- Increase collaboration tag padding for touch target
- Increase font sizes: 0.85rem → 0.9375rem

#### C2: DashboardMockup.tsx (LOW)
- Increase metric label font size: 0.85rem → 0.9375rem

#### C3: DownloadButton.astro (LOW)
- Increase padding for better touch target
- Add `@media (max-width: 30rem)` for full-width display on mobile

### Phase D: E2E Responsive Tests

**New file: `tests/e2e/responsive.spec.ts`**

Test scenarios:
1. No horizontal scroll at 320px, 375px, 768px viewports
2. Touch target size verification (all buttons ≥ 44px)
3. TeamConfigurator table converts to card layout on mobile
4. AIMaturityDiagnostic quiz is completable on 375px viewport
5. Charts render and are visible at 320px width
6. Grid cards stack to single column at 320px

## Complexity Tracking

No complexity violations. The implementation:
- Adds 0 new dependencies
- Modifies 7 existing files + 1 CSS file
- Creates 1 new test file
- Uses only CSS media queries and minor inline style adjustments
- No architectural changes, no new abstractions
