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
| `SUBMIT_SECRET` | a secret you generate — see below. **Never paste a real secret into this file: the repo is public.** |

Generate a secret and copy it straight into the Vercel field (do not commit it):

```
node -e "console.log(require('crypto').randomBytes(24).toString('base64url'))"
```

Store the value in your team password manager only.

Optional vars (only if you change defaults):

| Name | Default |
|---|---|
| `GH_REPO` | `hubvisory-ai-factory/diag_ia` |
| `GH_BASE_BRANCH` | `staging` |
| `STAGING_HOST` | `staging.diag-ia.hubvisory.app` |
| `PROD_HOST` | `diag-ia.hubvisory.app` |

## Step 5 — Staging environment (browser)

### 5a — Create the `staging` branch

From an up-to-date `main`:

```bash
git checkout main && git pull
git checkout -b staging && git push -u origin staging
```

### 5b — Vercel domains

In the `diag_ia` Vercel project:

- **Production branch** : `main` → `diag-ia.hubvisory.app`
- **Staging domain** : add `staging.diag-ia.hubvisory.app`, assign it to Git branch **`staging`**

Ensure `GH_BASE_BRANCH=staging` is set in Vercel env vars (Step 4).

### 5c — GitHub branch protection

**Branch `staging`** :

- Require a pull request before merging
- Require status check: **`validate`** (from `.github/workflows/pr-to-staging.yml`)
- Do **not** require Code Owners review (consultant PRs auto-merge after CI)

**Branch `main`** :

- Require a pull request before merging
- Require review from Code Owners (or at least one maintainer approval)
- Optionally restrict merge source to `staging`

Consultant submissions never merge directly to `main`. Only maintainers promote
`staging` → `main` for the client-facing prod site.

## Step 6 — Deploy

Push this branch and merge to `main` (or redeploy in Vercel) so `api/submit.js`
and `.github/workflows/pr-to-staging.yml` go live. Adding `api/` doesn't change the
static build — Vercel just picks it up as a serverless function.

## Step 7 — Smoke test

From a clone of the repo with the secret exported:

```bash
export DIAG_IA_SECRET="<the value you set in Vercel>"
node scripts/submit.mjs clients/exemple "test: backend smoke test"
```

Expect `✓ Pull Request opened: …` and a staging URL in the output. Open the PR URL,
confirm it targets **`staging`** (not `main`), wait for CI (~2 min), then check
`https://staging.diag-ia.hubvisory.app/exemple`. Close or revert the test PR if needed.

> Tip: test against an existing demo folder like `clients/exemple/` (or any throwaway
> `clients/<slug>/` you create locally) so you don't pollute real clients.

## Step 8 — Distribute the shared secret to consultants

Put the `SUBMIT_SECRET` value in your team password manager (or onboarding doc).
The first time a consultant publishes, Claude will ask for it and store it at
`~/.config/diag_ia/secret`. They paste it **once, ever**.

---

## Security notes

- The App's write access is **scoped to `diag_ia` only** — it cannot touch your
  other ~29 private repos.
- The endpoint uses a **denylist** (enforced in `api/submit.js`): a submission may write
  anywhere in the repo (client folders, `components/`, `_template/`, `.claude/skills/`,
  docs) **except** paths that could do harm before you review the PR — `.github/`
  (CI/workflow injection), `api/` (the endpoint itself), and deploy/routing config
  (`vercel.json`, `package.json`, lockfiles, `.gitignore`, `.vercelignore`). This lets
  the component library and skills grow with users while keeping the dangerous surface
  off-limits.
- **Everything is PR-gated to `staging`.** The shared secret gates **opening PRs**, not
  merging to prod. Staging merges are automatic when CI passes. Prod (`main`) requires a
  maintainer review and manual promotion from `staging`.
- **Payload size:** one submission is a single HTTP POST, capped at ~4 MB (Vercel limits
  request bodies to ~4.5 MB). Text (HTML/JS/components/skills) is tiny; only several MB of
  images can hit it. If a client ever needs heavy imagery, switch the transport to chunked
  upload (per-file POSTs accumulated server-side) or host large assets on a CDN / Vercel
  Blob and reference them by URL — both independent of the denylist.
- Want stronger auth later? Put the endpoint behind Hubvisory Google SSO, or
  switch the shared secret for per-consultant secrets. Not required for launch.

## Rotating the secret

1. Generate a new value (command above).
2. Update `SUBMIT_SECRET` in Vercel → redeploy.
3. Share the new value; consultants update `~/.config/diag_ia/secret` once.

---

## Promoting staging → prod (maintainer)

When staging is validated and ready for clients:

**Option A — PR (recommended):** open a PR `staging` → `main` on GitHub, review, merge.
Vercel deploys prod in ~1 minute.

**Option B — CLI:**

```bash
git checkout main && git pull
git merge origin/staging --no-ff -m "release: promote staging to prod"
git push origin main
```

Do this in batch when you are ready — not on every consultant submission.

---

## Release PR (staging → prod) — one click

Workflow [`.github/workflows/promote-staging.yml`](.github/workflows/promote-staging.yml):

- On each push to **`staging`**, if staging is ahead of `main` and no release PR is open,
  GitHub Actions opens **one** PR `staging` → `main` and requests your review.
- Further consultant merges only **update** that same PR (no new PR, no new review request).
- **Merge** that PR → prod deploys.

You should get **one email** when the release PR is created (review requested). Not one
email per consultant submission.

### Reduce bot email noise (recommended)

**Vercel** — Project → Settings → Git → disable **Pull Request Comments** (stops
`vercel[bot]` commenting on every staging PR).

**GitHub notifications** — github.com/settings/notifications → uncheck **Pull request
push** if you only want the initial release PR email, not emails on every staging update.

Consultant PRs → staging no longer trigger CODEOWNERS (see [`.github/CODEOWNERS`](.github/CODEOWNERS)
— only infra paths).
