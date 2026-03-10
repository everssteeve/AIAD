# Data Model: Intégration Google Analytics

**Feature**: 004-google-analytics | **Date**: 2026-03-10

## Entities

### ConsentRecord

Représente le choix de consentement d'un visiteur, persisté dans localStorage.

**Storage key**: `aiad-cookie-consent`

| Field | Type | Description | Constraints |
|-------|------|-------------|-------------|
| consent | `"accepted"` \| `"refused"` | Choix du visiteur | Obligatoire, enum stricte |
| timestamp | `number` | Date du choix (Date.now()) | Obligatoire, millisecondes epoch |

**Validation rules**:
- `consent` doit être exactement `"accepted"` ou `"refused"`
- `timestamp` doit être un nombre positif
- Si le JSON est invalide ou corrompu, traiter comme absent (réafficher le bandeau)

**State transitions**:

```
[Aucun consentement] → Accepter → { consent: "accepted", timestamp }
[Aucun consentement] → Refuser → { consent: "refused", timestamp }
{ consent: "accepted" } → Modifier (Refuser) → { consent: "refused", timestamp: new }
{ consent: "refused" } → Modifier (Accepter) → { consent: "accepted", timestamp: new }
{ consent: *, timestamp > 13 mois } → Expiré → [Aucun consentement]
```

**Expiry rule**: `Date.now() - record.timestamp > 13 * 30.44 * 24 * 60 * 60 * 1000` (≈395 jours)

### AnalyticsEvent

Représente un événement envoyé à GA4. Non persisté localement.

| Field | Type | Description | Constraints |
|-------|------|-------------|-------------|
| name | `string` | Nom de l'événement GA4 | Obligatoire, snake_case |
| params | `Record<string, string \| number>` | Paramètres additionnels | Optionnel |

**Événements définis**:

| Event Name | Trigger | Params |
|------------|---------|--------|
| `page_view` | Navigation vers une page | URL, titre (auto par GA4) |
| `diagnostic_started` | Lancement du diagnostic IA | — |
| `diagnostic_completed` | Fin du diagnostic | `maturity_level: string` |
| `download_click` | Clic sur un bouton de téléchargement | `file_name: string` |

## Relationships

```
Visiteur (navigateur)
  └── ConsentRecord (0..1, localStorage)
  └── AnalyticsEvent (0..*, envoyés à GA4 si consent === "accepted")
```

Aucune relation entre entités : le ConsentRecord contrôle si les AnalyticsEvents sont envoyés, mais ils ne se référencent pas mutuellement.
