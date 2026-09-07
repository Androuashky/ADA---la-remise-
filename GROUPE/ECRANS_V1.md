# AdaRemise — Guide des écrans V1

> De la donnée à l'écran : ce guide définit, pour chaque écran de la V1,
> les données affichées, les actions possibles, les états et les retours après action.
> C'est le contrat d'équipe avant de coder.

---

## Étape 1 — Connaître les données disponibles

### Tables exploitées dans la V1

| Table | Colonnes utiles | Rôle dans l'app |
|-------|-----------------|-----------------|
| `benevole` | `id`, `nom`, `prenom`, `telephone`, `date_arrivee` | Écran d'identification |
| `objet` | `id`, `libelle`, `poids_kg`, `etat_arrivee`, `statut`, `prix`, `date_mise_rayon`, `categorie_id`, `depot_id` | Liste, fiche, dépôt, dashboard |
| `categorie` | `id`, `libelle` | Filtres de la liste |
| `depot` | `id`, `date_depot`, `type`, `personne_id` | Formulaire & fiche dépôt |
| `personne` | `id`, `nom`, `prenom`, `telephone`, `adherente` | Donateur choisi dans le dépôt |

> ⚠️ **Hors périmètre V1** (tables à ne pas utiliser) : `vente`, `atelier`, `inscription`, `reparation`, `competence`, `benevole_competence` → ce sont les V2/V3.

### Les énumérés (valeurs possibles)

- **`statut_objet`** → `arrive`, `en_reparation`, `en_rayon`, `vendu`, `recycle`
- **`etat_objet`** → `bon_etat`, `a_reparer`, `hors_service`
- **`type_depot`** → `boutique`, `domicile`

---

## Étape 2 — Les 6 écrans V1

1. Écran d'identification (liste des bénévoles)
2. Liste des objets (filtres statut + catégorie)
3. Fiche d'un objet (détails + changement de statut)
4. Formulaire de dépôt (choix donateur, date, lieu)
5. Fiche d'un dépôt (détails + ajout d'objets un par un)
6. Tableau de bord (nb objets/statut, poids reçu, nb en rayon)

---

## Étape 3 — Détail de chaque écran

### Écran 1 — Identification

**Données affichées**
- Liste des bénévoles : `nom`, `prenom`

**Actions**
- Clic sur un nom de bénévole → on s'identifie

**États**
- Chargement : spinner pendant le `GET /personnes` (ou `GET /benevoles`)
- Vide : message « Aucune bénévole enregistrée »
- Erreur : message + possibilité de réessayer

**Retour après action**
- → redirection vers la liste des objets (Écran 2)

> Pas d'authentification ici : simple identification (voir brief — la vraie auth est la V4).

---

### Écran 2 — Liste des objets

**Données affichées**
- Chaque objet : `libelle`, `statut`, `categorie.libelle`
- Filtres : statut (menu déroulant), catégorie (menu déroulant)

**Actions**
- Filtrer par statut et/ou catégorie
- Cliquer sur un objet → fiche (Écran 3)

**États**
- Chargement : spinner pendant `GET /objets`
- Vide : « Aucun objet ne correspond à ces filtres »
- Erreur : message + recharger

**Retour après action**
- Après un filtre : la liste se met à jour en place (pas de navigation)

---

### Écran 3 — Fiche d'un objet

**Données affichées**
- `libelle`, `categorie.libelle`, `depot.type`, `personne.nom` + `prenom` (donatrice)
- Statut actuel, prix si renseigné

**Actions**
- Changer le statut via un menu déroulant (`PATCH /objets/:id/statut`)
- Éventuellement saisir un prix (optionnel)

**États**
- Chargement : spinner pendant `GET /objets/:id`
- Vide / introuvable : « Objet non trouvé » (404)
- Erreur : message d'erreur
- Succès du changement de statut : confirmation visible

**Retour après action**
- Après changement de statut : on reste sur la fiche, l'info est rafraîchie

---

### Écran 4 — Formulaire de dépôt

