# AdaRemise — Planning d'équipe

> Projet fullstack de fin de Bloc 1 · Ada Tech School
> Stack : PostgreSQL (Docker) · Express/`pg` · React (Vite + React Router) · Swagger
> Règle d'or : pas de V2 tant que la V1 n'est pas stable sur `main`

---

## Répartition des domaines

| Domaine                                                | Qui   | Périmètre                                                                                      |
| ------------------------------------------------------ | ----- | ---------------------------------------------------------------------------------------------- |
| **A+B** — Consulter le stock + Faire entrer les objets | `___` | GET /objets (filtres), POST /depots, POST /objets, liste objets, formulaire dépôt, fiche dépôt   |
| **C** — Suivre la vie d'un objet                       | `___` | GET /personnes, PATCH /objets/:id, écran "Qui es-tu ?", fiche objet (changement de statut)      |
| **D** — Sortir les chiffres                            | `___` | Routes stats, tableau de bord (nombre par statut, poids total, nb en rayon)                    |

> Remplir les noms au lancement. Chaque domaine = de la requête SQL à l'écran React.

---

## Phase 0 — Lancement (Lundi S15)

- [x] Lire le brief
- [x] Désigner une référente : `Jérémy`
- [ ] Répartir les domaines
- [ ] Découper la V1 en tâches fines
- [ ] Remplir le board (GitHub Projects / Trello)

---

## Phase 1 — Wireframes & Socle commun (Mardi S15)

### Wireframes (matin, ~2h)

Dessiner les 6 écrans V1 + plan de navigation :

- [ ] 1. Écran « Qui es-tu ? »
- [ ] 2. Liste des objets (filtres statut / catégorie)
- [ ] 3. Fiche objet (changement de statut)
- [ ] 4. Formulaire nouveau dépôt
- [ ] 5. Fiche dépôt (ajout d'objet)
- [ ] 6. Tableau de bord
- [ ] Plan de navigation (6 écrans reliés par des flèches)

**Checklist avant de coder :**

- [ ] Le parcours boucle (identification → dashboard et retour)
- [ ] Le geste métier est possible du début à la fin
- [ ] Les données annotées existent dans la base
- [ ] Le retour après action est prévu
- [ ] Les états vides et de chargement sont dessinés
- [ ] Pas de vente, pas de réparation, pas d'atelier (ce n'est pas la V1)

### Socle commun (après-midi, ~2h)

- [ ] Binôme back : monter le serveur Express (db.js, index.js, middleware d'erreur)
- [ ] Binôme front : créer le projet Vite + React Router
- [ ] `docker-compose.yml` PostgreSQL + migrations + données de référence
- [ ] Objectif : une page affiche une ligne venue de la base
- [ ] Premier commit sur `main`, chacune crée sa branche

---

## Phase 2 — Développement V1 (Mardi soir → Dimanche S16)

### Jalons intermédiaires

| Quand          | Ce qui doit marcher                                                      |
| -------------- | ------------------------------------------------------------------------ |
| Mardi soir     | Socle tourne sur toutes les machines, `main` a son 1er commit            |
| Mercredi soir  | Chacune affiche des données en lecture seule (1 route, 1 écran, 1 liste)  |
| Jeudi soir     | Les formulaires écrivent en base                                         |
| Vendredi       | Intégration des branches, finitions, README                               |
| Lundi S16 soir | **V1 stable sur `main`**                                                 |

### Par domaine

| Étape            | Domaine A+B                                       | Domaine C                         | Domaine D  |
| ---------------- | ------------------------------------------------- | --------------------------------- | ---------- |
| Route(s) SQL     | GET /objets (filtres), POST /depots, POST /objets  | GET /personnes, PATCH /objets/:id | GET /stats |
| Composants React | Liste objets, formulaire dépôt, fiche dépôt        | Écran identification, fiche objet   | Dashboard  |
| Intégration      | Mercredi                                          | Mercredi                          | Mercredi   |
| Formulaires      | Jeudi                                             | Jeudi                             | —          |
| Test / finitions | Vendredi                                           | Vendredi                          | Vendredi   |

### Règles Git

- [ ] 1 branche par fonctionnalité (ex: `feat/liste-objets`, `feat/fiche-objet`)
- [ ] Pull request relue par une autre membre avant merge
- [ ] Jamais de push direct sur `main`
- [ ] Au moins 1 intégration par jour
- [ ] `.env` jamais commité — fournir `.env.example`

---

## Phase 3 — Stabilisation V1 (Lundi S16)

- [ ] Tout intégré et fonctionnel sur `main`
- [ ] Tests manuels : entrées invalides, champs vides, IDs inexistants, double soumission
- [ ] README.md : comment lancer en 3 commandes sur une machine neuve
- [ ] Swagger : toutes les routes documentées
- [ ] ROADMAP.md : ce qui est livré, ce qui ne l'est pas, contenu V2
- [ ] Dossier `wireframes/` : V1 + plan de navigation
- [ ] Test cross-machine : cloner le repo sur une autre machine, vérifier que ça tourne

---

## Phase 4 — V2 Bonus (Si V1 stable + temps disponible)

- [ ] Saisir une réparation (objet, bénévole, durée, résultat)
- [ ] Enregistrer une vente (multi-objets, prix réel, mode de paiement)
- [ ] Formulaire dépôt complet (multi-objets en un coup)
- [ ] Créer un donateur depuis le formulaire de dépôt
- [ ] Vitrine publique (catalogue objets en rayon, prix, filtres)
- [ ] Dashboard enrichi (CA, heures bénévolat, taux réussite, graphique)
- [ ] Wireframes V2 (nouveaux écrans + écrans modifiés)

---

## Phase 5 — Rendu & Soutenance (Mercredi-Jeudi S16)

### Mercredi — Capsule vidéo

- [ ] Choisir 1 rôle, 1 action, 1 parcours du début à la fin
- [ ] Tourner la capsule (voix off, 1min30 max)

### Jeudi — Soutenance

Préparer les 7 points :

1. [ ] **Le produit** — démo du point de vue de Malika
2. [ ] **Contribution individuelle** — chacune présente son domaine (SQL → écran)
3. [ ] **Choix technique** — 1 décision argumentée
4. [ ] **Wireframe vs écran réalisé** — écarts assumés
5. [ ] **Ce qu'on a repris d'Adapi** — gardé / refait / appris
6. [ ] **Roadmap** — versions, ce qui manque et pourquoi
7. [ ] **Bilan d'équipe** — organisation, ce qu'on ferait autrement

### Repo à livrer

- [ ] Code (back + front), organisé et lisible
- [ ] `README.md`
- [ ] Documentation Swagger
- [ ] Dossier `wireframes/`
- [ ] `ROADMAP.md`
- [ ] Historique Git (branches, PR, relectures)
- [ ] Prompt log de chacune
