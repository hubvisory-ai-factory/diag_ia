# Diag IA — Hubvisory AI Diagnostic Portal

## Purpose

This repo hosts all client-facing AI diagnostic websites for Hubvisory's consulting practice. Each client engagement produces a rich, interactive website deployed at `<domain>/<client-slug>` on Vercel. Consultants add new client cases by having a guided conversation with Claude Code — no frontend experience required.

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
├── index.html                       # Landing page — lists all client diagnostics
├── vercel.json                      # Vercel rewrite rules (/<slug> -> /clients/<slug>/index.html)
├── favicon.png                      # Hubvisory logo (shared favicon)
├── .gitignore
├── .claude/
│   ├── settings.json
│   └── skills/
│       ├── add-client.md            # Guided workflow to add a new client case
│       └── frontend-design.md       # Design system for executive audience
├── _template/
│   ├── index.html                   # Complete working page with placeholder data
│   └── assets/                      # Template-level assets
├── clients/
│   ├── clovis/                      # First real client
│   │   ├── index.html               # Self-contained diagnostic page (all data inline)
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

### Self-contained pages

Each client gets one HTML file in `clients/<slug>/index.html`. All data is embedded inline as a JavaScript object (`const CLIENT_DATA = { ... }`) — this is the **single source of truth** for all visualizations, charts, and content on that page. No build step, no external JSON, no framework. Open the file in a browser and it works.

The `CLIENT_DATA` object drives every section: branding, radar axes, heatmap, use cases, risks, roadmap, glossary, and UI labels. The rendering logic reads from this object and populates the page dynamically.

### Component library

The `components/` folder contains **25 documented HTML snippets** — one per visual section (radar chart, heatmap, gauge, use-case cards, etc.). Claude reads these when assembling new client pages. They are **not** runtime dependencies — they are copy-paste reference material showing the HTML structure, Tailwind classes, and Chart.js configuration for each section type.

### Template

`_template/index.html` is a complete working page with self-descriptive placeholder data. To add a new client, Claude copies the template and replaces the `CLIENT_DATA` block and all HTML content with real client data from the diagnostic.

### Landing page

`index.html` at the repo root lists all client diagnostics as a card grid. When a new client is added, a card must be added to this page.

## Adding a New Client

1. Pull the repo: `git pull origin main`
2. Start Claude conversation in the repo root
3. Type: **"I want to add a new client case"** (triggers the `add-client` skill)
4. Claude guides data collection (branding, metrics, use cases, risks, roadmap, etc.)
5. Claude generates `clients/<slug>/index.html` from the template + real data
6. Claude adds a card to `index.html` for the new client
7. Consultant opens the HTML file directly in a browser to verify
8. Push to GitHub -> Vercel auto-deploys

### What Claude does during step 4-6

See `.claude/skills/add-client.md` for the full guided workflow. In summary:

1. Asks for client name, slug, and branding
2. Asks for (or reads) diagnostic source materials (PDF, PPT, Excel, or interactive Q&A)
3. Extracts and structures all data into the `CLIENT_DATA` format
4. Creates `clients/<slug>/` directory with an `assets/` subfolder
5. Copies `_template/index.html` -> `clients/<slug>/index.html`
6. Replaces the entire `CLIENT_DATA` JavaScript object with real structured data
7. Updates all HTML content (section headings, text, table rows, nav pill labels)
8. Adds a client card to the root `index.html`
9. Flags any missing fields as `"TODO: provide X"` rather than inventing data

## Component Catalog

Components in `components/` (HTML snippets Claude uses as reference when building pages):

- **_docs.html** — UI primitives reference (cards, pills, stats, buttons, typography)
- **gauge.html** — SVG arc gauge for maturity score (0-5)
- **radar.html** — Chart.js radar for 6-axis maturity assessment
- **heatmap.html** — HTML table heatmap (métier x dimension, 5-step color scale)
- **bars-frequency.html** — Chart.js bar chart for frequency distribution
- **bars-adoption.html** — Chart.js bar chart for adoption duration
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

- **Theme**: primary `#003366` (navy), accent `#E30613` (red), with soft variants (`rgba(0,51,102,0.08)`, `rgba(227,6,19,0.08)`)
- **Heat scale**: 5-step red-to-green: `["#dc2626", "#f97316", "#f59e0b", "#84cc16", "#10b981"]`
- **Risk colors**: rouge `#dc2626`, orange `#f59e0b`, vert `#10b981`
- **Typography**: Inter for body text, DM Serif Display for headings
- **Cards**: white background, `1px solid #e2e8f0` border, `rounded-lg`
- **Layout**: max-width 1280px (`max-w-screen-xl`), responsive grid
- **Background**: `#f6f8fb` (light blue-grey)
- **Ink**: `#0f172a` (near-black), muted `#475569`, soft `#94a3b8`

## Conventions

### Naming

- Client slugs: lowercase kebab-case (`acme-corp`, `retail-group-fr`)
- Component files: kebab-case (`radar-chart.html`, `use-case-card.html`)
- Client folders: match the slug exactly

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
# Preview any page — just open the HTML file in a browser
open clients/clovis/index.html
open index.html

# Or use a local server for proper routing
npx serve .

# Deploy
git push origin main    # Vercel auto-deploys
```

## Deployment

- **Vercel project**: Static site (no build command needed)
- **Deploy trigger**: Push to `main`
- **Routing**: `vercel.json` rewrites `/<slug>` -> `/clients/<slug>/index.html`
- **Domain**: TBD — will be `<something>.vercel.app` initially, then custom domain

## Current Status

- [x] Repo structure and CLAUDE.md + skills
- [x] Static HTML architecture (no framework, no build step, all data inline)
- [x] Template page (`_template/index.html`) with full placeholder data
- [x] CDN stack: Tailwind CSS, Chart.js 4, Google Fonts
- [x] All visualization types: Gauge (SVG), Radar, Bar, Scatter (Chart.js), Heatmap (HTML table)
- [x] Full section set: Dashboard, Métier spaces, Governance, Methodology, Roadmap, Glossary
- [x] Layout: Sticky nav, section routing, responsive grid, print-friendly
- [x] Landing page (`index.html`) with client card grid
- [x] First real client case (Clovis — `clients/clovis/`)
- [x] Vercel config (`vercel.json` with slug rewrites)
- [x] Component library: 25 snippet files + visual showcase (`components/index.html`)
- [x] Add-client skill with full `CLIENT_DATA` field reference
- [ ] Vercel project setup and domain configuration
- [ ] End-to-end test of the consultant workflow
