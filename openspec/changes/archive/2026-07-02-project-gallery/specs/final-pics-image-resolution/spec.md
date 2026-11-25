## ADDED Requirements

### Requirement: Image path resolution composable
The system SHALL provide a `useServiceImages()` composable that resolves short image filenames to full public URL paths based on the project's `service` field.

#### Scenario: Resolve single image path
- **WHEN** `resolveImagePath(project, "1.jpg")` is called for a project with `service: "New Construction"`
- **THEN** it SHALL return `"/Final Pics/Residential Project/New Construction/1.jpg"`

#### Scenario: Resolve gallery array
- **WHEN** `resolveGallery(project)` is called
- **THEN** it SHALL return an array of full URLs by mapping each filename in `project.gallery` through `resolveImagePath`

#### Scenario: Resolve cover image
- **WHEN** `resolveCover(project)` is called
- **THEN** it SHALL resolve the project's `image` field using `resolveImagePath`

#### Scenario: Unknown service
- **WHEN** `resolveImagePath` is called for a project with a `service` that is not in the base path map
- **THEN** it SHALL `console.warn` with the unknown service name
- **AND** return the filename as-is as a fallback

### Requirement: Base path map
The composable SHALL contain a `SERVICE_BASE_PATHS` mapping object with the following entries:

| Service Name | Base Path |
|---|---|
| `New Construction` | `/Final Pics/Residential Project/New Construction/` |
| `General Renovation` | `/Final Pics/Residential Project/General Renovation/` |
| `General Commercial` | `/Final Pics/Commercial Projects/General Commercial/` |
| `Concrete Restoration & Waterproofing` | `/Final Pics/Commercial Projects/Concrete Restoration & Waterproofing/` |
