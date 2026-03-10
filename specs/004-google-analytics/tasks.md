# Tasks: Intégration Google Analytics

**Input**: Design documents from `/specs/004-google-analytics/`
**Prerequisites**: plan.md (required), spec.md (required), research.md, data-model.md

**Tests**: Non demandés dans la spec. Tests manuels via quickstart.md.

**Organization**: Tasks grouped by user story for independent implementation and testing.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (e.g., US1, US2, US3)
- Include exact file paths in descriptions

---

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Configuration du projet et variable d'environnement GA4

- [x] T001 Create environment variable file `.env.example` with `PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX` placeholder (do NOT create `.env` itself)
- [x] T002 Add `.env` to `.gitignore` if not already present
- [x] T003 Create `src/scripts/` directory for analytics utilities

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Module utilitaire analytics partagé par toutes les user stories. DOIT être terminé avant toute implémentation.

**CRITICAL**: No user story work can begin until this phase is complete

- [x] T004 Create consent manager module in `src/scripts/analytics.ts` with functions: `getConsent()` returning ConsentRecord or null, `setConsent(choice: "accepted" | "refused")` storing JSON `{consent, timestamp}` in localStorage key `aiad-cookie-consent`, `isConsentValid()` checking 13-month expiry (395 days), `hasValidAcceptedConsent()` combining consent check + expiry. Handle corrupted/invalid JSON gracefully (treat as no consent). See data-model.md for ConsentRecord schema.
- [x] T005 Add GA4 initialization functions to `src/scripts/analytics.ts`: `initGA(measurementId: string)` that dynamically creates and appends gtag.js `<script>` element to `<head>`, initializes `window.dataLayer` and calls `gtag('js', new Date())` + `gtag('config', measurementId)`. Add `trackEvent(name: string, params?: Record<string, string | number>)` that calls `gtag('event', name, params)` only if GA is initialized. Both functions must be no-op safe (no errors if gtag not loaded or blocked by ad-blocker). Use try/catch around all gtag calls.
- [x] T006 Add language detection helper to `src/scripts/analytics.ts`: `detectLanguage()` returning `"fr"` or `"en"` based on `navigator.language.startsWith('en')`. Default to `"fr"`.

**Checkpoint**: Analytics utility module complete — all user stories can now use these shared functions.

---

## Phase 3: User Story 1 - Suivi des pages vues (Priority: P1) MVP

**Goal**: Chaque page vue en production est enregistrée dans GA4 pour les visiteurs ayant consenti. Aucun tracking en mode dev.

**Independent Test**: Visiter le site en production preview (`npm run build && npm run preview`), accepter le consentement manuellement via console (`localStorage.setItem('aiad-cookie-consent', JSON.stringify({consent:"accepted",timestamp:Date.now()}))`), naviguer entre les pages, et vérifier dans les DevTools Network que les requêtes vers google-analytics.com sont émises.

### Implementation for User Story 1

- [x] T007 [US1] Create `src/components/Head.astro` as a Starlight Head component override. Import and render the default Starlight Head component first (from `@astrojs/starlight/components`). Then, conditionally (only if `import.meta.env.PROD`) add an inline `<script>` that: imports `hasValidAcceptedConsent` and `initGA` from `../scripts/analytics.ts`, checks if consent is accepted, and if so calls `initGA(import.meta.env.PUBLIC_GA_MEASUREMENT_ID)`. GA4 auto-tracks `page_view` events once initialized.
- [x] T008 [US1] Update `astro.config.mjs` to add Starlight component override: add `components: { Head: './src/components/Head.astro' }` inside the `starlight()` config object. Preserve all existing config (sidebar, title, social, customCss, etc.).
- [x] T009 [US1] Verify build works: run `npm run build` and confirm no errors. Check that the built HTML for a page includes the analytics script only in production output.

**Checkpoint**: Pages vues trackées automatiquement pour les visiteurs avec consentement accepté. MVP fonctionnel.

---

## Phase 4: User Story 2 - Conformité RGPD avec bandeau de consentement (Priority: P2)

**Goal**: Bandeau de consentement bilingue FR/EN affiché à la première visite, choix mémorisé 13 mois, lien "Gestion des cookies" dans le footer.

**Independent Test**: Ouvrir le site en production preview avec localStorage vide, vérifier que le bandeau s'affiche, accepter et vérifier que gtag.js se charge, supprimer le localStorage et vérifier que le bandeau réapparaît, refuser et vérifier qu'aucun cookie `_ga*` n'est présent.

### Implementation for User Story 2

- [x] T010 [P] [US2] Create `src/components/CookieConsent.astro` component: a fixed-position banner at the bottom of the viewport with: bilingual text (FR default, EN if `detectLanguage()` returns `"en"`), two buttons "Accepter"/"Refuser" (or "Accept"/"Decline" in EN), clean styling using Starlight CSS variables (`--sl-color-bg`, `--sl-color-text`, `--sl-color-accent`). The banner must include an inline `<script>` that: checks `isConsentValid()` on load — if valid consent exists, hide the banner; if not, show it. On "Accepter" click: call `setConsent("accepted")`, call `initGA(...)`, hide banner. On "Refuser" click: call `setConsent("refused")`, hide banner. Import functions from `../scripts/analytics.ts`.
- [x] T011 [P] [US2] Add cookie consent banner styles to `src/styles/custom.css`: fixed positioning at bottom, z-index above Starlight content, responsive layout (stack buttons vertically on mobile), smooth appear/disappear animation, respects Starlight dark/light theme via CSS variables.
- [x] T012 [US2] Create `src/components/Footer.astro` as a Starlight Footer component override. Import and render the default Starlight Footer component. Render the `CookieConsent` component here (body content, not head). Add a "Gestion des cookies" / "Cookie settings" link (bilingual via `detectLanguage()`) below or alongside the existing footer content. The link must trigger the cookie consent banner to reappear (dispatch a custom event or call a global function `window.showCookieConsent()`).
- [x] T013 [US2] Update `astro.config.mjs` to add Footer component override: add `Footer: './src/components/Footer.astro'` to the existing `components` object in starlight config.

