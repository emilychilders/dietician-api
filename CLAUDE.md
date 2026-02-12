# DieticianAPI - CLAUDE.md

## Project Overview
DieticianAPI is a standalone dietary guides service backed by Supabase. It provides centralized diet restriction data (28 diets across lifestyle, medical, religious, and allergy categories) that other apps can consume via Supabase client or Vercel API endpoint.

## Architecture
- **Database**: Supabase (PostgreSQL) with RLS — single `dietary_guides` table
- **API**: Vercel serverless function (`api/diets.js`) for GET (fetch guides) and POST (admin seed)
- **Seed data**: `api/data/dietaryGuides.js` — single source of truth for all 28 diets

## Code Conventions

### Style
- Single quotes everywhere, 2-space indent JS
- `for...of` preferred, functional style
- ESM (`type: "module"` in package.json)

### File Organization
- `api/data/dietaryGuides.js` — seed data (28 diet objects)
- `api/diets.js` — Vercel API endpoint
- `supabase/schema.sql` — reference schema
- `supabase/migrations/` — migration files

## Commands
```bash
# Seed the database (requires ADMIN_SECRET env var)
curl -X POST https://your-deployment.vercel.app/api/diets -H 'x-admin-secret: YOUR_SECRET'

# Fetch all guides
curl https://your-deployment.vercel.app/api/diets
```

## Environment Variables
- `SUPABASE_URL` — Supabase project URL
- `SUPABASE_SERVICE_ROLE_KEY` — service role key (for seeding)
- `ADMIN_SECRET` — secret for POST seed endpoint

## Consumers
- **SimpleSoup** — cooking companion app, reads dietary guides via Supabase anon key
