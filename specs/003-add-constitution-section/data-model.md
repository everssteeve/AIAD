# Data Model: Add Constitution Section

**Feature**: 003-add-constitution-section
**Date**: 2026-03-02

## Entities

### ConstitutionArticle (Content Collection Entry)

Représente une page de la Constitution AIAD dans la collection de contenu Astro.

| Field | Type | Required | Constraints | Description |
|-------|------|----------|-------------|-------------|
| title | string | Yes | 1-200 chars | Titre affiché de l'article |
| description | string | Yes | 1-300 chars | Description courte pour les cartes et le SEO |
| order | integer | Yes | >= 0 | Position dans la navigation séquentielle (1-11) |
| section | enum | Yes | Must be `"constitution"` | Identifiant de la section |
| isEssential | boolean | No | default: false | Badge "essential" dans la navigation |
| lastUpdated | date | No | — | Date de dernière modification |
| tags | string[] | No | — | Tags pour la recherche et le filtrage |
| draft | boolean | No | default: false | Exclure de la production si true |

**Schema**: Réutilise `docsSchema` existant de `src/schemas/docs.ts` (Zod).

**Validation**: Le champ `section` est validé par l'enum Zod qui inclura `'constitution'`.

### ConstitutionNavigationItem (Navigation Tree Entry)

Représente un lien dans l'arbre de navigation pour la section Constitution.

| Field | Type | Required | Constraints | Description |
|-------|------|----------|-------------|-------------|
| id | string | Yes | `^[a-z0-9-]+$`, 2-80 chars, prefix `const-` | Identifiant unique global |
| label | string | Yes | 1-100 chars | Texte affiché dans la navigation |
| href | string | Yes | starts with `/constitution/` | URL de la page |
| section | enum | No | `'constitution'` | Section de navigation |
| order | integer | Yes | >= 0, unique among siblings | Position dans la liste |
| badge | enum | No | `'new'` or `'essential'` | Badge visuel optionnel |
| isHidden | boolean | No | default: false | Masquer de la navigation |

**Schema**: Validé par `navigationItemSchema` existant de `src/schemas/navigation.ts`.

## Relationships

```text
ConstitutionArticle (MDX file)
  ├── 1:1 → ConstitutionNavigationItem (via slug matching)
  └── N:1 → ConstitutionSection (collection "constitution")

NavigationTree
  └── constitution: ConstitutionNavigationItem[] (11 items, flat, no children)
```

## Instance Data (11 entries)

| order | slug | nav ID | isEssential |
|-------|------|--------|-------------|
| 1 | preambule | const-preambule | true |
| 2 | article-i-raison-detre | const-article-i | false |
| 3 | article-ii-valeurs-fondatrices | const-article-ii | true |
| 4 | article-iii-ruptures-technologiques | const-article-iii | false |
| 5 | article-iv-numerique-durable | const-article-iv | false |
| 6 | article-v-composantes | const-article-v | false |
| 7 | article-vi-gouvernance | const-article-vi | false |
| 8 | article-vii-alis | const-article-vii | false |
| 9 | article-viii-droits-responsabilites | const-article-viii | false |
| 10 | article-ix-evolution | const-article-ix | false |
| 11 | signature | const-signature | false |

## State Transitions

Aucune — le contenu constitutionnel est statique (pas de workflow de publication, pas de CRUD dynamique). Le seul état est `draft: true/false` contrôlé par le frontmatter MDX au moment du build.
