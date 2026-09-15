# AdaRemise

Application web de gestion pour **La Remise**, une ressourcerie associative. Le projet permet de suivre les objets collectés, de la réception jusqu'à la vente ou au recyclage, en remplaçant le cahier papier et le tableur de la boutique.

## 🎯 Objectif du projet

La Remise collecte, trie, répare et revend des objets. Aujourd'hui, personne dans l'association ne sait précisément ce qu'il y a en stock ni où en est chaque objet, et produire les statistiques demandées par la mairie prend plusieurs week-ends.

Ce projet construit l'application qui règle ce problème :
- enregistrer les dépôts et les objets qui arrivent,
- suivre le parcours de chaque objet (arrivé → en réparation → en rayon → vendu / recyclé),
- consulter et filtrer le stock,
- afficher un tableau de bord avec les chiffres clés.

C'est un projet de fin de Bloc 1, qui s'appuie sur une base de données (Adatabase) et une API (Adapi) déjà conçues pour La Remise.

## 👥 Équipe

Projet réalisé en équipe de 3, chaque membre prenant en charge un domaine fonctionnel de bout en bout (base de données → API → interface) plutôt qu'une séparation front/back classique.

| Domaine | Description | Responsable |
|---------|-------------|-------------|
| A — Consulter le stock | Liste des objets, filtres, fiche détaillée
| B — Faire entrer les objets | Enregistrer un dépôt, ajouter des objets 
| C — Suivre la vie d'un objet | Identification, changement de statut 
| D — Sortir les chiffres | Tableau de bord 

## 🛠️ Stack technique

- **Base de données** : PostgreSQL 16, lancée via Docker (`docker-compose.yml`)
- **API** : Node.js + Express, avec le module `pg` (SQL écrit à la main, sans ORM)
- **Front-end** : React (Vite) + React Router
- **Tests API** : REST Client (collection de requêtes versionnée)
- **Documentation API** : Swagger
- **Gestion de projet** : Git / GitHub (branches, pull requests, relectures)

## 🚀 Installation et lancement

```bash
# Cloner le dépôt
git clone <url-du-repo>
cd adaremise

# Lancer la base de données
docker compose up -d

# Installer et lancer l'API
cd BACK_END
npm install
npm run dev

# Installer et lancer le front
cd ../FRONT_END
npm install
npm run dev
```

> ⚠️ Copier `.env.example` en `.env` (back et front) et renseigner les variables avant de lancer.

## 📌 Périmètre de la V1

- Identification simple des bénévoles (pas d'authentification)
- Enregistrement d'un dépôt et de ses objets
- Liste des objets filtrable par statut et catégorie
- Fiche détaillée d'un objet avec changement de statut
- Tableau de bord minimal (objets par statut, poids total, objets en rayon)

Les fonctionnalités des versions suivantes (ventes, réparations, vitrine publique, etc.) sont détaillées dans `ROADMAP.md`.

## 📁 Structure du dépôt

```
ADA---LA-REMISE-/
├── BACK_END/         # Serveur Express
│   ├── db/           # Connexion et requêtes SQL
│   ├── routes/        # Routes de l'API
│   ├── db.js
│   ├── index.js
│   ├── requetes.http # Collection de requêtes de test
│   └── swagger.json  # Documentation de l'API
├── FRONT_END/        # Application React
│   └── src/
│       ├── composants/
│       └── pages/
├── docker-compose.yml
├── CONVENTIONS.md    # Conventions de code de l'équipe
├── ROADMAP.md
└── README.md
```

## 📄 Documentation

La documentation Swagger de l'API est disponible à `<url-a-completer>` une fois le serveur lancé.