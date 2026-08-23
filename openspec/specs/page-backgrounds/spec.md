# Page Backgrounds

## Purpose
Ensure all pages have a consistent dark gradient background applied via the `<main>` wrapper element, with no conflicting background classes on section components.

## Requirements

### Requirement: All pages have consistent dark gradient background
The system SHALL apply a dark gradient background to every page via the page's `<main>` wrapper element.

#### Scenario: Home page has dark gradient background
- **WHEN** the user visits `/`
- **THEN** the page's `<main>` element SHALL have class `bg-gradient-to-l from-background-secondary to-background-primary`
- **AND** all section components SHALL NOT define their own background classes

#### Scenario: About page has dark gradient background
- **WHEN** the user visits `/about`
- **THEN** the page's `<main>` element SHALL have class `bg-gradient-to-l from-background-secondary to-background-primary`
- **AND** the AboutUs component section SHALL NOT have a background class

#### Scenario: Services page has dark gradient background
- **WHEN** the user visits `/services`
- **THEN** the page's `<main>` element SHALL have class `bg-gradient-to-l from-background-secondary to-background-primary`
- **AND** the Services component section SHALL NOT have a background class

#### Scenario: Projects page has dark gradient background
- **WHEN** the user visits `/projects`
- **THEN** the page's `<main>` element SHALL have class `bg-gradient-to-l from-background-secondary to-background-primary`
- **AND** the Projects component section SHALL NOT have a background class

#### Scenario: Team page has dark gradient background
- **WHEN** the user visits `/team`
- **THEN** the page's `<main>` element SHALL have class `bg-gradient-to-l from-background-secondary to-background-primary`
- **AND** the Team component section SHALL NOT have a background class

#### Scenario: Contact page has dark gradient background
- **WHEN** the user visits `/contact`
- **THEN** the page's `<main>` element SHALL have class `bg-gradient-to-l from-background-secondary to-background-primary`
- **AND** the Contact component section SHALL NOT have a background class
