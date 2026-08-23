## ADDED Requirements

### Requirement: Home page displays full services section
The home page SHALL display a services section titled "Our Services" with subtitle "Explore our expertise by category", showing two columns (Residential and Commercial) with sub-service items under each.

#### Scenario: Services section renders on home page
- **WHEN** a user visits the home page
- **THEN** they see a services section with two columns (Residential, Commercial) between the ProjectsPreview and CompanyDescription sections

#### Scenario: Residential column shows correct sub-items
- **WHEN** the services section is rendered
- **THEN** the Residential column SHALL contain "New Construction" and "Renovation" as linked sub-items

#### Scenario: Commercial column shows correct sub-items
- **WHEN** the services section is rendered
- **THEN** the Commercial column SHALL contain "General Commercial", "Concrete Restoration & Waterproofing", "Medical Facilities", "40 Year Recertification", and "Low Income Capital Improvement" as sub-items

#### Scenario: Sub-items link to filtered project pages
- **WHEN** a user clicks a sub-service item
- **THEN** they are navigated to `/projects?category=<category-id>` where the project list is filtered to that category

#### Scenario: Section matches dark theme styling
- **WHEN** the services section is rendered
- **THEN** it SHALL use the same dark theme styling (bg-background-tertiary cards, white text, primary/10 icon backgrounds, white/80 label text) as the existing Services component

### Requirement: ServicesPreview component is removed
The `ServicesPreview.vue` component SHALL be deleted and no longer rendered on any page.

#### Scenario: No "Our Expertise" section on home page
- **WHEN** a user visits the home page
- **THEN** there SHALL be no section with the title "Our Expertise"

#### Scenario: ServicesPreview file no longer exists
- **WHEN** the codebase is inspected
- **THEN** the file `app/components/sections/home/ServicesPreview.vue` SHALL not exist

### Requirement: /services page is removed
The standalone `/services` page SHALL be deleted and return a 404.

#### Scenario: /services URL returns 404
- **WHEN** a user navigates to `/services`
- **THEN** they SHALL see a 404 page
