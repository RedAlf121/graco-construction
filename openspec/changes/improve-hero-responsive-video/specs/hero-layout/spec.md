# Hero Layout — Delta Spec

Affected components: `app/components/hero/Hero.vue`, `app/components/hero/TextWithVideo.vue`, `app/pages/index.vue`, `assets/css/global.css`.
Data flow: props only (`Hero → TextWithVideo → BackgroundVideo`); no JSON/composables involved.
Breakpoints: 850px (nav switch, also mobile video source selection), 1024px (layout), Tailwind `md` 768px / `lg` 1024px / `xl` 1280px for logo sizing.

## ADDED Requirements

### Requirement: Content-driven vertical Hero layout
The Hero SHALL lay out logo, title, and CTA in a single centered flex column with `gap`, and SHALL NOT position them with absolute per-breakpoint top/bottom offsets.

#### Scenario: Mobile portrait (360×800)
- **WHEN** the home page renders at 360×800
- **THEN** logo, title, and CTA SHALL appear stacked, centered, fully visible, with no overlap
- **AND** the title SHALL fit within the viewport width without horizontal clipping

#### Scenario: Desktop (1920×1080)
- **WHEN** the home page renders at 1920×1080
- **THEN** the column SHALL be vertically and horizontally centered within the Hero
- **AND** spacing between elements SHALL come from `gap`, not fixed offsets

#### Scenario: Mobile landscape (800×360)
- **WHEN** the home page renders at 800×360
- **THEN** no element SHALL overlap another
- **AND** content SHALL remain reachable by scrolling within the snap section

### Requirement: Small-viewport height units
The Hero SHALL use `min-h-svh` with a `min-h-screen` fallback, and the homepage `.snap-container` SHALL use `100dvh` with a `100vh` fallback, so mobile browser chrome never hides anchored content.

#### Scenario: Mobile with URL bar visible
- **WHEN** the page loads on a mobile browser with the URL bar expanded
- **THEN** the CTA SHALL be visible without scrolling
- **AND** the Hero SHALL NOT extend below the visible viewport due to 100vh sizing

#### Scenario: Snap container matches visible viewport
- **WHEN** the homepage scroller is measured on mobile
- **THEN** `.snap-container` height SHALL equal the dynamic viewport height (`100dvh`)

### Requirement: Fixed-header clearance without magic offsets
Hero content SHALL clear the fixed header using `padding-top` derived from `--header-height` (120px desktop, 60px ≤850px), and `app/pages/index.vue` SHALL NOT apply `mt-24` to the Hero.

#### Scenario: Desktop header clearance
- **WHEN** the home page renders above 850px width
- **THEN** the logo SHALL start below the fixed header with no overlap

#### Scenario: Mobile header clearance
- **WHEN** the home page renders at ≤850px width
- **THEN** the logo SHALL start below the 60px mobile header with no overlap

### Requirement: Server-rendered accessible heading
The Hero SHALL render a real `<h1>` with the text "BUILT TO DELIVER" in the initial SSR HTML, styled with `font-montserrat` and CSS `clamp()` sizing that scales with viewport width.

#### Scenario: Heading present without JavaScript
- **WHEN** the home page HTML is fetched without executing JavaScript
- **THEN** the response SHALL contain an `<h1>` with "BUILT TO DELIVER"

#### Scenario: Title scales with width
- **WHEN** the viewport width changes from 360px to 1920px
- **THEN** the title font size SHALL follow `clamp(2.5rem, 8vw, 6rem)`
- **AND** the title SHALL NOT be cropped by any SVG viewBox behavior

### Requirement: Hero fills its snap section
The Hero SHALL stretch to the full height of its `.snap-section` wrapper (flex column parent + `flex-1`), keeping scroll-snap alignment correct.

#### Scenario: Snap alignment on homepage
- **WHEN** the user scrolls the homepage through sections
- **THEN** the Hero SHALL snap to the top with `scroll-padding-top: var(--header-height)` respected
- **AND** there SHALL be no dead gap between Hero bottom and the next snap section
