# Al-Ghani Developers — Premium Next.js Rebuild

A production-ready Next.js 15 rebuild of **https://www.alghani.com.pk** that preserves the original company content, imagery, project pages, blogs, and contact information while redesigning the frontend into a premium 2026 corporate experience.

## Stack

- Next.js 15 App Router
- TypeScript
- Tailwind CSS
- Shadcn-style UI primitives
- Framer Motion
- Lucide Icons
- Static SEO metadata + structured data
- Self-hosted media in `/public/media`

## What is included

- Full responsive rebuild with sticky navigation and premium visual system
- Recreated public pages from the original sitemap
- Dynamic top-level route handling for projects and blog posts
- XML sitemap generation
- `robots.txt`
- Open Graph and Twitter metadata
- Organization, Breadcrumb, Local Business, Product, and BlogPosting schema where applicable
- Reusable component architecture under `src/components/*`
- Crawled content dataset under `src/constants/site-content.json`
- Discovery document under `docs/discovery.md`

## Local development

```bash
npm install
npm run dev
```

Open `http://localhost:3000`

## Production build

```bash
npm run lint
npm run build
npm run start
```

## Environment variables

Create `.env.local` if you want a custom canonical domain:

```bash
NEXT_PUBLIC_SITE_URL=https://your-domain.com
```

A starter file is available in `.env.example`.

## Project structure

```text
src/
├── app/
├── components/
│   ├── layout/
│   ├── sections/
│   ├── shared/
│   └── ui/
├── constants/
├── hooks/
├── lib/
├── services/
├── styles/
└── types/
```

## Content pipeline

The live website was crawled and normalized into a local dataset.

- `scripts/scrape_alghani.py` downloads page content and media assets
- `src/constants/site-content.json` stores normalized content records
- `src/constants/site-map.json` stores route metadata used by the sitemap and static generation

If you want to refresh the content from the live site:

```bash
python3 scripts/scrape_alghani.py
```

## Media strategy

All downloaded website media is self-hosted in `public/media/...` to support portable deployment and avoid runtime dependency on the legacy WordPress site.

## Deployment on Vercel

1. Push the repository to GitHub
2. Import the repository into Vercel
3. Set `NEXT_PUBLIC_SITE_URL` to your production domain
4. Deploy

Recommended Vercel settings:

- Framework Preset: Next.js
- Node.js version: default latest supported by Vercel for Next.js 15
- Build command: `npm run build`
- Output: `.next`

## Git workflow suggestion

```bash
git init
git add .
git commit -m "feat: rebuild al-ghani website in next.js"
git remote add origin <your-github-repo-url>
git push -u origin main
```

## Notes

- This rebuild focuses on public-facing pages and preserves original public text and media gathered from the live site.
- The WooCommerce/My Account page is preserved as a basic page route because the legacy backend/account system was not recreated in this static-first frontend rebuild.
- Lighthouse scores can vary depending on hosting, image compression, and runtime CDN behavior.
