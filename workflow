Voici le workflow SpecKit, dans l'ordre :

  1. /speckit.constitution — Créer ou mettre à jour la constitution du projet (principes fondateurs)
  2. /speckit.specify — Créer la spécification d'une feature à partir d'une description en langage naturel → génère spec.md
  3. /speckit.clarify — Identifier les zones sous-spécifiées, poser jusqu'à 5 questions de clarification, puis encoder les réponses dans la
   spec
  4. /speckit.plan — Générer le plan d'implémentation / design artifacts → génère plan.md
  5. /speckit.tasks — Générer les tâches ordonnées par dépendances → génère tasks.md
  6. /speckit.analyze — Analyse de cohérence et qualité croisée entre spec.md, plan.md et tasks.md (non destructif)
  7. /speckit.checklist — Générer une checklist personnalisée pour la feature
  8. /speckit.implement — Exécuter l'implémentation en traitant les tâches de tasks.md
  9. /speckit.taskstoissues — (Optionnel) Convertir les tâches en issues GitHub

  Flux typique : constitution → specify → clarify → plan → tasks → analyze → implement