**Checkpoint**: Bandeau RGPD fonctionnel, consentement persisté, lien footer opérationnel. User Stories 1 ET 2 fonctionnent ensemble.

---

## Phase 5: User Story 3 - Suivi des interactions clés (Priority: P3)

**Goal**: Événements personnalisés envoyés à GA4 pour le diagnostic de maturité IA et les téléchargements.

**Independent Test**: Accepter le tracking, lancer le diagnostic, le compléter, cliquer sur un bouton de téléchargement, puis vérifier dans GA4 Realtime Events que `diagnostic_started`, `diagnostic_completed`, et `download_click` apparaissent.

### Implementation for User Story 3

- [x] T014 [P] [US3] Update `src/components/AIMaturityDiagnostic.tsx` to add analytics event tracking: import `trackEvent` from `../scripts/analytics.ts`. Call `trackEvent('diagnostic_started')` when the user starts the diagnostic (at the beginning of the first question). Call `trackEvent('diagnostic_completed', { maturity_level: resultLevel })` when the results are displayed (where `resultLevel` is the computed maturity level string). Ensure `trackEvent` is no-op safe (already handled in the utility module) so the component works identically with or without consent.
- [x] T015 [P] [US3] Update `src/components/DownloadButton.astro` to add analytics event tracking: add an inline `<script>` that imports `trackEvent` from `../scripts/analytics.ts` and attaches a click event listener to the download link. On click, call `trackEvent('download_click', { file_name: fileName })` where `fileName` is extracted from the `href` attribute. Ensure graceful degradation (download still works if tracking fails).

**Checkpoint**: All 3 user stories complete. Custom events tracked for diagnostic and downloads.

---

## Phase 6: Polish & Cross-Cutting Concerns

**Purpose**: Vérifications finales, edge cases, et nettoyage

- [ ] T016 Verify ad-blocker resilience: test the site with uBlock Origin or similar enabled. Confirm no JavaScript errors in console and no visible degradation. All try/catch in `analytics.ts` must prevent errors from propagating.
- [ ] T017 Verify consent expiry: manually set a consent record with a timestamp older than 13 months in localStorage, reload the page, and confirm the banner reappears.
- [ ] T018 Verify dark/light theme compatibility: check the cookie consent banner renders correctly in both Starlight themes (dark mode and light mode).
- [ ] T019 Run quickstart.md validation: follow all steps in `specs/004-google-analytics/quickstart.md` to verify the complete flow end-to-end.
- [x] T020 Run `npm run build` to confirm production build succeeds with zero errors and zero warnings related to the new components.

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies — can start immediately
- **Foundational (Phase 2)**: Depends on Phase 1 (T003 creates directory) — BLOCKS all user stories
- **US1 (Phase 3)**: Depends on Phase 2 completion (needs analytics.ts utilities)
- **US2 (Phase 4)**: Depends on Phase 2 completion (needs consent manager). Recommend after US1 (uses Head.astro from T007).
- **US3 (Phase 5)**: Depends on Phase 2 completion (needs trackEvent). Can run in parallel with US1/US2.
- **Polish (Phase 6)**: Depends on all user stories complete

### User Story Dependencies

- **US1 (P1)**: Depends on Foundational only. No dependency on other stories.
- **US2 (P2)**: Depends on Foundational. Integrates with US1 (Head.astro created in US1). Recommend completing US1 first.
- **US3 (P3)**: Depends on Foundational only. T014 and T015 are independent of each other and of US1/US2 (trackEvent is no-op safe).

### Parallel Opportunities

- **Phase 2**: T004, T005, T006 are in the same file but sequential (same module). No parallelism within this phase.
- **Phase 4**: T010 and T011 can run in parallel (different files: .astro vs .css).
- **Phase 5**: T014 and T015 can run in parallel (different files: .tsx vs .astro).
- **Cross-story**: US3 tasks (T014, T015) can start as soon as Phase 2 is done, independent of US1/US2.

---

## Parallel Example: User Story 3

```bash
# These two tasks can run in parallel (different files, no dependencies):
Task T014: "Update AIMaturityDiagnostic.tsx with trackEvent calls"
Task T015: "Update DownloadButton.astro with trackEvent calls"
```

---

## Implementation Strategy

### MVP First (User Story 1 Only)

1. Complete Phase 1: Setup (T001–T003)
2. Complete Phase 2: Foundational (T004–T006)
3. Complete Phase 3: User Story 1 (T007–T009)
4. **STOP and VALIDATE**: Test page view tracking with manual consent in localStorage
5. Deploy if ready — analytics collecting data immediately

### Incremental Delivery

1. Setup + Foundational → Analytics module ready
2. Add US1 → Page views tracked → Deploy (MVP!)
3. Add US2 → RGPD-compliant consent banner → Deploy
4. Add US3 → Custom events for diagnostic + downloads → Deploy
5. Polish → Ad-blocker resilience, theme checks, quickstart validation

### Recommended Sequence (Solo Developer)

Phase 1 → Phase 2 → Phase 3 (MVP) → Phase 4 → Phase 5 → Phase 6

---

## Notes

- [P] tasks = different files, no dependencies
- [Story] label maps task to specific user story
- No automated tests requested — validation via manual testing (quickstart.md)
- The `PUBLIC_GA_MEASUREMENT_ID` environment variable must be set before production deploy
- Commit after each phase completion
- Stop at any checkpoint to validate independently
