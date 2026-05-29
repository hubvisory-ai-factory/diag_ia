# Diag IA — Hubvisory AI Diagnostic Portal

## Purpose

This repo hosts all client-facing AI diagnostic websites for Hubvisory's consulting practice. Each client engagement produces a rich, interactive website deployed at `https://diag-ia.hubvisory.app/<client-slug>`. Consultants add new client cases by having a guided conversation with Claude Code — no frontend experience required.

**Live site**: https://diag-ia.hubvisory.app/

**Delivery pipeline**: Diagnostic engagement -> PDF + PowerPoint + **this website**

## Tech Stack

- Static HTML files (no framework, no build step)
- Tailwind CSS (CDN Play — `cdn.tailwindcss.com`)
- Chart.js 4 (CDN) for radar, bar, scatter charts
- Chart.js plugins: `chartjs-plugin-datalabels`, `chartjs-plugin-annotation`
- Inline SVG for gauge + heatmap
- Google Fonts: Inter (body) + DM Serif Display (headings)
- Deploy: Vercel, auto-deploy on push to `main`

## Repo Structure

```
diag_ia/
├── CLAUDE.md                        # This file
├── REGISTRY.md                      # Template & client registry — read first when adding a client
├── index.html                       # Landing page — lists all client diagnostics
├── vercel.json                      # Vercel rewrite rules (/<slug> -> /clients/<slug>/index.html)
├── favicon.png                      # Hubvisory logo (shared favicon)
├── .gitignore
├── .claude/
│   ├── settings.json
│   └── skills/
│       ├── add-client.md            # Guided workflow to add a new client case
│       ├── git-setup.md             # Git & GitHub setup for beginners
│       └── frontend-design.md       # Design system for executive audience
├── _template/
│   ├── index.html                   # Rendering engine + HTML structure (copy this for new clients)
│   └── data.js                      # Placeholder CLIENT_DATA (shows the data shape)
├── clients/
│   ├── clovis/                      # First real client
│   │   ├── index.html               # Rendering engine (copied from template, may have structural edits)
│   │   ├── data.js                  # Client data — the only file the agent writes per client
│   │   └── assets/                  # Client-specific images (logo, etc.)
│   └── <new-client>/                # Each new client gets a folder here
├── components/
│   ├── index.html               # Visual component library (open in browser)
│   ├── _docs.html               # UI primitives reference
│   ├── gauge.html               # SVG gauge snippet
│   ├── radar.html               # Radar chart snippet
│   └── ...                      # (25 total snippet files)
└── README.md
```

## How It Works

### Two-file architecture

Each client gets a folder `clients/<slug>/` with two files:
- **`index.html`** — the rendering engine + HTML structure. Copied verbatim from a template via `cp`. The agent never rewrites this file from scratch.
- **`data.js`** — contains `const CLIENT_DATA = { ... }`, the single source of truth for all visualizations, charts, and content. This is the **only file the agent writes** per client.

The `index.html` loads data via `<script src="data.js"></script>`. The `CLIENT_DATA` object drives every section: branding, radar axes, heatmap, use cases, risks, roadmap, glossary, and UI labels. The rendering logic reads from this object and populates the page dynamically.

No build step, no framework. Open the HTML file in a browser (with `data.js` in the same folder) and it works. Each client folder is self-contained.

### Component library

The `components/` folder contains **25 documented HTML snippets** — one per visual section (radar chart, heatmap, gauge, use-case cards, etc.). Claude reads these when assembling new client pages. They are **not** runtime dependencies — they are copy-paste reference material showing the HTML structure, Tailwind classes, and Chart.js configuration for each section type.

### Templates & Registry

`_template/` contains `index.html` (rendering engine) and `data.js` (placeholder CLIENT_DATA showing the data shape). To add a new client, Claude copies the template's `index.html` via `cp` and writes a new `data.js` with real client data.

`REGISTRY.md` tracks all available templates and existing clients. As the repo grows, clients that diverge significantly from the base template can be promoted to named templates. Every client's `index.html` is implicitly reusable as a layout reference since it contains no client data — the data lives entirely in `data.js`.

### Landing page

`index.html` at the repo root lists all client diagnostics as a card grid. When a new client is added, a card must be added to this page.

## Adding a New Client

1. Pull the repo: `git pull origin main`
2. Start Claude conversation in the repo root
3. Type: **"I want to add a new client case"** (triggers the `add-client` skill)
4. Claude reads `REGISTRY.md` and shows available templates/layouts
5. Claude guides data collection (branding, metrics, use cases, risks, roadmap, etc.)
6. Claude copies the template and writes the client's `data.js`
7. Claude adds a card to `index.html` for the new client
8. Consultant opens the HTML file directly in a browser to verify
9. Push to GitHub -> Vercel auto-deploys

### What Claude does during step 4-7

See `.claude/skills/add-client.md` for the full guided workflow. In summary:

