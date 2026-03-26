# Feature Specification: Add Constitution Section

**Feature Branch**: `003-add-constitution-section`
**Created**: 2026-03-02
**Status**: Draft
**Input**: User description: "Ajouter une section Constitution au site web AIAD, similaire à la section Framework existante, avec le texte fondateur complet de la Constitution AIAD v1.0."

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Naviguer vers la section Constitution (Priority: P1)

Un visiteur du site AIAD souhaite consulter la Constitution du projet. Il accède à la section "Constitution" depuis la navigation principale du site, voit la liste des articles, et peut lire le texte fondateur dans son intégralité, organisé en pages distinctes par article.

**Why this priority**: La Constitution est le texte fondateur du projet AIAD. Sa publication est la raison d'être de cette feature. Sans navigation accessible, le contenu n'a aucune visibilité.

**Independent Test**: Peut être testé en accédant à `/constitution` et en vérifiant que la page d'index liste tous les articles avec leurs liens fonctionnels.

**Acceptance Scenarios**:

1. **Given** un visiteur sur la page d'accueil du site, **When** il clique sur "Constitution" dans la navigation, **Then** il arrive sur la page d'index de la section Constitution listant tous les articles disponibles.
2. **Given** un visiteur sur la page d'index Constitution, **When** il clique sur un article (ex: "Article II — Les Valeurs Fondatrices"), **Then** il accède à la page dédiée contenant le texte complet de cet article.
3. **Given** un visiteur sur une page article de la Constitution, **When** il consulte la sidebar, **Then** il voit la liste complète des articles avec l'article courant mis en évidence.

---

### User Story 2 - Lire le contenu complet de la Constitution (Priority: P1)

Un visiteur souhaite lire l'intégralité de la Constitution AIAD, article par article. Chaque page affiche le contenu exact du texte fondateur sans modification ni résumé, avec une table des matières pour naviguer dans les sections longues.

**Why this priority**: Le contenu doit être fidèle au texte fourni mot pour mot. C'est une exigence explicite de l'utilisateur ("reprennent exactement le texte"). Sans fidélité du contenu, la feature n'a pas de valeur.

**Independent Test**: Peut être testé en comparant le contenu affiché sur chaque page avec le texte source original de la Constitution v1.0.

**Acceptance Scenarios**:

1. **Given** un visiteur sur la page "Préambule", **When** il lit le contenu, **Then** le texte affiché est identique au texte fondateur fourni, y compris la citation en épigraphe, la structure en paragraphes et les mises en forme (italiques, gras).
2. **Given** un visiteur sur la page "Article II — Les Valeurs Fondatrices", **When** il consulte la table des matières (TOC), **Then** il voit les liens vers chacune des 6 valeurs et peut naviguer directement vers chacune.
3. **Given** un visiteur sur un article long, **When** il fait défiler la page, **Then** la table des matières reflète sa position dans le document.

---

### User Story 3 - Naviguer entre les articles séquentiellement (Priority: P2)

Un visiteur lisant la Constitution souhaite passer d'un article au suivant ou au précédent de manière fluide, sans revenir à la page d'index.

**Why this priority**: Améliore l'expérience de lecture continue. La Constitution est un texte conçu pour être lu séquentiellement. La navigation prev/next facilite cette lecture.

**Independent Test**: Peut être testé en vérifiant que chaque page article affiche des liens "Précédent" et "Suivant" pointant vers les bons articles dans l'ordre logique.

**Acceptance Scenarios**:

1. **Given** un visiteur sur la page "Article I — Raison d'être", **When** il clique sur "Suivant", **Then** il arrive sur la page "Article II — Les Valeurs Fondatrices".
2. **Given** un visiteur sur le premier article (Préambule), **When** il regarde la navigation, **Then** il n'y a pas de lien "Précédent" mais il y a un lien "Suivant".
3. **Given** un visiteur sur le dernier article (Signature), **When** il regarde la navigation, **Then** il n'y a pas de lien "Suivant" mais il y a un lien "Précédent".

