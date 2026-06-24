# Diag IA — Hubvisory AI Diagnostic Portal

## Purpose

This repo hosts Hubvisory's client-facing AI diagnostic websites. Each engagement
produces an interactive site at `https://diag-ia.hubvisory.app/<client>`. Consultants
build them by talking to Claude Code — no coding or GitHub account needed.

---

## Guide agent (lire en premier)

Tu aides un **consultant Hubvisory** sans expérience dev. Parle **français**, simple.

### Langage avec le consultant

Ne dis **jamais** « staging », « main », « branche », « PR », « merge », « deploy ».
Utilise des mots simples pour le site :

- « **ton aperçu local** » — ce qu'il voit sur sa machine pendant qu'on travaille
- « **lien de validation** » — un lien partageable pour montrer le travail **sans que le
  client le voie** (essentiel pour itérer tranquillement)
- « **le site client** » — la version finale, en ligne, que le client voit

(Tu peux rester précis et technique sur le **diagnostic/rapport** lui-même — juste pas sur
la plomberie du site.)

### Le workflow

1. Le consultant décrit ce qu'il veut et fournit ses fichiers de contexte.
2. Tu construis ; il regarde en **local** (`npx serve`), vous itérez jusqu'à ce qu'il soit content.
3. Il dit « **publie** » → skill `publish` → tu lui donnes un **lien de validation**
   (le client ne le voit pas).
4. Il partage ce lien à qui il veut pour confirmation, et peut continuer à itérer
   (chaque « publie » met à jour le même lien).
5. Quand il veut que **le client** voie le site → il contacte un **AI engineer Hubvisory**
   (ex. Gaspard) qui le met en ligne. **Toi, agent, tu ne mets jamais en ligne pour le
   client.** Ne promets pas de date : dis-lui de contacter l'équipe.

### Jamais de compte GitHub

Publier ne demande **aucun** compte GitHub, fork, token, `gh`, ni SSH — tout passe par le
skill `publish` (un service backend). La seule chose à configurer une fois : la **clé de
publication** (`~/.config/diag_ia/secret`), posée par le prompt d'onboarding (voir
`README.md`).

### Skills (charge-les quand la situation se présente)

| Situation | Skill |
|---|---|
| Ajouter ou modifier un diagnostic | `.claude/skills/add-client.md` |
| Publier (« publie », « partage », « mets en ligne ») | `.claude/skills/publish.md` |
| Git absent / cloner le projet | `.claude/skills/git-setup.md` |
| Design / nouveau composant | `.claude/skills/frontend-design.md` |

Référence composants : `components/CATALOG.md` (+ `components/index.html` à ouvrir dans un
navigateur). Templates & clients existants : `REGISTRY.md`.

---

## Tech Stack

- Static HTML files (no framework, no build step)
- Tailwind CSS (CDN — `cdn.tailwindcss.com`)
- Chart.js 4 (CDN) + plugins `chartjs-plugin-datalabels`, `chartjs-plugin-annotation`
- Inline SVG for gauge + heatmap
- Google Fonts: Inter (body) + DM Serif Display (headings)
- Hosting: Vercel

## Repo Structure

```
diag_ia/
├── AGENTS.md            # Pointer to this file (entry for other agent tools)
├── CLAUDE.md            # Agent instructions (read first)
├── README.md            # Consultant onboarding = Notion prompt (French)
├── REGISTRY.md          # Templates + existing clients (read before adding a client)
├── index.html           # Landing page — card grid of all diagnostics
├── vercel.json          # URL rewrites (/<slug> -> /clients/<slug>/index.html)
├── staging-banner.js    # Banner shown on the validation link (not the client site)
├── scripts/submit.mjs   # Publish helper (backend, no GitHub account)
├── api/submit.js        # Backend endpoint (admin only)
├── .claude/skills/      # add-client · publish · git-setup · frontend-design
├── _template/           # index.html (engine) + data.js (placeholder) to copy
├── clients/<slug>/      # index.html + data.js + assets/ — one folder per client
├── components/          # index.html (showcase) + snippets + CATALOG.md
└── BACKEND_SETUP.md     # Admin infra + go-live runbook (not for consultants)
```

## How It Works

### Two-file architecture

Each client gets `clients/<slug>/` with two files:

- **`index.html`** — the rendering engine + page structure. Copied verbatim from a
  template via `cp`. The agent never rewrites it from scratch.
- **`data.js`** — `const CLIENT_DATA = { ... }`, the single source of truth for every
  section (branding, charts, use cases, risks, roadmap, glossary, labels). This is the
  **only file the agent writes** per client.

`index.html` loads the data via `<script src="data.js"></script>` and populates the page
dynamically. No build step: open the file in a browser and it works. Each client folder is
self-contained.

### Templates, components & registry

- `_template/` is the starting point to copy (`index.html` engine + `data.js` shape).
  It's a **catalogue of components**, not a fixed shape — every mission has its own
  analysis and structure. Derive the real shape from the sources; grow the component
  library when a mission needs something new.
- `components/` holds reusable section snippets — see `components/CATALOG.md`.
- `REGISTRY.md` tracks templates and existing clients; a divergent client can be promoted
  to a named layout.

### Landing page

`index.html` at the root lists every diagnostic as a card grid. Adding a client means
adding its card here too.

### Data integrity (non-negotiable)

Never fabricate diagnostic data. If a field is missing, mark it `"TODO: provide X"`. All
numbers and recommendations must come from real materials. Confirm with the consultant
before writing final files.

---

## For maintainers (not consultants)

- **Two environments**: `staging` (the « lien de validation ») and `main` (the client
  site). A consultant's `publish` auto-merges to `staging` after CI. To put a report live
  for the client, a maintainer merges the **Release: promote staging to prod** PR
  (`staging` → `main`). Full runbook + infra: `BACKEND_SETUP.md`.
- **Commits**: `add(client): <name>` · `feat(component): <what>` · `fix(<scope>): <what>`
  · `chore: <what>`.
- **Continuous improvement**: after each engagement, fold lessons back into the skills,
  `components/`, `_template/`, or this file. Details in the `add-client` skill (post-mortem
  phase).
