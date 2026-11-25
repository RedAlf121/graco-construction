## 1. Data Layer

- [x] 1.1 Create `assets/services.json` with the full service hierarchy (Preconstruction Management + Construction Management → Residential/Commercial → leaf services)
- [x] 1.2 Create `app/hooks/useServices.ts` with `ServiceNode` interface, load services.json, expose `servicesTree`, `servicesFlat` (Record by id), and `getServicePath(id)` method

## 2. Update Gallery Data

- [x] 2.1 Update `assets/galleries.json` — replace `slug`, `parent`, `parentId`, `grandparent`, `grandparentId` fields with a single `serviceId` field referencing service node IDs
- [x] 2.2 Update `app/hooks/useGalleries.ts` to import and use `useServices()` — resolve `service`, `parent`, and `grandparent` display names from the service tree by `serviceId`

## 3. Refactor Services.vue

- [x] 3.1 Refactor `app/components/sections/services/Services.vue` — import `useServices()`, replace hardcoded cards with `v-for` over `servicesTree`, render icon/name/description for root nodes, and recursively render sub-service lists for children

## 4. Refactor Footer.vue

- [x] 4.1 Refactor `app/components/Footer.vue` — import `useServices()`, replace hardcoded services array with recursive `<ul>` tree rendering showing the full hierarchy as a directory structure

## 5. Verification

- [x] 5.1 Run `npm run build` and confirm no TypeScript or build errors
- [x] 5.2 Run `npm run dev` and visually confirm Services section renders identically with 2 cards, correct icons/text/links
- [x] 5.3 Visually confirm Footer shows the service tree as nested directory structure