**Données affichées / saisies**
- Donateur : **liste déroulante** alimentée par `GET /personnes` (nom + prénom)
- Date du dépôt : `date_depot` (défaut : aujourd'hui)
- Lieu : `type` → `boutique` ou `domicile`

**Actions**
- Soumettre le formulaire (`POST /depots`)

**États**
- Chargement : spinner pendant le chargement des personnes + pendant l'envoi
- Vide (donateurs) : « Aucun donateur enregistré »
- Erreurs de validation : champs obligatoires (donateur, lieu) manquants

**Retour après action**
- → redirection vers la fiche du dépôt créé (Écran 5)

> ⚠️ En V1 : aucun écran de création de donateur. La liste déroulante suffit (voir brief).

---

### Écran 5 — Fiche d'un dépôt

**Données affichées**
- Donatrice : `personne.nom` + `prenom`
- Date : `date_depot`, Lieu : `type`
- Liste des objets du dépôt : `objet.libelle` (+ statut)

**Actions**
- Ajouter un objet au dépôt : formulaire `libelle`, `poids_kg`, `etat_arrivee`, `categorie_id` (`POST /depots/:id/objets`)
- Cliquer sur un objet → fiche objet (Écran 3)

**États**
- Chargement : spinner pendant `GET /depots/:id`
- Vide (objets) : « Aucun objet dans ce dépôt »
- Erreur : message

**Retour après action**
- Après ajout d'un objet : on reste sur la fiche du dépôt, la liste des objets est rafraîchie

---

### Écran 6 — Tableau de bord

**Données affichées**
- Nombre d'objets par statut (`GET /stats` → `objets_par_statut`)
- Poids total reçu (`poids_total_recu_kg`)
- Nombre d'objets en rayon (compté depuis `statut = 'en_rayon'`)

**Actions**
- Aucune en V1 (simple consultation)
- Lien de navigation vers les autres écrans (parcours qui boucle)

**États**
- Chargement : spinner pendant `GET /stats`
- Vide : tous les compteurs à zéro
- Erreur : message

**Retour après action**
- Navigation vers la liste des objets ou réidentification

---

## Étape 4 — Plan de navigation

```
                    ┌─────────────────┐
            ┌──────▶│  1. Identification │◀──────┐
            │       └────────┬────────┘        │
            │                │ (choix bénévole)│
        (retour)     ┌───────▼────────┐        │
            │        │  2. Liste objets │       │
            │        └───┬────────┬───┘        │
            │       (clic  │      │ (clic      │
            │        objet)│      │  dépôt ?)  │
            │        ┌─────▼──┐   │            │
            │        │3. Fiche│   │            │
            │        │ objet  │   │            │
            │        └───┬────┘   │            │
            │            │        │            │
            │     ┌──────▼────┐   │            │
            │     │4. Form.   │   │            │
            │     │ dépôt     │──▶│            │
            │     └────┬──────┘   │            │
            │          │(création)│            │
            │     ┌────▼─────────┐│            │
            │     │5. Fiche dépôt│◀┘            │
            │     └──────┬───────┘             │
            │            │(ajout objet)        │
            │     ┌──────▼───────┐             │
            └─────│6. Tableau de │─────────────┘
                  │    bord      │
                  └──────────────┘
```

**Règle : aucun écran orphelin.** On doit pouvoir partir de l'identification, parcourir les écrans, et revenir à l'identification.

---

## Étape 5 — Checklist de validation

- [ ] Le **parcours boucle** : identification → tableau de bord → retour à l'identification
- [ ] Le **geste métier** est complet du début à la fin : une bénévole qui arrive avec un carton sait où cliquer pour l'ajouter
- [ ] **Pas de fonctionnalité hors périmètre** : pas de vente, réparation, atelier (elles sont V2/V3)
- [ ] Les **6 écrans** sont présents + le plan de navigation
- [ ] Chaque information affichée correspond à une **colonne existante** de la base
- [ ] Les **états vides et de chargement** sont dessinés (au moins sur les listes)
- [ ] Le **retour après action** est prévu pour chaque formulaire
