## Context

Services page currently renders a flat 6-card grid with hardcoded data unrelated to the category tree in `categories.json`. The Projects page already uses the category tree for filtering (DesktopView/MobileView) but relies on a local `ref` for `activeCategory`. The homepage has no services preview. The `useCategories` composable assigns projects to leaf nodes only.

## Goals / Non-Goals

**Goals:**
- Replace flat Services page with a horizontal two-column tree (Design | Build)
- Each tree node links to `/projects?category=<id>` to filter projects
- Add a ServicesPreview section to the homepage with 2 top-level cards
- Modify `useCategories` to aggregate child projects into parent nodes
- Modify Projects page to read `?category=` query param

**Non-Goals:**
- No new data models — uses existing `categories.json`
- No backend or API changes
- No project detail pages
- No i18n
- The Services page tree does NOT include filtering inline — it navigates to the Projects page

## Decisions

### 1. Category tree replaces flat grid entirely
**Rationale:** The flat 6-card grid duplicates information that is already expressed by the category tree. Removing it eliminates maintenance of two parallel data sources. The tree structure is more informative and enables project browsing.

**Alternative considered:** Keep flat grid and add tree above it. Rejected — redundant information.

### 2. Horizontal side-by-side columns (Design | Build)
**Rationale:** Two top-level categories (Design, Build) fit naturally side by side on desktop. Their children (Residential, Commercial, Specialties) stack vertically within each column. On mobile, the columns stack.

### 3. URL-based project filtering via `?category=`
**Rationale:** Navigating to `/projects?category=design-residential` allows deep linking, bookmarking, and sharing filtered views. The projects page reads the query param on mount and watches for changes.

**Alternative considered:** Route params (`/projects/design-residential`). Rejected — would need dynamic routing; query params are simpler and don't require route changes.

### 4. Aggregate child projects into parent categories
**Rationale:** Clicking "Design" on the homepage should show all Design projects (both Residential and Commercial). Modifying `useCategories` to propagate leaf project arrays up the tree achieves this with minimal data model change.

## Risks / Trade-offs

| Risk | Mitigation |
|------|------------|
| Category tree may have no projects for some nodes | Acceptable — links still navigate to Projects page (shows empty state) |
| Removing flat service cards loses detailed service descriptions | Tree nodes use icons + names only; long descriptions were redundant with the tree structure |
| `?category=` param changes need reactivity in Projects page | Use `useRoute().query` with a watcher to update `activeCategory` |
