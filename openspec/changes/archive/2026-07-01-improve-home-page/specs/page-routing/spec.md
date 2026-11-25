## ADDED Requirements

### Requirement: app.vue uses NuxtPage layout
The system SHALL use the standard Nuxt `<NuxtPage />` component in `app.vue` to render the current route's page, with `<Header>` and `<Footer>` wrapping all pages.

#### Scenario: app.vue renders as layout shell
- **WHEN** any page loads
- **THEN** `app/app.vue` SHALL contain `<Header>`, `<NuxtPage />`, and `<Footer>` in that order
- **AND** `app.vue` SHALL NOT directly render page-specific sections (Hero, Process, Projects, etc.)

### Requirement: Header uses NuxtLink for navigation
The system SHALL use `<NuxtLink>` components in the Header for client-side navigation between pages, replacing anchor `#` links and scroll-spy.

#### Scenario: Nav links navigate to pages
- **WHEN** the user clicks a nav link
- **THEN** the browser SHALL navigate to the corresponding page route without a full page reload
- **AND** the following routes SHALL be linked:
  - "Home" → `/`
  - "About Us" → `/about`
  - "Services" → `/services`
  - "Projects" → `/projects`
  - "Team" → `/team`
  - "Contact" → `/contact`

#### Scenario: Scroll-spy is removed
- **WHEN** the Header renders
- **THEN** it SHALL NOT use `IntersectionObserver` or any scroll-spy logic
- **AND** nav link active state SHALL be determined by vue-router's current route

### Requirement: Home page exists at /
The system SHALL serve the landing page at the `/` route with Hero and Process sections.

#### Scenario: Home page loads core content
- **WHEN** the user visits `/`
- **THEN** the Hero and Process sections SHALL render
- **AND** the page title SHALL be "Graco Construction Group — Construction & Design in Miami"

### Requirement: pages/ directory is configured
The system SHALL use Nuxt 4's `pages/` directory for file-based routing.

#### Scenario: Page files map to routes
- **WHEN** the user visits `/about`
- **THEN** `pages/about.vue` SHALL be rendered
- **WHEN** the user visits `/services`
- **THEN** `pages/services.vue` SHALL be rendered
- **WHEN** the user visits `/`
- **THEN** `pages/index.vue` SHALL be rendered
