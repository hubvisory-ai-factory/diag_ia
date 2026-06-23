---
name: publish
description: Publish a finished client page as a GitHub Pull Request without any GitHub setup (no account, invite, token, fork, gh, or SSH). Use when the consultant says "publish", "deploy", "put it online", "push it", or is done building a client page and wants it live.
---

# Publish a client page (zero-setup backend)

This repo publishes via a **submission backend**, not `git push`. A small Vercel
function (`api/submit.js`) authenticates as the `diag-ia-bot` GitHub App and opens
the Pull Request on the consultant's behalf. The consultant needs **no GitHub
account, no org invite, no token, no fork, no `gh`, no SSH key** — only a one-time
shared secret.

**Do NOT** walk the user through forking, `gh auth login`, or SSH keys for
publishing. That old flow (`git-setup` skill) is a fallback only if this backend
is unavailable.

## Environments

| Environnement | URL | Comment y arrive-t-on |
|---|---|---|
| **Local** | `http://localhost:3000/clients/<slug>/` | `npx serve` depuis la racine du repo |
| **Staging** | `https://staging.diag-ia.hubvisory.app/<slug>` | PR soumise → CI OK → auto-merge sur `staging` (~2 min) |
| **Prod** | `https://diag-ia.hubvisory.app/<slug>` | Un **maintainer** promeut `staging` → `main` manuellement |

Le consultant partage l'URL **staging** pour validation. La prod est réservée à la
version client finale.

## Prerequisites

- The client folder is built and validated: `clients/<slug>/index.html` +
  `clients/<slug>/data.js` (+ `assets/` if any).
- The shared submission secret is configured (see "First time" below).

**Confirm locally first.** Never publish before the consultant has reviewed the page in a
browser and confirmed. Serve the repo root **in the background** and give them the link:
```bash
npx serve            # run with run_in_background: true, then share:
# http://localhost:3000/clients/<slug>/
```
Ask them to confirm (in French); iterate until they're happy.

Always validate before publishing:
```bash
node --check clients/<slug>/data.js && node scripts/validate-data.js clients/<slug>/data.js
```

## Publish

One command — it reads the whole folder, opens a PR, and prints the links:
```bash
node scripts/submit.mjs clients/<slug> "add(client): <Client Name>"
```

On success it prints:
- `✓ Pull Request opened: <url>`
- `staging (après CI ~2 min): https://staging.diag-ia.hubvisory.app/<slug>`
- `prod (après promotion maintainer): https://diag-ia.hubvisory.app/<slug>`

Tell the consultant (in French):

> « C'est soumis ✅. Si les vérifications passent (~2 min), ton rapport sera visible sur
> **staging.diag-ia.hubvisory.app/\<slug\>**. Partage ce lien pour validation.
> La version client finale sur diag-ia.hubvisory.app sera mise en ligne par un admin
> quand tout est validé. »

**After publishing, stop the local preview server** (kill the background `npx serve`
task from the prerequisites step) so nothing keeps running on `localhost:3000`.

### Including changes outside the client folder

You can also ship a new component, a `_template/` tweak, or a skill/doc improvement in the
**same PR** — pass extra files/folders after the message:
```bash
node scripts/submit.mjs clients/<slug> "feat: <Name> + timeline component" components/timeline.html
```
Paths are sent repo-relative. The backend accepts anywhere **except** `.github/`, `api/`,
and deploy config (`vercel.json`, `package.json`, lockfiles, `.gitignore`) — those must go
through a normal maintainer Git PR. Per the project convention, any genuinely new component
should also be added to `components/index.html` + a `components/<name>.html` snippet, so
include those too.

## First time only — the shared secret

If the command fails with "No submission secret found", the consultant needs the
shared secret once. Ask them for it (the repo admin distributes it), then store it
so it's remembered:

```bash
mkdir -p ~/.config/diag_ia && printf '%s' "PASTE_SECRET_HERE" > ~/.config/diag_ia/secret
```

(Alternatively `export DIAG_IA_SECRET="..."` for a single session.) Never commit
the secret to the repo.

## Troubleshooting

| Message | Cause | Fix |
|---|---|---|
| `No submission secret found` | Secret not set | Run the "First time" step above |
| `HTTP 401: bad or missing secret` | Wrong secret | Re-paste the correct value into `~/.config/diag_ia/secret` |
| `path not allowed: …` | Tried to write `.github/`, `api/`, or deploy config | Those need a maintainer Git PR — drop them from the submission |
| `payload too large` (413) | Several MB of images in one submission | Compress/resize images, or host them on a CDN — text is never the cause |
| `HTTP 500: server not configured` | Backend env vars missing | Tell the admin (see `BACKEND_SETUP.md`) |
| Network error / 404 | Endpoint unreachable | Confirm internet; admin checks the Vercel deploy |
| Visible on staging but not prod | Normal — prod not promoted yet | Tell admin to merge `staging` → `main` |
| PR checks failed | CI validation error | Fix locally, re-run validate-data.js, re-submit |

## What happens under the hood

1. `scripts/submit.mjs` reads the folder and POSTs the files + secret to
   `https://diag-ia.hubvisory.app/api/submit`.
2. The function verifies the secret, mints a short-lived GitHub App token,
   commits the files to a new `client/<slug>` branch, and opens a PR to **`staging`**.
3. GitHub Actions runs `validate` (syntax + `validate-data.js` on changed clients).
4. If checks pass, the workflow **auto-merges** the PR into `staging`.
5. Vercel deploys `staging` → `https://staging.diag-ia.hubvisory.app/<slug>`.
6. A maintainer **merges the Release PR** (`staging` → `main`) when ready → prod deploys.
