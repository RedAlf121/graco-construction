## ADDED Requirements

### Requirement: Homepage shows Services Preview section
The system SHALL display a Services Preview section on the homepage with two top-level category cards (Design, Build) that link to their respective filtered project views.

#### Scenario: Services Preview renders after Hero
- **WHEN** the home page loads
- **THEN** the page SHALL display a section with "Our Expertise" heading
- **AND** it SHALL show two cards: "Design" with an icon and "Build" with an icon
- **AND** each card SHALL display an "Explore" link

#### Scenario: Explore links navigate to filtered projects
- **WHEN** the user clicks the Design card or its "Explore" link
- **THEN** the browser SHALL navigate to `/projects?category=design`
- **WHEN** the user clicks the Build card or its "Explore" link
- **THEN** the browser SHALL navigate to `/projects?category=build`
