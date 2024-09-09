# Habit Tracker App

Une application de suivi des habitudes développée avec React, Tailwind CSS, Node.js, et MySQL. Cette application permet aux utilisateurs de créer un compte, se connecter, suivre leurs habitudes quotidiennes et se déconnecter. 

## Table des matières

- [Prérequis](#prérequis)
- [Installation](#installation)
- [Configuration](#configuration)
- [Démarrage](#démarrage)
- [Utilisation](#utilisation)
- [Structure du Projet](#structure-du-projet)
- [Contributions](#contributions)
- [Licence](#licence)

## Prérequis

Avant de commencer, assurez-vous que vous avez installé les outils suivants :

- [Node.js](https://nodejs.org/)
- [MySQL](https://www.mysql.com/)
- [npm ou yarn](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm) (gestionnaire de paquets pour Node.js)

## Installation

### Backend

1. Clonez le dépôt du backend :

   ```bash
   git clone https://github.com/votre-utilisateur/habit-tracker-app.git
   cd habit-tracker-app/backend
   ```

2. Installez les dépendances :

   ```bash
   npm install
   ```

3. Créez un fichier `.env` à la racine du dossier `backend` et ajoutez les variables d'environnement :

   ```plaintext
   DB_HOST=localhost
   DB_PORT=3306
   DB_USER=votre-utilisateur
   DB_PASSWORD=votre-mot-de-passe
   DB_NAME=habit_tracker_db
   JWT_SECRET=votre-secret-jwt
   PORT=5001
   ```

4. Démarrez le serveur backend :

   ```bash
   node server.js
   ```

### Frontend

1. Clonez le dépôt du frontend :

   ```bash
   git clone https://github.com/votre-utilisateur/habit-tracker-app.git
   cd habit-tracker-app/frontend
   ```

2. Installez les dépendances :

   ```bash
   npm install
   ```

3. Démarrez le serveur de développement :

   ```bash
   npm start
   ```

## Configuration

1. Assurez-vous que MySQL est en cours d'exécution et créez une base de données appelée `habit_tracker_db`.

2. Exécutez les migrations SQL pour créer les tables nécessaires. Vous pouvez ajouter un script SQL dans le répertoire `backend` pour configurer les tables nécessaires à l'application.

   Exemple de script SQL :

   ```sql
   CREATE TABLE users (
     id INT AUTO_INCREMENT PRIMARY KEY,
     username VARCHAR(255) NOT NULL UNIQUE,
     password VARCHAR(255) NOT NULL
   );
   ```

## Démarrage

Pour démarrer l'application, lancez le serveur backend et le serveur de développement frontend. Assurez-vous que le backend écoute sur le port 5001 et que le frontend écoute sur le port 3000.

- **Backend** : `http://localhost:5001`
- **Frontend** : `http://localhost:3000`

## Utilisation

1. Accédez à l'application via `http://localhost:3000` dans votre navigateur.

2. Créez un compte ou connectez-vous avec un compte existant.

3. Utilisez l'application pour suivre vos habitudes.

## Structure du Projet

Voici un aperçu de la structure du projet :

```
habit-tracker-app/
├── backend/
│   ├── node_modules/
│   ├── server.js
│   ├── package.json
│   ├── .env
│   ├── ...
├── frontend/
│   ├── node_modules/
│   ├── src/
│   ├── public/
│   ├── package.json
│   ├── tailwind.config.js
│   ├── ...
├── README.md
└── ...
```

- **`backend/`** : Contient le code du serveur Node.js, y compris les routes API et la connexion à la base de données.
- **`frontend/`** : Contient le code du frontend React, y compris les composants, les pages et les styles avec Tailwind CSS.

## Contributions

Les contributions sont les bienvenues ! Veuillez soumettre un pull request avec des améliorations ou des corrections. Assurez-vous de suivre les directives de contribution et d'écrire des tests pour vos modifications.

## Licence

Ce projet est sous licence MIT. Voir le fichier [LICENSE](./LICENSE) pour plus d'informations.


### Explications

- **Table des matières** : Permet de naviguer facilement dans le README.
- **Prérequis** : Liste les outils nécessaires pour faire fonctionner le projet.
- **Installation** : Détaille les étapes pour installer les dépendances pour le backend et le frontend.
- **Configuration** : Explique comment configurer la base de données et les variables d'environnement.
- **Démarrage** : Instructions pour démarrer le serveur backend et le frontend.
- **Utilisation** : Décrit comment utiliser l'application.
- **Structure du Projet** : Donne un aperçu de la structure du répertoire du projet.
- **Contributions** : Invite les contributions et décrit comment les soumettre.
- **Licence** : Spécifie la licence sous laquelle le projet est distribué.

## Auteurs
[DELAUNAY Mathéo | Seonay](https://www.linkedin.com/in/matheo-delaunay/)