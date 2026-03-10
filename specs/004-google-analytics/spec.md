# Feature Specification: Intégration Google Analytics

**Feature Branch**: `004-google-analytics`
**Created**: 2026-03-10
**Status**: Draft
**Input**: User description: "Connecter le site AIAD à Google Analytics pour suivre les visites et le comportement des utilisateurs"

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Suivi des pages vues par les visiteurs (Priority: P1)

En tant qu'administrateur du site AIAD, je veux que chaque page vue par un visiteur soit automatiquement enregistrée dans Google Analytics 4 afin de comprendre quelles sections de la documentation sont les plus consultées.

**Why this priority**: C'est la fonctionnalité fondamentale du tracking analytics. Sans elle, aucune donnée n'est collectée. Elle représente le MVP minimal qui apporte immédiatement de la valeur.

**Independent Test**: Peut être testé en visitant le site déployé, puis en vérifiant dans le tableau de bord GA4 que les pages vues apparaissent en temps réel.

**Acceptance Scenarios**:

1. **Given** le site est déployé en production, **When** un visiteur navigue sur une page du site, **Then** un événement de page vue est enregistré dans Google Analytics 4 avec l'URL et le titre de la page.
2. **Given** un développeur travaille en local, **When** il consulte le site en mode développement, **Then** aucune donnée n'est envoyée à Google Analytics (le tracking est désactivé en environnement de développement).
3. **Given** le site est déployé en production, **When** un visiteur navigue entre plusieurs pages, **Then** chaque navigation est enregistrée comme un événement distinct dans GA4.

---

### User Story 2 - Conformité RGPD avec bandeau de consentement (Priority: P2)

En tant que visiteur du site AIAD, je veux être informé de l'utilisation de cookies analytics et pouvoir accepter ou refuser le tracking avant que mes données ne soient collectées, afin que ma vie privée soit respectée conformément au RGPD.

**Why this priority**: La conformité légale est indispensable pour un site accessible depuis l'Union Européenne. Sans consentement explicite, le tracking ne peut pas légalement être activé.

**Independent Test**: Peut être testé en visitant le site pour la première fois et en vérifiant que le bandeau s'affiche, que le choix est respecté, et qu'aucun cookie GA n'est déposé avant acceptation.

**Acceptance Scenarios**:

1. **Given** un visiteur accède au site pour la première fois, **When** la page se charge, **Then** un bandeau de consentement cookies s'affiche et aucun script de tracking n'est chargé.
2. **Given** le bandeau de consentement est affiché, **When** le visiteur clique sur "Accepter", **Then** le script Google Analytics est chargé et le tracking commence pour cette session et les sessions futures.
3. **Given** le bandeau de consentement est affiché, **When** le visiteur clique sur "Refuser", **Then** aucun script de tracking n'est chargé, aucun cookie analytics n'est déposé, et le choix est mémorisé.
4. **Given** le visiteur a déjà fait un choix (accepter ou refuser), **When** il revient sur le site ultérieurement, **Then** son choix précédent est respecté sans réafficher le bandeau.

---

### User Story 3 - Suivi des interactions clés (Priority: P3)

En tant qu'administrateur du site, je veux suivre les interactions importantes des visiteurs (utilisation de l'outil de diagnostic, clics sur les liens de téléchargement) afin d'identifier les contenus et fonctionnalités les plus engageants. Note : la navigation entre sections est déjà couverte par le suivi des pages vues (US1).

**Why this priority**: Apporte une valeur analytique avancée au-delà des simples pages vues. Permet de comprendre l'engagement réel des utilisateurs avec les fonctionnalités interactives du site.

**Independent Test**: Peut être testé en effectuant les actions trackées sur le site déployé, puis en vérifiant dans GA4 que les événements personnalisés apparaissent avec les bonnes catégories et libellés.

**Acceptance Scenarios**:

1. **Given** le visiteur a accepté le tracking, **When** il lance l'outil de diagnostic de maturité IA, **Then** un événement personnalisé "diagnostic_started" est enregistré dans GA4.
2. **Given** le visiteur a accepté le tracking, **When** il termine le diagnostic et obtient ses résultats, **Then** un événement personnalisé "diagnostic_completed" est enregistré avec le niveau de maturité obtenu.
3. **Given** le visiteur a accepté le tracking, **When** il clique sur un lien de téléchargement, **Then** un événement personnalisé "download_click" est enregistré.

---

### Edge Cases

