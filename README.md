# CMS Group — Payload CMS

Custom headless CMS for CMS Group built with Payload CMS 3, Next.js 15, and PostgreSQL.

## Prerequisites

- Node.js 20+
- pnpm (`npm install -g pnpm`)
- Docker + Docker Compose (for local Postgres and production deploy)

## Local Development

### 1. Install dependencies
```bash
pnpm install
```

### 2. Configure environment
```bash
cp .env.example .env
# Edit .env — set PAYLOAD_SECRET to a strong random string
```

### 3. Start local Postgres
```bash
docker compose -f docker-compose.dev.yml up -d
```

### 4. Start dev server
```bash
pnpm dev
```

Open http://localhost:3000/admin to create the first admin account.

### 5. Seed content (optional — imports all existing CMS Group content)
```bash
# Make sure cms-web-dev is at ../cms-web-dev (seed reads source data from there)
pnpm seed
```

## Environment Variables

| Variable | Description | Required |
|---|---|---|
| `DATABASE_URI` | PostgreSQL connection string | Yes |
| `PAYLOAD_SECRET` | Secret key for Payload auth (min 32 chars in prod) | Yes |
| `NEXT_PUBLIC_SERVER_URL` | Public URL of this CMS (e.g. https://cms.zunkireelabs.com) | Yes |
| `REVALIDATE_URL` | URL of the website to revalidate after content changes | No |
| `REVALIDATE_SECRET` | Shared secret for on-demand revalidation | No |
| `POSTGRES_PASSWORD` | Password for the production Postgres container | Yes (prod) |

## Production Deployment (VPS)

### 1. Clone the repo on the VPS
```bash
git clone <repo-url> /opt/zun-cms
cd /opt/zun-cms
```

### 2. Create production `.env`
```bash
cp .env.example .env
# Set: DATABASE_URI, PAYLOAD_SECRET, NEXT_PUBLIC_SERVER_URL, POSTGRES_PASSWORD
```

### 3. Set up nginx
Copy `nginx/cms.conf` to `/etc/nginx/sites-available/zun-cms` and enable it.
Run Certbot for HTTPS: `certbot --nginx -d cms.zunkireelabs.com`

### 4. Start services
```bash
docker compose up -d
```

### 5. Seed content on first deploy
```bash
# Copy cms-web-dev to the server OR run seed locally against prod DB
docker compose exec app node -e "require('./seed')"
# OR run locally: DATABASE_URI=<prod-db-url> pnpm seed
```

### Subsequent deploys
```bash
./deploy.sh
```

## Live Updates to Website

When content changes in the CMS admin, the website can be revalidated instantly.
Set `REVALIDATE_URL` and `REVALIDATE_SECRET` env vars to enable this.
The website must implement a `POST /api/revalidate` endpoint (separate project).

## Content Model

| Collection | Description |
|---|---|
| Ventures | The 7 CMS Group member companies |
| Brands | ~50 international brand partners |
| Product Domains | 14 product/trading domains |
| Sectors | 6 commercial sectors (healthcare, education, etc.) |
| Projects | 50+ completed projects |
| Leadership | Chairman + Directors |
| Testimonials | Client testimonial letters |
| Events | Newsroom events (training, partnership, CSR, etc.) |
| Certifications | Brand authorization certificates |
| Milestones | Company timeline milestones |
| Media | All uploaded images and videos |

**Global:** Site Config — contact info, address, social links.

## Troubleshooting

### `@next/env` version must match `next`

If you upgrade `next` to a new version, also bump `@next/env` in devDependencies to the same version. These must stay in sync.

Example: if you upgrade `next` to `15.5.0`, run:
```bash
pnpm add -D @next/env@15.5.0
```

Mismatched versions will cause build or startup errors that are hard to diagnose.
