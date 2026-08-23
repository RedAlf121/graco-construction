# Graco Construction Group — Website

## Project Description
Corporate/portfolio website for **Graco Construction Group**, a construction and design firm based in Miami, Florida. Specializes in residential and commercial construction, Design & Build, renovation, concrete restoration, and waterproofing.

## Tech Stack
- **Framework:** Nuxt 4 (`^4.2.2`) — SSR/SSG
- **Language:** TypeScript
- **UI:** Vue 3 (`^3.5.26`) + vue-router (`^4.6.4`)
- **CSS:** Tailwind CSS v3 (via `@nuxtjs/tailwindcss ^6.14.0`)
- **Fonts:** Inter, Manrope, Montserrat (Google Fonts via CDN)
- **Icons:** Font Awesome 6.4.0 (CDN)
- **Package manager:** npm

## Code Conventions
- **Components:** Vue 3 `<script setup lang="ts">`, Composition API, PascalCase filenames
- **Styles:** Tailwind utility classes preferred. Custom CSS only for complex animations or overrides in `assets/css/global.css`
- **Dark mode:** `class`-based strategy — no `dark:` prefix needed (default is dark)
- **State:** Local state with `ref`/`reactive`. No Pinia or global store yet
- **Data:** Static JSON loaded via composables in `app/hooks/`

## Design Tokens (tailwind.config.js)
- **Primary:** `#FF9F0A` (orange), `#0A84FF` (secondary blue), `#30D158` (accent green)
- **Grays:** `gray-1` (#8E8E93) through `gray-6` (#1C1C1E), backgrounds `primary` (#000) / `secondary` (#1C1C1E) / `tertiary` (#2C2C2E)
- **Fonts:** `font-sans` (Inter headings), `font-manrope` (body), `font-montserrat` (decorative/accents)
- **Shadows:** `shadow-3d`, `shadow-button-primary`, `shadow-button-secondary` (3D press effects)
- **Animations:** `animate-fadeInUp`, `animate-scrollFilm1/2/3` (infinite film reels)
- **Border radius:** `rounded-sm` (12px), `rounded-md` (18px), `rounded-lg` (24px), `rounded-xl` (30px)
- **Spacing:** 4px base (`space-1` = 4px, `space-2` = 8px, etc.)

## Project Structure
- `app/` — Main application source (Nuxt 4 app directory convention)
- `app/app.vue` — Root component assembling all sections
- `app/components/` — Vue components by feature (header, hero, sections)
- `app/hooks/` — Composables (useServices, useProjects, useGalleries)
- `assets/` — CSS global, static JSON data (services, projects, galleries)
- `public/` — Images, videos, favicon
- `openspec/` — OpenSpec configuration

## Data Flow (relational JSON model)
- `assets/services.json` — Service tree. Nodes: `id`, `slug`, `name`, `icon`, optional `category` (`residential`/`commercial`) and `children`. Leaf services: preconstruction-management, new-construction, renovation-projects, general-commercial, medical-facilities, concrete-restoration
- `assets/projects.json` — 20 real projects. Each: `id`, `name`, `serviceId` (FK → services leaf id), `includesPreConstruction` (bool), `location`, `year`, `description`, `coverImage` (full path), `status` (`completed`/`in-progress`/`planned`)
- `assets/galleries.json` — One gallery per project: `id`, `projectId` (FK → projects id), `images[]` (4 full paths each). 1:1 with projects
- `assets/categories.json` — REMOVED (redundant; hierarchy lives in services.json)
- Composables parse JSON and expose relational lookups:
  - `useServices()` → `servicesTree`, `servicesFlat` (by id or slug), `getLeafServices()`, `getServicePath()`, `getServiceHref()`
  - `useProjects()` → `projects` (auto-joined `service` + `gallery`), `getById()`, `getByService()` (id or slug), `getByCategory()`, `getWithPreConstruction()`
  - `useGalleries()` → `galleries`, `getByProjectId()`
- No API, no backend — all static

## Current State
Multi-page Nuxt app with `app/pages/` directory (`/`, `/about`, `/services`, `/projects`, `/team`, `/contact`, `/projects/:id`, `/services/:slug/projects`). Projects are real (mocked) jobs grouped by service under the "Construction Management" umbrella; each project may optionally include Preconstruction Management (`includesPreConstruction`). All data from relational JSON files in `assets/`. No backend, no API, no authentication. Dark theme throughout.

## Routing Notes
- Service pages live at `/services/[slug]/projects` (e.g., `/services/medical-facilities/projects`)
- Individual projects at `/projects/[id]`
- Preconstruction Management is a leaf service with no projects (filtered out of the Projects section)

## Vision (from request.md)
Full platform with:
- **Team roles:** Owner/Client, Designers (Architecture, MEP, Civil, Structure), Contractor (PM, Field Supervisor, Accounting), Subcontractors (Shell, Mechanical, Electrical, Plumbing, Roof, Specialty)
- **Project pages:** Public sees active project photos; team members can interact, upload/download documents, receive notifications
- **Client communication:** Change requests via the site → notifies team
- **Accounting:** Direct link to QuickBooks for invoicing and subcontractor payments
- **Design partners:** Links to partner design firms
- **Services:** Design and Build subdivided into Commercial and Residential

## Priority
1. **Landing page first** (home, about us, services, contact) — SEO/GEO optimized
2. Other sections/pages come after

## Design References
- https://chglobalconstruction.com/commercial
- https://studdesigns.com/
- https://www.chconstruct.com/

## Pages (multi-page architecture)
Each nav link points to its own Nuxt page, NOT a section within the same page:
- `/` — Home (Hero + process overview)
- `/about` — About Us (company history and values)
- `/services` — Services (Preconstruction Management, Construction Management, Residential, Commercial)
- `/projects` — Projects (portfolio gallery)
- `/team` — Team (member profiles)
- `/contact` — Contact (form + social links)
- `/projects/:id` — Individual project page (gallery + details)
- `/services/:slug/projects` — Projects grouped by service
- **Internationalization (i18n)** — Spanish/English support planned for the future

## Performance & SEO
- SSR/SSG via Nuxt 4 for fast initial load and crawlability
- Meta tags, Open Graph, Twitter Cards configured in `nuxt.config.ts`
- Use `nuxt generate` for fully static output
- Lazy load images below the fold (native `loading="lazy"`)
- Keep bundle size in check — avoid heavy dependencies

## Accessibility
- Semantic HTML (`<main>`, `<section>`, `<nav>`, `<footer>`, headings hierarchy)
- `alt` text on all images
- Focus management for modals and mobile menus
- Sufficient color contrast (dark theme with light text)

## Commands
```bash
npm run dev      # Development server
npm run build    # Production build
npm run generate # Static site generation
npm run preview  # Preview production build
```
