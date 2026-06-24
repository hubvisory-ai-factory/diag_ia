---
name: frontend-design
description: Create distinctive, production-grade frontend interfaces with high design quality for the diagnostic portal. Use when building or refining page templates, section components, or the landing page. Generates polished, visually striking code that avoids generic AI aesthetics — tailored for C-level executive audiences.
---

This skill guides creation of distinctive, production-grade frontend interfaces that avoid generic "AI slop" aesthetics. Implement real working code with exceptional attention to aesthetic details and creative choices.

The user provides frontend requirements: a component, page, application, or interface to build. They may include context about the purpose, audience, or technical constraints.

## Design Thinking

Before coding, understand the context and commit to a BOLD aesthetic direction:
- **Purpose**: What problem does this interface solve? Who uses it?
- **Tone**: Pick an extreme: brutally minimal, maximalist chaos, retro-futuristic, organic/natural, luxury/refined, playful/toy-like, editorial/magazine, brutalist/raw, art deco/geometric, soft/pastel, industrial/utilitarian, etc. There are so many flavors to choose from. Use these for inspiration but design one that is true to the aesthetic direction.
- **Constraints**: Technical requirements (framework, performance, accessibility).
- **Differentiation**: What makes this UNFORGETTABLE? What's the one thing someone will remember?

**CRITICAL**: Choose a clear conceptual direction and execute it with precision. Bold maximalism and refined minimalism both work — the key is intentionality, not intensity.

Then implement working code (HTML/CSS/JS) that is:
- Production-grade and functional
- Visually striking and memorable
- Cohesive with a clear aesthetic point-of-view
- Meticulously refined in every detail

## Frontend Aesthetics Guidelines

Focus on:
- **Typography**: Choose fonts that are beautiful, unique, and interesting. For this project, DM Serif Display (headings) + Inter (body) is the established pairing. Within those, exploit weight, size, letter-spacing, and case variations to create hierarchy and character.
- **Color & Theme**: Commit to a cohesive aesthetic. Use CSS custom properties for consistency. Dominant colors with sharp accents outperform timid, evenly-distributed palettes.
- **Motion**: Use CSS transitions and animations for effects and micro-interactions. Focus on high-impact moments: one well-orchestrated page load with staggered reveals (`animation-delay`) creates more delight than scattered micro-interactions. Use scroll-triggering via `IntersectionObserver` and hover states that surprise.
- **Spatial Composition**: Unexpected layouts. Asymmetry. Overlap. Diagonal flow. Grid-breaking elements. Generous negative space OR controlled density.
- **Backgrounds & Visual Details**: Create atmosphere and depth rather than defaulting to solid colors. Add contextual effects and textures that match the overall aesthetic.

NEVER use generic AI-generated aesthetics like overused font families (Roboto, Arial, system fonts), cliched color schemes (particularly purple gradients on white backgrounds), predictable layouts and component patterns, and cookie-cutter design that lacks context-specific character.

**IMPORTANT**: Match implementation complexity to the aesthetic vision. Maximalist designs need elaborate code with extensive animations and effects. Minimalist or refined designs need restraint, precision, and careful attention to spacing, typography, and subtle details.

## Diagnostic Portal Context

This project is a consulting deliverable for Hubvisory. Apply these additional constraints:

### Audience
- **C-level executives and senior leadership** at client companies
- They expect premium, polished, trustworthy visual language
- Data clarity and readability trump flashiness — but blandness is unacceptable
- Mobile and tablet (iPad) responsiveness is mandatory

### Recommended Aesthetic Direction
- **Editorial/luxury consulting** — think McKinsey meets a high-end design studio
- Strong typography hierarchy: impactful headlines, readable body text
- Data visualization should feel authoritative and elegant, not dashboard-generic
- Generous whitespace, deliberate grid, subtle motion on scroll
- Dark mode optional but consider it — executives often browse evenings

