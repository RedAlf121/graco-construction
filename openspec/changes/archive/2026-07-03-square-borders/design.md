## Context

Graco Construction Group's website currently uses large rounded corners (12-30px custom radii) on all card components, form elements, badges, and container boxes. This creates a soft, friendly aesthetic that doesn't communicate "construction" — an industry about structure, beams, right angles, and precision. The referent site chconstruct.com demonstrates a rectangular, minimal approach that feels more aligned with construction branding.

## Goals / Non-Goals

**Goals:**
- Remove all rounded corners from structural UI elements (cards, containers, forms, badges, buttons)
- Keep only decorative circular elements (social media icons, NavLink hover dots)
- Preserve all existing layout, spacing, colors, shadows, and animations
- Add compensatory visual enhancements so rectangular elements remain polished

**Non-Goals:**
- Not modifying `tailwind.config.js` — all changes are per-component class edits
- Not changing any component logic, data flow, or behavior
- Not changing social media icon circular shapes
- Not changing NavLink hover dot circular shapes

## Decisions

### 1. Component-by-component class edits (no config changes)

**Why:** Changing config values globally would affect every `rounded-*` class in the project, including future components. Manual edits give explicit control over each element. The `rounded-full` exceptions (social icons, nav dots) prove this approach is correct — a config change would inadvertently convert them too.

### 2. Elements that keep rounded-full

| Element | Reason |
|---|---|
| Social media icon links | Circles are standard UX pattern for social icons; chconstruct uses circular icons too |
| NavLink hover background dot | Decorative micro-interaction, not a structural container |

### 3. Compensatory visual enhancements

Without rounding, rectangular elements risk looking flat or harsh. Four strategies applied selectively:

**a) 3D card shadow (`shadow-card-3d`)**
Applied to: All card components (StatCard, ProjectPreviewCard, ProcessCard, TeamCard, ProjectCard, ServiceGalleryCard, Services cards, AboutUs cards)
Creates a "building foundation" effect using a solid bottom shadow (simulating the structural base) plus a blur shadow for depth.

Rest state: `shadow-card-3d` — `0 4px 0 0 rgba(255, 159, 10, 0.15), 0 8px 25px rgba(0, 0, 0, 0.4)`
Hover state: `shadow-card-3d-hover` — `0 8px 0 0 rgba(255, 159, 10, 0.25), 0 16px 40px rgba(0, 0, 0, 0.5)`

On hover the card lifts (`-translate-y-1` or `-translate-y-2`) and the foundation shadow doubles, reinforcing the "rising building" illusion.

**b) Top-border accent line (`border-t-2 border-primary/30`)**
Applied to: Services section cards, About differentiator cards, StatCards
Adds a subtle orange line at the top that anchors the card visually.

**c) Stronger border on hover (`hover:border-white/20`)**
Applied to: All card components that already have hover shadow effects
The existing hover shadows together with a slightly more visible border reinforces depth.

**d) Form focus enhancement (`focus:ring-2 focus:ring-primary/20`)**
Applied to: Contact form inputs, select, textarea
Already present in current code — no change needed, the focus ring provides definition.

### 4. Badges/pills converted to rectangular

Convert `rounded-full` to `rounded-none` on:
- Service badges in ProjectCard
- Specialty tags in DesktopView and MobileView
- ProjectsNav dropdown

These small label elements will use `border-l-2 border-primary/40` to add a left accent stripe that guides the eye without rounding.

### 5. Modal gallery adjustments

- Main modal container: `rounded-xl` → `rounded-none`
- Image inside modal: `rounded-lg` → `rounded-none`
- Carousel nav buttons: `rounded-full` → square buttons with `hover:bg-black/70`
- Dot indicators: `rounded-full` → square dots (4x4px) with `hover:bg-white/50`

## Risks / Trade-offs

| Risk | Mitigation |
|---|---|
| Rectangular cards may look too sharp or "unfinished" | Top-border accent line + hover shadows add visual polish |
| Form inputs without rounding may feel unrefined | Focus ring (`focus:ring-2`) provides clear state; `focus:border-primary` adds definition |
| Badges without pill shape may lose scannability | Left-border accent (`border-l-2 border-primary/40`) maintains visual grouping |
| User may dislike the change after seeing it | All changes are class-level; reverting is trivial per-component |
