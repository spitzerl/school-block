# School Block - Masquez les publicités des écoles sur les sites de recherche d'emploi

[English version](./README.md)

**School Block** est une extension de navigateur (Chrome & Firefox) conçue pour assainir vos recherches d'emploi. Elle détecte et masque automatiquement les offres publiées par des écoles, des centres de formation ou des organismes de reconversion directement sur les plateformes de recrutement.

## ⚠️ Avertissement important

Cette extension se base sur le **nom de l'entreprise** publié sur l'offre pour appliquer les filtres. Par conséquent :

* **Faux positifs :** Si une entreprise possède un nom contenant celui d'une école (ex: "Studio 42") l'offre sera cachée à cause de la blacklist "42".
* **Emplois internes masqués :** Si vous cherchez un emploi *au sein* d'une école (ex: informaticien pour le campus d'Epitech ou comptable pour HEC), ces offres seront également masquées par le filtre.
* **Évolutions des sites :** L'extension lit la structure (HTML/CSS) des sites d'emploi. Si un site comme Indeed met à jour son interface, le filtre peut temporairement cesser de fonctionner le temps qu'une mise à jour soit déployée.

## Fonctionnalités

* **Filtrage automatique :** Masquage instantané des offres d'écoles et centres de formation pré-enregistrés (possibilité de désactiver dans le menu de l'extension).
* **Ajout manuel :** Ajoutez vos propres mots-clés ou écoles directement depuis le menu de l'extension.

## Sites d'emploi pris en charge

L'objectif est de couvrir les plateformes les plus polluées par ce type d'annonces.

- [x] **Indeed**
- [x] **Welcome to the Jungle**
- [x] **HelloWork**
- [ ] **LinkedIn** (À venir)

## Écoles filtrées par défaut

L'extension maintient une liste exhaustive d'écoles de commerce, de bootcamps tech et d'organismes de formation en ligne.

Pour consulter la liste complète des entités bloquées ou en suggérer une nouvelle, veuillez vous référer au fichier de configuration : **[schools.json](./schools.json)**

## Installation et Build local

Ce projet utilise [Plasmo](https://docs.plasmo.com/), Node.js et React.

### Prérequis
* **Node.js** (version 16 ou supérieure)
* **npm**, **pnpm** ou **yarn**

### Étapes
1.  **Cloner le dépôt :**
    ```bash
    git clone [https://github.com/spitzerl/school-block.git](https://github.com/spitzerl/school-block.git)
    cd school-block
    ```
2.  **Installer les dépendances :**
    ```bash
    npm install
    ```
3.  **Lancer le serveur de développement (Hot Reload) :**
    * **Chrome / Chromium :** `npm run dev:chrome`
    * **Firefox :** `npm run dev:firefox`
4.  **Compiler pour la production :**
    * `npm run build:chrome` ou `npm run build:firefox`
    * *L'extension compilée se trouvera dans le dossier `build/`.*

## Contribuer au projet

Les contributions sont les bienvenues ! Que ce soit pour ajouter de nouvelles écoles à la liste ou pour corriger un filtre de site qui ne fonctionne plus, n'hésitez pas à participer.

> [!TIP]
> Vous ne maîtrisez pas le code ? Ouvrez simplement une **issue** en détaillant l'école manquante ou le site qui pose problème, et je m'en occuperai !
