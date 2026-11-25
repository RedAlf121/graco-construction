## ADDED Requirements

### Requirement: Services page exists at /services
The system SHALL serve a standalone Services page at the `/services` route listing the company's construction and design services.

#### Scenario: Page is accessible via navigation
- **WHEN** the user clicks "Services" in the navigation menu
- **THEN** the browser navigates to `/services`
- **AND** the `<title>` SHALL reflect the page name (e.g., "Services — Graco Construction Group")

#### Scenario: Service categories are listed
- **WHEN** the `/services` page loads
- **THEN** it SHALL display the following service categories:
  - Preconstruction Management
  - Construction Management
  - Residential (New Construction, Renovation)
  - Commercial (General Commercial, Concrete Restoration & Waterproofing)
- **AND** each category SHALL be presented as a card with icon, title, and description

#### Scenario: Responsive grid layout
- **WHEN** the `/services` page is displayed
- **THEN** cards SHALL be arranged in a responsive grid (1 col mobile, 2 col tablet, 3-4 col desktop)