### Tech Constraints
- **Static HTML** — self-contained files, no framework, no build step
- **Tailwind CSS via CDN** (`cdn.tailwindcss.com`) — use utility classes directly in HTML
- **Chart.js 4 via CDN** for data visualization (radar, bar, scatter)
- **Chart.js plugins**: `chartjs-plugin-datalabels` for labels, `chartjs-plugin-annotation` for reference lines
- **Inline SVG** for gauges, heatmaps, and custom visualizations
- **Google Fonts**: Inter (body) + DM Serif Display (headings) via `<link>` tag
- **CSS custom properties** for theming (defined in `:root` block)
- Client data lives in a separate `data.js` file (`const CLIENT_DATA = { ... }`), loaded via `<script src="data.js"></script>`
- No npm, no TypeScript, no React — pure HTML/CSS/JS

### Component Library
Reference snippets in `components/` when building or modifying sections:
- Each file is a self-contained HTML snippet showing one section type
- Read these before building to maintain consistency across pages
- When creating a new section type, extract the snippet into `components/` as well

### What to Build
When asked to create or refine components for the portal:
1. Read `_template/index.html` for the page structure and `_template/data.js` for the data schema
2. Check existing components in `components/` for consistency
3. Check `clients/clovis/` for a complete real example (index.html for layout, data.js for data)
4. Build the component as a self-contained HTML/CSS/JS snippet
5. Ensure it looks exceptional with real data AND gracefully handles missing/sparse data
6. Test by opening the HTML file directly in a browser

### Chart & Data Viz Standards
- Override Chart.js defaults — default styling is generic
- Custom color palettes that match the page theme (use CSS custom properties)
- Clear labels, readable at mobile sizes
- Radar charts for maturity, scatter/bubble for use case prioritization, bar for distributions, timeline for roadmap
- Animate on scroll-into-view via `IntersectionObserver`, not on page load
- Use `chartjs-plugin-datalabels` for inline data labels instead of relying on tooltips alone
- Gauge visualizations use inline SVG with arc paths, not Chart.js

### Design Tokens (CSS Custom Properties)
```css
:root {
  --primary: #003366;
  --accent: #E30613;
  --primary-soft: rgba(0, 51, 102, 0.08);
  --accent-soft: rgba(227, 6, 19, 0.08);
  --primary-border: rgba(0, 51, 102, 0.22);
  --accent-border: rgba(227, 6, 19, 0.22);
  --ink: #0f172a;
  --muted: #475569;
  --muted-soft: #94a3b8;
  --border: #e2e8f0;
  --surface: #ffffff;
  --bg: #f6f8fb;
  --bg-alt: #eef2f8;
}
```

### Heat Scale (5-step, for heatmaps and scores)
```
1 = #dc2626 (red)
2 = #f97316 (orange)
3 = #f59e0b (amber)
4 = #84cc16 (lime)
5 = #10b981 (emerald)
```

### Theming via CLIENT_DATA.branding

All visual tokens live in `CLIENT_DATA.branding` and flow through `buildTheme()` into the
CSS custom properties above. Components read `var(--primary)`, `var(--font-body)`, etc. —
**never hardcode** colors or fonts.

- **`primaryColor`** / **`secondaryColor`** — main brand colors. `buildTheme()` derives the
  soft (`0.08` alpha) and border (`0.22` alpha) variants automatically.
- **`neutrals`** (optional, has defaults) — `ink`, `muted`, `mutedSoft`, `border`,
  `surface`, `bg`, `bgAlt`. Override any subset for a custom neutral palette.
- **`fonts`** (optional, has defaults) — `body`, `display` (CSS font stacks) +
  `googleFontsUrl` (the `<link>` href). `buildTheme()` swaps the Google Fonts link and sets
  `--font-body` / `--font-display`.
- **`logoUrl`** — path to the client logo in `assets/`.

Defaults = Hubvisory design language: primary `#003366` (navy), accent `#E30613` (red),
Inter (body) + DM Serif Display (headings). Risk colors: rouge `#dc2626`, orange
`#f59e0b`, vert `#10b981`. Cards: white, `1px solid var(--border)`, `rounded-lg`. Layout:
`max-w-screen-xl` (1280px), responsive grid.

### Keeping the component library in sync

When a client page needs a component absent from `components/index.html`, add it there
first (with self-descriptive placeholder data), create the `components/<name>.html`
snippet, use it, then log it in `components/CATALOG.md`. See that file for the full rule
and the self-descriptive text convention.
