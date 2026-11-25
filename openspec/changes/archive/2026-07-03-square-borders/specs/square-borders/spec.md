## ADDED Requirements

### Requirement: Cards and containers SHALL have square corners

All card, container, and box elements that currently use `rounded-md`, `rounded-lg`, `rounded-xl`, `rounded-[18px]`, or `rounded-[30px]` SHALL use `rounded-none` instead.

The following components SHALL be changed to rectangular (zero border-radius):
- StatCard (tarjeta contenedor e icon wrapper)
- ProjectPreviewCard
- ProcessCard
- TeamCard
- ProjectCard
- ServiceGalleryCard
- Services cards and sub-list items
- AboutUs differentiator cards and icon wrappers
- ContactForm container, all inputs, select, textarea, submit button
- ModalGallery container, image, carousel nav buttons, dot indicators
- SocialMedia bar container
- ProjectsNav select dropdown

#### Scenario: StatCard renders with square corners

- **WHEN** StatCard component renders
- **THEN** the card container SHALL have `rounded-none`
- **AND** the icon wrapper SHALL have `rounded-none`

#### Scenario: ProjectPreviewCard renders with square corners

- **WHEN** ProjectPreviewCard component renders
- **THEN** the card container SHALL have `rounded-none`

#### Scenario: ProcessCard renders with square corners

- **WHEN** ProcessCard component renders
- **THEN** the card container SHALL have `rounded-none`

#### Scenario: TeamCard renders with square corners

- **WHEN** TeamCard component renders
- **THEN** the card container SHALL have `rounded-none`

#### Scenario: ProjectCard renders with square corners

- **WHEN** ProjectCard component renders
- **THEN** the card container SHALL have `rounded-none`

#### Scenario: ServiceGalleryCard renders with square corners

- **WHEN** ServiceGalleryCard component renders
- **THEN** the card container SHALL have `rounded-none`

#### Scenario: Services cards render with square corners

- **WHEN** Services.vue renders the main service cards
- **THEN** each card container SHALL have `rounded-none`
- **AND** the icon wrappers SHALL have `rounded-none`
- **AND** the sub-list link items SHALL have `rounded-none`

#### Scenario: AboutUs cards render with square corners

- **WHEN** AboutUs.vue renders the differentiator cards
- **THEN** each card SHALL have `rounded-none`
- **AND** each icon wrapper SHALL have `rounded-none`

#### Scenario: ContactForm renders with square corners

- **WHEN** ContactForm.vue renders
- **THEN** the form container SHALL have `rounded-none`
- **AND** all inputs, select, textarea, and submit button SHALL have `rounded-none`

#### Scenario: ModalGallery renders with square corners

- **WHEN** ModalGallery.vue renders
- **THEN** the modal container SHALL have `rounded-none`
- **AND** the image SHALL have `rounded-none`
- **AND** the carousel nav buttons SHALL have `rounded-none`
- **AND** the dot indicators SHALL have `rounded-none`

#### Scenario: SocialMedia bar renders with square corners

- **WHEN** SocialMedia.vue renders
- **THEN** the container bar SHALL have `rounded-none`

#### Scenario: ProjectsNav renders with square corners

- **WHEN** ProjectsNav.vue renders
- **THEN** the select dropdown SHALL have `rounded-none`

### Requirement: Badges and pills SHALL be rectangular

All badge/pill elements currently using `rounded-full` SHALL use `rounded-none` instead.

The following badge elements SHALL be changed:
- Service badge in ProjectCard
- Specialty tags in DesktopView.vue
- Specialty tags in MobileView.vue

#### Scenario: ProjectCard badge renders rectangular

- **WHEN** ProjectCard renders the service badge
- **THEN** the badge SHALL have `rounded-none`

#### Scenario: Specialty tags in DesktopView render rectangular

- **WHEN** DesktopView.vue renders specialty tags
- **THEN** each tag SHALL have `rounded-none`

#### Scenario: Specialty tags in MobileView render rectangular

- **WHEN** MobileView.vue renders specialty tags
- **THEN** each tag SHALL have `rounded-none`

### Requirement: Social media icon links SHALL remain circular

Social media icon link elements in SocialMediaLink.vue SHALL keep `rounded-full` and SHALL NOT be changed to rectangular.

#### Scenario: Social media icons remain circular

- **WHEN** SocialMediaLink.vue renders
- **THEN** the link SHALL have `rounded-full`

### Requirement: NavLink hover dot SHALL remain circular

The NavLink hover background dot effect SHALL keep `rounded-full` and SHALL NOT be changed.

#### Scenario: NavLink hover dot remains circular

- **WHEN** NavLink.vue renders the hover dot
- **THEN** the hover dot element SHALL have `rounded-full`

### Requirement: Compensatory visual enhancements SHALL be applied

To compensate for the removal of rounded corners, the following visual enhancements SHALL be applied:
- A `border-t-2 border-primary/30` accent line on Services cards, AboutUs differentiator cards, and StatCards
- A left-border accent `border-l-2 border-primary/40` on badge/pill elements
- A 3D card shadow (`shadow-card-3d`) on all card components to create a "building foundation" effect

#### Scenario: Cards have 3D shadow applied

- **WHEN** any card component renders (StatCard, ProjectPreviewCard, ProcessCard, TeamCard, ProjectCard, ServiceGalleryCard, Services cards, AboutUs cards)
- **THEN** the card SHALL have `shadow-card-3d` in resting state
- **AND** on hover, the card SHALL transition to `shadow-card-3d-hover` with a `-translate-y-1` or `-translate-y-2` lift effect

#### Scenario: Services cards have top-border accent

- **WHEN** Services.vue renders the cards
- **THEN** each card SHALL have `border-t-2 border-primary/30`

#### Scenario: AboutUs cards have top-border accent

- **WHEN** AboutUs.vue renders the differentiator cards
- **THEN** each card SHALL have `border-t-2 border-primary/30`

#### Scenario: StatCards have top-border accent

- **WHEN** StatCard.vue renders
- **THEN** the card container SHALL have `border-t-2 border-primary/30`

#### Scenario: Badges have left-border accent

- **WHEN** ProjectCard renders the service badge
- **THEN** the badge SHALL have `border-l-2 border-primary/40`

#### Scenario: Specialty tags have left-border accent

- **WHEN** DesktopView.vue or MobileView.vue renders specialty tags
- **THEN** each tag SHALL have `border-l-2 border-primary/40`
