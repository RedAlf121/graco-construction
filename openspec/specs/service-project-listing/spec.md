## Purpose

Filtered project listing page at `/projects/service/:slug` showing projects matching a service category.

## Requirements

### Requirement: Project listing at /projects/service/:slug
The `/projects/service/:slug` page SHALL display a filtered list of projects from `projects.json` that match the service category mapped to the given slug.

#### Scenario: Page header and breadcrumb
- **WHEN** the user navigates to `/projects/service/new-construction`
- **THEN** the page SHALL display the gallery icon (from `galleries.json` matching the slug)
- **AND** the gallery service name as the page title
- **AND** a breadcrumb showing grandparent — parent (e.g., "Construction Management — Residential")
- **AND** a "Back to All Projects" link at the top navigating to `/projects`

#### Scenario: Project cards rendered for matching service
- **WHEN** a valid slug is provided
- **THEN** the page SHALL filter `projects.json` for projects whose `hierachy` matches the slug's mapped hierarchy
- **AND** render each matching project as a `ProjectCard` showing cover image, title, location, and service badge
- **AND** each `ProjectCard` SHALL link to `/projects/:id` for that project
- **AND** the grid SHALL use the responsive layout: 1 column mobile, 2 columns tablet, 3 columns desktop

#### Scenario: Invalid slug handling
- **WHEN** the user navigates to `/projects/service/invalid-slug`
- **THEN** the page SHALL display a "Service Not Found" message with a "Back to All Projects" link

#### Scenario: Project ordering
- **WHEN** projects are listed on the service page
- **THEN** they SHALL be ordered by `id` ascending

#### Scenario: SEO metadata
- **WHEN** the service listing page loads
- **THEN** the document title SHALL be `"<Service Name> — Graco Construction Group"`
- **AND** appropriate meta description SHALL be set

### Requirement: Slug-to-hierarchy mapping
The system SHALL define a mapping from URL slugs to project hierarchy filters:

| Slug | Hierarchy Filter |
|---|---|
| `new-construction` | `["Build", "Residential"]` |
| `renovation-projects` | `["Build", "Residential"]` |
| `general-commercial` | `["Build", "Commercial"]` |
| `concrete-restoration` | `["Build", "Commercial"]` |
