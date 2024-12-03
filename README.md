# README: Plateforme de Gestion de Soins de Santé

Le lien de repo de Back end : https://github.com/Alaa-eddineLarbaoui/ENAA--Fil_Rouge.git 
 
## Chapitre 1 : Contexte Général du Projet

### Objectif Principal du Site
L'objectif principal de cette plateforme est de faciliter l'accès aux soins de santé en mettant en relation les patients et les professionnels de santé grâce à une interface en ligne intuitive et efficace.

#### Principaux Aspects de l'Objectif
1. **Faciliter la Prise de Rendez-vous :**
   - **Pour les Patients :**
     - Trouver et réserver des rendez-vous en fonction des disponibilités et spécialités.
   - **Pour les Professionnels de Santé :**
     - Gérer leurs agendas et optimiser la gestion de leur cabinet.
2. **Améliorer l'Accès aux Soins :**
   - Réduire les délais et permettre un accès rapide aux créneaux disponibles.
   - Proposer une base diversifiée de professionnels selon la spécialité et la localisation.
3. **Proposer des Services de Téléconsultation :**
   - Offrir des consultations à distance via vidéo.
4. **Assurer la Sécurité et la Confidentialité des Données :**
   - Protéger les informations personnelles et médicales des patients.

### Définition du Problème

#### Contexte Actuel
Le secteur de la santé rencontre plusieurs défis, notamment liés à la gestion des rendez-vous et à l'accès aux soins.

#### Problèmes Rencontrés
1. **Difficultés à Trouver des Rendez-vous Disponibles :**
   - Recherche fastidieuse de disponibilités.
   - Incompatibilités horaires entre patients et cabinets.
2. **Rendez-vous Manqués :**
   - Perte de temps et de revenus pour les professionnels.
   - Rappels inefficaces ou inexistants.
3. **Charge Administrative Élevée :**
   - Gestion chronophage des agendas et dossiers patients.
   - Risque d'erreurs dans les systèmes non intégrés.
4. **Accès Limité aux Soins :**
   - Manque de professionnels ou éloignement géographique.
5. **Sécurité des Données :**
   - Vulnérabilité des systèmes traditionnels.

### Fonctionnalités et Méthodes

#### Pour les Patients
- **Création de Compte Utilisateur** : Gestion des informations personnelles.
- **Recherche de Professionnels de Santé** : Par spécialité, localisation et disponibilités.
- **Prise de Rendez-vous en Ligne**.
- **Rappels de Rendez-vous** par email.
- **Accès à l’Historique des Rendez-vous**.
- **Téléconsultation** via plateforme vidéo.

#### Pour les Professionnels de Santé
- **Création de Compte Professionnel**.
- **Gestion des Disponibilités et des Agendas**.
- **Notification de Rendez-vous**.
- **Consultations en Ligne**.
- **Gestion des Dossiers Patients**.
- **Statistiques sur les Rendez-vous**.

#### Autres Fonctionnalités
- **Sécurité et Confidentialité** conformes aux régulations.

## Chapitre 2 : Technologies Utilisées

### Backend
- **Java 17** avec Spring Boot.
- Gestion des notifications avec des tâches programmées.
- Accès à la base de données via JPA/Hibernate.

### Frontend
- **Angular 16** pour la création d'une interface utilisateur réactive.

### Autres Outils et Bibliothèques
- Base de données relationnelle (MySQL).
- Gestion des dépendances avec Maven.
- Authentification JWT pour sécuriser les accès.

## Chapitre 3 : Configuration et Installation

### Prérequis
- **Java 17** et Maven installés.
- **Node.js** et **Angular CLI**.
- Serveur MySQL configuré.

### Installation
1. **Backend** :
   - Clonez le répertoire backend.
   - Configurez `application.properties` avec les paramètres MySQL.
   - Lancez `mvn spring-boot:run`.
2. **Frontend** :
   - Clonez le répertoire frontend.
   - Installez les dépendances avec `npm install`.
   - Lancez l’application avec `ng serve`.

## Chapitre 4 : Fonctionnement

### Accéder à l'Application
- Frontend disponible sur `http://localhost:4200`.
- Backend disponible sur `http://localhost:8080`.

## Chapitre 5 : Contributions

Pour contribuer :
1. Clonez le dépôt.
2. Créez une branche pour votre fonctionnalité.
3. Envoyez une pull request.

## Chapitre 6 : Licence
Le projet est sous licence MIT.
