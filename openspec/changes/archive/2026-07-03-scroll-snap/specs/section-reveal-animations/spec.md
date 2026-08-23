## ADDED Requirements

### Requirement: useInView composable detects section visibility
The system SHALL provide a `useInView` composable that accepts `threshold` (default 0.2) and `once` (default true) options. It SHALL return a template ref callback and a reactive `isVisible` boolean. When `once` is true, `isVisible` SHALL become true on first intersection and stay true permanently.

#### Scenario: Section enters viewport
- **WHEN** 20% or more of the observed element is visible within the viewport
- **THEN** `isVisible` becomes `true`

#### Scenario: Section leaves viewport (once: true)
- **WHEN** the observed element leaves the viewport and `once` is `true`
- **THEN** `isVisible` remains `true`

#### Scenario: Component unmounts
- **WHEN** the component using `useInView` unmounts
- **THEN** the IntersectionObserver SHALL be disconnected

### Requirement: ProjectsPreview cards animate on entry
Each `ProjectPreviewCard` in the `ProjectsPreview` section SHALL animate with `animate-fadeInUp` when the section becomes visible, with staggered delays of 0ms, 100ms, and 200ms per card.

#### Scenario: ProjectsPreview becomes visible
- **WHEN** the `ProjectsPreview` section enters the viewport
- **THEN** the `SectionHeader` animates in immediately, then each `ProjectPreviewCard` animates in sequentially with `animate-fadeInUp`

### Requirement: Services cards animate from opposite sides
The two service cards in the `Services` section SHALL animate from opposite horizontal directions: the first card slides in from the left (`animate-slideInLeft`), the second from the right (`animate-slideInRight`).

#### Scenario: Services section becomes visible
- **WHEN** the `Services` section enters the viewport
- **THEN** the `SectionHeader` fades in, the first service card slides in from the left, and the second service card slides in from the right

### Requirement: Process cards animate with scale effect
The three `ProcessCard` components SHALL animate with a scale-up effect (`animate-scaleIn`) when the section becomes visible, staggered at 100ms, 200ms, and 300ms.

#### Scenario: Process section becomes visible
- **WHEN** the `Process` section enters the viewport
- **THEN** the `SectionHeader` fades in, then each `ProcessCard` scales up sequentially

### Requirement: CompanyDescription stats animate on entry
The `StatCard` components in `CompanyDescription` SHALL animate with their existing `animate-fadeInUp` behavior but with corrected timing relative to the section's entry into the viewport (rather than on page load).

#### Scenario: CompanyDescription becomes visible
- **WHEN** the `CompanyDescription` section enters the viewport
- **THEN** the stat cards animate in with `animate-fadeInUp` staggered at 0ms, 100ms, 200ms

### Requirement: Animations do not replay
All entry animations SHALL fire once when the section first becomes visible and SHALL NOT replay if the user scrolls away and back.

#### Scenario: User scrolls past and returns to a section
- **WHEN** a user scrolls past a section (so it leaves the viewport) and then scrolls back to it
- **THEN** the animated elements remain in their final (animated) state and do not re-animate