---

### Edge Cases

- Que se passe-t-il si un visiteur accède directement à une URL d'article Constitution invalide (ex: `/constitution/article-inexistant`) ? Le site doit afficher une page 404 cohérente.
- Comment le contenu s'affiche-t-il sur mobile ? Les articles longs doivent rester lisibles avec un défilement fluide et la TOC doit être accessible.
- Que se passe-t-il si le visiteur utilise la recherche du site avec un terme de la Constitution (ex: "Human Authorship") ? Les pages Constitution doivent apparaitre dans les résultats.

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: Le site MUST afficher une section "Constitution" dans la navigation principale, au même niveau que "Framework".
- **FR-002**: Le site MUST proposer une page d'index `/constitution` listant tous les articles de la Constitution avec leur titre et une brève description.
- **FR-003**: Chaque article de la Constitution MUST avoir sa propre page avec une URL distincte suivant le pattern `/constitution/[slug]`.
- **FR-004**: Le contenu de chaque page MUST reproduire fidèlement et intégralement le texte de la Constitution AIAD v1.0 fourni, sans modification, ajout ni résumé.
- **FR-005**: Chaque page article MUST afficher une sidebar de navigation listant tous les articles de la section Constitution.
- **FR-006**: Chaque page article MUST afficher une table des matières (TOC) générée automatiquement à partir des titres h2-h4 du contenu.
- **FR-007**: Chaque page article MUST afficher des liens de navigation "Précédent" / "Suivant" vers les articles adjacents dans l'ordre logique.
- **FR-008**: La section Constitution MUST suivre exactement le même pattern d'architecture et de présentation que la section Framework existante (collection de contenu, layout, navigation, pages dynamiques).
- **FR-009**: Le contenu MUST être organisé en pages distinctes suivant le découpage logique suivant : Préambule, Article I à IX, et Signature.
- **FR-010**: Les pages Constitution MUST être indexées par le moteur de recherche interne du site.

### Key Entities

- **Article Constitution**: Représente une page de la Constitution. Attributs : titre, description, ordre d'affichage, slug, contenu MDX, statut (draft/publié), badge optionnel (essential).
- **Section Constitution**: Représente la collection de contenu "constitution" dans le CMS. Regroupe tous les articles et définit l'ordre de navigation.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: 100% des articles de la Constitution (Préambule + Articles I à IX + Signature = 11 pages) sont accessibles et affichent le contenu intégral du texte fondateur.
- **SC-002**: La navigation entre les articles est fonctionnelle : tous les liens prev/next et sidebar pointent vers les bonnes pages.
- **SC-003**: La section Constitution apparait dans la navigation principale du site et est accessible en un clic depuis n'importe quelle page.
- **SC-004**: Le temps de chargement de chaque page Constitution est inférieur à 3 secondes sur une connexion standard.
- **SC-005**: La section Constitution passe les mêmes tests de qualité (lint, build, tests unitaires) que la section Framework existante.

## Assumptions

- La section Constitution suit exactement le même pattern technique que la section Framework (collection Astro, layout DocsLayout, navigation centralisée, pages dynamiques).
- Le découpage en 11 pages suit la structure logique du texte : Préambule, Article I, Article II, ..., Article IX, Signature.
- Le texte est publié en français uniquement (pas d'internationalisation requise).
- Les pages Constitution sont publiées immédiatement (pas de mode draft pour cette feature).
- Le schéma de données existant (`docsSchema`) est réutilisé tel quel avec `section: "constitution"`.
- La page d'index Constitution suit le même modèle que la page d'index Framework (grille de cartes avec liens vers chaque article).

## Out of Scope

- Traduction du texte en d'autres langues.
- Système de versioning de la Constitution dans le site (la v1.0 est la seule version).
- Fonctionnalité de commentaire ou de proposition d'amendement directement sur le site.
- Modification du layout ou du design existant — on réutilise l'existant.
