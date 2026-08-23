## 1. Home Page Update

- [ ] 1.1 Import `Services` component in `app/pages/index.vue`
- [ ] 1.2 Replace `<ServicesPreview />` with `<Services />` in the template
- [ ] 1.3 Remove the `ServicesPreview` import from `app/pages/index.vue`

## 2. Navigation Cleanup

- [ ] 2.1 Remove the `{ path: '/services', title: 'Services', icon: 'fa-project-diagram' }` entry from `navLinks` in `app/components/header/Header.vue`

## 3. Delete Dead Code

- [ ] 3.1 Delete `app/components/sections/home/ServicesPreview.vue`
- [ ] 3.2 Delete `app/pages/services.vue`

## 4. Verification

- [ ] 4.1 Run `npm run typecheck` — no type errors
- [ ] 4.2 Run `npm run build` — production build succeeds
- [ ] 4.3 Visual check: home page renders services section with correct content
- [ ] 4.4 Visual check: nav no longer shows Services link
- [ ] 4.5 Visual check: `/services` returns 404
