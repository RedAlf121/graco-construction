# Team & About Restructure

## Purpose
Restructure the About Us page to include team member cards and replace the standalone Team page with a Coming Soon placeholder.

## Requirements

### Requirement: Team member cards displayed on About Us page
The system SHALL display the six team member image cards on the About Us page below the differentiator cards section.

#### Scenario: Team section appears on About Us page
- **WHEN** the user visits `/about`
- **THEN** the page SHALL display a SectionHeader "Our Team" below the differentiators grid
- **AND** it SHALL show six team member cards using the existing TeamCard component
- **AND** cards SHALL be arranged in a responsive grid (1 col mobile, 2 col tablet, 3 col desktop)
- **AND** cards SHALL animate in with `animate-fadeInUp` and staggered delays

#### Scenario: Team cards show member images and names
- **WHEN** the About Us page loads
- **THEN** each team card SHALL display the member's image and name (alt text)
- **AND** images SHALL use `loading="lazy"`

### Requirement: /team page shows Coming Soon placeholder
The system SHALL replace the existing Team page content with a "Coming Soon" placeholder.

#### Scenario: Team page displays Coming Soon message
- **WHEN** the user visits `/team`
- **THEN** the page SHALL display a centered "Our Team" heading and "Coming Soon" message
- **AND** the page SHALL have a minimum height of 60vh for visual balance
