# UI Contract: Responsive Breakpoints

**Branch**: `002-responsive-design` | **Date**: 2026-02-25

## Breakpoint System

All custom components MUST follow this breakpoint system, aligned with Starlight's existing thresholds.

### CSS Custom Properties

```css
:root {
  /* Custom breakpoint (new) */
  --rd-bp-mobile: 30rem;    /* 480px */

  /* Starlight breakpoints (existing, do not override) */
  /* --sl-* at 50rem (800px) — sidebar toggle */
  /* --sl-* at 72rem (1152px) — full desktop layout */

  /* Touch targets */
  --rd-touch-min: 2.75rem;  /* 44px — WCAG 2.5.5 */
}
```

### Media Query Contract

| Breakpoint | Media Query | Applies To |
|-----------|-------------|------------|
| Mobile | `@media (max-width: 30rem)` | Grid stacking, table-to-card, reduced padding |
| Touch | `@media (hover: none)` | Touch target sizing, :active feedback |
| Hover | `@media (hover: hover)` | Hover effects (mouse-only) |

### Component Grid Contract

```css
/* All card grids MUST use this pattern */
grid-template-columns: repeat(auto-fill, minmax(min(100%, <base-width>), 1fr));

/* Where <base-width> is: */
/* QuickNavigation: 220px */
/* RoleCard: 240px */
```

### Touch Target Contract

All interactive elements (buttons, links, selectors, input fields) MUST have:
- Minimum touch target: 44px × 44px (via padding, not element size)
- Minimum spacing between adjacent targets: 8px

### Typography Contract

| Context | Minimum | Maximum |
|---------|---------|---------|
| Body text | 1rem (16px) | — |
| Secondary / description | 0.875rem (14px) | — |
| Badges / labels | 0.8125rem (13px) | — |
| Input fields | 1rem (16px) | — (iOS zoom prevention) |
| Headings | Scale with viewport | — |

### Table Contract

Tables with > 2 columns on mobile:
- Wrap in `overflow-x: auto` container
- Container has `-webkit-overflow-scrolling: touch`

Tables with ≤ 2 columns on mobile (TeamConfigurator):
- Convert to stacked card layout
- Hide `<thead>`
- Each `<tr>` becomes a card block
