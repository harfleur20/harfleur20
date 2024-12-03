# Five Design Agency - Site Web Fullstack

Site web moderne et dynamique pour Five Design Agency, une agence de création graphique et audiovisuelle.

## Technologies utilisées

- Frontend: React.js avec TypeScript
- Backend: Node.js avec Express
- Base de données: MongoDB
- CMS: Strapi
- Animations: Framer Motion
- Styles: Tailwind CSS

## Prérequis

- Node.js >= 16.x
- MongoDB >= 5.x
- npm >= 8.x

## Installation

1. Cloner le repository
2. Installer les dépendances frontend:
```bash
cd frontend
npm install
```

3. Installer les dépendances backend:
```bash
cd backend
npm install
```

4. Configurer les variables d'environnement:
- Copier `.env.example` vers `.env` dans les dossiers frontend et backend
- Remplir les variables nécessaires

5. Démarrer le projet:
```bash
# Terminal 1 - Backend
cd backend
npm run dev

# Terminal 2 - Frontend
cd frontend
npm run dev
```

## Structure du projet

```
five-design-agency/
├── frontend/          # Application React
├── backend/           # Serveur Express
└── docs/             # Documentation
```

## Fonctionnalités principales

- Site web responsive et moderne
- Animations fluides et interactives
- Gestion de contenu via Strapi
- Portfolio dynamique
- Système de devis en ligne
- Blog intégré
- Espace administrateur sécurisé
