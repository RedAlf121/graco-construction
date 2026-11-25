# Hero Video Performance — Delta Spec

Affected components: `app/components/hero/BackgroundVideo.vue`, `app/components/hero/TextWithVideo.vue`, `app/components/hero/Hero.vue`; deleted: `app/components/hero/TextMask.vue`.
Assets: `public/hero-miami-poster.webp`, `public/hero-miami-720.mp4`, `public/hero-miami-720.webm`, `public/hero-miami-1080.mp4`.
Data flow: props (`video`, `title`, `poster`) from `Hero.vue`; source selection client-side via `matchMedia('(max-width: 850px)')` inside `BackgroundVideo.vue` (850px = same breakpoint as nav switch).
Dark mode: knockout layer `background-tertiary` #2C2C2E; media fallback `background-secondary` #1C1C1E; white title; no light-mode variant needed (dark-only theme).

## ADDED Requirements

### Requirement: Single video decode
The Hero SHALL render exactly one `<video>` element and SHALL NOT use an SVG `foreignObject` text mask with a second video.

#### Scenario: One decode in the DOM
- **WHEN** the home page is inspected after hydration
- **THEN** the Hero SHALL contain exactly one `<video>` element
- **AND** `TextMask.vue` SHALL no longer exist in the codebase

### Requirement: Knockout title effect preserved
The Hero SHALL show the background media through the title glyphs using a `mix-blend-multiply` dark layer containing white text, with a plain-title fallback when blending is unsupported.

#### Scenario: Video visible through letters
- **WHEN** the background video is playing
- **THEN** the area outside the title SHALL show darkened video
- **AND** the title glyphs SHALL show full-brightness video

#### Scenario: Unsupported blend mode
- **WHEN** the browser does not support `mix-blend-mode: multiply`
- **THEN** the Hero SHALL show a plain white title over a darkened video/poster
- **AND** layout SHALL remain identical

### Requirement: Poster-first loading, never a black void
The Hero SHALL paint a WebP poster (≤ 200 KB) immediately via CSS background on the media wrapper and the video `poster` attribute, over a `background-secondary` fallback color.

#### Scenario: Slow connection first paint
- **WHEN** the page loads on a throttled Fast 3G connection
- **THEN** the poster SHALL be visible on first paint
- **AND** the Hero SHALL NOT show an empty black area while the video downloads

#### Scenario: Video fails to load or play
- **WHEN** the video cannot be fetched or decoded
- **THEN** the poster SHALL remain visible
- **AND** the title effect SHALL still render against the poster

### Requirement: Adaptive formats and weight budgets
The Hero SHALL serve H.264 MP4 and WebM sources selected by viewport: ≤850px uses 720p encodes (MP4 ≤ 2 MB, WebM ≤ 1.5 MB); wider viewports use a 1080p MP4 ≤ 4 MB. All MP4s SHALL use `+faststart` and no audio track.

#### Scenario: Mobile source selection
- **WHEN** the page loads at ≤850px width
- **THEN** the video SHALL use the 720p source set
- **AND** the downloaded mobile video SHALL be ≤ 2 MB

#### Scenario: iOS playback
- **WHEN** the page loads on iOS Safari
- **THEN** the browser SHALL select the H.264 MP4 source
- **AND** the video SHALL autoplay muted inline

#### Scenario: Progressive playback start
- **WHEN** the MP4 begins downloading
- **THEN** playback SHALL be able to start before the full file arrives (`+faststart`)

### Requirement: Polite loading on constrained devices
The video SHALL use `preload="metadata"`, and SHALL NOT be rendered at all when the user has `saveData` enabled, a `slow-2g`/`2g` effective connection, or `prefers-reduced-motion: reduce`.

#### Scenario: Data saver
- **WHEN** `navigator.connection.saveData` is true
- **THEN** no video element SHALL be rendered
- **AND** the poster-only Hero SHALL be shown

#### Scenario: Reduced motion
- **WHEN** the user prefers reduced motion
- **THEN** no video SHALL autoplay
- **AND** the poster SHALL be shown with the title effect intact
