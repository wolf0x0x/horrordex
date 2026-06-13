# Horrordex 3-Day Content Update SOP

Task ID: `horrordex-update-v1`  
Cadence: every 3 days, Beijing time 02:00  
Target site: `https://horrordex.xyz/`  
Content sources: `src/content/`, `src/data/`, `scripts/seed-seo-guides.js`  
Primary deploy path: GitHub Pages. Cloudflare Pages is optional when repository secrets are configured.

## Cycle Calendar

| Cycle | Example Date | Type | Work Item |
| --- | --- | --- | --- |
| 1 | 2026-06-16 | New content | Publish `20 Free Horror Games Like the Backrooms` |
| 2 | 2026-06-19 | New content | Publish `Roblox Beginner Guide 2026` |
| 3 | 2026-06-22 | New content | Publish `Minecraft Survival Guide 2026` |
| 4 | 2026-06-25 | New content | Publish `Best Free Crazy Games to Play in 2026` |
| 5 | 2026-06-28 | Deepen content | Expand the existing 4 foundation articles with FAQ, internal links, and CTA blocks |
| 6 | 2026-07-01 | Entity expansion | Add 3 Backrooms entity dossiers: Smiler, Bacteria, Partygoers |
| 7 | 2026-07-04 | SEO optimization | Improve schema, semantic URLs, and image alt text |
| 8 | 2026-07-07 | Content expansion | Add `Top 10 Roblox Horror Games` |
| 9 | 2026-07-10 | Review content | Add `Escape the Backrooms Review` |
| 10 | 2026-07-13 | Technical optimization | Add static search and navigation improvements |

## Standard Workflow

### Step 1: Content Production

- Write or update the target Markdown entry.
- List pages should include at least 10-20 items.
- Platform guides should include clear beginner steps, safety notes, and progression routes.
- Every article should include at least 3 FAQ items, 2 internal links, and visible CTA buttons or links.
- Generated or downloaded images should be WebP and use semantic filenames.

### Step 2: Content Review

- Confirm the H1 is unique and contains the core keyword.
- Keep the meta summary concise and search-intent focused.
- Confirm image alt text exists.
- Confirm external links are intentional and useful.
- Confirm there is no Chinese display text in production pages unless a localized section is intentionally added later.

### Step 3: Code Integration

- Place Markdown in `src/content/`.
- Update JSON or seed scripts in `src/data/` and `scripts/` when the page is generated.
- Run `npm run build:sync`.
- Commit with a focused message such as `feat: add roblox beginner guide`.
- Push to `main` to trigger deployment.

### Step 4: Build Verification

- Confirm `npm run build` succeeds.
- Confirm the new URL is generated under `dist/`.
- Confirm images load and no console errors appear in local preview.
- Confirm mobile layout keeps text and buttons inside their containers.

### Step 5: Search Indexing

- Submit the new URL in Google Search Console.
- Confirm `sitemap.xml` support when sitemap generation is added.
- Record the deployment in the update log.

### Step 6: Data Observation

- Check GitHub Pages deployment status.
- Check Cloudflare Analytics when Cloudflare Pages is configured.
- Check Google Search Console indexing and query impressions.

## Update Log Template

```md
## Update Log - YYYY-MM-DD

- **Cycle**: 1
- **Type**: New / Optimization / Expansion / Technical
- **Article**: Article title
- **URL**: https://horrordex.xyz/guides/example/
- **Word Count**: 0
- **Images**: 0
- **Internal Links**: 0
- **FAQ Added**: Yes / No
- **Schema Type**: Article / ItemList / FAQPage / HowTo
- **Deploy Status**: Success / Failed
- **GSC Submitted**: Yes / No
- **Notes**: Notes, blockers, or observations
```
