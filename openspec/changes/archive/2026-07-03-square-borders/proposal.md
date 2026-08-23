## Why

The site currently uses heavy rounded corners (12-30px) on all cards, containers, form elements, and badges. For a construction company, this soft aesthetic contradicts the industry's core values of structure, precision, and solid craftsmanship. CH Construction Group (chconstruct.com) demonstrates that a rectangular, minimal approach communicates strength and professionalism more effectively. Removing rounded corners aligns the visual language with the brand identity.

## What Changes

- Remove all `rounded-*` classes from card components (StatCard, ProjectPreviewCard, ProcessCard, TeamCard, ProjectCard, ServiceGalleryCard, Services cards, AboutUs differentiator cards)
- Remove rounding from the contact form container, all form inputs, select, textarea, and submit button
- Convert all pill/badge elements (`rounded-full`) to rectangular
- Remove rounding from the modal gallery container, carousel navigation buttons, and dot indicators
- Remove rounding from the social media bar container (icons themselves remain circular)
- Remove rounding from the projects navigation dropdown
- Remove rounding from icon wrapper containers inside cards
- Keep social media icon links as circles (`rounded-full`)
- Keep NavLink hover effect as circles (`rounded-full`) — decorative micro-interaction, not structural
- **No changes to `tailwind.config.js`** — all changes are class-level edits on individual components
- Add subtle visual enhancements (border accents, hover states) to compensate for the loss of softness

## Capabilities

### New Capabilities
- `square-borders`: Remove all rounded corners from the UI and convert to rectangular/square aesthetic

### Modified Capabilities

None — no spec-level behavior changes, purely visual/UI.

## Impact

- **15+ Vue components** across `/app/components/` need class edits
- `tailwind.config.js`: **No changes**
- Only UI layer affected — no logic, data, or behavior changes
- Dark mode implications: rectangular borders rely on existing border colors (`white/10`, `white/5`) — may need slight adjustment for visual clarity
