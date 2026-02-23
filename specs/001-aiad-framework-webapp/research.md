# Research: AIAD Framework Web Application

## Decision 1: Framework

**Decision**: Astro 5.x with Starlight

**Rationale**:
- Zero JavaScript by default — content pages ship as pure HTML/CSS (0–5 KB JS), meeting the <3s loading target
- Islands Architecture enables selective hydration: only interactive components (charts, role visualizations) ship JavaScript via `client:visible`
- Starlight provides out-of-the-box: Pagefind search (build-time indexed, zero-config, offline), pre-translated French UI strings, responsive sidebar, dark mode
- Content Collections with Content Layer offer type-safe Markdown handling with 5x faster builds
- Framework-agnostic islands: React, Vue, or Svelte components can coexist in the same project

**Alternatives Considered**:
- **Next.js 15 (static export)**: Over-engineered for a docs site. Ships full React runtime (~70–200 KB). Static export disables key features (Image Optimization, ISR, middleware). No built-in search or docs features.
- **Docusaurus 3**: Purpose-built for docs but ships full React runtime (~150–200 KB). Each locale requires a separate build. Less flexible for custom interactive layouts (role guides, visualizations).
- **VitePress**: Lightweight (~30–50 KB Vue runtime), excellent DX, but locked to Vue ecosystem. Cannot mix React charting libraries. Fewer pre-translated French UI strings.

## Decision 2: Styling

**Decision**: Tailwind CSS 4.x

**Rationale**:
- Utility-first approach enables rapid responsive design (mobile/tablet/desktop)
- Official Astro integration available
- Excellent dark mode support via class strategy
- Purged CSS in production keeps bundle minimal

**Alternatives Considered**:
- **CSS Modules**: More verbose, slower iteration for responsive design
- **Starlight default styles**: Sufficient for standard docs, but too constrained for custom interactive role guides and dashboard mockups

## Decision 3: Interactivity (Charts & Visualizations)

**Decision**: React islands with Chart.js (via react-chartjs-2) for dashboard mockups; custom SVG/CSS for role interaction diagrams

**Rationale**:
- Chart.js is lightweight and well-suited for dashboard mockup visualizations (bar charts, line charts, radar charts)
- React islands hydrate only when visible (`client:visible`), no performance penalty on other pages
- Role interaction diagrams are better as static SVG/CSS — no library needed, zero JS overhead

**Alternatives Considered**:
- **D3.js**: More powerful but significantly more complex for simple dashboard mockups
- **Mermaid**: Good for diagrams but limited styling control for the role interaction visualizations

## Decision 4: Search

**Decision**: Pagefind (built-in with Starlight)

**Rationale**:
- Zero configuration required — indexes at build time
- Works offline (no external service dependency)
- Lightweight client (~5 KB)
- Supports French language indexing

**Alternatives Considered**:
- **Algolia DocSearch**: Excellent but requires external service and qualification criteria
- **Custom Fuse.js**: Additional implementation work for inferior results

## Decision 5: Content Source

**Decision**: Astro Content Collections consuming Markdown files authored in-repo

**Rationale**:
- Content from the AIADwebsite repository framework/ directory will be adapted and integrated as Astro Content Collections
- Type-safe frontmatter validation via Zod schemas
- Built-in cross-reference resolution between documents
- No CMS dependency — content updates via git commits

**Alternatives Considered**:
- **Headless CMS (Strapi, Contentful)**: Unnecessary complexity for static content managed by the framework author
- **Git submodule to AIADwebsite**: Coupling between repos adds fragility; prefer copying and adapting content

## Decision 6: Deployment

**Decision**: Static hosting (GitHub Pages, Netlify, or Vercel)

**Rationale**:
- `astro build` produces a `dist/` folder of static files
- Zero server infrastructure required
- Free tier sufficient for documentation site traffic
- GitHub Pages integrates naturally with the existing GitHub repository

**Alternatives Considered**:
- **Self-hosted**: Unnecessary operational overhead for a static site
- **Cloudflare Pages**: Viable alternative, no strong differentiator for this use case
