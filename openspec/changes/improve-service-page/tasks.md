## 1. Update ServiceCard interface and data

- [x] 1.1 Add `description` field to `ServiceCard` interface in `app/pages/projects/index.vue` with placeholder text for each service
- [x] 1.2 Fix title mapping: assign `gallery.service` explicitly to `title` instead of relying on spread

## 2. Update template layout

- [ ] 2.1 Change image aspect ratio from `aspect-[4/3]` to `aspect-video` and adjust grid to `grid-cols-1 md:grid-cols-2 gap-6`
- [ ] 2.2 Replace absolute overlay with a `<div class="p-4">` content section below the image showing icon, title, description, and photo count

## 3. Verify

- [ ] 3.1 Run `npm run build` to confirm no TypeScript or build errors
- [ ] 3.2 Run `npm run dev` and visually confirm cards show image, title, and description on both mobile and desktop viewport sizes
