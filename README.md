Projet Express : Découverte des Sites Touristiques

Ce projet est une application full-stack permettant à l'utilisateur de choisir un pays de départ et un pays de destination, puis d'afficher une liste de sites touristiques dans le pays de destination. L'utilisateur peut ensuite sélectionner un site pour afficher les moyens de transport disponibles pour se rendre du pays de départ au site touristique sélectionné.
Fonctionnalités

    Choix du pays de départ et du pays de destination.
    Affichage des sites touristiques du pays de destination.
    Sélection d'un site touristique pour afficher les moyens de transport disponibles entre les deux pays.
    Utilisation de pnpm pour la gestion des dépendances.
    Utilisation de concurrently pour lancer le serveur Express et le front-end simultanément.

Architecture du Projet

    Backend : Un serveur Express qui gère les requêtes liées aux pays, sites touristiques, et moyens de transport.
    Frontend : Une application front-end (React, Vue.js ou autre framework) qui permet à l'utilisateur d'interagir avec l'API et d'afficher les informations.

Prérequis

Assurez-vous d'avoir installé :

    Node.js (version 14 ou supérieure)
    pnpm pour gérer les dépendances efficacement.

Vous pouvez installer pnpm avec la commande suivante :

bash

npm install -g pnpm

Fichier .env

Pensez à créer un fichier .env à la racine du projet pour stocker les variables d'environnement telles que les clés d'API ou les configurations spécifiques au projet. Par exemple :

makefile

PORT=3000

Le fichier .env n'est généralement pas versionné dans Git pour des raisons de sécurité. Vous pouvez toutefois fournir un fichier .env.example contenant des exemples de valeurs ou des variables à remplir pour faciliter la configuration du projet.
Exemple de commande pour lancer le projet

Pour démarrer le serveur et le front-end simultanément, utilisez la commande suivante après avoir installé les dépendances :

bash

pnpm run dev

Cette commande utilise concurrently pour lancer à la fois le serveur backend et le front-end.
