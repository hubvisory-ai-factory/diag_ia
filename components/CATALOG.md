# Catalogue des composants

Référence des snippets HTML dans `components/`. Claude les lit comme matériau de
copier-coller quand il construit une page client — ce **ne sont pas** des dépendances
runtime. Ouvre `components/index.html` dans un navigateur pour les voir rendus.

## Liste

- **_docs.html** — UI primitives reference (cards, pills, stats, buttons, typography)
- **gauge.html** — SVG arc gauge for maturity score (0-5)
- **radar.html** — Chart.js radar for 6-axis maturity assessment
- **heatmap.html** — HTML table heatmap (métier x dimension, 5-step color scale)
- **bars.html** — Production-grade SVG bar charts (frequency + adoption) — *replaces bars-frequency.html + bars-adoption.html*
- **scatter-confidence.html** — Chart.js bubble chart for tools x confidence per métier
- **hero.html** — Hero section with mission info + métier list card
- **cta-banner.html** — Gradient call-to-action banner
- **risks.html** — Risk register with severity bars
- **roadmap.html** — Phased roadmap (3 horizons)
- **roadmap-gantt.html** — Dependency-free CSS Gantt sequenced by package (P1/P2/P3 toggles, default P1). One row per produit, phases drawn as coloured bars over a week grid (`start`/`end` are 1-based week *boundaries*, halves allowed), with a Go/no-Go marker at the Construction↔Déploiement boundary and a per-package `maxWeek` that truncates the axis. Clicking a row opens a modal listing the catalogue solutions for that produit + package (joined to `catalogue-votac.html` via `produitId`/`package`). Introduced by `clovis`. Data: `CLIENT_DATA.roadmapPackages`.
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
- **metier-usecases.html** — Full use case card catalog (base: typology/complexité/gain pills)
- **solutions-grid.html** — Filterable solutions grid with typology pills (base variant)
- **catalogue-votac.html** — Catalogue des solutions, VOTAC variant: text-led cards (no score on the face), product + phase (P1/P2/P3) filters, click → solution modal. Introduced by `clovis`.
- **usecase-modal.html** — Use-case detail modal with **clickable** associated-solution chips (joined via `casUsageLies`) that open the solution modal with a back link; font-harmonized rich text. Introduced by `clovis`.
- **cartographie-processus.html** — Enhanced process mapping (Avant / Après IA)
- **espace-partenaire.html** — Hubvisory team section with consultant cards + CTA

## Règle : garder la bibliothèque à jour

Quand une page client a besoin d'un composant **absent** de `components/index.html` :

1. **D'abord** ajoute-le à `components/index.html` avec des données placeholder auto-descriptives
2. **Puis** crée le fichier snippet `components/<nom>.html`
3. **Puis** utilise-le dans la page client
4. **Enfin** ajoute une ligne à ce catalogue (`components/CATALOG.md`)

Aucune page client ne doit contenir un type de composant absent de la bibliothèque.

## Convention de texte auto-descriptif

Tout le texte placeholder (bibliothèque + template) doit décrire littéralement son rôle :

- Nom du client : `"Nom du Client"`
- Département : `"Département A"`
- Titre de cas d'usage : `"Cas d'usage n°1"`
- Description : `"Description du premier cas d'usage identifié."`
- Valeurs numériques : réalistes mais clairement génériques (2.5/5, 42%, 45 min/jour)
