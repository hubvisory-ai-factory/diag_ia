# Diag IA — Portail de Diagnostic IA Hubvisory

Bienvenue ! Ce projet permet aux consultants de créer des sites de diagnostic IA pour les clients, **sans besoin d'expérience en programmation**.

**Site en ligne** : https://diag-ia.hubvisory.app/

## 🔑 Prérequis : Compte GitHub (gratuit)

Pour publier ton diagnostic, tu as besoin d'un compte GitHub gratuit. **Pas besoin d'accès spécial** — tout le monde peut contribuer via Pull Request.

### Si tu as un compte GitHub
Parfait ! Tu peux commencer directement.

### Si tu n'as pas de compte GitHub
**Pas de souci !** Claude peut te guider pour en créer un (2 minutes). Dans le prompt, choisis l'option 3 "Configurer Git et GitHub" et suis les étapes.

### Comment ça marche ?
1. Tu crées ton diagnostic en local avec Claude
2. Claude pousse vers ta copie (fork) du repo
3. Claude crée une Pull Request — Gaspard est notifié automatiquement
4. Une fois validée, ton diagnostic est en ligne !

---

## 🚀 Démarrage rapide

**Tu n'as pas besoin d'ouvrir un terminal.** Ouvre Claude Code Desktop, puis copie-colle le prompt ci-dessous. Claude s'occupe de tout : cloner le repo, lire la doc, et te guider.

---

## 📋 Prompt à copier-coller dans Claude Code Desktop

```
Ce projet est le portail de diagnostics IA d'Hubvisory. Il permet de créer des sites web interactifs pour présenter les résultats de diagnostics IA réalisés pour des clients.

Avant de commencer, vérifie que Git est installé en lançant : git --version

Si Git n'est pas installé ou si j'ai une erreur, guide-moi pour l'installer (utilise le skill git-setup).

Si Git est installé, clone le repo depuis GitHub :

git clone https://github.com/hubvisory-ai-factory/diag_ia.git

Ensuite, place-toi dans le dossier diag_ia/ et lis attentivement le fichier CLAUDE.md ainsi que REGISTRY.md pour comprendre la structure du projet, les conventions, et les clients existants.

Une fois que tu as compris le projet, demande-moi ce que je souhaite faire :

1. Ajouter un nouveau diagnostic client — créer un nouveau rapport complet pour un client
2. Modifier un rapport existant — mettre à jour ou corriger un diagnostic déjà en place
3. Configurer Git et GitHub — si je n'ai jamais utilisé Git ou si je n'ai pas de compte GitHub
4. Autre chose — ajouter un composant, modifier le design, mettre à jour la landing page, etc.

Pose-moi les questions une par une pour collecter les informations nécessaires. Ne suppose jamais les données du diagnostic, demande-moi toujours de les fournir ou de les confirmer.
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
1. Ouvre Claude Code Desktop
   ↓
2. Colle le prompt ci-dessus
   ↓
3. Claude clone le repo et lit la documentation
   ↓
4. Claude crée une branche de travail (jamais direct sur main)
   ↓
5. Réponds aux questions de Claude (nom client, données, etc.)
   ↓
6. Claude crée les fichiers, commit régulièrement
   ↓
7. Vérifie dans le navigateur — ouvre le fichier HTML
   ↓
8. Si tout est bon, Claude pousse la branche et merge dans main
   ↓
9. Vercel déploie automatiquement (~1 minute)
   ↓
10. Ton diagnostic est en ligne sur https://diag-ia.hubvisory.app/<slug> ! 🎉
```

## 🛠️ Problèmes courants

| Problème | Solution |
|----------|----------|
| Page blanche | Erreur dans `data.js` — Claude te guide pour corriger |
| Graphiques absents | Format de données incorrect — vérifie avec Claude |
| "Permission denied" au push | Lance `gh repo fork --remote` pour configurer ton fork |
| La page ne se met pas à jour | Vérifie que tu as bien merge dans `main` |

## 📞 Besoin d'aide ?

- **Problème technique ?** Lis `CLAUDE.md` (documentation technique)
- **Besoin de connaître les clients existants ?** Lis `REGISTRY.md`
- **Besoin de voir tous les composants ?** Ouvre `components/index.html` dans un navigateur
- **Besoin de modifier un diagnostic ?** Demande à Claude avec ce prompt
- **Pas de compte GitHub ?** Choisis l'option 3 dans le prompt, Claude te guide

---

**Note** : Ce projet grandit avec toi. À chaque nouveau diagnostic ajouté, la documentation et les composants s'enrichissent. N'hésite pas à utiliser les diagnostics existants comme inspiration ! 🚀