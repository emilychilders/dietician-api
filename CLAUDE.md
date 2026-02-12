# DieticianAPI - CLAUDE.md

## Project Overview
DieticianAPI is a standalone dietary guides service. It provides centralized diet restriction data (28 diets across lifestyle, medical, religious, and allergy categories) served as a static JSON endpoint via Vercel. No database required.

## Architecture
- **API**: Vercel serverless function (`api/diets.js`) — single GET endpoint
- **Data**: `api/data/dietaryGuides.js` — single source of truth for all 28 diets
- **Caching**: CDN-cached responses (1hr client, 24hr edge)

## Code Conventions

### Style
- Single quotes everywhere, 2-space indent JS
- `for...of` preferred, functional style
- ESM (`type: "module"` in package.json)

### File Organization
- `api/data/dietaryGuides.js` — all 28 diet objects
- `api/diets.js` — Vercel API endpoint

## Commands
```bash
# Fetch all guides
curl https://your-deployment.vercel.app/api/diets
```

## Environment Variables
None required. Data is served directly from the JS module.

## Consumers
- **SimpleSoup** — cooking companion app, fetches dietary guides via HTTP
