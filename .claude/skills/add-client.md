---
name: add-client
description: Guided workflow to add a new AI diagnostic client case to the portal. Walks the consultant through providing all required data, generates a self-contained HTML page from the template, and adds the client to the landing page.
---

# Add Client Case

You are helping a Hubvisory consultant add a new AI diagnostic client case to the portal. Your job is to gather all the necessary information, structure it as a `CLIENT_DATA` JavaScript object, and generate the client HTML page — without ever fabricating data.

**Reference files**:
- `_template/index.html` — complete working page with placeholder data (copy this as the starting point)
- `clients/clovis/index.html` — first real client (complete example of a finished page)
- `components/` — HTML snippets for individual sections (use as reference when customizing)

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

## Phase 2: Source Materials

Ask the consultant how they want to provide the diagnostic data:

- **Option A: Provide source files** — PDF report, PowerPoint deck, Excel sheets. Claude extracts and structures the data.
- **Option B: Walk through section by section** — Claude asks for each section's data interactively.
- **Option C: Provide a pre-filled JSON** — If the consultant already has structured data matching the CLIENT_DATA format.

For Option A: ask them to place files in the project directory or paste content, extract all data points, present a summary for confirmation.

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

### 3q. UI Config & Colors

Usually keep defaults — only customize if the client needs different labels:
- `ui.sections` — main navigation section names
- `ui.blocks` — all section titles, subtitles, labels, and tooltip texts (see Clovis for full list)
- `computedColors.heat` — 5-step color scale `["#dc2626", "#f97316", "#f59e0b", "#84cc16", "#10b981"]`
- `computedColors.riskMap` — `{Rouge: "#dc2626", Orange: "#f59e0b", Vert: "#10b981"}`

## Phase 4: Generate the Client Page

Once all data is collected:

1. **Present a full summary** of all collected data, organized by section
2. **Flag any gaps**: fields marked as TODO, sections with sparse data, inconsistencies
3. **Ask for final confirmation**: "Does this accurately represent the diagnostic findings?"
4. **Generate the files**:
   - Create `clients/<slug>/` directory with `assets/` subfolder
   - Copy `_template/index.html` -> `clients/<slug>/index.html`
   - Replace the entire `CLIENT_DATA` JavaScript object with real structured data
   - Update the `<title>` tag with the client name
   - Update all HTML content: section headings, nav pill labels (métier names), header/footer branding
   - Copy any provided assets (logo, images) to `clients/<slug>/assets/`
   - Reference `components/` snippets if adding or removing sections from the template
5. **Update the landing page**: Add a client card to `index.html` in the grid
6. **Tell the consultant** to open `clients/<slug>/index.html` directly in a browser to verify

### How to replace data in the template

The template contains a `<script>` block with:
```javascript
const CLIENT_DATA = { ... };
```

Replace this entire object with the real client data. The rendering logic at the bottom of the page reads from `CLIENT_DATA` to populate all charts, tables, cards, and text. Also update:
- All visible text in HTML sections (headings, paragraphs, list items)
- Navigation pill labels (métier names from `perimetre`)
- Header/footer with client branding
- `<title>` tag

### How to update the landing page

Add a new card to `index.html` inside the `.grid` container. Follow the pattern of the existing Clovis card:
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

## Phase 5: Pre-push Checklist

Before the consultant pushes:

- [ ] All sections have real data (no TODOs remaining)
- [ ] Numbers and scores match the original diagnostic materials
- [ ] Company name, sector, and mission info are correct
- [ ] Use cases have correct typologies, complexity, and gains
- [ ] `idMetier` values in use cases, heatmap, and stackByMetier all match `perimetre[].id`
- [ ] Radar chart shows 6 axes with actual vs target scores (0-5 scale)
- [ ] Heatmap values are 1-5 per dimension per métier
- [ ] Risks have correct severity levels (Rouge/Orange/Vert)
- [ ] The page renders correctly when opened in a browser (`clients/<slug>/index.html`)
- [ ] Nav pills show all métiers and clicking them filters use cases
- [ ] Charts render without errors (check browser console)
- [ ] The landing page (`index.html`) shows the new client card
- [ ] No other client pages were affected

Tell the consultant:
```
Ready to go live! When you've verified everything, run:
  git add clients/<slug>/ index.html
  git commit -m "add(client): <client-name>"
  git push origin main
Vercel will auto-deploy within ~1 minute.
```

## Rules

- **Never invent data.** If information is missing, ask for it. If the consultant doesn't have it, mark it as `"TODO: <what's needed>"` in the data object.
- **Always confirm before writing files.** Show the structured data and get explicit approval.
- **Match the diagnostic.** The website must reflect exactly what was delivered in the PDF/PowerPoint. No embellishments.
- **Be patient.** Consultants may not have all data at hand. It's fine to pause and resume.
- **Check for existing clients.** Before creating a folder, verify the slug isn't already taken.
- **Use Clovis as reference.** When in doubt about data format or page structure, check `clients/clovis/index.html`.
- **Use the template.** Always start from `_template/index.html` — never build a page from scratch.
- **No build step.** The page must work by opening the HTML file directly in a browser. No npm, no compilation.
- **All data inline.** There is no `data.json` or external data file. Everything goes in the `CLIENT_DATA` JavaScript object inside the HTML file.
- **Keep `idMetier` consistent.** The same id must be used across `perimetre`, `useCasesList`, `heatmapMatrix`, and `stackByMetier`.
