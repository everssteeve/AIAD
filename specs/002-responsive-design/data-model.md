# Data Model: Responsive Design Complet

**Branch**: `002-responsive-design` | **Date**: 2026-02-25

## Overview

This feature does not introduce new data entities. The responsive design work modifies the visual presentation layer only. However, the following design tokens and configuration structures are defined to ensure consistency across all responsive adaptations.

## Design Tokens

### Breakpoints

| Token | CSS Custom Property | Value | Starlight Origin |
|-------|-------------------|-------|-----------------|
| mobile | `--rd-bp-mobile` | 30rem (480px) | New |
| tablet | `--sl-content-pad-x` threshold | 50rem (800px) | Existing (Starlight) |
| desktop | `--sl-mobile-toc-height` threshold | 72rem (1152px) | Existing (Starlight) |

### Touch Target Sizes

| Token | CSS Custom Property | Value | Standard |
|-------|-------------------|-------|----------|
| touch-min | `--rd-touch-min` | 44px | WCAG 2.5.5 AAA |
| touch-comfortable | `--rd-touch-comfortable` | 48px | Material Design |

### Typography Minimums

| Context | Minimum Size | Rationale |
|---------|-------------|-----------|
| Body text | 1rem (16px) | iOS zoom prevention, WCAG readability |
| Secondary text | 0.875rem (14px) | Minimum readable on mobile |
| Labels/badges | 0.8125rem (13px) | Absolute minimum with sufficient contrast |

## Component Responsive Behavior Map

| Component | Mobile (<480px) | Tablet (480-800px) | Desktop (>800px) |
|-----------|----------------|-------------------|-----------------|
| QuickNavigation | 1 column grid | 2 columns grid | auto-fill (2-3 cols) |
| RoleCard | 1 column grid | 2 columns grid | auto-fill (2-3 cols) |
| TeamConfigurator buttons | Wrapped row | Single row | Single row |
| TeamConfigurator table | Stacked card layout | Table | Table |
| AIMaturityDiagnostic | Full-width, reduced padding | Centered 32rem max | Centered 42rem max |
| DashboardMockup | Full-width, stacked | Full-width | Full-width |
| RoleInteractions | Full-width, wrapped tags | Full-width | Full-width |
| DownloadButton | Full-width block | Inline | Inline |
| Radar Chart | 240px height, reduced radius | 280px height | 320px height |

## State Transitions

No state transitions. This feature only affects presentation layer — no data flow, no state management changes.
