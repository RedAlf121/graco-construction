# Graco Construction Group

Corporate and portfolio website for **Graco Construction Group**, a Miami-based construction and design firm specializing in residential and commercial construction, Design & Build, renovation, concrete restoration, and waterproofing.

**Live site:** [graco-construction.vercel.app](https://graco-construction.vercel.app)

## Overview

The site presents the company's services and project portfolio through a fully static, content-driven Nuxt application. Its pages cover the firm, services, team, completed and active projects, and contact information.

## Features

- Multi-page Nuxt application with landing, about, services, projects, team, and contact sections
- Hierarchical service data for residential and commercial construction
- Project portfolio grouped by construction service
- Individual project detail pages with galleries
- Preconstruction management project filtering
- Static JSON data model with relational service, project, and gallery lookups
- Dark, responsive design optimized for desktop and mobile
- SEO-friendly Nuxt routing and server-side rendering

## Tech Stack

- [Nuxt 4](https://nuxt.com/) with SSR/SSG
- [Vue 3](https://vuejs.org/) and TypeScript
- [Vue Router](https://router.vuejs.org/) (via Nuxt)
- [Tailwind CSS](https://tailwindcss.com/) with `@nuxtjs/tailwindcss`
- Inter, Manrope, and Montserrat fonts
- Font Awesome 6
- Static JSON content
- npm

## Project Structure

```text
app/
├── app.vue          # Root application component
├── components/      # Header, hero, and feature sections
├── hooks/           # Relational JSON composables
└── pages/           # Application routes
assets/
├── css/             # Global styles
├── services.json    # Service hierarchy
├── projects.json    # Project records
└── galleries.json   # Project image galleries
public/              # Images, videos, and favicon
openspec/            # OpenSpec configuration
```

## Routes

| Route | Description |
| --- | --- |
| `/` | Home page |
| `/about` | About the company |
| `/services` | Construction services |
| `/services/[slug]/projects` | Projects for a specific service |
| `/projects` | Full project portfolio |
| `/projects/[id]` | Individual project details |
| `/team` | Team page |
| `/contact` | Contact information |

## Data Model

The content is stored in static JSON files and joined by composables in `app/hooks/`:

- `assets/services.json` defines the service tree and leaf services.
- `assets/projects.json` contains project details and references a leaf `serviceId`.
- `assets/galleries.json` provides a 4-image gallery for each project through `projectId`.

Key composables include:

- `useServices()` — service trees, flat lookups, paths, and routes
- `useProjects()` — project joins and filtering by service or category
- `useGalleries()` — gallery retrieval by project

## Getting Started

### Prerequisites

- Node.js 18 or later
- npm

### Install

```bash
npm install
```

### Development

```bash
npm run dev
```

The site will be available at `http://localhost:3000`.

### Production

Build the application:

```bash
npm run build
```

Preview the production build locally:

```bash
npm run preview
```

For additional Nuxt deployment options, see the [Nuxt deployment documentation](https://nuxt.com/docs/getting-started/deployment).

## Scripts

| Command | Purpose |
| --- | --- |
| `npm run dev` | Start the development server |
| `npm run build` | Generate the production build |
| `npm run preview` | Preview the production build locally |
| `npm run generate` | Generate a static site |

## Content and Design Conventions

- Vue components use `<script setup lang="ts">` and Composition API conventions.
- Component filenames use PascalCase.
- Tailwind utilities are preferred; complex custom styling belongs in `assets/css/global.css`.
- The application uses a class-based, dark-first theme.
- Primary brand color: `#FF9F0A`
- Secondary brand color: `#0A84FF`
- Accent brand color: `#30D158`

## Deployment

The current deployment target is Vercel:

- **Production URL:** [graco-construction.vercel.app](https://graco-construction.vercel.app)
- **Deployment branch:** `deploy/vercel`
