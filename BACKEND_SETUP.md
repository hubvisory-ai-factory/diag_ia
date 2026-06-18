# Backend setup — one-time (admin only)

This wires up the submission backend so consultants can publish client pages with
**zero GitHub setup** (no account, invite, token, fork, `gh`, or SSH). You do this
**once**. After that, consultants just run the `publish` skill.

The code is already in the repo:
- `api/submit.js` — the Vercel serverless function
- `scripts/submit.mjs` — the local helper the consultant's Claude runs
- `.claude/skills/publish.md` — tells Claude to use the backend

You only need to do the **browser steps** below (the parts Claude can't do for you)
and deploy.

---

## Step 1 — Register the GitHub App (~5 min, browser)

1. Go to **https://github.com/organizations/hubvisory-ai-factory/settings/apps**
2. Click **"New GitHub App"**.
3. Fill in:
   - **GitHub App name**: `diag-ia-bot` (this name appears as the PR author)
   - **Homepage URL**: `https://diag-ia.hubvisory.app`
   - **Webhook**: **uncheck "Active"** (we don't use webhooks)
4. **Repository permissions** — set exactly these two, leave everything else "No access":
   - **Contents** → **Read and write**
   - **Pull requests** → **Read and write**
5. **Where can this GitHub App be installed?** → **"Only on this account"**
6. Click **"Create GitHub App"**.

After creation, on the App's page note the **App ID** (a number near the top) —
you'll need it in Step 4. _(This install's App ID: **4085014**.)_

## Step 2 — Generate the App private key (browser)

1. Still on the App's settings page, scroll to **"Private keys"**.
2. Click **"Generate a private key"**. A `.pem` file downloads — keep it safe
   (you'll paste its contents into Vercel and then can delete the file).

## Step 3 — Install the App on the repo (browser)

1. On the App's page, click **"Install App"** in the left sidebar.
2. Click **Install** next to **hubvisory-ai-factory**.
3. Choose **"Only select repositories"** → pick **`diag_ia`** → **Install**.

That's all the GitHub UI work — forever.

## Step 4 — Add environment variables in Vercel (browser)

Open the `diag_ia` project → **Settings → Environment Variables**. Add three,
for **Production** (and Preview if you want PRs from previews):

| Name | Value |
|---|---|
| `GH_APP_ID` | the App ID from Step 1 |
| `GH_APP_PRIVATE_KEY` | the **entire contents** of the `.pem` file from Step 2 (paste it whole, including the `-----BEGIN/END-----` lines; multi-line is fine) |
| `SUBMIT_SECRET` | the shared secret (a ready-to-use one is below — or generate your own) |

A freshly generated secret you can use:

```
YNcbWgytnwp1Ftk18LDRjQSL2gO7bzHy
```

> To generate a different one: `node -e "console.log(require('crypto').randomBytes(24).toString('base64url'))"`

Optional vars (only if you change defaults): `GH_REPO` (default
`hubvisory-ai-factory/diag_ia`), `GH_BASE_BRANCH` (default `main`).

## Step 5 — Deploy

Push this branch and merge to `main` (or redeploy in Vercel) so `api/submit.js`
goes live. Adding `api/` doesn't change the static build — Vercel just picks it up
as a serverless function.

## Step 6 — Smoke test

From a clone of the repo with the secret exported:

```bash
export DIAG_IA_SECRET="YNcbWgytnwp1Ftk18LDRjQSL2gO7bzHy"   # whatever you set
node scripts/submit.mjs clients/exemple "test: backend smoke test"
```

Expect `✓ Pull Request opened: …`. Open the URL, confirm the PR exists with the
files under `clients/exemple/`, then close it without merging. Done.

> Tip: test against an existing demo folder like `clients/exemple/` (or any throwaway
> `clients/<slug>/` you create locally) so you don't pollute real clients.

## Step 7 — Distribute the shared secret to consultants

Put the `SUBMIT_SECRET` value in your team password manager (or onboarding doc).
The first time a consultant publishes, Claude will ask for it and store it at
`~/.config/diag_ia/secret`. They paste it **once, ever**.

---

## Security notes

- The App's write access is **scoped to `diag_ia` only** — it cannot touch your
  other ~29 private repos.
- The endpoint can **only write inside `clients/<slug>/`** (enforced in
  `api/submit.js`) — no one can overwrite `vercel.json`, workflows, or other
  clients' folders via the API.
- The shared secret gates **opening PRs**, not merging. Merge still requires you
  (CODEOWNERS + branch protection). Worst case from a leaked secret is spam PRs,
  not a breach — rotate the secret in Vercel if that happens.
- Want stronger auth later? Put the endpoint behind Hubvisory Google SSO, or
  switch the shared secret for per-consultant secrets. Not required for launch.

## Rotating the secret

1. Generate a new value (command above).
2. Update `SUBMIT_SECRET` in Vercel → redeploy.
3. Share the new value; consultants update `~/.config/diag_ia/secret` once.
