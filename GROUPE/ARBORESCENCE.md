# 📂 Structure du projet AdaRemise

```text
adaremise/
├── .github/                     # Workflows CI/CD, templates d'issues/PRs
├── docker-compose.yml           # Configuration PostgreSQL 16
├── wireframes/                  # Les 6 wireframes V1 + plan de navigation
├── README.md                    # Instructions de lancement local (3 commandes)
├── ROADMAP.md                   # Bilan V1 et fonctionnalités V2 / V3 / V4
│
├── BACK_END/                    # API REST Node.js / Express
│   ├── .env.example
│   ├── package.json
│   ├── swagger.json             # Documentation API Swagger
│   ├── src/
│   │   ├── config/
│   │   │   └── db.js            # Connexion PostgreSQL via le driver 'pg'
│   │   ├── controllers/         # Logique métier par domaine
│   │   │   ├── stockController.js
│   │   │   ├── intakeController.js
│   │   │   ├── trackingController.js
│   │   │   └── statsController.js
│   │   ├── routes/              # Définition des endpoints API
│   │   │   ├── stockRoutes.js
│   │   │   ├── intakeRoutes.js
│   │   │   ├── trackingRoutes.js
│   │   │   └── statsRoutes.js
│   │   ├── models/              # Requêtes SQL brutes (sans ORM)
│   │   │   ├── itemModel.js
│   │   │   ├── depositModel.js
│   │   │   └── donorModel.js
│   │   └── app.js               # Serveur Express & middlewares
│   └── db/
│       ├── init.sql             # Schéma initial (tables, contraintes)
│       └── seed.sql             # Données de test pour le développement
│
└── FRONT_END/                   # Application React (générée via Vite)
    ├── package.json
    ├── vite.config.js
    ├── index.html
    └── src/
        ├── assets/              # Logos, icônes, styles globaux
        ├── components/          # Composants UI réutilisables (Header, Nav, UI)
        │   ├── Header.jsx
        │   ├── StatusBadge.jsx
        │   └── UI/              # Buttons, Cards, Inputs...
        ├── pages/               # Écrans principaux par domaine fonctionnel
        │   ├── Home.jsx         # Écran "Qui es-tu ?"
        │   ├── Stock/           # Domaine A : Consulter le stock
        │   │   ├── StockList.jsx
        │   │   └── ItemDetail.jsx
        │   ├── Intake/          # Domaine B : Faire entrer les objets
        │   │   └── DepositForm.jsx
        │   ├── Tracking/        # Domaine C : Suivre la vie d'un objet
        │   │   └── ItemStatusUpdate.jsx
        │   └── Dashboard/       # Domaine D : Sortir les chiffres
        │       └── Dashboard.jsx
        ├── services/            # Appels API (fetch / axios)
        │   └── api.js
        ├── App.jsx              # Configuration de React Router
        └── main.jsx
```
