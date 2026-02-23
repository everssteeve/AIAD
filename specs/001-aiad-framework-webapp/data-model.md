# Data Model: AIAD Framework Web Application

## Overview

All data is static and defined as Astro Content Collections with Zod schema validation. There is no database — content lives as Markdown/MDX files with typed frontmatter.

## Entities

### Section (Framework Chapter)

Represents one of the 8 main framework sections.

**Collection**: `docs` (Starlight built-in)
**Location**: `src/content/docs/fr/*.mdx`

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| title | string | yes | Section title (e.g., "Préambule") |
| description | string | yes | Short description for SEO and sidebar |
| sidebar | object | yes | Starlight sidebar config (order, label) |
| readingTime | number | no | Estimated reading time in minutes |
| prev | string | no | Link to previous section |
| next | string | no | Link to next section |

**Example frontmatter**:
```yaml
---
title: "Préambule"
description: "Introduction au framework AIAD : contexte, objectifs et principes fondateurs"
sidebar:
  order: 1
  label: "01. Préambule"
readingTime: 8
next: "/fr/02-vision-philosophie"
---
```

### Rôle (AIAD Responsibility)

Represents one of the 5 key AIAD responsibilities.

**Collection**: `docs` (nested under `roles/`)
**Location**: `src/content/docs/fr/roles/*.mdx`

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| title | string | yes | Role name (e.g., "Product Engineer") |
| description | string | yes | Role essence (one-liner) |
| sidebar | object | yes | Starlight sidebar config |
| icon | string | no | Icon identifier for the role card |
| centralQuestion | string | yes | The central question this role answers |
| focus | string | yes | Primary focus area (e.g., "Orchestration") |

**Role-specific data** (in MDX body, structured as sections):
- Actions table (action + frequency)
- Non-negotiable competencies (numbered list)
- Performance indicators table (indicator + target)
- Anti-pattern description
- Interaction map (which roles it collaborates with and how)

### Artefact (Framework Document Template)

Represents one of the 6 AIAD artifacts.

**Collection**: `docs` (nested under `artefacts/`)
**Location**: `src/content/docs/fr/artefacts/*.mdx`

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| title | string | yes | Artifact name (e.g., "PRD") |
| description | string | yes | Artifact purpose |
| sidebar | object | yes | Starlight sidebar config |
| centralQuestion | string | yes | The central question this artifact answers |
| owner | string | yes | Primary responsible role |
| templateFile | string | yes | Path to downloadable template in /assets/templates/ |

**Artifact-specific data** (in MDX body):
- Content table (section + content description)
- Quality criteria (4 criteria with validation questions)
- Performance indicators table (indicator + target)
- Anti-pattern description
- Best practices list

### Métrique (Performance Indicator)

Represents a metric within one of the 5 AIAD metric categories.

**Collection**: `docs` (nested under `metriques/`)
**Location**: `src/content/docs/fr/metriques/*.mdx`

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| title | string | yes | Category name (e.g., "Productivité") |
| description | string | yes | Category essence |
| sidebar | object | yes | Starlight sidebar config |
| dashboardType | string | no | "weekly" or "monthly" — indicates which dashboard this feeds |

**Metric-specific data** (in MDX body):
- Metrics table (metric + target + frequency)
- Signal interpretation table (signal + questions to ask)
- Dashboard section placement

### Configuration d'équipe (Team Setup)

Not a separate collection — embedded as interactive data in the TeamConfigurator React component.

**Location**: Hardcoded in `src/components/TeamConfigurator.tsx`

| Field | Type | Description |
|-------|------|-------------|
| teamSize | "2-3" \| "4-6" \| "7+" | Team size category |
| members | array | List of { person, responsibilities[] } |

## Relationships

```text
Section ──[navigation: prev/next]──> Section
Section ──[cross-reference]──> Section | Rôle | Artefact | Métrique
Rôle ──[collaborates with]──> Rôle (via RoleInteractions component)
Rôle ──[owns]──> Artefact (via owner field)
Artefact ──[has template]──> Template file (static asset)
Métrique ──[feeds]──> Dashboard mockup (via DashboardMockup component)
```

## Validation Rules

- All `title` fields must be non-empty strings
- All `sidebar.order` values must be unique within their directory level
- All `templateFile` paths must reference an existing file in `src/assets/templates/`
- All `prev`/`next` links must reference valid content paths
- All `owner` values must be one of: "PM", "PE", "AE", "QA", "Tech Lead", "AE + PE", "QA + PE"
