## ADDED Requirements

### Requirement: Service card shows image with title and description
Each service card on the `/projects` page SHALL display an image, a title (the service name), and a short placeholder description below the image.

#### Scenario: Service card is rendered with all content
- **WHEN** the `/projects` page loads
- **THEN** each service card shows an image (aspect-video), a title in bold white text with the service icon, and a description line in muted white/60 text

### Requirement: Card layout uses two-column responsive grid
The service cards SHALL be displayed in a responsive grid: single column on mobile, two columns on desktop (`md:` breakpoint).

#### Scenario: Grid adapts to screen width
- **WHEN** viewing on a screen wider than 768px
- **THEN** cards are displayed in a 2-column grid with `gap-6`
- **WHEN** viewing on a screen narrower than 768px
- **THEN** cards are displayed in a single-column layout

### Requirement: Title field is correctly mapped
The card's title SHALL display the service name (gallery.service) instead of being undefined.

#### Scenario: Title renders correctly
- **WHEN** a service card renders
- **THEN** the title text matches the gallery's `service` property value
