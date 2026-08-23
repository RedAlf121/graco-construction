## ADDED Requirements

### Requirement: Homepage sections snap into view on scroll
The homepage `<main>` element SHALL use `scroll-snap-type: y mandatory`. Each direct child section of `<main>` SHALL have `scroll-snap-align: start` or `scroll-snap-align: end` (for the footer).

#### Scenario: Scroll snap activates on desktop
- **WHEN** the user scrolls vertically on the homepage
- **THEN** each section snaps into full view, aligning its top edge with the top of the scroll container, minus `scroll-padding-top`

#### Scenario: Scroll snap activates on mobile
- **WHEN** the user swipes vertically on the homepage on a mobile device
- **THEN** each section snaps into view identically to desktop behavior

#### Scenario: Rapid multi-section scroll does not trap user
- **WHEN** the user scrolls rapidly (flick gesture) intending to skip multiple sections
- **THEN** the browser's natural momentum carries past multiple sections before snap engages

### Requirement: Each section is at least full viewport height
Every homepage section SHALL have `min-height: 100dvh` (with `100vh` fallback) so it occupies the full visible area when snapped.

#### Scenario: Section with content shorter than viewport
- **WHEN** a section's content is shorter than the viewport height
- **THEN** the section fills the full viewport height, with content vertically centered

#### Scenario: Section with content taller than viewport
- **WHEN** a section's content exceeds the viewport height (e.g., many cards on mobile)
- **THEN** the section expands beyond `100dvh` and content scrolls normally within the section

### Requirement: Snapped sections respect the fixed header
The scroll container SHALL use `scroll-padding-top` equal to the fixed header height (~120px desktop, ~60px mobile) so snapped content does not hide behind the header.

#### Scenario: Content visible at top of snapped section
- **WHEN** a section snaps into view
- **THEN** the section's top content appears below the fixed header, not behind it

### Requirement: Hero section keeps existing appearance
The Hero section SHALL maintain `scroll-snap-align: start` but SHALL NOT have `min-height: 100dvh` added (it already has `min-h-screen`). No entry animation SHALL be added to the Hero.

#### Scenario: Hero snap behavior
- **WHEN** the page loads
- **THEN** the Hero snaps to the top of the viewport as the first section
