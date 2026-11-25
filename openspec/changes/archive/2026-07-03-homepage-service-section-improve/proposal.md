## Why

The "Our Services" section on the homepage is noticeably text-heavy compared to the visually rich sections around it (Hero with full-screen video, CompanyDescription with parallax video, Process with video cards, ProjectsPreview with images). This creates a flat spot in the visual narrative and misses an opportunity to communicate service authority. Improving typography hierarchy and adding subtle hover interactions will increase visual impact without changing the content or layout.

## What Changes

- Increase font sizes across all service cards (titles, body text, sub-headings, list items)
- Enlarge icon containers for stronger visual weight
- Replace minimal hover border effect with a raised card effect (scale + shadow + brighter border)

No content changes, no layout changes, no new capabilities.

## Capabilities

### New Capabilities

None — this is a visual polish change, no new capabilities are introduced.

### Modified Capabilities

None — no spec-level behavior changes, only presentation in the existing component.

## Impact

- **File modified**: `app/components/sections/services/Services.vue` — Tailwind class changes only
- **No new dependencies**, no API changes, no data structure changes
- **No dark mode implications** — already dark by default, all changes use existing design tokens
- **SSR/SSG safe** — purely presentational CSS changes
