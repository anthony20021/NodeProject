# Projet Express : Découverte des Sites Touristiques

Ce projet est une application full-stack qui permet à l'utilisateur de choisir un **pays de départ** et un **pays de destination**, puis d'afficher une liste de **sites touristiques** dans le pays de destination. L'utilisateur peut ensuite sélectionner un site pour afficher les **moyens de transport** disponibles pour se rendre du pays de départ au site touristique sélectionné.

## Fonctionnalités

- **Choix du pays de départ et du pays de destination**.
- Affichage des **sites touristiques** du pays de destination.
- Sélection d'un site touristique pour afficher les **moyens de transport** disponibles entre les deux pays.
- Utilisation de **pnpm** pour la gestion des dépendances.
- Utilisation de **concurrently** pour lancer le serveur Express et le front-end simultanément.

## Architecture du Projet

- **Backend** : Un serveur **Express** qui gère les requêtes liées aux pays, sites touristiques et moyens de transport.
- **Frontend** : Une application front-end (React, Vue.js ou autre) qui permet à l'utilisateur d'interagir avec l'API et d'afficher les informations.

## Prérequis

Assurez-vous d'avoir installé :

- [Node.js](https://nodejs.org/) (version 14 ou supérieure)
- [pnpm](https://pnpm.io/) pour gérer les dépendances efficacement.

Vous pouvez installer `pnpm` avec la commande suivante :

```bash
npm install -g pnpm
