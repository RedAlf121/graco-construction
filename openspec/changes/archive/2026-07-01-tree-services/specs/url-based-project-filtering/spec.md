## ADDED Requirements

### Requirement: Projects page reads `?category=` query param
The system SHALL read the `category` query parameter from the URL and use it to set the active category filter on the Projects page.

#### Scenario: Projects page filters by URL category
- **WHEN** the user navigates to `/projects?category=build-commercial`
- **THEN** the Projects page SHALL display projects under the "Build / Commercial" category
- **AND** the category tree in the Projects page SHALL highlight "Build / Commercial" as active

#### Scenario: No query param defaults to first category
- **WHEN** the user navigates to `/projects` without a `category` query param
- **THEN** the Projects page SHALL default to the first leaf category in the tree

#### Scenario: Query param changes update the filter
- **WHEN** the user navigates from `/projects?category=design-residential` to `/projects?category=build-commercial`
- **THEN** the Projects page SHALL update the displayed projects and active category accordingly

### Requirement: Parent categories aggregate child projects
The `useCategories` composable SHALL propagate project arrays from leaf nodes up to their parent nodes so that top-level categories (e.g., "design") contain all projects from their children.

#### Scenario: Parent node contains aggregated projects
- **WHEN** `useCategories` is called
- **THEN** each parent category node (level 1) SHALL have a `projects` array containing all projects from its descendant leaf nodes
