# Diag IA — Portail de Diagnostic IA Hubvisory

Bienvenue ! Ce projet permet aux consultants de créer des sites de diagnostic IA pour les clients, **sans besoin d'expérience en programmation**.

## 🚀 Démarrage rapide

### 1. Cloner le repo

```bash
git clone https://github.com/hubvisory-ai-factory/diag_ia.git
cd diag_ia
```

### 2. Ouvrir dans Claude Code Desktop

Ouvrez Claude Code Desktop dans le dossier du projet. Puis **copiez-collez ce prompt** pour commencer :

---

## 📋 Prompt pour Claude Code Desktop

```
Tu es un assistant pour créer et modifier des pages de diagnostic IA client.

Contexte : ce repo Diag IA héberge des sites de diagnostic interactifs pour les clients Hubvisory. Chaque diagnostic est une page HTML auto-contenue avec des données client.

Avant toute chose, lis le fichier CLAUDE.md et REGISTRY.md pour comprendre la structure du projet et les conventions.

Ensuite, pose-moi ces questions pour déterminer ce que tu dois faire :

1. Veux-tu **ajouter un nouveau diagnostic client** (nouveau dossier, nouvelle page) ou **modifier un diagnostic existant** ?

2. Si tu ajoutes un nouveau diagnostic :
   - Quel est le nom du client (ex: "Acme Corp") ?
   - Quel est le slug client en minuscules (ex: "acme-corp") ?
   - Peux-tu fournir ou me donner accès au diagnostic (PDF, PowerPoint, Excel, ou lien) ?
   - Quel est le logo du client (image URL ou fichier à télécharger) ?

3. Si tu modifies un diagnostic existant :
   - Quel client veux-tu modifier (ex: "Clovis") ?
   - Qu'est-ce qui doit changer (design, données, nouvelles sections) ?

Après tes réponses, je vais :
- Lire les fichiers nécessaires (templates, composants existants)
- Extraire et structurer les données du diagnostic
- Créer/modifier les fichiers HTML et JavaScript
- Ajouter un lien vers la page d'accueil si c'est un nouveau client
- Vérifier que tout fonctionne en ouvrant la page dans un navigateur
- Expliquer les changements

Questions ?
```

---

## 📖 Comprendre ce que tu vas faire

### ✅ Ajouter un nouveau diagnostic

Quand tu dis « je veux ajouter un nouveau client », Claude va :

1. Te poser des questions sur le client (nom, logo, données)
2. Créer un dossier `clients/<slug>/` avec :
   - `index.html` — la page complète (copiée du template)
   - `data.js` — les données du diagnostic (le seul fichier que Claude écrit)
   - `assets/` — le logo du client
3. Ajouter une carte sur la page d'accueil (`index.html`)
4. Tester en ouvrant la page dans un navigateur
5. Prêt à pousser sur GitHub → Vercel déploie automatiquement

### ✏️ Modifier un diagnostic existant

Quand tu dis « je veux modifier Clovis », Claude va :

1. Lire les données actuelles du client
2. Vous discuter des changements
3. Mettre à jour `data.js` (les données)
4. Optionnellement, ajouter des sections nouvelles en utilisant les composants existants
5. Tester les changements
6. Pousser sur GitHub

### 🎨 Composants disponibles

Le dossier `components/` contient 25 blocs HTML réutilisables :

- **Graphiques** : radar (6 axes), heatmap (tableau), barres, scatter, jauge
- **Cartes** : cas d'usage, risques, quick wins, gouvernance
- **Sections** : héro, CTA, navigation, footer, glossaire, roadmap
- **Spécialisées** : cartographie de processus, espace partenaire, santé des données

Ouvre `components/index.html` dans un navigateur pour voir tous les composants en action.

### 📁 Structure du repo

```
diag_ia/
├── CLAUDE.md                    # Documentation technique (lis-moi)
├── REGISTRY.md                  # Liste des templates et clients
├── index.html                   # Page d'accueil (tous les diagnostics)
├── _template/                   # Template à copier pour les nouveaux clients
│   ├── index.html              # Moteur de rendu (copié tel quel)
│   └── data.js                 # Données placeholder (structure à suivre)
├── clients/
│   ├── clovis/                 # Exemple : diagnostic Clovis
│   │   ├── index.html          # Page (rarement modifiée)
│   │   ├── data.js             # ← Ici les données du client
│   │   └── assets/             # Logo et images du client
│   └── <nouveau-client>/        # Chaque nouveau client ici
├── components/                  # Bibliothèque de composants HTML
│   ├── index.html              # Vitrine de tous les composants
│   ├── radar.html              # Exemple de graphique radar
│   ├── heatmap.html            # Exemple de heatmap
│   └── ...                     # 25 fichiers totaux
└── README.md                   # Ce fichier
```

## 🛠️ Technos (pas besoin de connaître)

- **HTML, CSS, JavaScript** — pas de framework ni de build
- **Tailwind CSS** (CDN) — pour le design
- **Chart.js 4** (CDN) — pour les graphiques
- **SVG inline** — pour les jauges et les heatmaps
- **Vercel** — déploiement automatique quand tu pousses sur GitHub

## ✨ Convention importante

**Quand Claude ajoute un nouveau composant :**

1. D'abord, il l'ajoute à `components/index.html` avec des données d'exemple
2. Ensuite, il crée un fichier snippet `components/<nom>.html`
3. Puis, il l'utilise sur la page client
4. Enfin, il met à jour la liste dans CLAUDE.md

Cela garantit que la bibliothèque de composants reste à jour et réutilisable.

## 🚀 Workflow complet

```
1. Clone le repo
   ↓
2. Ouvre dans Claude Code Desktop
   ↓
3. Colle le prompt ci-dessus
   ↓
4. Réponds aux questions de Claude
   ↓
5. Claude crée/modifie les fichiers
   ↓
6. Vérifie dans le navigateur (Claude le fait aussi)
   ↓
7. git push → Vercel déploie automatiquement
   ↓
8. Ton diagnostic est en ligne ! 🎉
```

## 📞 Besoin d'aide ?

- **Problème technique ?** Lis `CLAUDE.md` (documentation technique)
- **Besoin de connaître les clients existants ?** Lis `REGISTRY.md`
- **Besoin de voir tous les composants ?** Ouvre `components/index.html` dans un navigateur
- **Besoin de modifier un diagnostic ?** Demande à Claude avec ce prompt

---

**Note** : Ce projet grandit avec toi. À chaque nouveau diagnostic ajouté, la documentation et les composants s'enrichissent. N'hésite pas à utiliser les diagnostics existants comme inspiration ! 🚀