1. Reads `REGISTRY.md` to find available templates and existing client layouts
2. Asks for client name, slug, and branding
3. Asks for (or reads) diagnostic source materials (PDF, PPT, Excel, or interactive Q&A)
4. Extracts and structures all data into the `CLIENT_DATA` format
5. `mkdir -p clients/<slug>/assets`
6. `cp _template/index.html clients/<slug>/index.html` (or from a chosen existing layout)
7. Edits `clients/<slug>/index.html` to set `<base href="/clients/<slug>/">`
8. Writes `clients/<slug>/data.js` with the complete CLIENT_DATA object
9. If the consultant provided a logo, copies it to `clients/<slug>/assets/`
10. Adds a client card to the root `index.html`
11. Updates `REGISTRY.md` with the new client entry
12. Flags any missing fields as `"TODO: provide X"` rather than inventing data

## Component Catalog

Components in `components/` (HTML snippets Claude uses as reference when building pages):

- **_docs.html** — UI primitives reference (cards, pills, stats, buttons, typography)
- **gauge.html** — SVG arc gauge for maturity score (0-5)
- **radar.html** — Chart.js radar for 6-axis maturity assessment
- **heatmap.html** — HTML table heatmap (métier x dimension, 5-step color scale)
- **bars.html** — Production-grade SVG bar charts (frequency + adoption, from hubvisory-ai-maturity-asset) — *replaces bars-frequency.html + bars-adoption.html*
- **scatter-confidence.html** — Chart.js bubble chart for tools x confidence per métier
- **hero.html** — Hero section with mission info + métier list card
- **cta-banner.html** — Gradient call-to-action banner
- **risks.html** — Risk register with severity bars
- **roadmap.html** — Phased roadmap (3 horizons)
- **navigation.html** — Sticky header with nav pills
- **footer.html** — Page footer
- **gouvernance.html** — Governance deep-dive 3-column grid
- **data-health.html** — Data sources table + quality ring + improvement axes
- **process-mapping.html** — Current vs target process flow
- **methodology.html** — Typologies + complexity tabbed guide
- **glossary.html** — Searchable accordion glossary
- **metier-header.html** — Métier space header card
- **metier-top3.html** — Top 3 ranked use case cards
- **metier-quickwins.html** — Quick wins compact grid
- **metier-usecases.html** — Full use case card catalog
- **solutions-grid.html** — Filterable solutions grid with typology pills
- **cartographie-processus.html** — Enhanced process mapping (Avant / Après IA)
- **espace-partenaire.html** — Hubvisory team section with consultant cards + CTA

## Component Library

`components/index.html` is a **visual showcase of every UI component**. Open it in a browser to see all charts, cards, badges, icons, and sections rendered with self-descriptive placeholder data.

```bash
open components/index.html
```

### Purpose

- Visual reference for consultants reviewing the design system
- Prompt context for Claude when generating new client pages
- Living documentation that evolves with the project

### Keeping It Updated

**RULE: When generating a client page, if you need a new component or visualization that does NOT exist in `components/index.html`:**

1. **First** add the new component to `components/index.html` with self-descriptive placeholder data
2. **Then** create a `components/<name>.html` snippet file
3. **Then** use it in the client page
4. **Finally** update the Component Catalog section in this CLAUDE.md

No client page should contain a component type absent from the library.

### Self-Descriptive Text Convention

All placeholder text in the library (and in the template) must be literal descriptions:
- Where a client name goes: `"Nom du Client"`
- Where a department name goes: `"Département A"`
- Where a use case title goes: `"Cas d'usage n°1"`
- Where a description goes: `"Description du premier cas d'usage identifié."`
- Numeric placeholders use realistic but clearly generic values (2.5/5, 42%, 45 min/jour)

## Design System

All visual tokens live in `CLIENT_DATA.branding` and flow through `buildTheme()` into CSS custom properties. Every component reads `var(--primary)`, `var(--accent)`, `var(--font-body)`, etc. — never hardcoded values.

### Branding tokens (in `CLIENT_DATA.branding`)

- **`primaryColor`** / **`secondaryColor`** — main brand colors. `buildTheme()` auto-generates soft (`0.08 alpha`) and border (`0.22 alpha`) variants.
- **`neutrals`** (optional, has defaults) — `ink`, `muted`, `mutedSoft`, `border`, `surface`, `bg`, `bgAlt`. Override any or all for a custom neutral palette.
- **`fonts`** (optional, has defaults) — `body` (CSS font stack), `display` (heading font stack), `googleFontsUrl` (the `<link>` href to load). `buildTheme()` swaps the Google Fonts `<link>` and sets `--font-body` / `--font-display` CSS variables.
- **`logoUrl`** — path to client logo in `assets/`

### Defaults (Hubvisory design language)

- **Colors**: primary `#003366` (navy), accent `#E30613` (red)
- **Neutrals**: ink `#0f172a`, muted `#475569`, mutedSoft `#94a3b8`, border `#e2e8f0`, surface `#ffffff`, bg `#f6f8fb`, bgAlt `#eef2f8`
- **Fonts**: Inter (body), DM Serif Display (headings)
- **Heat scale**: 5-step red-to-green: `["#dc2626", "#f97316", "#f59e0b", "#84cc16", "#10b981"]`
- **Risk colors**: rouge `#dc2626`, orange `#f59e0b`, vert `#10b981`
- **Cards**: white background, `1px solid var(--border)`, `rounded-lg`
- **Layout**: max-width 1280px (`max-w-screen-xl`), responsive grid

