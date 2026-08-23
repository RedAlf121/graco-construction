## ADDED Requirements

### Requirement: Section displays full-bleed video background
The CompanyDescription section SHALL display a looping muted autoplay video as a full-width background behind the section content.

#### Scenario: Video plays on page load
- **WHEN** the user scrolls to the CompanyDescription section
- **THEN** the timelapse video SHALL be playing, muted, and looping

#### Scenario: Video autoplay blocked
- **WHEN** the user's browser blocks video autoplay
- **THEN** a dark fallback background SHALL be visible instead of a blank area

### Requirement: Video is dimmed for text readability
The video SHALL be visually dimmed so that overlaid text remains readable.

#### Scenario: Video brightness is reduced
- **WHEN** the video is playing
- **THEN** it SHALL have brightness reduced to approximately 30% of its original

#### Scenario: Gradient overlay aids readability
- **WHEN** the section is rendered
- **THEN** a semi-transparent gradient overlay SHALL be layered between the video and the content

### Requirement: Asymmetric clip-path window
The section SHALL be bounded by an asymmetric clip-path polygon for a dynamic angled appearance.

#### Scenario: Desktop clip-path is applied
- **WHEN** the viewport is 768px or wider
- **THEN** the section SHALL use `polygon(0 8%, 100% 0%, 100% 92%, 0 100%)`

#### Scenario: Mobile clip-path is gentler
- **WHEN** the viewport is narrower than 768px
- **THEN** the clip-path SHALL use a milder version: `polygon(0 4%, 100% 1%, 100% 96%, 0 99%)`

### Requirement: Parallax scroll effect on desktop
The video layer SHALL move at a different speed than the scroll on desktop for a parallax depth effect.

#### Scenario: Parallax translates video on scroll
- **WHEN** the user scrolls while the section is in view on a desktop viewport
- **THEN** the video layer SHALL translate vertically at approximately 30% of the scroll speed

#### Scenario: No parallax on mobile
- **WHEN** the viewport is narrower than 768px
- **THEN** the parallax effect SHALL be disabled

### Requirement: Section content is centered over video
The SectionHeader ("Design. Build. Deliver.") and StatCards SHALL remain centered and readable over the video background.

#### Scenario: Content overlays video correctly
- **WHEN** the section is rendered
- **THEN** the SectionHeader and StatCards SHALL appear centered within the clip-path window, above the video and overlay layers

#### Scenario: Cards animate on scroll
- **WHEN** the section enters the viewport
- **THEN** the StatCards SHALL animate in with `animate-fadeInUp` at staggered delays (existing behavior preserved)
