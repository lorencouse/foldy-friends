# Foldy Friends

A small online shop for origami paper, glue and 3D paper animal kits, built as a
portfolio project. Shoppers can browse, sign up, review products and place demo
orders; an admin can edit the catalogue and upload photos. No payments are taken.

Live: https://www.foldyfriends.com

## Stack

- **Next.js 16** (App Router, Cache Components, Partial Prefetching), React 19, TypeScript
- **Postgres** with **Drizzle ORM**; migrations in `drizzle/`
- **Better Auth** (email and password, admin role)
- **Tailwind CSS 4**, self-hosted Switzer font, product pictures drawn as SVG
- **Biome** for lint and format, **Playwright** for end-to-end tests
- Deployed as a Docker image (Next.js standalone output) on Coolify

## Run it locally

Needs Node 24+ and Docker.

```bash
cp .env.example .env            # then set BETTER_AUTH_SECRET (openssl rand -hex 32)
docker compose up -d db         # Postgres on localhost:5433
npm install
npm run db:migrate && npm run db:seed
npm run dev                     # http://localhost:3000
```

To make someone an admin, have them sign up, then run
`npm run make-admin -- someone@example.com` (in production:
`node scripts/make-admin.ts someone@example.com` inside the container).
Admins see **Manage products** on their account page (`/admin`).

## Checks

```bash
npm run lint        # Biome
npm run typecheck
npm run build       # needs no database
npm run test:e2e    # Playwright; builds must exist and the database must be up
```

CI runs all of these on every pull request.

## How it fits together

- `app/page.tsx`: the home page. The left half stays fixed while the right half
  scrolls; the fold-a-dog panel is `components/folding-dog.tsx`.
- `app/(store)/`: shop, category and product pages, cart, checkout, sign-in,
  account and admin.
- `lib/catalog.ts`: cached catalogue reads (`"use cache"` with the `products` tag).
  Admin saves call `updateTag` so changes show at once.
- `lib/cart.ts`: the cart lives in the browser (localStorage). Checkout re-prices
  every line from the database.
- `components/product-art.tsx`: the drawn product pictures. Uploaded photos
  (served from `/media`, stored in `UPLOAD_DIR`) replace a drawing.

## Deploying (Coolify)

The `Dockerfile` builds a standalone server. On start the container runs the
migrations, seeds the starter catalogue into an empty database, then serves on
port 3000 with a health check at `/api/health`.

Environment: `DATABASE_URL`, `BETTER_AUTH_SECRET`, `BETTER_AUTH_URL` and
`SITE_URL` (the public address), optional `TRUSTED_ORIGINS`.
Mount a persistent volume at `/data/uploads` for uploaded photos.

Images are built on a developer machine, not on the server:
`COOLIFY_TOKEN=... scripts/deploy.sh` builds for arm64, copies the image to the
box's private registry, points the Coolify app at the new tag and redeploys.

## Credits

Folding diagrams from _Hiden Senbazuru Orikata_ (1797) by Shimokōbe Shūsui,
public domain, via The Metropolitan Museum of Art and Wikimedia Commons.
"Rotating origami icosahedron" by Dolev, CC BY-SA 3.0, via Wikimedia Commons.
Full list in `data/image-credits.json`.