## Conventions

### Naming

- Client slugs: lowercase kebab-case (`acme-corp`, `retail-group-fr`)
- Component files: kebab-case (`radar-chart.html`, `use-case-card.html`)
- Client folders: match the slug exactly

### Data architecture

- Client data lives in `data.js`, loaded via `<script src="data.js">`. No inline CLIENT_DATA in index.html.
- One folder per client, self-contained: `index.html` + `data.js` + `assets/`.
- The `<base href="/clients/<slug>/">` tag in each client's `index.html` is required for Vercel URL rewrites.

### Data integrity

- **Never fabricate diagnostic data.** If a field is missing, mark it as `"TODO: provide X"`.
- All numbers, scores, and recommendations must come from actual diagnostic materials.
- Claude must ask the consultant to confirm before writing the final files.

### Commits

- `add(client): <name>` — new client case
- `feat(component): <what>` — new or updated component snippet
- `fix(<scope>): <what>` — bug fixes
- `chore: <what>` — infra, config, landing page updates

### Branching

- `main` for client additions (isolated by folder, safe to push directly)
- Feature branches for template or infrastructure changes

## Commands

No build step. Development workflow:

```bash
# Preview a client page (auto-opens browser, no install required)
npx serve -o clients/clovis

# Preview the landing page
npx serve -o .

# Deploy
git push origin main    # Vercel auto-deploys
```

## Deployment

- **Live URL**: https://diag-ia.hubvisory.app/
- **Vercel project**: Static site (no build command needed)
- **Deploy trigger**: Push to `main` — auto-deploys within ~1 minute
- **Routing**: `vercel.json` rewrites `/<slug>` -> `/clients/<slug>/index.html`

### GitHub Account Required (No Special Access Needed)

To publish changes, consultants need a free GitHub account. **No collaborator access required** — the repo uses a fork & Pull Request workflow.

**How it works:**
1. Fork the repo to your own GitHub account
2. Push changes to your fork
3. Open a Pull Request — Gaspard is auto-notified via CODEOWNERS
4. Once merged, Vercel deploys automatically

**If you don't have a GitHub account**: Use the `git-setup` skill — it walks through:
1. Installing Git (if needed)
2. Creating a GitHub account (free, 2 minutes)
3. Configuring authentication
4. Forking and cloning the repo

Without a GitHub account, you can still create pages locally, but someone else will need to push for you.

## Git Workflow

**Always use branches** — never commit directly to `main`.

### Starting Work
```bash
git checkout -b client/<slug>    # New client
git checkout -b fix/<what>       # Bug fix
git checkout -b feat/<what>      # New feature
```

### During Work
Commit frequently — after each major step:
```bash
git add .
git commit -m "wip(client): <slug> — add metrics section"
```

### When Done
1. Consultant verifies locally in browser
2. Final commit
3. Push branch to fork: `git push -u origin client/<slug>`
4. Create Pull Request: `gh pr create`
5. Gaspard is auto-notified, reviews, and merges
6. Vercel auto-deploys `main` within ~1 minute

## Removing Sections

If a client doesn't need certain sections:

1. **In `index.html`**: Delete the `<section>` block and any associated nav pill
2. **In `data.js`**: Remove the data object or set it to an empty array

The rendering engine handles missing data gracefully. See `.claude/skills/add-client.md` for details.

## Troubleshooting

Common issues and solutions (full details in `.claude/skills/add-client.md`):

| Problem | Likely Cause | Fix |
|---------|--------------|-----|
| Blank page | Syntax error in `data.js` | Check browser console (F12), fix JS syntax |
| Charts don't render | Wrong data format | Radar needs 6 axes, scores must be numbers |
| Nav pills don't filter | `idMetier` mismatch | Same ID in `perimetre`, `useCasesList`, `heatmapMatrix` |
| 404 on live site | Wrong `<base href>` | Must be `/clients/<slug>/` with trailing slash |
| Can't push | Wrong remote or not forked | Run `gh repo fork --remote` to set up fork |

## Current Status

- [x] Repo structure, CLAUDE.md, skills, and REGISTRY.md
- [x] Two-file architecture: `index.html` (rendering engine) + `data.js` (client data)
- [x] Template split: `_template/index.html` + `_template/data.js` with placeholder data
- [x] CDN stack: Tailwind CSS, Chart.js 4, Google Fonts
- [x] All visualization types: Gauge (SVG), Radar, Bar, Scatter (Chart.js), Heatmap (HTML table)
- [x] Full section set: Dashboard, Métier spaces, Governance, Methodology, Roadmap, Glossary
- [x] Layout: Sticky nav, section routing, responsive grid, print-friendly
- [x] Landing page (`index.html`) with client card grid
- [x] First real client case (Clovis — `clients/clovis/`)
- [x] Vercel deployed at https://diag-ia.hubvisory.app/
- [x] Component library: 25 snippet files + visual showcase (`components/index.html`)
- [x] Add-client skill with full workflow, git guidance, and troubleshooting
