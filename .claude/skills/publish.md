---
name: publish
description: Publish a finished client page to the shareable validation link, with no GitHub setup (no account, token, fork, gh, or SSH). Use when the consultant says "publie", "publish", "partage", "mets en ligne". The final client site is put live by an AI engineer Hubvisory — not the agent.
---

# Publier (service backend, zéro setup)

La publication passe par un **service backend**, pas par `git push`. Une fonction Vercel
(`api/submit.js`) s'authentifie comme le GitHub App `diag-ia-bot` et ouvre une PR. Le
consultant n'a besoin d'**aucun** compte GitHub, fork, token, `gh`, ni SSH — seulement la
clé de publication (fournie une fois par l'admin).

**Ne JAMAIS** guider l'utilisateur vers fork / `gh auth login` / clés SSH.

## Langage avec le consultant (mots simples)

- « **lien de validation** » = ce que `publie` produit. Partageable, **le client ne le voit
  pas**. Parfait pour itérer et faire confirmer.
- « **le site client** » = la version finale en ligne. Mise en ligne par un **AI engineer
  Hubvisory** (ex. Gaspard), **jamais par l'agent**.

Évite « staging », « prod », « branche », « PR », « merge » dans la conversation.

## Sous le capot (pour toi, l'agent)

| Niveau | URL technique | Comment on y arrive |
|---|---|---|
| Local | `http://localhost:3000/clients/<slug>/` | `npx serve` à la racine |
| Lien de validation (staging) | `https://staging.diag-ia.hubvisory.app/<slug>` | `submit.mjs` → CI OK → auto-merge (~2 min) |
| Site client (prod) | `https://diag-ia.hubvisory.app/<slug>` | un AI engineer merge la PR « Release: promote staging to prod » |

Étapes :
1. Le consultant confirme en local.
2. Tu lances `submit.mjs` → PR vers staging (jamais main).
3. CI vérifie → auto-merge → lien de validation actif (~2 min, bandeau orange).
4. Pour le site client : le consultant contacte un **AI engineer Hubvisory**.

Tu ne mets **jamais** le site client en ligne. Tu ne promets pas de date.

## Prerequisites

- Client folder built: `clients/<slug>/index.html` + `data.js` (+ `assets/`).
- Publish key at `~/.config/diag_ia/secret` (provided once via the onboarding prompt / admin).

**Confirm locally first.** Serve repo root in background:
```bash
npx serve            # run_in_background: true → http://localhost:3000/clients/<slug>/
```

Validate before publishing:
```bash
node --check clients/<slug>/data.js && node scripts/validate-data.js clients/<slug>/data.js
```

## Publish

```bash
node scripts/submit.mjs clients/<slug> "add(client): <Client Name>"
```

La commande affiche le lien de validation (`https://staging.diag-ia.hubvisory.app/<slug>`,
actif après ~2 min de vérifications).

**Message consultant (FR) :**

> « C'est publié ✅. Dans ~2 minutes, ton **lien de validation** sera prêt :
> **staging.diag-ia.hubvisory.app/\<slug\>** — partage-le à qui tu veux pour confirmer
> (le client ne le voit pas). Quand tout est validé et que tu veux que le client voie le
> site, dis-le-moi ou contacte un AI engineer Hubvisory pour la mise en ligne. »

Stop the background `npx serve` after publishing.

### Extra files in the same submission

```bash
node scripts/submit.mjs clients/<slug> "feat: …" components/new.html components/index.html
```

Blocked paths (maintainer Git PR only): `.github/`, `api/`, `vercel.json`, lockfiles.

## Première fois — clé de publication

Si « No submission secret found », demande la clé à l'admin (ou via le prompt
d'onboarding), puis :

```bash
mkdir -p ~/.config/diag_ia && printf '%s' "PASTE_SECRET_HERE" > ~/.config/diag_ia/secret
```

Ne jamais committer la clé.

## Mettre le site client en ligne — qui contacter

| Rôle | Qui | Action |
|------|-----|--------|
| Consultant / agent | — | « publie » → lien de validation seulement |
| Mainteneur | un **AI engineer Hubvisory** (ex. Gaspard, `@gaspardhassenforder`) | met le site client en ligne |

Si le consultant demande « c'est en ligne pour le client ? » → vérifie l'URL du site
client ; si 404 ou ancien contenu, dis-lui que la mise en ligne n'a pas encore été faite —
le lien de validation reste l'aperçu en attendant.

## Troubleshooting

| Message | Cause | Fix |
|---|---|---|
| `No submission secret found` | Clé absente | Demander la clé ; stocker dans `~/.config/diag_ia/secret` |
| `HTTP 401: bad secret` | Mauvaise clé | Recoller la bonne valeur |
| `path not allowed: …` | Chemin infra dans la soumission | Le retirer ; nécessite un mainteneur |
| Lien de validation OK mais pas le site client | Normal | Contacter un AI engineer Hubvisory pour la mise en ligne |
| PR checks failed | Erreur CI | Corriger en local, re-valider, re-soumettre |

## Sous le capot

1. `submit.mjs` POST vers `https://diag-ia.hubvisory.app/api/submit`.
2. `diag-ia-bot` ouvre une PR → `staging`.
3. CI `validate` + auto-merge.
4. Vercel déploie le lien de validation.
5. Un AI engineer merge la Release PR → site client.
