## ADDED Requirements

### Requirement: About Us page exists at /about
The system SHALL serve a standalone About Us page at the `/about` route with the company's story, mission, and differentiators.

#### Scenario: Page is accessible via navigation
- **WHEN** the user clicks "About Us" in the navigation menu
- **THEN** the browser navigates to `/about`
- **AND** the `<title>` SHALL reflect the page name (e.g., "About Us — Graco Construction Group")

#### Scenario: Company description is displayed
- **WHEN** the `/about` page loads
- **THEN** it SHALL show a paragraph describing Graco Construction Group's presence in Florida since 2014 with over 25 years of professional experience
- **AND** it SHALL highlight the company's ethics-based client relationships and professionalism

#### Scenario: Key differentiators shown as cards
- **WHEN** the `/about` page loads
- **THEN** it SHALL display 4-6 differentiator cards (e.g., Experience, Quality, Ethics, Innovation, Client Satisfaction, Safety)
- **AND** each card SHALL include an icon (Font Awesome), a title, and a short description
- **AND** cards SHALL be arranged in a responsive grid (1 col mobile, 2 col tablet, 3 col desktop)

#### Scenario: Fade-in animation on scroll
- **WHEN** elements on the `/about` page enter the viewport
- **THEN** they SHALL animate in using `animate-fadeInUp` with staggered delays per card
