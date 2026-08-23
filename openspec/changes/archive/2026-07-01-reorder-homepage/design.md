## Context

Current homepage (`app/pages/index.vue`) renders sections in order: Hero → CompanyDescription → Process → ProjectsPreview.
The `CompanyDescription.vue` component uses SectionHeader with title "Built to Deliver", a long description paragraph, and 3 stat cards.

## Goals / Non-Goals

**Goals:**
- Reorder sections: Hero → ProjectsPreview → CompanyDescription → Process
- Update CompanyDescription: tagline "Design. Build. Deliver.", no paragraph, keep 3 stat cards
- No visual design changes beyond content reorder

**Non-Goals:**
- No new components
- No styling changes
- No data model changes

## Decisions

### 1. Section order in index.vue
**Rationale:** ProjectsPreview showcases actual work — strongest credibility signal. CompanyDescription provides company context. Process explains methodology — best last as supporting detail.

### 2. CompanyDescription content
**Rationale:** "Design. Build. Deliver." is punchy and mirrors the company's three pillars. Removing the paragraph reduces cognitive load; stat cards carry the proof.

**Alternative considered:** Keep paragraph but shorten. Rejected — tagline + stats is cleaner.

## Risks / Trade-offs

| Risk | Mitigation |
|------|------------|
| Less company context before ProjectsPreview | Hero video + logo already establish brand; ProjectsPreview images speak for themselves |
| Stat cards may feel disconnected without paragraph | Stat cards are self-explanatory (Years, Projects, Team) |