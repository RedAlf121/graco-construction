## ADDED Requirements

### Requirement: Carousel adjusts visible cards by viewport
The system SHALL display 3 featured project cards simultaneously on large viewports (≥1024px), 2 cards on medium viewports (≥768px), and 1 card on small viewports (<768px). Each card SHALL occupy equal width (33.333%, 50%, or 100% of the viewport respectively).

#### Scenario: Three cards on desktop
- **WHEN** viewport width is ≥1024px
- **THEN** exactly 3 project cards are visible, each at 33.333% width

#### Scenario: Two cards on tablet
- **WHEN** viewport width is ≥768px and <1024px
- **THEN** exactly 2 project cards are visible, each at 50% width

#### Scenario: One card on mobile
- **WHEN** viewport width is <768px
- **THEN** exactly 1 project card is visible at 100% width

#### Scenario: Cards are equally sized
- **WHEN** the carousel is rendered
- **THEN** each card has equal width based on the current viewport breakpoint

### Requirement: Carousel scrolls page-by-page matching visible cards
The system SHALL scroll the same number of cards visible at the current breakpoint (3 on desktop, 2 on tablet, 1 on mobile) when navigating, so each navigation action shows a completely new set of projects. Navigation SHALL snap to page boundaries.

#### Scenario: Next shows next group
- **WHEN** user clicks the next button
- **THEN** the carousel slides to show the next group of projects (3 on desktop, 2 on tablet, 1 on mobile)

#### Scenario: Previous shows previous group
- **WHEN** user clicks the previous button
- **THEN** the carousel slides to show the previous group of projects (3 on desktop, 2 on tablet, 1 on mobile)

### Requirement: Cards re-render on viewport change
When the viewport crosses a breakpoint threshold (768px or 1024px), Embla SHALL reinitialize with the new `slidesToScroll` value matching the visible card count. The carousel SHALL maintain its current position when possible.

#### Scenario: Resize from mobile to tablet
- **WHEN** viewport is resized from <768px to ≥768px
- **THEN** the carousel reinitializes to show 2 cards per view with `slidesToScroll: 2`

### Requirement: Infinite loop wrapping
The carousel SHALL wrap infinitely. After the last page, navigating forward SHALL return to the first page. After the first page, navigating backward SHALL go to the last page.

#### Scenario: Forward from last page wraps to first
- **WHEN** user clicks next on the last page of projects
- **THEN** the carousel wraps to the first page

#### Scenario: Backward from first page wraps to last
- **WHEN** user clicks previous on the first page of projects
- **THEN** the carousel wraps to the last page

### Requirement: Autoplay with 4-second interval
The system SHALL automatically advance to the next page every 4 seconds. Autoplay SHALL pause when the user interacts with the carousel (clicks a navigation button or dot).

#### Scenario: Autoplay advances automatically
- **WHEN** 4 seconds pass without user interaction
- **THEN** the carousel auto-advances to the next page

#### Scenario: Autoplay stops on user interaction
- **WHEN** user clicks a navigation button or dot indicator
- **THEN** autoplay pauses and does not resume

### Requirement: Previous and next arrow buttons
The carousel SHALL have previous and next buttons positioned absolutely on the left and right edges of the carousel. Buttons SHALL use SVG chevron icons, have a semi-transparent dark background (`bg-black/50`), and lighten on hover (`bg-black/70`). Each button SHALL have a screen-reader label.

#### Scenario: Buttons are visible
- **WHEN** the carousel is rendered
- **THEN** previous and next arrow buttons are displayed on the left and right edges

#### Scenario: Button hover effect
- **WHEN** user hovers over a navigation button
- **THEN** the background changes from `bg-black/50` to `bg-black/70`

### Requirement: Dot page indicators
The carousel SHALL display dot indicators below the carousel showing the current page position. Each dot SHALL be an 8px square. The active dot SHALL use `bg-[#FF9F0A]` with `w-4` width. Inactive dots SHALL use `bg-white/30`. Clicking a dot SHALL navigate to that page. Dots SHALL be hidden when there is only 1 page.

#### Scenario: Dots reflect current page
- **WHEN** the carousel is on page 2
- **THEN** the second dot is highlighted with `bg-[#FF9F0A]` and `w-4`

#### Scenario: Clicking a dot navigates
- **WHEN** user clicks the third dot indicator
- **THEN** the carousel navigates to page 3

#### Scenario: Dots hidden for single page
- **WHEN** there is only 1 page of projects (3 or fewer)
- **THEN** dot indicators are hidden

### Requirement: Data is an inline editable array
Featured project data SHALL be defined as a local `const` array in `ProjectsPreview.vue` using the interface `{ title: string; image: string; service: string }`. No `id` field is required. Adding a new project SHALL only require adding a new object to the array.

#### Scenario: Adding a project
- **WHEN** a new object is added to the `featuredProjects` array
- **THEN** the carousel renders the new project in the next available card position

### Requirement: Unchanged card component
`ProjectPreviewCard.vue` SHALL remain unchanged. The carousel SHALL render the same `ProjectPreviewCard` component for each project, passing `project` as a prop.

#### Scenario: Cards render with tilt and overlay
- **WHEN** the carousel renders a project card
- **THEN** the card includes the 3D tilt effect, hover overlay with gradient, service label, and title exactly as in the current implementation
