## ADDED Requirements

### Requirement: Navigation does not include Services link
The site navigation SHALL NOT include a link to `/services`.

#### Scenario: Header nav excludes Services
- **WHEN** a user views the navigation bar on any page
- **THEN** the nav SHALL NOT contain a link labeled "Services" or pointing to `/services`

#### Scenario: Mobile nav drawer excludes Services
- **WHEN** a user opens the mobile navigation drawer
- **THEN** the mobile nav SHALL NOT contain a link labeled "Services" or pointing to `/services`
