# ♻️ La Remise

Application fullstack pour la gestion d'une boutique de réemploi (« La Remise ») : suivi des dons, du stock, et des indicateurs.

## 🚀 Lancer en 3 commandes

Prérequis : **Node.js**, **Docker** et une base **PostgreSQL** `la-remise_db`.

```bash
# 1. Démarrer la base PostgreSQL (port 5433)
docker compose up -d

# 2. Installer les dépendances des deux projets
npm --prefix BACK_END install && npm --prefix FRONT_END install

# 3. Lancer le backend (port 3000) + le frontend (port 5173)
npm --prefix BACK_END run dev & npm --prefix FRONT_END run dev
```

> Une seule fois : créer les variables d'environnement du backend
> `cp BACK_END/.env.example BACK_END/.env` puis appliquer la base :
> `psql -h localhost -p 5433 -U user -d la-remise_db -f BACK_END/db/migration_up.sql`
> `psql -h localhost -p 5433 -U user -d la-remise_db -f BACK_END/db/seed.sql`

## 🛠 Stack

- **Backend** : Node.js + Express + PostgreSQL (port **3000**)
- **Frontend** : Vite + React + React Router (port **5173**, proxy `/api`)
- **Base** : Docker Compose — Postgres 16 (port **5433**)

## 🗂 Structure

```
BACK_END/
  index.js            serveur Express (montage des routes)
  routes/             controllers par ressource
  db/                 migration_up.sql / migration_down.sql / seed.sql
  requetes.http       requêtes de test de l'API
FRONT_END/
  src/                application React
```

## 📡 API

Le backend expose les ressources sous `/api` :
`objets`, `categories`, `statuts`, `depots`, `personnes`, `stats` (à venir), `benevoles` (à venir).

Documentation des routes et statuts : voir `BACK_END/requetes.http`.

## ✅ Checklist projet

- [ ] Wireframes des 7 écrans
- [ ] Socle (router, proxy, layout)
- [ ] Pages : identification, dashboard, objets, dépôts
- [ ] ROADMAP.md