# Félicien Mukamba — Portfolio

Personal site of Félicien Mukamba, software engineer, AI engineer and founder of SOSIDE.
Statically generated in English, French and Lingala.

**Stack:** Next.js 16 (App Router) · React 19 · TypeScript · Tailwind CSS 4 · Framer Motion · React Three Fiber · @react-pdf/renderer

## Getting started

```bash
npm install
npm run dev
```

Open http://localhost:3000. You are redirected to `/en`, `/fr` or `/ln` based on your browser language (or your last choice, stored in the `NEXT_LOCALE` cookie).

| Script              | What it does                          |
| ------------------- | ------------------------------------- |
| `npm run dev`       | Development server                    |
| `npm run build`     | Production build (type-checks too)    |
| `npm run start`     | Serve the production build            |
| `npm run typecheck` | TypeScript only                       |

## Deploying

Set `NEXT_PUBLIC_SITE_URL` to the public domain (e.g. `https://felicienmukamba.com`). It drives canonical URLs, `hreflang`, the sitemap, Open Graph images and JSON-LD.
On Vercel, the production domain is picked up automatically if the variable is not set.

## Editing content

| What                                     | Where                                         |
| ---------------------------------------- | --------------------------------------------- |
| All copy, per language                   | `lib/dictionaries/{en,fr,ln}.ts`              |
| Links, contact details, social profiles  | `lib/site.ts` → `site`                        |
| Projects (stack, stats, links, covers)   | `lib/site.ts` → `projects`                    |
| Companies and stacks per job             | `lib/site.ts` → `experience`                  |
| Scrolling technology list                | `lib/site.ts` → `stack`                       |

`en.ts` is the source of truth for the shape of a dictionary: TypeScript fails the build if a key is missing in another language.
The downloadable CV (`components/cv-pdf.tsx`) is generated in the browser from the same dictionaries, so the site and the CV never drift apart.

To add project screenshots, drop 16:10 images in `public/images/projects/` and list them in `screenshots` on the project in `lib/site.ts` (`kind` picks the translated thumbnail label: `landing`, `dashboard`, `pos` or `login`). Several screenshots get a thumbnail switcher. Projects without screenshots get a drawn cover (`components/project-cover.tsx`).

## Structure

```
app/
  [lang]/layout.tsx         Root layout: fonts, theme, metadata, hreflang, JSON-LD
  [lang]/page.tsx           The one-page site
  [lang]/opengraph-image.tsx  Social share image per language
  sitemap.ts, robots.ts, manifest.ts, icon.svg, apple-icon.png
  global-not-found.tsx      404 for unknown URLs
components/
  sections/                 Hero, About, AI, Experience, Projects, Skills, Education, Contact, Footer
  agent-network.tsx         Three.js "agent network" behind the portrait
  site-header.tsx           Navigation, language switch, theme toggle, mobile drawer
  cv-pdf.tsx                PDF résumé, built on demand
lib/
  dictionaries/             Translations
  i18n.ts                   Locales
  site.ts                   Language-independent data
proxy.ts                    Redirects `/` to the visitor's language
```

## Private portal (`/portal`)

A password-protected area with the **CV studio**: pick a profile (Big Tech, AI Engineer, Project Manager, Startup, NGO — IT & digital transformation, NGO — Data / M&E…), switch language, then edit everything — layout (modern, classic ATS, coloured sidebar), accent colour, photo, sections and their order, every experience bullet, projects, skills, references. It also scores a pasted job offer against the CV, ranks the profiles for that offer, saves named versions in the browser and exports PDF, JSON or plain text.

| What                         | Where                                      |
| ---------------------------- | ------------------------------------------ |
| CV profiles (hard-coded)     | `lib/portal/profiles.ts`                   |
| Account name + password hash | `lib/portal/credentials.ts`                |
| CV model / PDF templates     | `lib/cv/*`, `components/cv-pdf.tsx`        |
| Studio UI                    | `components/portal/cv-studio.tsx`          |

### Setting it up

1. Set the password (stores only a scrypt hash in `lib/portal/credentials.ts`):

   ```bash
   npm run portal:password
   ```

2. In production, add a `PORTAL_SECRET` environment variable (32+ random characters, e.g. `openssl rand -hex 32`). It signs the session cookie; without it the portal refuses logins.
3. Optional: set `PORTAL_PASSWORD_HASH` in the environment instead of committing the hash (`npm run portal:password -- --print`).

Sessions last 7 days. Every portal page is `noindex`, `no-store`, checked in `proxy.ts` and again in the layout. References' contact details are only ever stored in the browser (studio versions), never in the repository.

## Lab (`/[lang]/lab`)

Public tools, all running client-side:

- **Brand kit & marketplace** — logo + colours → brand chart, tints, WCAG checks, design tokens (CSS / Tailwind / JSON), 14 marketplace/social/print visuals (PNG, JPG, WebP at 1–3×, or SVG), and seeded demo catalogue data (JSON, CSV, SQL).
- **SVG generator** — blobs (filled, outlined or morphing), waves, patterns (+ CSS background), mesh gradients, Bauhaus grids, topographic contours.
- **Motion toolkit** — draggable cubic-Bézier editor, spring simulator with CSS `linear()` export, keyframe builder with stagger, intensity and direction.
- **Design utilities** — harmonies and 50–950 scales, contrast checker with auto-fix and colour-blindness simulation, layered shadows, gradients, fluid type scale, glassmorphism.

UI strings live in `lib/lab/i18n.ts` (Lingala reuses French).
