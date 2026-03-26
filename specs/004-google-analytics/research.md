# Research: Intégration Google Analytics

**Feature**: 004-google-analytics | **Date**: 2026-03-10

## Decisions

### 1. Injection GA4 : Component Override de Head (pas `head` config)

**Decision**: Utiliser un override du composant `Head` de Starlight via `components: { Head: './src/components/Head.astro' }`.

**Rationale**: La config `head` dans `astro.config.mjs` est statique et ne permet pas de logique conditionnelle (consentement, environnement). Un composant override permet d'utiliser `import.meta.env.PROD` pour exclure le code analytics en dev, et d'injecter un script client qui vérifie le consentement avant de charger gtag.js.

**Alternatives considered**:
- `head` config array : supporte les `<script>` inline mais pas de logique conditionnelle. Rejeté.
- Partytown (web worker) : ajoute de la complexité pour un gain de performance marginal sur un site statique. Rejeté.

### 2. Lien "Gestion des cookies" : Component Override de Footer

**Decision**: Utiliser un override du composant `Footer` de Starlight via `components: { Footer: './src/components/Footer.astro' }`.

**Rationale**: Starlight gère le footer automatiquement. L'override permet d'ajouter le lien "Gestion des cookies" tout en conservant le contenu par défaut (pagination, dernière modification).

**Alternatives considered**:
- Injection CSS/JS pour modifier le footer existant : fragile, dépend du DOM interne de Starlight. Rejeté.

### 3. Chargement GA4 : Injection dynamique après consentement

**Decision**: Ne jamais inclure gtag.js dans le HTML initial. Le charger dynamiquement via `document.createElement('script')` uniquement après vérification du consentement dans localStorage.

**Rationale**: Pattern RGPD standard. Garantit zéro cookie avant consentement. Plus robuste que Google Consent Mode v2 (qui envoie des pings même sans consentement).

**Alternatives considered**:
- Google Consent Mode v2 : charge gtag.js et envoie des pings cookieless avant consentement. Interprétation CNIL stricte questionnable. Rejeté.

### 4. Stockage du consentement : localStorage avec JSON

**Decision**: Stocker dans localStorage sous la clé `aiad-cookie-consent` un objet JSON : `{ consent: "accepted"|"refused", timestamp: number }`. Expiration calculée à 13 mois (≈395 jours) depuis le timestamp.

**Rationale**: localStorage est simple, côté client uniquement, sans backend requis. Le JSON permet de stocker la date pour calculer l'expiration CNIL de 13 mois.

**Alternatives considered**:
- Cookie first-party avec `max-age` : nécessite gestion du cookie, non nécessaire sans backend. Rejeté.

### 5. Détection de langue : navigator.language

**Decision**: Utiliser `navigator.language.startsWith('en')` pour basculer en anglais. Défaut : français.

**Rationale**: Simple, fiable, standard. Le site est principalement francophone, seul l'anglais est en alternative. Pas besoin de détecter d'autres langues.

**Alternatives considered**:
- `navigator.languages` array : overkill pour un choix binaire FR/EN. Rejeté.

### 6. Guard environnement : import.meta.env.PROD

**Decision**: Utiliser `import.meta.env.PROD` dans le frontmatter du composant Head.astro pour exclure le code analytics en mode développement.

**Rationale**: Résolu au build time par Astro. Le code analytics est tree-shaken en dev, pas de runtime check nécessaire.

**Alternatives considered**:
- `window.location.hostname` check : runtime, fragile, pas de tree-shaking. Rejeté.

## Summary

| Sujet | Décision | Mécanisme |
|-------|----------|-----------|
| Injection GA4 | Override composant Head | `components.Head` dans config Starlight |
| Lien cookies footer | Override composant Footer | `components.Footer` dans config Starlight |
| Chargement GA4 | Dynamique après consentement | `document.createElement('script')` |
| Stockage consentement | localStorage JSON | Clé `aiad-cookie-consent`, expiry 13 mois |
| Détection langue | `navigator.language` | `.startsWith('en')` → EN, sinon FR |
| Guard production | `import.meta.env.PROD` | Build-time, tree-shaking en dev |
