## ADDED Requirements

### Requirement: Homepage sections display in new order
The system SHALL display homepage sections in the order: Hero, ProjectsPreview, CompanyDescription, Process.

#### Scenario: Sections render in correct sequence
- **WHEN** the home page loads
- **THEN** it SHALL render Hero first
- **AND** it SHALL render ProjectsPreview second
- **AND** it SHALL render CompanyDescription third
- **AND** it SHALL render Process fourth

### Requirement: CompanyDescription shows simplified tagline and no paragraph
The system SHALL display "Design. Build. Deliver." as the tagline in CompanyDescription with no descriptive paragraph below it, followed by the three statistic cards.

#### Scenario: Tagline renders without paragraph
- **WHEN** the CompanyDescription section loads
- **THEN** it SHALL show "Design. Build. Deliver." as the main heading
- **AND** it SHALL NOT display a descriptive paragraph
- **AND** it SHALL show three statistic cards (25+ Years Experience, 200+ Projects Completed, 50+ Team Members)