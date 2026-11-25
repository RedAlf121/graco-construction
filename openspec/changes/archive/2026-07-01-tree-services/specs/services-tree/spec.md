## ADDED Requirements

### Requirement: Services page shows horizontal category tree
The system SHALL render the Services page as a horizontal tree with two side-by-side columns (Design, Build) sourced from `categories.json`.

#### Scenario: Tree displays two top-level columns
- **WHEN** the user visits `/services`
- **THEN** the page SHALL display a "Design" column and a "Build" column side by side on desktop (stacked on mobile)
- **AND** each column SHALL show its level-2 children (Residential, Commercial) with icons
- **AND** the Commercial nodes SHALL list their specialties as sub-items

#### Scenario: Each tree node links to filtered projects
- **WHEN** the user clicks any category node (e.g., "Residential" under "Design")
- **THEN** the browser SHALL navigate to `/projects?category=design-residential`
- **AND** the links SHALL use NuxtLink for client-side navigation

### Requirement: Category tree replaces flat service grid
The flat 6-card service grid SHALL be removed and replaced by the category tree.

#### Scenario: Flat grid no longer renders
- **WHEN** the user visits `/services`
- **THEN** the page SHALL NOT render the previous 6-card grid
- **AND** it SHALL render the horizontal category tree instead
