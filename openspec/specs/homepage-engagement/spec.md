# Homepage Engagement

## Purpose
Improve homepage engagement by adding a Company Description section with statistics and a Projects Preview section showcasing recent work.

## Requirements

### Requirement: Company Description section on home page
The system SHALL display a Company Description section on the home page with a tagline, company summary paragraph, and three statistic cards.

#### Scenario: Section renders with tagline and paragraph
- **WHEN** the home page loads
- **THEN** it SHALL show a tagline (e.g., "Built to Deliver") in large text
- **AND** it SHALL show a short paragraph describing the company's Florida presence since 2014 with 25+ years experience

#### Scenario: Three statistic cards display
- **WHEN** the Company Description section loads
- **THEN** it SHALL show three cards in a horizontal grid (1 col mobile, 3 col desktop)
- **AND** each card SHALL display an icon, a number/label (e.g., "25+", "Years Experience"), and use `animate-fadeInUp` with staggered delays

### Requirement: Projects Preview section on home page
The system SHALL display a Projects Preview section on the home page showing three project thumbnails and a CTA button linking to `/projects`.

#### Scenario: Three project thumbnails render
- **WHEN** the Projects Preview section loads
- **THEN** it SHALL display three project images in a responsive grid (1 col mobile, 3 col desktop)
- **AND** each thumbnail SHALL show the project title and use `loading="lazy"`

#### Scenario: CTA button navigates to projects page
- **WHEN** the user clicks "View All Projects" button
- **THEN** the browser SHALL navigate to `/projects` via client-side navigation (NuxtLink)
- **AND** the button SHALL use primary gradient styling with `shadow-button-primary`
