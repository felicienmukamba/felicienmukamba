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
