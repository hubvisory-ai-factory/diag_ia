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

## Prerequisites

- The client folder is built and validated: `clients/<slug>/index.html` +
  `clients/<slug>/data.js` (+ `assets/` if any).
- The shared submission secret is configured (see "First time" below).

Always validate before publishing:
```bash
node --check clients/<slug>/data.js && node scripts/validate-data.js clients/<slug>/data.js
```

## Publish

One command — it reads the whole folder, opens a PR, and prints the link:
```bash
node scripts/submit.mjs clients/<slug> "add(client): <Client Name>"
```

On success it prints `✓ Pull Request opened: <url>`. Give that URL to the
consultant and tell them Gaspard is auto-notified (CODEOWNERS) and will review &
merge; Vercel deploys `main` within ~1 minute of merge.

> Note: `_sources/` and other local-only material are skipped automatically, and
> the backend rejects any file outside `clients/<slug>/`.

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
| `path outside clients/<slug>/` | A file sits outside the client folder | Only put files under `clients/<slug>/` |
| `HTTP 500: server not configured` | Backend env vars missing | Tell the admin (see `BACKEND_SETUP.md`) |
| Network error / 404 | Endpoint unreachable | Confirm internet; admin checks the Vercel deploy |

## What happens under the hood

1. `scripts/submit.mjs` reads the folder and POSTs the files + secret to
   `https://diag-ia.hubvisory.app/api/submit`.
2. The function verifies the secret, mints a short-lived GitHub App token,
   commits the files to a new `client/<slug>` branch, and opens a PR to `main`.
3. CODEOWNERS pings Gaspard; merge triggers the Vercel deploy.
