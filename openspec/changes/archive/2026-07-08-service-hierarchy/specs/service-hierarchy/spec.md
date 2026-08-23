## ADDED Requirements

### Requirement: Centralized service hierarchy data source

The system SHALL provide a single `assets/services.json` file containing the complete service hierarchy as a tree of nodes with id, name, description, icon, and children.

#### Scenario: Services.json exists at the expected path
- **WHEN** the application loads
- **THEN** the file `assets/services.json` SHALL be loadable

#### Scenario: Tree structure has id and name on every node
- **WHEN** a node exists in the tree
- **THEN** it MUST have a non-empty `id` (kebab-case string) and a non-empty `name` (display string)

#### Scenario: Only top-level nodes have descriptions
- **WHEN** a top-level (root) service node exists
- **THEN** it MAY have a `description` property
- **WHEN** a non-root service node exists
- **THEN** it SHALL NOT have a `description` property

#### Scenario: Service hierarchy matches current Services.vue
- **WHEN** the tree is loaded
- **THEN** it SHALL contain exactly two top-level nodes: "Preconstruction Management" and "Construction Management"
- **WHEN** the "Construction Management" node is expanded
- **THEN** it SHALL have exactly two children: "Residential" and "Commercial"
- **WHEN** the "Residential" node is expanded
- **THEN** it SHALL have exactly two children: "New Construction" and "Renovation Projects"
- **WHEN** the "Commercial" node is expanded
- **THEN** it SHALL have exactly two children: "General Commercial" and "Concrete Restoration & Waterproofing"

### Requirement: useServices composable

The system SHALL expose a `useServices()` composable that loads `services.json` and provides the service tree, a flat node lookup, and path resolution utilities.

#### Scenario: Composable returns servicesTree
- **WHEN** `useServices()` is called
- **THEN** it SHALL return a `servicesTree` property containing the full array of root service nodes

#### Scenario: Composable returns servicesFlat lookup
- **WHEN** `useServices()` is called
- **THEN** it SHALL return a `servicesFlat` property — a `Record<string, ServiceNode>` keyed by node `id`
- **WHEN** a node's `id` is looked up in `servicesFlat`
- **THEN** the corresponding node object SHALL be returned

#### Scenario: Composable returns getServicePath
- **WHEN** `getServicePath(id)` is called with a valid leaf node id
- **THEN** it SHALL return an array of node names from root to that leaf (e.g., `["Construction Management", "Residential", "New Construction"]`)

### Requirement: Services.vue renders from data

The Services section component SHALL render its service cards and sub-service lists using `v-for` loops driven by the `useServices()` composable instead of hardcoded HTML.

#### Scenario: Service cards render from servicesTree
- **WHEN** the Services section is rendered
- **THEN** one card SHALL exist per root service node in `servicesTree`
- **WHEN** a root service node has `children`
- **THEN** the card SHALL render those children as sub-sections with their own child lists

#### Scenario: Each card displays icon, title, and description
- **WHEN** a service card is rendered
- **THEN** it SHALL display the node's `icon` as a Font Awesome icon, the `name` as the title, and the `description` (if present) as the body text

#### Scenario: Leaf service links resolve correctly
- **WHEN** a leaf service node is rendered as a link
- **THEN** the link's `to` SHALL be `/projects/service/${node.id}`

### Requirement: Footer renders service tree

The footer component SHALL render the service hierarchy as a visual tree using recursive `<ul>` elements, driven by the `useServices()` composable.

#### Scenario: Footer shows full service tree
- **WHEN** the footer is rendered
- **THEN** it SHALL display the complete service tree under a "Services" heading
- **WHEN** a service node has children
- **THEN** it SHALL render a nested `<ul>` with the children indented
- **WHEN** a leaf service node is rendered
- **THEN** it SHALL NOT render child `<ul>` elements

### Requirement: Galleries reference services by ID

The `galleries.json` file SHALL use `serviceId` to reference leaf service nodes from `services.json`, replacing the previous independent slug/parent/grandparent fields.

#### Scenario: Gallery entry has serviceId field
- **WHEN** a gallery entry exists in `galleries.json`
- **THEN** it SHALL have a `serviceId` field matching a leaf node `id` in `services.json`

#### Scenario: useGalleries resolves service hierarchy
- **WHEN** `useGalleries` loads a gallery entry
- **THEN** it SHALL resolve `serviceId` against `services.json` to populate `service`, `parent`, and `grandparent` display names
- **WHEN** a `serviceId` does not match any service node
- **THEN** the entry SHALL be flagged as orphaned (logged or skipped)
