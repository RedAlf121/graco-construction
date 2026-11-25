## Purpose

Individual project detail pages accessible at `/projects/:id` with image gallery and metadata.

## Requirements

### Requirement: Project detail page at /projects/:id
The system SHALL render a dedicated page at `/projects/:id` for each project in `projects.json`, displaying the project's title, description, location, service badge, and image gallery.

#### Scenario: Navigate to a valid project
- **WHEN** the user navigates to `/projects/1`
- **THEN** the page SHALL display the project's title, description, location, and service badge
- **AND** the page SHALL display the project's main image as a hero/cover image
- **AND** the page SHALL render a gallery of thumbnail images from the project's gallery array with full paths resolved via `useServiceImages()`
- **AND** clicking a gallery thumbnail SHALL open `ModalGallery` at that image index

#### Scenario: Navigate to an invalid project ID
- **WHEN** the user navigates to `/projects/999`
- **THEN** the page SHALL display a "Project Not Found" message with a link back to `/projects`

#### Scenario: SEO meta tags on project detail page
- **WHEN** the project detail page loads for a valid project
- **THEN** the document title SHALL be `"<Project Title> — Graco Construction Group"`
- **AND** the page SHALL include appropriate Open Graph and meta description tags using the project's title and description

#### Scenario: Back navigation from project detail
- **WHEN** the user is on a project detail page
- **THEN** the page SHALL include a prominent "Back to All Projects" link that navigates to `/projects`

#### Scenario: Image gallery modal behavior
- **WHEN** the user clicks a gallery thumbnail on the project detail page
- **THEN** the `ModalGallery` component SHALL open in fullscreen with the clicked image as the first shown
- **AND** the user SHALL be able to navigate between images using previous/next buttons and keyboard arrow keys
- **AND** pressing Escape SHALL close the modal

### Requirement: Project data model aligned with Final Pics
Each project in `projects.json` SHALL have:
- `id`: unique number
- `title`: display name matching the Final Pics subdirectory (e.g., "New Construction")
- `image`: short filename of the cover image (e.g., "1.jpg")
- `service`: exact name of the Final Pics subdirectory (e.g., "New Construction", "General Renovation", "General Commercial", "Concrete Restoration & Waterproofing")
- `gallery`: array of short filenames present in that Final Pics subdirectory
- `location`: always "Miami, FL"
- `description`: short paragraph describing the project
- `hierachy`: array matching the category tree path (e.g., `["Build", "Residential"]`)
