# Conventions d'équipe — AdaRemise

Règles à respecter par tous les membres du projet. Ce fichier est la référence : si une règle manque, ajoute-la (propose-la d'abord en PR).

---

## 1. Git & branches

### Nom des branches

- Format : `prenom/domaine-tache` — tout en **minuscules**, mots séparés par des **tirets**.
- Exemples : `alain/objets-liste`, `julie/depot-fiche`, `sara/identification`.
- Privilégie les **initiales** si le prénom est long (`aj/objets-liste`).

### Règles de base

- **`main` est protégée** : aucune poussée directe, on passe toujours par une **Pull Request**.
- **Une branche = une tâche** (celle du backlog). Pas de branche fourre-tout.
- Chaque PR reçoit au moins **1 relecture** par un·e coéquipier·e.
- Ne jamais laisser une branche en attente plus d'une journée sans nouvelle : on dit où on en est.

### Messages de commit

- En **français**, commencer par une **minuscule**, décrire l'action : `ajout route GET /benevoles`, `corrige rows[0] sur dépôt`.
- Faire des commits **petits et cohérents** (une chose par commit), ne pas mélanger plusieurs domaines.

---

## 2. Backend

### Style des fichiers routes

- Section header pour la méthode HTTP : `// --------------------- GET ---------------------`
- **1 commentaire français au-dessus de chaque route** décrivant ce qu'elle fait.
- Pas de références « PAGE x » ni de majuscules criardes.
- Une route = un fichier dans `BACK_END/routes/`, montée dans `index.js`.

### Gestion des erreurs

- Utiliser `next(err)` en cas d'erreur (le middleware central d'`index.js` s'en charge).
- Codes de statut : `200` succès, `201` création, `400` entrée invalide, `404` introuvable, `500` erreur interne.
- **Valider les entrées avant la requête SQL** (un `statut=toto` doit renvoyer `400`, pas laisser PostgreSQL renvoyer `500`).

### Documentation de l'API

- Toutes les requêtes de test vivent dans `BACK_END/requetes.http`.
- Format : `### <statut attendu> - description`, regroupées par section `# --- GET /api/xxx ---`.

---

## 3. Frontend (React)

- **1 page = 1 fichier** dans `src/pages/` (ex. `ListeObjets.jsx`).
- Les appels API passent par un utilitaire central (`src/api.js`) — pas de `fetch` isolé partout.
- Le layout commun (header, nav, identification) est **dans le socle** : les pages n'y écrivent pas.
- Les états **chargement / erreur / vide** sont gérés sur chaque écran qui affiche des données.
- Tout texte visible à l'écran est en **français**.

---

## 4. Organisation du travail

- **Une personne = une tâche** du backlog. Une tâche à deux noms est une tâche que personne ne fait.
- Chaque membre travaille **backend + frontend** de son domaine, pas seulement l'un des deux.
- Le **backlog Google Sheets** est la **source de vérité** : statuts « À faire / En cours / Terminé » mis à jour au fil de l'eau.

---

## 5. Docs & livrables

- Toute la documentation est en **français**.
- Règles de lancement : **3 commandes** (README) — l'équipe doit pouvoir tester sur une machine vierge.
- En fin de projet : `ROADMAP.md` (livré / pas livré / suite) + prompt log de chacun.
