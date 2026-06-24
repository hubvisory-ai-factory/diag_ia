---
name: add-client
description: Guided workflow to add a new AI diagnostic client case to the portal. Walks the consultant through providing all required data, generates a self-contained HTML page from the template, and adds the client to the landing page.
---

# Add Client Case

You are helping a Hubvisory consultant add a new AI diagnostic client case to the portal. Your job is to gather all the necessary information, structure it as a `CLIENT_DATA` JavaScript object, and generate the client HTML page — without ever fabricating data.

**🗣️ Parle en FRANÇAIS avec le consultant** (l'audience est francophone). Ces instructions
sont en anglais, mais toute la conversation, les questions et les messages destinés au
consultant doivent être en français.

**Workflow at a glance** (the order matters):
1. **Gather everything first** (Phase 2) — get the deck/PDF into the folder (or its path),
   connect Google Drive / Notion if the sources live there, and pin down the scoring method.
2. **Ask briefly how they want the report to look** (design, tone, sections) — then build.
3. **Execute and iterate** with the consultant until the data is right.
4. **Local preview** — run `npx serve` in the background, give the link, let them confirm.
5. On confirmation → **post-mortem in the background** (improve docs/skills) → **publish** →
   **stop the local server**.

**Live site (prod)** : https://diag-ia.hubvisory.app/

**Staging (pre-prod)** : https://staging.diag-ia.hubvisory.app/

**Reference files**:
- `REGISTRY.md` — lists available templates and existing client layouts (read this first)
- `_template/index.html` — rendering engine (copy this as the starting point)
- `_template/data.js` — placeholder CLIENT_DATA showing the data shape
- `clients/clovis/data.js` — first real client data (complete example of a finished data file)
- `components/` — HTML snippets for individual sections (use as reference when customizing)

---

## Phase 0: Quick readiness check

You only need the repo cloned locally — no branch, no commits (the backend creates the
`client/<slug>` branch at publish time). Just confirm you're inside the repo:

```bash
git rev-parse --show-toplevel   # should print the diag_ia repo path
```

### Publishing prerequisites — no GitHub account needed
Publishing goes through the backend (the `publish` skill): **no GitHub account, invite,
token, fork, `gh`, or SSH.** The only requirements:
- The repo is cloned locally (Git installed — see `git-setup` if `git --version` fails).
- A one-time **publish key** at `~/.config/diag_ia/secret` (provided via the onboarding
  prompt / by an admin — see the `publish` skill). Check:
  ```bash
  test -f ~/.config/diag_ia/secret && echo "publish key present" || echo "demander la clé à l'admin"
  ```

Do **not** set up forks, `gh`, or GitHub auth.

### Working locally — no commits required
The backend commits for you at publish time, so you don't need to `git add`/`git commit`
as you go. Just edit files in the cloned repo and verify locally. (You may commit locally
if you like, but it's optional and never required.)

---

## Phase 1: Client Identity

Ask for:
1. **Client name** (`branding.clientName`) — as it should appear on the website
2. **Full legal name** (`branding.clientFullName`)
3. **Slug** — suggest one based on the name (e.g., "Acme Corp" -> `acme-corp`); confirm with the consultant
4. **Sector** (`branding.sector`) — e.g., "Location & gestion de flottes PL/VUL"
5. **Mission code** (`branding.missionCode`) — e.g., "CLV-IA-2026"
6. **Mission title & subtitle** (`branding.missionTitle`, `branding.missionSubtitle`)
7. **Period** (`branding.period`) — e.g., "T2 2026"
8. **Brand colors** — primary (`#003366` navy is default) and secondary/accent (`#E30613` red is default). Adapt to client brand if they prefer.
9. **Client logo** — ask if they have one to place in `clients/<slug>/assets/`; if not, the initial-letter badge is used

Before moving on, confirm the slug doesn't already exist by checking `clients/` for a folder with that name.

---

## Phase 2: Source Materials

**Gather as much as possible UP FRONT, before writing anything.** The single biggest
time sink is discovering the data shape, the scoring method, and source discrepancies
mid-build. Front-load it instead.

### Collect every source into the client folder
Create a `clients/<slug>/_sources/` folder (git-ignored or kept — your call) and a
**`clients/<slug>/context.md`** that captures, in one place:
- The **restitution deck / report** (PDF, PPTX) — drop the file in `_sources/`.
- **Notion** database/page URLs (and which DB holds what).
- The **call transcript / Slack recap** describing the desired page (what stays, what
  changes, what to remove).
- The **scoring method** used for this mission and its exact definition (see below).
- Branding (logo, colors), périmètre, respondents, period.

This `context.md` is the brief Claude works from and the audit trail for the post-mortem.

### Sources & their authority (READ THIS)
- **The diagnostic is NOT a fixed format.** Every mission differs: different analysis,
  different scoring system, different solution/use-case structure. The `_template/` is
  only an *example / catalogue of components* — never assume its sections or its
  `CLIENT_DATA` shape match this mission. Derive the real shape from the sources.
- **A restitution deck (PDF/PPT), if it exists, is the SOURCE OF TRUTH** for numbers,
  scoring, and wording — over Notion, which is a living workspace and may contain
  drafts, duplicates, or stale/inconsistent values. When Notion and the deck disagree,
  trust the deck and surface the discrepancy to the consultant.
- **Pin down the scoring method explicitly.** Don't infer it. Ask/confirm: which
  criteria, what scale, and **is the score a sum or a product** of the criteria? (For
  Clovis, VOTAC = the *product* of 5 criteria each rated 1–5 — a coincidental Notion
  field made it look like a sum at first. Getting this wrong means redoing the catalogue.)
- **Notion text is markdown.** Free-text fields (problème, besoins, irritants, objectif,
  description, prérequis) contain `**bold**`, `•`/`-` bullets and line breaks, and
  sometimes junk (a trailing model name, a duplicated heading). Always render them
  through `formatRichText(...)` / `inlineMd(...)` (helpers ship in `_template/index.html`),
  and strip obvious artifacts. Never inject raw Notion text into a single `<p>`.

### Get the sources — ask the consultant where they are, then ingest them

Start by asking (in French) **where the diagnostic material lives**, and handle each case.
**Do not start building until you actually have the content in hand.**

- **Option A — A file on their computer (deck/PDF/PPTX/Excel).** Two easy ways:
  - They **drop the file into `clients/<slug>/_sources/`** (create the folder first:
    `mkdir -p clients/<slug>/_sources`), or
  - They **tell you the full path** (e.g. `~/Downloads/restitution-acme.pdf`) and you copy
    it in: `cp "<path>" clients/<slug>/_sources/`.
  Then read it directly (PDFs/images via the Read tool).
- **Option B — Google Drive.** If the deck/sheet is in Drive and you can't read it locally,
  ask them to either download it and use Option A, **or** connect the Google Drive
  connector so you can fetch it:
  - Check whether a Google Drive tool is already available. If not, guide them:
    **Claude Code Desktop → Settings → Connectors → add Google Drive** (sign in with their
    Hubvisory Google account). For Claude.ai connectors, an `authenticate` tool appears —
    call it and have them complete sign-in.
  - If a connector truly isn't available, fall back to Option A (download + drop in folder).
- **Option C — Notion.** Connect the **Notion MCP/connector** the same way (Settings →
  Connectors → Notion, sign in), then extract. For a large, linked set (e.g. N use cases ×
  M solutions across several DBs), use a **Workflow** to fan out the page fetches in
  parallel and return compact structured JSON instead of fetching serially into the main
  context. Verify subagents can reach the Notion MCP first.
- **Option D — Scattered notes / no file.** Walk through section by section, interactively.
- **Option E — Pre-filled JSON** matching the agreed `CLIENT_DATA` shape.

> If a needed connector (Drive/Notion) isn't installed and the consultant doesn't know how,
> walk them through it patiently, step by step — they may have never added one before.

Once you have everything, **extract all data points into `context.md`** and present a
summary for confirmation before writing any client files.

### Then: ask how they want the report to look (briefly)

Before building, ask 3–4 quick questions (in French) to set direction — don't over-engineer:
1. **Branding** — client colors/logo, or keep the Hubvisory default look?
2. **Sections** — which sections matter (dashboard, métiers, gouvernance, roadmap,
   glossaire…) and any to drop? Use an existing client (e.g. `clovis`) as a visual reference.
3. **Tone / emphasis** — executive summary vs. deep detail; anything to highlight.
4. **Anything unusual** the standard template doesn't cover (new viz, new section).

Note the answers in `context.md`. Then **execute and iterate**: build, preview, adjust with
the consultant until it's right.

---

## Phase 3: Data Collection (section by section)

The client page embeds all data in a single `CLIENT_DATA` JavaScript object. Work through each section below. For every section, present what you've captured and ask the consultant to confirm before moving on.

### 3a. Methodologie (`methodologie`)

- `introTitle` — e.g., "Guide méthodologique"
- `introSubtitle` — e.g., "Comment lire l'audit : typologies de cas d'usage & échelle de complexité"
- `typologiesExplications[]` — 6 typology cards:
  - `id` (kebab_case), `nom`, `icon` (lucide kebab-case), `couleur` ("primary" or "accent"), `definition`, `exemple`
- `complexiteCriteres[]` — 3 complexity levels:
  - `id` ("faible"/"moyenne"/"forte"), `niveau`, `sousTitre`, `couleur` ("green"/"amber"/"red"), `icon` (lucide), `characteristiques[]`, `exemples[]`, `delai`, `investissement`

### 3b. Hubvisory Context & Team (`hubvisoryContext`, `hubvisoryTeam`)

- `hubvisoryContext`:
  - `tagline`, `description`
  - `expertises[]` — each `{titre, description}`
  - `contact` — `{email, website, linkedin}`
  - `ctaText`, `ctaSubject`
- `hubvisoryTeam`:
  - `title`, `description`
  - `members[]` — each `{name, role, email, initials}`
  - `ctaText`, `ctaSubject`

### 3c. Quick Wins Generiques (`quickWinsGeneriques[]`)

Cross-cutting quick wins not tied to a specific métier:
- `id`, `titre`, `typologie`, `complexite`, `gainMin` (minutes saved), `icon` (lucide), `impact` ("fort"/"moyen"/"faible")

### 3d. Data Governance (`dataGovernance`)

- `sources[]` — each `{nom, type, volume ("faible"/"moyen"/"élevé"), qualite (1-5), icon (lucide)}`
- `scoreExploitation` (0-5 float)
- `scoreLabel` — e.g., "Données disponibles mais sous-exploitées"
- `axesAmelioration[]` — each `{titre, description, effort ("faible"/"moyen"/"fort")}`

### 3e. Governance Deep-Dive (`gouvernanceApprofondie`)

- `risquesOperationnels[]` — each `{titre, impact ("Critique"/"Élevé"/"Moyen"/"Faible"), description}`
- `enjeuxOrganisationnels[]` — each `{titre, impact, description}`
- `besoinsFormation[]` — each `{titre, niveau ("Tous"/"Référents"/"Managers"/"Tech"), duree, description}`

### 3f. Process Mapping (`processMapping`)

Current vs target process flows:
- `actuel`:
  - `titre`, `sousTitre`
  - `etapes[]` — each `{libelle, outil, type ("saisie"/"manuel"/"decision"/"api"/"data"/"ia")}`
  - `irritants[]` — string array
- `cible`:
  - `titre`, `sousTitre`
  - `etapes[]` — same format
  - `benefices[]` — string array

### 3g. Perimetre — Business Units (`perimetre[]`)

For each métier/department in scope:
- `id` (snake_case), `nom`, `effectif` (headcount), `icon` (lucide name)
- `frequenceUsage` — `{quotidien, hebdomadaire, occasionnel, jamais}` (percentages summing to 100)
- `dureeAdoption` — `{moinsDe3Mois, de3a12Mois, plusDe12Mois}` (percentages summing to 100)

### 3h. Global Metrics (`globalMetrics`)

- `maturiteGlobale` (0-5 float — weighted maturity score)
- `confianceGlobale` (0-5 float)
- `shadowIaOffRoad` (count of unmanaged tools)
- `totalRepondants` (count)
- `casUsageRecenses` (count)
- `quickWinsCount` (count)
- `benchmarkDelta` — string e.g., "+0.4 vs benchmark transport"
- `scoreBenchmarkHubvisory` (0-5 float — Hubvisory's sector benchmark)
- `weightingParams` — `{usageThreshold, quickWinRatioMin, penaltyPerMetier, penaltyMax}` (scoring parameters)

### 3i. Radar Axes (`axesRadar[]`)

6 axes for the radar chart. Each needs:
- `axe` (name), `scoreActuel` (0-5), `scoreCible` (0-5), `description`

### 3j. Heatmap Matrix (`heatmapMatrix[]`)

One row per métier:
- `idMetier` (must match a `perimetre[].id`), `usage` (1-5), `confiance` (1-5)

### 3k. Frequency & Adoption Charts (`frequencyUsage[]`, `adoptionDuree[]`)

Global distribution data for bar charts:
- `frequencyUsage[]` — each `{bucket, pct}` — e.g., "Plusieurs/jour" 20%, "1x/jour" 30%, etc.
- `adoptionDuree[]` — each `{bucket, pct}` — e.g., "< 3 mois" 30%, "3-12 mois" 50%, etc.

### 3l. Stack by Metier (`stackByMetier[]`)

Scatter/bubble plot data per métier:
- `idMetier`, `outils` (number of distinct AI tools), `confiance` (0-100%)

### 3m. Use Cases (`useCasesList[]`)

For each identified use case:
- `id` (e.g., "uc-01"), `idMetier` (matches `perimetre[].id`)
- `nomTache` — task name
- `outilsActuels[]` — current tools used (string array)
- `irritantCategorie` — pain point category
- `descriptionCasIA` — description of the AI opportunity
- `minutesGagnees` — estimated time saved per occurrence
- `typeTache` — single typology id: "Synthese", "Redaction", "Data", "Recherche", etc.
- `gains[]` — string array: "Productivite", "Qualite", "Confort"
- `isQuickWin` (boolean)

### 3n. Risks (`risques[]`)

Risk register:
- `libelle` — risk description
- `niveau` — "Rouge", "Orange", or "Vert"
- `note` — brief context/note

### 3o. Roadmap (`roadmap[]`)

Phased implementation plan (typically 3 phases):
- `horizon` — "0-6 mois", "6-12 mois", "12-24 mois"
- `titre` — phase name
- `items[]` — string array of deliverables
- `impact` — "Faible", "Moyen", "Fort", "Très fort"
- `complexite` — "Faible", "Moyenne", "Élevée"
- `type` — "Quick-wins", "Structurel", "Vision"

### 3p. Glossary (`glossaire[]`)

AI terminology definitions:
- `terme`, `definition`

### 3q. Prompts Bank (`promptsBanque`)

Per-métier prompt templates. Each key is a `perimetre[].id`, value is a prompt string.

**Important**: Replace `{{client}}` placeholders with the actual client name when writing the file.

### 3r. UI Config & Colors

Usually keep defaults — only customize if the client needs different labels:
- `ui.sections` — main navigation section names
- `ui.blocks` — all section titles, subtitles, labels, and tooltip texts (see Clovis for full list)
- `computedColors.heat` — 5-step color scale `["#dc2626", "#f97316", "#f59e0b", "#84cc16", "#10b981"]`
- `computedColors.riskMap` — `{Rouge: "#dc2626", Orange: "#f59e0b", Vert: "#10b981"}`

**For non-French clients**: All labels in `ui.blocks` and `ui.sections` can be overridden with translations.

**Commit regularly during Phase 3** — after every 2-3 sections:
```bash
git add .
git commit -m "wip(client): <slug> — add perimetre + metrics"
```

---

## Phase 4: Generate the Client Page

Once all data is collected:

1. **Present a full summary** of all collected data, organized by section
2. **Flag any gaps**: fields marked as TODO, sections with sparse data, inconsistencies
3. **Check idMetier consistency**: The same id must be used across `perimetre`, `useCasesList`, `heatmapMatrix`, and `stackByMetier`
4. **Ask for final confirmation**: "Does this accurately represent the diagnostic findings?"
5. **Read `REGISTRY.md`** to show available templates and existing client layouts. Ask the consultant which layout is closest to what they need. Default to the base template if unsure.
6. **Generate the files** using these exact mechanical steps:

```bash
# Step 1: Create client directory
mkdir -p clients/<slug>/assets

# Step 2: Copy the rendering engine from chosen template (0 tokens — shell copy)
cp _template/index.html clients/<slug>/index.html
# OR to use an existing client's layout instead:
# cp clients/<reference-client>/index.html clients/<slug>/index.html
```

Then use the **Edit** tool to set the `<base>` tag in `clients/<slug>/index.html`:
```html
<base href="/clients/<slug>/">
```
**This step is critical** — without the correct `<base href>`, Vercel routing will break.

Then **Write** `clients/<slug>/data.js` with the complete CLIENT_DATA object. This is the only file you write from scratch — it contains all the client's data. Use `_template/data.js` as the reference for the object shape and `clients/clovis/data.js` as a real example. Make sure to set `branding.slug` to `"<slug>"`.

7. **If the consultant provided a logo**, copy it to `clients/<slug>/assets/`
8. **If you need to add/remove sections** from the template's index.html for this client, reference `components/` snippets. Use the Edit tool for surgical changes — never rewrite the whole file. See "Removing Sections" below.
9. **Update the landing page**: Add a client card to `index.html` in the grid (see below). Add the card at the **end of the grid** to minimize merge conflicts with other work.
10. **Update `REGISTRY.md`** with the new client entry (template used, date, any structural changes)
11. **Launch local preview** so the consultant can verify (serve the REPO ROOT, then open the client path — see note below):
    ```bash
    npx serve            # then open http://localhost:3000/clients/<slug>/
    ```

**Commit after file generation:**
```bash
git add clients/<slug>/ index.html REGISTRY.md
git commit -m "feat(client): <slug> — complete page generated"
```

### How to write data.js

Create `clients/<slug>/data.js` containing:
```javascript
const CLIENT_DATA = {
  branding: { slug: "<slug>", clientName: "...", ... },
  // ... all sections from Phase 3
};
```

The rendering engine in `index.html` loads this via `<script src="data.js">` and uses it to populate all charts, tables, cards, and text. The `<title>` tag is set dynamically from `CLIENT_DATA.branding.clientName`.

### Template divergence

If you modified `index.html` for this client (added a section, changed layout, rearranged content):
- **Document the changes** in `REGISTRY.md` under the client's entry
- **If the changes are significant and reusable** (new page structure, major section additions), offer to promote the layout to a named template: copy the modified `index.html` to `_template-<name>/index.html` and add it to REGISTRY.md's Templates section

### How to update the landing page

Add a new card to `index.html` inside the `.grid` container. **Add at the end of the grid** to minimize merge conflicts. Follow the pattern of the existing Clovis card:
```html
<a href="clients/<slug>/index.html" class="group block bg-white rounded-lg transition hover:shadow-lg" style="border: 1px solid #e2e8f0">
  <div class="h-2 rounded-t-lg" style="background: linear-gradient(135deg, <primary> 0%, <primary> 60%, <accent> 140%)"></div>
  <div class="p-6">
    <div class="flex items-center gap-3 mb-4">
      <div class="w-11 h-11 rounded-lg flex items-center justify-center" style="background: rgba(...)">
        <span class="text-lg font-bold" style="color: <primary>"><initial></span>
      </div>
      <div>
        <div class="font-semibold text-slate-900"><Client Name></div>
        <div class="text-xs text-slate-400"><Period></div>
      </div>
    </div>
    <div class="text-sm text-slate-600 mb-3">Audit de maturité IA</div>
    <div class="text-xs text-slate-400"><Sector></div>
  </div>
</a>
```

---

## Removing Sections

If the client doesn't need certain sections (e.g., no process mapping, no glossary):

### In `index.html`:
1. Find the section in `clients/<slug>/index.html` (search for the section id or heading)
2. Delete the entire `<section>` block
3. If there's a nav pill for that section, remove it from the nav (or it will be orphaned)

### In `data.js`:
1. You can either:
   - Remove the corresponding data object entirely, OR
   - Leave it as an empty array/object (the rendering engine handles missing data gracefully)

### Example: Remove Glossary
```bash
# In index.html: delete the section with id="section-glossaire"
# In data.js: set glossaire: [] or remove the key entirely
```

**Commit after structural changes:**
```bash
git add clients/<slug>/
git commit -m "feat(client): <slug> — remove glossary section"
```

---

## Phase 5: Local Verification (consultant confirms before publishing)

The consultant MUST review the page locally and **confirm** before anything is published.

### Start the preview server in the BACKGROUND, then give them the link

Run the server as a **background** process (so it keeps running while they review and you
can stop it later, after publishing). **Serve the REPO ROOT, never the client subfolder** —
client pages use an absolute `<base href="/clients/<slug>/">`, so serving `clients/<slug>`
directly makes `data.js` and `assets/` 404. (`serve@14` also removed the `-o` flag.)

```bash
npx serve            # run with run_in_background: true
```

Then give the consultant this link and ask them to review it (in French):
**`http://localhost:3000/clients/<slug>/`**

> Keep the server running. You will stop it only **after** publishing (Phase 6). Note the
> background process so you can kill it then.

Ask explicitly: *« Est-ce que le rapport te convient ? Dis-moi ce qu'il faut ajuster, sinon
je le publie. »* Iterate on any changes, re-serving as needed, until they confirm.

### Verify the render yourself (headless, before asking the consultant)

You can confirm the page actually renders (and catch JS/data errors) without a human:

```bash
# 1. Validate the data file: JS syntax + content lint (malformed markdown / **
#    orphans, leaked artifacts, unknown ids, VOTAC total != product). MUST pass.
node --check clients/<slug>/data.js
node scripts/validate-data.js clients/<slug>/data.js

# 2. Serve the root + screenshot / dump the rendered DOM with headless Chrome
python3 -m http.server 8765 &
"/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" --headless --disable-gpu \
  --virtual-time-budget=8000 --window-size=1440,2400 \
  --screenshot=/tmp/page.png "http://localhost:8765/clients/<slug>/index.html"
# --dump-dom (instead of --screenshot) prints the rendered HTML — grep it to confirm
# that JS-built sections (charts, cards, tabs) actually populated.
```

To screenshot a view that is hidden by default (e.g. a métier tab, or a modal), inject a
tiny script into a throwaway copy that calls the relevant function on load
(`navigateTo('view-...')`, or `.click()` a card), screenshot it, then delete the copy.

### Verification Checklist

- [ ] Page loads without blank screen
- [ ] Client name and branding appear correctly in header
- [ ] Radar chart renders with 6 axes
- [ ] Heatmap shows all métiers with colored cells
- [ ] Nav pills work — clicking filters content
- [ ] Use case cards display correctly
- [ ] Charts render without errors (check browser console: F12 > Console)
- [ ] All numbers match the original diagnostic materials
- [ ] No "TODO" placeholders remaining in visible text
- [ ] Landing page (`index.html`) shows the new client card

### If Something Is Wrong
See **Troubleshooting** section below.

---

## Phase 6: On confirmation — post-mortem (background) → publish → stop the server

Run these **in this exact order** once the consultant has confirmed:

### Step 1 — Kick off the post-mortem in the BACKGROUND
Don't make the consultant wait. Launch the post-mortem as a **background subagent**
(Agent tool with `run_in_background: true`) so it improves the docs/skills while you
publish. See Phase 7 for exactly what it does. Tell the consultant (in French) that you're
finalizing, then proceed immediately to publish — don't block on it.

### Step 2 — Validate and publish
There is **no Git push, no fork, no `gh`** — the backend creates the branch and PR.

```bash
node --check clients/<slug>/data.js && node scripts/validate-data.js clients/<slug>/data.js
node scripts/submit.mjs clients/<slug> "add(client): <Client Name>"
```

`submit.mjs` reads the whole `clients/<slug>/` folder, sends it to the submission
endpoint, and prints the PR URL. The endpoint commits as the `diag-ia-bot` GitHub App
and opens the PR to `staging` — CI auto-merges if checks pass.

> First publish only: if it prints "No submission secret found", set the shared key once
> (`~/.config/diag_ia/secret`) — see the `publish` skill — and re-run.
> Note: `_sources/` is git-ignored and not sent. If you created a **new component** for
> this client, include it in the same PR by passing extra paths (the backend now accepts
> `components/`, `_template/`, `.claude/skills/`, docs — everything except `.github/`,
> `api/`, and deploy config):
> ```bash
> node scripts/submit.mjs clients/<slug> "feat: <Name> + <component>" components/<name>.html components/index.html
> ```

Tell the consultant (in French):
> « C'est publié ✅. Dans ~2 minutes, ton **lien de validation** sera prêt :
> **staging.diag-ia.hubvisory.app/\<slug\>** — partage-le pour confirmation (le client ne
> le voit pas). Pour mettre le **site client** en ligne une fois validé, contacte un
> AI engineer Hubvisory. »

### Step 3 — Stop the local server
Now that it's published, stop the background `npx serve` process you started in Phase 5
(kill that background task). Confirm `http://localhost:3000` is no longer serving.

### Lien de validation (automatique)
Après les vérifications (~2 min), le lien de validation est actif :
`https://staging.diag-ia.hubvisory.app/<slug>` (bandeau orange = pas la version client).

### Site client (un AI engineer Hubvisory — pas l'agent)
La mise en ligne du **site client** (`https://diag-ia.hubvisory.app/<slug>`) est faite par
un **AI engineer Hubvisory** (ex. Gaspard). Ne promets pas de délai — dis au consultant de
le contacter quand le lien de validation est validé.

---

## Phase 7: Post-mortem & skill improvement (runs in the BACKGROUND)

This portal is meant to **get better after every use**. Triggered at confirmation
(Phase 6, Step 1) as a background subagent so the consultant isn't blocked.

1. **Log friction as you go.** Throughout the build, append to `clients/<slug>/context.md`
   (a `## Frictions` section) every snag, surprise, or manual workaround: stale/wrong
   docs, an undocumented data quirk, a scoring ambiguity, a source discrepancy, a command
   that didn't work, a step that was painful. Don't rely on memory at the end.
2. **Synthesize concrete fixes** into `context.md` under `## Améliorations proposées` —
   each as a specific edit ("in skill X, change Y to Z because…"). This is the rationale
   /changelog that travels with the report PR.
3. **Apply the edits to the files** — this skill, `CLAUDE.md`, `README.md`, the
   `components/` library, `_template/`, or a new skill/script. Small, durable edits.
4. **Publish the improvements as their OWN PR** (the backend now allows these paths —
   everything except `.github/`, `api/`, and deploy config). Don't try to bundle them into
   the client PR (that one is already publishing in parallel — racing it risks a partial
   commit). When your edits are ready, open a separate improvement PR:
   ```bash
   node scripts/submit.mjs clients/<slug> "chore(skills): improvements from <Name> mission" \
     .claude/skills/add-client.md components/<new>.html components/index.html
   ```
   (The first arg just labels the branch; list the actual changed files after the message.)
   `.github/`, `api/`, and deploy config still need a maintainer Git PR — flag those in
   `context.md` instead.
5. **Save a memory** for cross-session learnings (preferences, gotchas) so future runs
   start ahead.

Goal: the next consultant hits fewer surprises than you did.

---

## Troubleshooting

### Page is Blank / White Screen
1. **Check browser console** (F12 > Console) for JavaScript errors
2. **Most common cause**: Syntax error in `data.js`
   - Missing comma between fields
   - Unclosed bracket or brace
   - Trailing comma before closing brace (usually OK in modern JS, but check)
3. **Verify `data.js` loads**: Check Network tab (F12 > Network) — `data.js` should return 200

### Charts Don't Render
1. **Check browser console** for Chart.js errors
2. **Verify data format**: Radar needs exactly 6 axes in `axesRadar[]`
3. **Check for NaN**: All scores must be numbers, not strings
4. **CDN blocked?**: Corporate firewalls sometimes block CDN. Test on personal network.

### Nav Pills Don't Filter Content
1. **Check idMetier consistency**: `useCasesList[].idMetier` must match `perimetre[].id` exactly
2. **Case-sensitive**: `gestionnaire_parc` ≠ `Gestionnaire_Parc`

### Heatmap Shows Wrong Colors
1. **Values must be 1-5**: Not 0-5, not percentages
2. **Check heatmapMatrix**: Each row needs `idMetier`, `usage`, `confiance`

### Vercel Routing Doesn't Work (404 on /<slug>)
1. **Check `<base href>`**: Must be `/clients/<slug>/` (with trailing slash)
2. **Check `vercel.json`**: Should have the rewrite rule
3. **File location**: Must be `clients/<slug>/index.html`, not somewhere else

### Publish fails
Publishing uses the backend, not Git push. Common cases:
1. **"No submission secret found"**: set the publish key once (`~/.config/diag_ia/secret`) — see the `publish` skill.
2. **401 bad secret**: wrong key — re-paste the correct value from the admin.
3. **"path not allowed"**: you tried to write `.github/`, `api/`, or deploy config — those need a maintainer Git PR; drop them from the submission.
3b. **"payload too large" (413)**: several MB of images in one go — compress/resize them or host on a CDN; text is never the cause.
4. **Network/500**: confirm internet; if it says "server not configured", the admin checks Vercel env vars (`BACKEND_SETUP.md`).

### Template is Broken
If `_template/index.html` was accidentally modified:
```bash
git checkout main -- _template/index.html
```

### Data Doesn't Match Diagnostic
**Never fabricate data.** If something is missing:
1. Mark it as `"TODO: provide X"` in the data
2. Ask the consultant to fill it in
3. Don't guess numbers or create fake use cases

---

## Rules

- **Never invent data.** If information is missing, ask for it. If the consultant doesn't have it, mark it as `"TODO: <what's needed>"` in the data object.
- **Always work on a branch.** Never commit directly to `main`.
- **Commit frequently.** After each phase or major step.
- **Always confirm before writing files.** Show the structured data and get explicit approval.
- **Match the diagnostic.** The website must reflect exactly what was delivered in the PDF/PowerPoint. No embellishments.
- **Be patient.** Consultants may not have all data at hand. It's fine to pause and resume.
- **Check for existing clients.** Before creating a folder, verify the slug isn't already taken.
- **Use Clovis as reference.** When in doubt about data format, check `clients/clovis/data.js`. For page structure, check `clients/clovis/index.html`.
- **Copy the template via `cp`.** Always start from `cp _template/index.html clients/<slug>/index.html` — never write `index.html` from scratch. Then write `data.js` as a new file.
- **No build step.** The page must work by opening the HTML file directly in a browser. No npm, no compilation.
- **Data goes in `data.js`.** Write `const CLIENT_DATA = { ... }` to `clients/<slug>/data.js`. Do not inline CLIENT_DATA in index.html. The rendering engine loads it via `<script src="data.js">`.
- **Set `<base href>`.** After copying the template, edit `<base href="/clients/<slug>/">` in the client's `index.html`. This is required for Vercel URL routing.
- **Update REGISTRY.md.** Every new client must be added to the registry with template used, date, and any structural changes.
- **Keep `idMetier` consistent.** The same id must be used across `perimetre`, `useCasesList`, `heatmapMatrix`, and `stackByMetier`.
- **Add cards at end of grid.** Minimizes merge conflicts when multiple people work in parallel.
- **Only publish after local verification.** The consultant must confirm the page works before running the `publish` skill (staging deploy).
- **Replace placeholders.** `promptsBanque` templates use `{{client}}` — replace with actual client name.
