# Research: Responsive Design Complet

**Branch**: `002-responsive-design` | **Date**: 2026-02-25

## R1: Current Responsive State Audit

**Decision**: The application requires targeted responsive fixes on custom components; Starlight's base responsive system is adequate.

**Rationale**: A full audit of all 7 custom components (5 React, 2 Astro) and custom.css revealed 36 responsive issues (2 critical, 9 high, 11 medium, 15 low). Starlight already provides responsive navigation, sidebar toggle, and page layout. The gaps are entirely in custom components using inline styles with hardcoded pixel values and no media queries.

**Alternatives considered**:
- Full CSS framework rewrite (Tailwind utilities everywhere) — Rejected: over-engineering, Starlight already handles layout
- CSS-in-JS solution (styled-components, emotion) — Rejected: adds bundle size, unnecessary for scoped fixes
- Targeted inline style + custom.css media queries — **Chosen**: minimal change, leverages existing patterns

## R2: Breakpoint Strategy

**Decision**: Align with Starlight's existing breakpoints (50rem/800px and 72rem/1152px) and add a mobile breakpoint at 30rem/480px for custom components.

**Rationale**: Starlight uses 50rem (sidebar toggle) and 72rem (mobile TOC removal). Adding a custom 480px breakpoint handles the gap between very small phones (320px) and Starlight's first breakpoint. This avoids conflicting with the framework's responsive system.

**Alternatives considered**:
- Bootstrap-style breakpoints (576px, 768px, 992px, 1200px) — Rejected: conflicts with Starlight's rem-based system
- Tailwind default breakpoints (640px, 768px, 1024px, 1280px) — Rejected: Tailwind not actively used in the project
- Container queries — Rejected: good modern approach but adds complexity; media queries sufficient for this scope

**Breakpoints adopted**:
| Token | Value | Usage |
|-------|-------|-------|
| mobile | 30rem (480px) | Custom component single-column stacking |
| tablet | 50rem (800px) | Starlight sidebar toggle (existing) |
| desktop | 72rem (1152px) | Starlight full layout (existing) |

## R3: CSS Grid `minmax()` Fix for Mobile

**Decision**: Use `minmax(min(100%, <base>), 1fr)` pattern instead of `minmax(<base>, 1fr)`.

**Rationale**: The `min(100%, 220px)` CSS function ensures cards never exceed their container width on small screens. This is a single-line fix per component that maintains desktop behavior while preventing horizontal overflow on mobile. Supported in all modern browsers (Chrome 79+, Firefox 75+, Safari 11.1+).

**Alternatives considered**:
- Media query with explicit column count — More CSS to maintain, less fluid
- JavaScript resize observer — Over-engineering for a CSS problem
- `clamp()` function — Less intuitive for this use case

## R4: Touch Target Sizing Strategy

**Decision**: Ensure all interactive elements meet 44x44px minimum (WCAG 2.5.5 Level AAA) via padding adjustments.

**Rationale**: Rather than changing element dimensions directly, increasing padding achieves the touch target size while maintaining visual design. The 44px threshold matches Apple's Human Interface Guidelines and Google's Material Design recommendations.

**Alternatives considered**:
- Invisible touch target overlay (padding on wrapper) — More complex, harder to maintain
- CSS `min-height`/`min-width` on elements — Can break visual alignment
- Padding increase on interactive elements — **Chosen**: simplest, most predictable

## R5: Table Responsiveness Approach (TeamConfigurator)

**Decision**: Convert the HTML table to a CSS-driven card layout on mobile using `display: block` technique.

**Rationale**: The TeamConfigurator table has 2 columns (Person / Responsibilities). On mobile, the table headers become hidden and each row becomes a stacked card with the person name as a header and responsibilities below. This is a well-established responsive table pattern.

**Alternatives considered**:
- Horizontal scroll wrapper — Acceptable for wide data tables, but this table only has 2 columns; card layout is better UX
- Replace `<table>` with flex/grid — Requires HTML restructuring; CSS-only approach preserves existing markup
- Collapsible accordion per person — Over-engineering for 2-4 rows

## R6: Chart Responsiveness (Recharts Radar Chart)

**Decision**: Use `aspect-ratio` CSS with `ResponsiveContainer` and reduce `outerRadius` on mobile.

**Rationale**: Recharts' `ResponsiveContainer` already handles width adaptation. The fix is to replace the hardcoded `height: 320` with an aspect-ratio-based approach and use a CSS custom property or conditional rendering to reduce chart outer radius on small screens for label legibility.

**Alternatives considered**:
- JavaScript resize listener with dynamic height — More complex, risk of layout thrashing
- Fixed smaller height on mobile — Loses proportionality
- Swap to a different chart type on mobile (e.g., bar chart) — Confusing UX, different visualization for same data

## R7: iOS Auto-Zoom Prevention

**Decision**: Ensure all `<input>` and `<select>` elements have `font-size: 16px` (1rem) minimum.

**Rationale**: iOS Safari automatically zooms in when focusing on form elements with font-size < 16px. The AIMaturityDiagnostic input field uses 0.875rem (14px), which triggers this behavior. Setting 1rem (16px) prevents zoom while maintaining readability.

**Alternatives considered**:
- `<meta name="viewport" content="maximum-scale=1">` — Prevents ALL zoom, violates WCAG accessibility requirements
- `touch-action: manipulation` — Only prevents double-tap zoom, not input focus zoom
- Font-size 16px on inputs — **Chosen**: targeted fix, no accessibility compromise

## R8: Hover vs. Touch Interaction Strategy

**Decision**: Use `@media (hover: hover)` for hover effects and `:active` pseudo-class for touch feedback.

**Rationale**: The `hover: hover` media query correctly targets devices with a primary pointing device that supports hover (mouse/trackpad). Touch devices get `:active` state feedback instead. This replaces the current `onMouseEnter`/`onMouseLeave` JavaScript handlers in RoleCard.tsx with pure CSS, which is more performant and correct.

**Alternatives considered**:
- Detect touch via JavaScript (`ontouchstart` in window) — Unreliable, hybrid devices exist
- Apply hover to all devices — Creates "sticky hover" bug on mobile
- Use both `:hover` and `:active` unconditionally — Hover effects "stick" on mobile after tap
