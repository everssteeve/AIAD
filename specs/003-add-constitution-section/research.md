# Research: Add Constitution Section

**Feature**: 003-add-constitution-section
**Date**: 2026-03-02

## Research Summary

Cette feature ne présente aucun NEEDS CLARIFICATION dans le contexte technique. Tous les patterns sont déjà établis par la section Framework existante. La recherche ci-dessous documente les décisions clés et valide les choix d'implémentation.

## Decision 1: Découpage du contenu en pages

**Decision**: 11 pages MDX suivant la structure logique du texte fondateur.

**Rationale**: Le texte est naturellement structuré en Préambule, 9 Articles numérotés, et une Signature. Chaque article forme une unité de lecture autonome. Ce découpage est cohérent avec le pattern Framework (8 chapitres thématiques).

**Alternatives considered**:
- Page unique avec tout le contenu : Rejetée — le texte est trop long (~4000 mots), mauvaise expérience utilisateur, TOC surchargée.
- Regroupement d'articles (ex: Articles I-III ensemble) : Rejeté — casse la structure logique du texte, l'utilisateur demande explicitement le texte exact tel quel.

## Decision 2: Réutilisation du docsSchema existant

**Decision**: Utiliser `docsSchema` existant avec `section: "constitution"` ajouté à l'enum.

**Rationale**: Le schéma existant couvre tous les besoins (title, description, order, section, isEssential, draft, tags). Aucun champ supplémentaire n'est nécessaire pour le contenu constitutionnel.

**Alternatives considered**:
- Créer un `constitutionSchema` dédié avec des champs comme `version`, `gardien` : Rejeté — over-engineering, ces métadonnées sont dans le contenu MDX lui-même, pas dans le frontmatter.

## Decision 3: Convention de nommage des IDs navigation

**Decision**: Préfixe `const-` pour tous les IDs de navigation (ex: `const-preambule`, `const-article-i`).

**Rationale**: Suit la convention existante — Framework utilise `fw-`, Mode Opératoire utilise `mo-`. `const-` est court, distinctif et non ambigu.

**Alternatives considered**:
- `constitution-` : Rejeté — trop long, les autres sections utilisent des abréviations.
- `co-` : Rejeté — trop court, risque de confusion.

## Decision 4: Position dans la navigation

**Decision**: Constitution placée entre Framework et Mode Opératoire dans la navigation (Header, Sidebar, MobileMenu).

**Rationale**: La Constitution est le texte fondateur qui précède le framework opérationnel. L'ordre logique est : Constitution (pourquoi/valeurs) → Framework (organisation) → Mode Opératoire (comment) → Annexes (détails).

**Alternatives considered**:
- Avant Framework : Possible mais moins intuitif — les visiteurs cherchent d'abord le framework concret.
- Après Annexes : Rejeté — relègue le texte fondateur en dernière position.

## Decision 5: Pages marquées isEssential

**Decision**: Préambule et Article II (Valeurs Fondatrices) marqués `isEssential: true`.

**Rationale**: Le Préambule est le point d'entrée naturel. L'Article II contient les valeurs fondatrices qui sont immuables et constitutionnelles — c'est le coeur du texte. Les autres articles sont importants mais secondaires dans l'ordre de lecture.

**Alternatives considered**:
- Tout marquer essential : Rejeté — dilue la signification du badge.
- Uniquement le Préambule : Possible mais l'Article II est explicitement décrit comme "domaine du gardien" et immuable.

## Decision 6: Pas de mode draft

**Decision**: Toutes les pages publiées immédiatement (`draft: false` ou omis).

**Rationale**: Le texte de la Constitution v1.0 est complet et finalisé. Il n'y a pas de contenu à venir — le texte exact a été fourni par l'utilisateur.

**Alternatives considered**:
- `draft: true` pendant le développement : Rejeté — le contenu est prêt, pas besoin de phase de rédaction progressive. Le mode draft sera géré par la branche git.
