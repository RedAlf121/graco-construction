## 1. Home Section Components

- [x] 1.1 StatCard.vue — Change `rounded-md` to `rounded-none` on card container; change `rounded-sm` to `rounded-none` on icon wrapper; add `border-t-2 border-primary/30`
- [x] 1.2 ProjectPreviewCard.vue — Change `rounded-md` to `rounded-none`
- [x] 1.3 ProcessCard.vue — Remove `rounded-[18px]` class

## 2. Project Section Components

- [x] 2.1 ProjectCard.vue — Change `rounded-xl` to `rounded-none` on card; change `rounded-full` to `rounded-none` on service badge; add `border-l-2 border-primary/40` to badge
- [x] 2.2 ServiceGalleryCard.vue — Change `rounded-md` to `rounded-none`
- [x] 2.3 DesktopView.vue — Change `rounded-full` to `rounded-none` on specialty tags; add `border-l-2 border-primary/40`
- [x] 2.4 MobileView.vue — Change `rounded-full` to `rounded-none` on specialty tags; add `border-l-2 border-primary/40`
- [x] 2.5 ProjectsNav.vue — Change `rounded-lg` to `rounded-none` on select dropdown
- [x] 2.6 ModalGallery.vue — Change `rounded-xl` to `rounded-none` on modal container; change `rounded-lg` to `rounded-none` on image; change `rounded-full` to `rounded-none` on nav buttons and dot indicators

## 3. Services Section

- [x] 3.1 Services.vue — Change `rounded-md` to `rounded-none` on both service cards; change `rounded-sm` to `rounded-none` on icon wrappers; change `rounded-sm` to `rounded-none` on sub-list items; add `border-t-2 border-primary/30` to both service cards

## 4. About Section

- [x] 4.1 AboutUs.vue — Change `rounded-md` to `rounded-none` on differentiator cards; change `rounded-sm` to `rounded-none` on icon wrappers; add `border-t-2 border-primary/30` to each card

## 5. Contact Section

- [x] 5.1 ContactForm.vue — Change `rounded-[30px]` to `rounded-none` on form container; change `rounded-lg` to `rounded-none` on all inputs, select, textarea, and submit button

## 6. Header Components

- [x] 6.1 SocialMedia.vue — Change `rounded-xl` to `rounded-none` on container bar (icon links keep `rounded-full` — no change)

## 7. Verification

- [x] 7.1 Run `npm run build` — verify no build errors
- [x] 7.2 Visual review — check all changed components render correctly with square corners and accent borders

## 8. 3D Shadow Enhancement

- [x] 8.1 Add `card-3d` and `card-3d-hover` shadows to tailwind.config.js
- [x] 8.2 StatCard.vue — Add `shadow-card-3d` in rest state; replace hover shadow with `hover:shadow-card-3d-hover hover:-translate-y-1`
- [x] 8.3 ProjectPreviewCard.vue — Add `shadow-card-3d`; replace hover shadow with `hover:shadow-card-3d-hover`
- [x] 8.4 ProcessCard.vue — Add `shadow-card-3d`; replace hover shadow with `hover:shadow-card-3d-hover`
- [x] 8.5 TeamCard.vue — Add `shadow-card-3d`; replace hover shadow with `hover:shadow-card-3d-hover`
- [x] 8.6 ProjectCard.vue — Add `shadow-card-3d`; replace hover shadow with `hover:shadow-card-3d-hover`
- [x] 8.7 ServiceGalleryCard.vue — Add `shadow-card-3d`; replace hover shadow with `hover:shadow-card-3d-hover`
- [x] 8.8 Services.vue — Add `shadow-card-3d` to both service cards; replace hover shadow with `hover:shadow-card-3d-hover`
- [x] 8.9 AboutUs.vue — Add `shadow-card-3d` to differentiator cards; replace hover shadow with `hover:shadow-card-3d-hover`
- [x] 8.10 Run `npm run build` — verify no build errors
