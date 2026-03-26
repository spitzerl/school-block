# School Block - Masquer les écoles sur les sites d'emploi

**School Block** est une extension de navigateur (Chrome & Firefox) conçue pour assainir vos recherches d'emploi. Elle détecte et masque automatiquement les offres publiées par des écoles, des centres de formation ou des organismes de reconversion (souvent pour de l'alternance ou des formations déguisées) sur les plateformes de recrutement.

> ⚠️ **Avertissement important (À lire avant utilisation)**
> Cette extension se base sur le nom de l'entreprise publié sur l'offre pour la masquer. Par conséquent :
> * **Faux positifs :** Si une véritable entreprise possède un nom contenant celui d'une école (ex: "Studio 42" masqué à cause de l'école "42"), l'offre sera cachée.
> * **Emplois internes masqués :** Si vous cherchez un emploi *au sein* d'une école (ex: informaticien pour le campus d'Epitech ou comptable pour HEC), ces offres seront également masquées par le filtre.
> * **Évolutions des sites :** L'extension lit la structure (HTML/CSS) des sites d'emploi. Si un site comme Indeed met à jour son interface, le filtre peut temporairement cesser de fonctionner le temps qu'une mise à jour soit déployée.

---

## Fonctionnalités

* **Filtrage automatique** des offres d'écoles pré-enregistrées.
* **Menu interactif** pour activer/désactiver le filtre globalement ou par catégorie (Commerce, Tech, Autres).
* **Liste blanche locale :** Désactivez spécifiquement une école de la liste par défaut si vous souhaitez voir ses offres.
* **Ajout manuel :** Ajoutez vos propres mots-clés ou écoles directement depuis l'interface de l'extension.
* Développé avec le framework **Plasmo** (React + TypeScript) et le standard **Manifest V3**.

---

## Sites d'emploi pris en charge

L'objectif est de couvrir les plateformes les plus polluées par ce type d'annonces.

- [x] **Indeed** (`indeed.com`, `indeed.fr`)
- [ ] **Welcome to the Jungle** (À venir)
- [ ] **LinkedIn** (À venir)
- [ ] **HelloWork** (À venir)
- [ ] **Glassdoor** (À venir)

---

## Écoles filtrées par défaut

<details>
<summary><b>👉 Cliquez ici pour dérouler la liste complète des écoles prises en charge</b></summary>

### Écoles de commerce & Management
* Pigier
* MBway
* PPA Business School
* INSEEC
* ESG
* IDRAC
* Euridis
* IFAG
* ISG
* IPAG
* ICD
* EBS
* HEC
* ESSEC
* ESCP
* EDHEC
* EM Lyon
* KEDGE
* NEOMA
* Skema
* Audencia
* Sup de Pub
* EFAP

### Écoles Tech & Informatique
* Epitech
* 42
* Supinfo
* EPSI
* CESI
* HETIC
* Webitech
* IIM
* Efrei
* EPITA
* ESIEE
* Simplon
* Le Wagon
* O'clock
* 3W Academy
* Wild Code School
* Doranco
* M2i Formation
* Rocket School
* Ironhack
* Holberton

### Autres écoles & Formations en ligne
* Studi
* ISCOD
* OpenClassrooms
* MyDigitalSchool
* Ynov
* Ifocop
* AFPA
* Educatel
* Centre Européen de Formation
* L'École Française
* Campus Sciences-U
* ECITV
* ICAN
* Eductive
* Comptalia
* Nextformation
* Skill and You
* Icademie

</details>

---

## Installation et Build local

Ce projet utilise [Plasmo](https://docs.plasmo.com/), Node.js et React.

### Prérequis
* Node.js (version 16 ou supérieure)
* npm, pnpm ou yarn

### Étapes
1. **Cloner le dépôt :**
    
    git clone https://github.com/spitzerl/school-block.git
    cd school-block
    
2. **Installer les dépendances :**
    
    npm install
    
3. **Lancer le serveur de développement (Hot Reload) :**
    * Pour Chrome / Chromium : npm run dev:chrome
    * Pour Firefox : npm run dev:firefox *(Note : Firefox bloque l'exécution de React en dev mode local à cause des règles CSP strictes. Préférez Chrome pour le développement).*

4. **Compiler pour la production :**
    * Pour Chrome : npm run build:chrome
    * Pour Firefox : npm run build:firefox

    *L'extension compilée se trouvera dans le dossier build/.*

---

## Contribuer au projet

Les contributions sont les bienvenues, que ce soit pour ajouter de nouvelles écoles qui spamment les plateformes, ou pour maintenir les scripts de filtrage !

### Ajouter de nouvelles écoles
1. Ouvrez le fichier schools.json à la racine du projet.
2. Ajoutez le nom de l'école dans la catégorie appropriée (business_schools, tech_schools, ou others).
3. **Attention :** Soyez le plus spécifique possible pour éviter les faux positifs (ex: préférez "École Webitech" à juste "Web").
4. Soumettez une *Pull Request*.

### Ajouter ou corriger un site d'emploi
Le cœur du filtrage se trouve dans content.ts. Si un site change son interface HTML ou si vous souhaitez ajouter un nouveau site :
1. Modifiez la variable config.matches en haut de content.ts pour inclure l'URL du nouveau site.
2. Adaptez la fonction hideJobCards() pour cibler les bons sélecteurs DOM du site visé (ex: document.querySelectorAll('.nouvelle-classe-de-carte')).
3. Veillez à utiliser des sélecteurs stables (comme les data-testid ou aria-labels plutôt que des classes CSS générées dynamiquement).
4. Testez en local avec le Scroll Infini du site (via le MutationObserver).
5. Soumettez votre *Pull Request* en détaillant les modifications.

PS: si vous ne vous sentez pas de modifier le code, ouvrez juste une issue en détaillant le problème, je me chargerais du reste ;-)
