# Diag IA — Portail de Diagnostic IA Hubvisory

Bienvenue ! Ce projet permet aux consultants de créer des sites de diagnostic IA pour les clients, **sans besoin d'expérience en programmation**.

**Site en ligne** : https://diag-ia.hubvisory.app/

## 🔑 Prérequis : (presque) rien

- **Claude Code Desktop** installé — c'est tout ce dont tu as besoin.
- **Git** (pour télécharger le projet) — si tu ne l'as pas, Claude t'aide à l'installer.
- **Aucun compte GitHub requis**, aucun token, aucun fork, aucune ligne de commande Git à apprendre.

> **Comment je publie alors ?** La publication passe par un service interne : Claude
> envoie ton rapport, qui ouvre automatiquement une Pull Request. Tu n'as jamais à
> toucher GitHub. La première publication te demandera une **clé de publication**
> (fournie une seule fois par ton admin) — Claude la mémorise ensuite.

### Comment ça marche ?
1. Tu crées ton diagnostic en local avec Claude.
2. Quand c'est prêt, Claude le publie en une commande (`scripts/submit.mjs`).
3. Une Pull Request s'ouvre automatiquement — Gaspard est notifié.
4. Une fois validée, ton diagnostic est en ligne ! 🎉

---

## 🚀 Démarrage rapide

**Tu n'as pas besoin d'ouvrir un terminal.** Ouvre Claude Code Desktop, puis copie-colle le prompt que ton admin t'a envoyé (il met tout en place : cloner le repo, configurer la clé de publication, lire la doc, et te guider).

> Tu n'as pas reçu le prompt d'onboarding ? Demande-le à ton admin (Gaspard) — c'est un
> bloc de texte unique qui te configure entièrement.

À défaut, voici le prompt générique (sans la clé — tu devras la demander à l'admin) :

## 📋 Prompt à copier-coller dans Claude Code Desktop

```
Ce projet est le portail de diagnostics IA d'Hubvisory. Il permet de créer des sites web interactifs pour présenter les résultats de diagnostics IA réalisés pour des clients.

Vérifie que Git est installé : git --version
Si Git n'est pas installé, guide-moi pour l'installer (utilise le skill git-setup).

Clone le repo (dépôt public, aucune authentification nécessaire) puis entre dedans :

git clone https://github.com/hubvisory-ai-factory/diag_ia.git
cd diag_ia

Lis attentivement CLAUDE.md et REGISTRY.md pour comprendre la structure du projet, les conventions, et les clients existants.

Ensuite, demande-moi ce que je souhaite faire :

1. Ajouter un nouveau diagnostic client
2. Modifier un rapport existant
3. Autre chose (nouveau composant, design, page d'accueil…)

Pose-moi les questions une par une. Ne suppose jamais les données du diagnostic : demande-moi toujours de les fournir ou de les confirmer.

Pour publier le rapport quand il est prêt, utilise le skill « publish » (node scripts/submit.mjs clients/<slug> "message"). Si une clé de publication est demandée, je te la fournirai (mon admin me l'a donnée). Pas de fork, pas de gh, pas de PR manuelle.
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
4. Lancer un serveur local depuis la **racine** (`npx serve`) et ouvrir `http://localhost:3000/clients/<slug>/`
5. Publier (skill « publish ») → une PR s'ouvre → après validation, Vercel déploie automatiquement

### ✏️ Modifier un diagnostic existant

Quand tu dis « je veux modifier Clovis », Claude va :

1. Lire les données actuelles du client
2. Discuter des changements avec toi
3. Mettre à jour `data.js` (les données)
4. Optionnellement, ajouter de nouvelles sections en utilisant les composants existants
5. Tester les changements en local
6. Publier (skill « publish »)

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
├── api/submit.js                # Service de publication (ouvre les PR) — ne pas modifier
├── scripts/submit.mjs           # Outil de publication utilisé par le skill « publish »
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
│   └── ...                     # 25 fichiers totaux
└── README.md                   # Ce fichier
```

## 🛠️ Technos (pas besoin de connaître)

- **HTML, CSS, JavaScript** — pas de framework ni de build
- **Tailwind CSS** (CDN) — pour le design
- **Chart.js 4** (CDN) — pour les graphiques
- **SVG inline** — pour les jauges et les heatmaps
- **Vercel** — déploiement automatique une fois la PR fusionnée

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
2. Colle le prompt d'onboarding (envoyé par ton admin)
   ↓
3. Claude clone le repo, configure la clé de publication et lit la documentation
   ↓
4. Réponds aux questions de Claude (nom client, données, etc.)
   ↓
5. Claude crée les fichiers
   ↓
6. Vérifie dans le navigateur — Claude lance `npx serve` (depuis la racine) et te donne l'URL `/clients/<slug>/`
   ↓
7. Si tout est bon, Claude publie (skill « publish ») → une PR s'ouvre automatiquement
   ↓
8. Gaspard valide la PR → Vercel déploie (~1 minute)
   ↓
9. Ton diagnostic est en ligne sur https://diag-ia.hubvisory.app/<slug> ! 🎉
```

## 🛠️ Problèmes courants

| Problème | Solution |
|----------|----------|
| Page blanche | Erreur dans `data.js` — ouvre la console (F12) pour voir l'erreur |
| Graphiques absents | Format de données incorrect — vérifie avec Claude |
| « No submission secret found » à la publication | La clé n'est pas configurée — demande-la à ton admin, Claude l'enregistre une fois |
| « 401 bad secret » à la publication | La clé est incorrecte — redemande la bonne valeur à ton admin |
| La page n'apparaît pas en ligne | La PR n'a pas encore été validée/fusionnée par Gaspard |

## 📞 Besoin d'aide ?

- **Problème technique ?** Lis `CLAUDE.md` (documentation technique)
- **Besoin de connaître les clients existants ?** Lis `REGISTRY.md`
- **Besoin de voir tous les composants ?** Ouvre `components/index.html` dans un navigateur
- **Besoin de modifier un diagnostic ?** Demande à Claude avec ce prompt

---

**Note** : Ce projet grandit avec toi. À chaque nouveau diagnostic ajouté, la documentation et les composants s'enrichissent. N'hésite pas à utiliser les diagnostics existants comme inspiration ! 🚀
