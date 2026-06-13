# Horrordex MVP

Pure static Jamstack MVP for `horrordex.xyz`.

## What Is Included

- Astro static site with entity and guide content collections.
- Manifest-driven content and image sync from `src/data/content-pipeline.json`.
- Build-time Roblox telemetry baked into HTML from `src/data/roblox-stats.json`.
- Data-driven navigation, related links, hero media, visual effects, and asset attribution.
- Client-side matrix search, URL query filters, pagination, and static category pages with no external runtime dependency.
- Google Analytics `G-2TVGXD1WHL`, AdSense Auto Ads, and `ads.txt`.
- `scripts/sync-static-content.js` for Markdown generation and image download.
- `scripts/fetch-roblox-status.js` for scheduled static data refresh.
- GitHub Actions pipeline for periodic refresh and Cloudflare Pages deployment.
- Three core pages:
  - `/` entity matrix
  - `/entities/seek/` dossier page
  - `/guides/level-0/` longform survival guide
  - `/categories/the-backrooms/` and `/categories/roblox-doors/` category pages

## Local Commands

```bash
npm install
npm run dev
npm run sync:content
npm run sync:roblox
npm run build:sync
```

## Cloudflare Pages

Build command:

```bash
npm run build:sync
```

Output directory:

```bash
dist
```

Set these GitHub repository secrets before using the included workflow:

- `CLOUDFLARE_API_TOKEN`
- `CLOUDFLARE_ACCOUNT_ID`
