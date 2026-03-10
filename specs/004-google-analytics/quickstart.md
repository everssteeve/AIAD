# Quickstart: Intégration Google Tag Manager

**Feature**: 004-google-analytics | **Date**: 2026-03-10

## Prérequis

- Node.js 20+
- Un Container ID GTM (format `GTM-XXXXXXX`) obtenu depuis la console Google Tag Manager
- GA4 configuré comme tag dans GTM (côté interface GTM, pas dans le code)
- Le site AIAD fonctionnel en local (`npm run dev`)

## Architecture en bref

```
astro.config.mjs          ← Ajout des component overrides (Head, Footer)
src/
├── scripts/analytics.ts   ← Module utilitaire : consent manager + GTM init + dataLayer events
├── components/
│   ├── Head.astro         ← Override Starlight : injection conditionnelle GTM
│   ├── Footer.astro       ← Override Starlight : ajout lien "Gestion des cookies"
│   └── CookieConsent.astro ← Bandeau de consentement RGPD bilingue
```

## Flux de données

```
Page load
  → Head.astro vérifie import.meta.env.PROD
  → Si prod : injecte <script> client
    → Script vérifie localStorage (aiad-cookie-consent)
      → Si consent "accepted" et non expiré : charge GTM dynamiquement
      → Si pas de consent : affiche CookieConsent banner
      → Si consent "refused" et non expiré : ne fait rien

Events custom → dataLayer.push({ event: 'nom_event', ...params })
  → GTM capture les events via triggers configurés dans l'interface GTM
  → GTM transmet à GA4 (ou tout autre outil configuré)
```

## Configuration

Le Container ID GTM est stocké comme variable d'environnement :

```env
# .env (à créer, ne PAS commiter)
PUBLIC_GTM_CONTAINER_ID=GTM-XXXXXXX
```

Accessible dans Astro via `import.meta.env.PUBLIC_GTM_CONTAINER_ID`.

## Test rapide

1. `npm run dev` → Vérifier que le bandeau n'apparaît PAS (mode dev, analytics désactivé)
2. `npm run build && npm run preview` → Vérifier que le bandeau apparaît
3. Accepter → Vérifier dans les DevTools Network que `gtm.js` est chargé
4. Refuser → Vérifier qu'aucun script GTM n'est chargé
5. Supprimer localStorage → Vérifier que le bandeau réapparaît

## Points d'attention

- Le Container ID ne doit JAMAIS être dans le code source en dur. Utiliser `PUBLIC_GTM_CONTAINER_ID`.
- Le script GTM ne doit JAMAIS être dans le HTML initial (chargement dynamique uniquement).
- Les events custom sont envoyés via `dataLayer.push()`. GA4 les capture via des triggers GTM.
- Les composants React (AIMaturityDiagnostic) appellent `trackEvent()` depuis `analytics.ts` — cette fonction est no-op si le consentement n'est pas donné.
- La configuration des tags GA4, triggers et variables se fait dans l'interface GTM, pas dans le code.
