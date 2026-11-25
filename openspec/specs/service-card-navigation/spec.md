## Purpose

Service card grid on the `/projects` page for navigating to service-specific project listings.

## Requirements

### Requirement: Service card grid on /projects page
The `/projects` page SHALL render a grid of service cards organized under section headings, matching the visual pattern of the "Our Services" section on the homepage.

#### Scenario: Page layout structure
- **WHEN** the user navigates to `/projects`
- **THEN** the page SHALL display a `SectionHeader` with title "Our Projects"
- **AND** a "Preconstruction Management" h2 heading followed by a Coming Soon placeholder
- **AND** a "Construction Management" h2 heading
- **AND** under Construction Management, a "Residential" h3 sub-heading followed by two service cards: "New Construction" and "Renovation Projects"
- **AND** a "Commercial" h3 sub-heading followed by two service cards: "General Commercial" and "Concrete Restoration & Waterproofing"

#### Scenario: Coming Soon placeholder for Preconstruction Management
- **WHEN** the Preconstruction Management section renders
- **THEN** it SHALL display a centered "Coming Soon" message visually matching the Team page pattern (large heading + subdued subtitle)

#### Scenario: Service card rendering
- **WHEN** a service card renders
- **THEN** it SHALL display a background cover image from the corresponding gallery in `galleries.json`
- **AND** an icon overlay (Font Awesome class from the gallery entry)
- **AND** the service name as a title
- **AND** the photo count from the gallery entry
- **AND** the card SHALL use the `ServiceGalleryCard` component pattern with gradient overlay

#### Scenario: Service card navigation
- **WHEN** the user clicks a service card
- **THEN** the system SHALL navigate to `/projects/service/:slug` where `:slug` matches the corresponding gallery slug
- **AND** the card SHALL use a `NuxtLink` component for client-side navigation

#### Scenario: Card animation and hover effects
- **WHEN** a service card renders
- **THEN** it SHALL use the `animate-fadeInUp` animation class with staggered delays
- **AND** the card SHALL have a hover effect with `translate-y` and box-shadow transitions matching the existing `ServiceGalleryCard` styling