- Que se passe-t-il si le visiteur utilise un bloqueur de publicités qui empêche le chargement de Google Analytics ? Le site doit fonctionner normalement sans dégradation.
- Que se passe-t-il si le visiteur supprime ses cookies ? Le bandeau de consentement doit réapparaître lors de la prochaine visite.
- Que se passe-t-il si la connexion à Google Analytics est interrompue ou si le service est indisponible ? Le site doit continuer à fonctionner sans erreur visible pour l'utilisateur.
- Que se passe-t-il si JavaScript est désactivé dans le navigateur ? Le site doit rester accessible ; le tracking est simplement inactif.

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: Le système DOIT intégrer Google Tag Manager (GTM) comme conteneur de tags, permettant la configuration de Google Analytics 4 et d'autres outils de tracking depuis l'interface GTM.
- **FR-002**: Le système DOIT activer le tracking uniquement en environnement de production (pas en développement local ni en prévisualisation).
- **FR-003**: Le système DOIT afficher un bandeau de consentement cookies lors de la première visite d'un utilisateur.
- **FR-004**: Le système NE DOIT PAS charger le script Google Tag Manager ni déposer de cookies analytics avant que le visiteur ait explicitement accepté.
- **FR-005**: Le système DOIT mémoriser le choix de consentement du visiteur pour une durée de 13 mois (conformité CNIL). À expiration, le bandeau DOIT être réaffiché.
- **FR-006**: Le système DOIT permettre au visiteur de modifier son choix de consentement à tout moment via un lien "Gestion des cookies" présent dans le footer du site.
- **FR-007**: Le système DOIT enregistrer les pages vues automatiquement pour les visiteurs ayant accepté le tracking.
- **FR-008**: Le système DOIT enregistrer des événements personnalisés pour les interactions clés (diagnostic, téléchargements).
- **FR-009**: Le site DOIT continuer à fonctionner normalement si Google Tag Manager est bloqué ou indisponible.
- **FR-010**: Le bandeau de consentement DOIT être affiché en français par défaut et en anglais si la langue du navigateur du visiteur est détectée comme anglophone. La détection de langue DOIT être automatique.

### Key Entities

- **Consentement visiteur**: Représente le choix d'un visiteur (accepté/refusé) concernant le tracking analytics. Associé à une date, persisté localement, et valide pendant 13 mois (recommandation CNIL). À expiration, le bandeau de consentement est réaffiché.
- **Événement analytics**: Représente une interaction trackée (page vue, diagnostic lancé/complété, téléchargement). Caractérisé par un nom, une catégorie et des paramètres optionnels.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: 100% des pages vues en production sont enregistrées dans GA4 pour les visiteurs ayant accepté le tracking.
- **SC-002**: Le bandeau de consentement s'affiche en moins de 1 seconde après le chargement de la page lors de la première visite.
- **SC-003**: Aucun cookie analytics n'est déposé avant le consentement explicite du visiteur (vérifiable par inspection des cookies navigateur).
- **SC-004**: Le temps de chargement du site n'augmente pas de plus de 500ms après l'intégration du tracking (pour les visiteurs ayant accepté).
- **SC-005**: Le site fonctionne sans erreur visible lorsque Google Analytics est bloqué par un ad-blocker.
- **SC-006**: Les événements personnalisés (diagnostic, téléchargements) apparaissent dans le rapport d'événements GA4 dans les 5 minutes suivant l'interaction.

## Clarifications

### Session 2026-03-10

- Q: Comment le visiteur accède-t-il à la modification de son consentement (FR-006) ? → A: Lien "Gestion des cookies" dans le footer du site.
- Q: Quelle est la durée de validité du consentement stocké ? → A: 13 mois, conformément à la recommandation CNIL. Réaffichage du bandeau à expiration.

## Assumptions

- Le site utilise Google Tag Manager (GTM) comme conteneur de tags. GA4 et tout autre outil de tracking sont configurés dans l'interface GTM.
- L'identifiant de conteneur GTM (Container ID, format GTM-XXXXXXX) sera fourni par l'administrateur lors de l'implémentation.
- Le stockage du consentement se fait côté client (localStorage ou cookie first-party), sans nécessité de backend.
- Le site est principalement destiné à un public francophone ; le bandeau est en français par défaut avec support anglais via détection automatique de la langue du navigateur.
- Le déploiement se fait sur GitHub Pages, un environnement statique sans rendu côté serveur.
