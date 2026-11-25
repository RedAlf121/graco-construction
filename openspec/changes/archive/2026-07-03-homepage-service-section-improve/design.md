## Context

The "Our Services" section (`app/components/sections/services/Services.vue`) renders two service cards in a 2-column grid. The section sits between visually rich sections (ProjectsPreview with images, CompanyDescription with video parallax) but has no imagery — it's text-only with Font Awesome icons. The typography hierarchy is flat: section header is `text-6xl` while card titles are `text-xl`, creating an abrupt drop in visual weight.

## Goals / Non-Goals

**Goals:**
- Increase typography sizing across all card content to close the gap with the section header
- Enlarge icon containers for visual balance against larger text
- Replace minimal hover effect with a raised card interaction (scale + shadow + border highlight)

**Non-Goals:**
- No layout changes (remains 2-column grid)
- No content changes (same text, same links)
- No new imagery, videos, or media
- No new capabilities or component restructuring

## Decisions

| Decision | Choice | Rationale |
|---|---|---|
| Card 1 title size | `text-3xl` | Card 1 has no sub-items, so a larger title fills the vertical space and balances the more complex Card 2 |
| Card 2 title size | `text-2xl` | Card 2 has sub-headings (Residential/Commercial) and list items, so a slightly smaller title prevents crowding |
| Body text | `text-base` (from `text-sm`) | Matches the rest of the site's reading size; improves readability |
| Sub-headings (Residential/Commercial) | `text-lg` + `font-bold` (from `font-semibold`) | Creates clearer hierarchy within the card |
| Icon container | `size-16` (from `size-12`) | Scales proportionally with larger titles; `size-16` (64px) keeps icons prominent |
| Hover effect | `hover:scale-[1.02]` + `hover:shadow-xl` + `hover:border-primary` | Raised card effect is consistent with ProcessCard and ProjectPreviewCard patterns in the codebase. `scale-[1.02]` is subtle enough to not feel gimmicky |
| List item text | `text-base` (from `text-sm`) | Consistency with body text size |

## Risks / Trade-offs

- **Card 1 vertical balance**: With `text-3xl` title and no sub-items, Card 1 may have excess whitespace below the description. This is acceptable since the 2-column grid matches heights naturally and the card already has padding.
- **Sub-item link size at `text-base`**: The 4 links (New Construction, Renovation, General Commercial, Concrete Restoration) will be more readable but the list column may feel denser. The `space-y-2` spacing compensates.
