# Implementation Plan: Intégration Google Analytics

**Branch**: `004-google-analytics` | **Date**: 2026-03-10 | **Spec**: [spec.md](./spec.md)
**Input**: Feature specification from `/specs/004-google-analytics/spec.md`

## Summary

Intégrer Google Analytics 4 (GA4) dans le site de documentation AIAD (Astro/Starlight) avec un bandeau de consentement RGPD bilingue (FR/EN), des événements personnalisés pour le diagnostic et les téléchargements, et un lien "Gestion des cookies" dans le footer. L'intégration repose sur une injection conditionnelle de gtag.js côté client, activée uniquement après consentement explicite et uniquement en production.

## Technical Context

**Language/Version**: TypeScript 5.x, Node.js 20+
**Primary Dependencies**: Astro 5.x, @astrojs/starlight 0.37.x, @astrojs/react, React 19, Recharts
**Storage**: localStorage (consentement visiteur côté client)
**Testing**: Tests manuels (site statique GitHub Pages) + tests E2E optionnels
**Target Platform**: Web statique (GitHub Pages), site: `https://everssteeve.github.io/AIAD`
**Project Type**: Documentation site (Astro/Starlight)
**Performance Goals**: Bandeau affiché <1s, impact chargement <500ms
**Constraints**: Pas de backend, pas de SSR, Starlight gère les layouts (pas de layout custom direct)
**Scale/Scope**: ~60 pages de documentation, trafic modéré

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

| Principle | Status | Notes |
|-----------|--------|-------|
| I. Intention over Execution | PASS | Spec complète avec user stories, acceptance scenarios, clarifications résolues |
| II. Empirisme Radical | PASS | Hypothèse claire : GA4 apporte de la valeur pour comprendre l'usage du site. Observable via le dashboard GA4 |
| III. Orchestration Systémique | PASS | Intégration simple, pas de complexité agent excessive. Code généré suivra la spec |
| IV. Excellence Produit | PASS | Critères de succès mesurables définis (SC-001 à SC-006). Feature adoption vérifiable via GA4 |
| V. Qualité Intégrée | PASS | Conformité RGPD intégrée dès la conception (privacy by design). Edge cases identifiés |

Aucune violation. Gate passée.

## Project Structure

### Documentation (this feature)

```text
specs/004-google-analytics/
├── plan.md              # This file
├── research.md          # Phase 0 output
├── data-model.md        # Phase 1 output
├── quickstart.md        # Phase 1 output
└── tasks.md             # Phase 2 output (/speckit.tasks)
```

### Source Code (repository root)

```text
src/
├── components/
│   ├── Head.astro                   # Override Starlight Head : injection conditionnelle GA4 (nouveau)
│   ├── Footer.astro                 # Override Starlight Footer : lien cookies + bandeau (nouveau)
│   ├── CookieConsent.astro          # Bandeau de consentement RGPD bilingue (nouveau)
│   ├── AIMaturityDiagnostic.tsx     # Ajout événements analytics (existant)
│   └── DownloadButton.astro         # Ajout événement download_click (existant)
├── scripts/
│   └── analytics.ts                 # Utilitaires : consent manager + gtag helpers (nouveau)
└── styles/
    └── custom.css                   # Styles pour le bandeau de consentement (existant, à étendre)

astro.config.mjs                     # Ajout composant overrides Starlight Head + Footer (existant)
```

**Structure Decision**: Le site est un projet Astro/Starlight mono-répertoire. Les nouveaux fichiers sont ajoutés dans `src/components/` et `src/scripts/`. Starlight est étendu via ses composants overrides (Footer, Head) plutôt que par un layout custom. Aucun nouveau répertoire de premier niveau n'est créé.

## Complexity Tracking

Aucune violation de la constitution. Pas de complexité excessive à justifier.
