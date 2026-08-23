## Context

The homepage (`app/pages/index.vue`) is a vertical stack of 5 sections + footer inside a `<main>` tag. Currently scrolls freely with no snapping. A corrupted `useInView.ts` file exists but is unusable (binary zeros). The `Services.vue` section uses a manual IntersectionObserver, while `CompanyDescription.vue` uses `useParallax.ts`. No existing scroll-snap CSS.

The fixed header (app.vue line 2-3) sits at `top-0 z-[1000]` and needs `scroll-padding-top` offset so snapped sections don't hide behind it. The header height varies between mobile (~60px) and desktop (~120px).

## Goals / Non-Goals

**Goals:**
- `scroll-snap-type: y mandatory` on the homepage `<main>` container so each section snaps into full view
- Each section gets `min-height: 100dvh` with vertically centered content
- Entry animations trigger via IntersectionObserver when a section becomes visible (once per session)
- Works identically on mobile and desktop
- Preserve all existing content, parallax on CompanyDescription, and Hero as-is

**Non-Goals:**
- Not modifying the footer's internal content (only its `scroll-snap-align`)
- Not adding scroll-snap to non-homepage pages (about, services, contact, team, projects)
- Not adding a full JS scroll library (GSAP, ScrollMagic, etc.) — pure CSS + native IntersectionObserver
- Not modifying the header's appearance or behavior

## Decisions

### 1. CSS scroll-snap vs JS-based snap (e.g., fullpage.js, Locomotive Scroll)

**Decision:** CSS `scroll-snap-type: y mandatory`

- Zero dependencies — no bundle size increase
- GPU-accelerated, 60fps scrolling on all devices
- Native mobile swipe behavior matches platform conventions
- `100dvh` (dynamic viewport height) handles mobile browser chrome correctly
- CSS is simpler to maintain than a JS library
- Trade-off: less customization of snap timing/easing, but the browser default works well for this use case

### 2. `useInView` composable design

**Decision:** Single-purpose composable with `once: true` option

```ts
useInView(threshold = 0.2, once = true)
  → { targetRef, isVisible }
```

- Replaces the corrupted `app/hooks/useInView.ts`
- `once: true` by default — animation fires on first scroll-in and stays
- Threshold of 0.2 means the animation triggers when 20% of the section is visible, accounting for the header offset
- Uses `ref` callback pattern for the target element

Alternatives considered:
- **Global observer service**: Over-engineered for 5 sections
- **Direct DOM queries in each component**: Duplicated boilerplate — composable is cleaner

### 3. Animation approach: CSS keyframes vs JS-driven

**Decision:** CSS keyframes + Tailwind animation utilities, triggered by the `isVisible` ref adding a CSS class

- Animations are declarative in the template
- Reuses existing `animate-fadeInUp` pattern already in `tailwind.config.js`
- New keyframes `slideInLeft`, `slideInRight`, `scaleIn` added to `tailwind.config.js`
- Animation CSS in `assets/css/global.css` for custom keyframes
- Vue class bindings handle the trigger: `:class="{ 'animate-slideInLeft': isVisible }"`

### 4. Section centering strategy

**Decision:** Each section wrapper gets `flex min-h-screen items-center justify-center`

- Natural vertical centering regardless of content height
- Content that exceeds viewport height (edge case on mobile) still scrolls within the section
- Works with existing Tailwind utilities — no custom CSS needed

### 5. Scroll-padding-top value

**Decision:** Dynamic CSS custom property matching header height

The header height differs on mobile (~60px) vs desktop (~120px). Using a CSS custom property:

```css
main {
  scroll-padding-top: var(--header-height, 120px);
}
```

This can be set via a reactive style or CSS media query. Most practical approach: set `--header-height` via media query in `global.css` (60px mobile, 120px desktop).

## Risks / Trade-offs

| Risk | Mitigation |
|------|------------|
| `scroll-snap-type: mandatory` can trap users who want to scroll quickly past multiple sections | Using `min-height: 100dvh` (not `height: 100dvh`) so content that exceeds viewport still scrolls within the section. Also, rapid scrolling naturally overrides snap briefly. |
| Fixed header overlaps snapped sections | `scroll-padding-top` offsets the snap target, leaving room for the header |
| `100dvh` not supported in older browsers | Falls back to `100vh` — acceptable degradation (just a bit more scroll in section) |
| Animations re-trigger if user scrolls away and back | `once: true` in the composable prevents this. The animation plays once and the class stays. |
| Mobile keyboard opening could mess up dvh | Snap only applies to scroll container, not input focus. Contact form is on a separate page, not in the snap chain. |
| Load performance with 6 snapped sections on a slow device | All animations are CSS-based (GPU composited). `IntersectionObserver` is non-blocking. No JS scroll listeners. |
