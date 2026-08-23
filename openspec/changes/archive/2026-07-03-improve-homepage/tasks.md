## 1. Background Fix (All Pages)

- [ ] 1.1 Add `bg-gradient-to-l from-background-secondary to-background-primary` to `<main>` in `app/pages/about.vue`
- [ ] 1.3 Add `bg-gradient-to-l from-background-secondary to-background-primary` to `<main>` in `app/pages/projects.vue`
- [ ] 1.4 Add `bg-gradient-to-l from-background-secondary to-background-primary` to `<main>` in `app/pages/team.vue`
- [ ] 1.5 Add `bg-gradient-to-l from-background-secondary to-background-primary` to `<main>` in `app/pages/contact.vue`
- [ ] 1.6 Remove `bg-gradient-to-l from-background-secondary to-background-primary` from `<section>` in `app/components/sections/about/AboutUs.vue`
- [ ] 1.7 Remove `bg-gradient-to-l from-background-secondary to-background-primary` from `<section>` in `app/components/sections/services/Services.vue`

## 2. Homepage — Company Description

- [ ] 2.1 Create `app/components/sections/home/CompanyDescription.vue` with tagline, short paragraph, and 3 stat cards (icon + number + label)
- [ ] 2.2 Add `<CompanyDescription />` to `app/pages/index.vue` between Hero and Process

## 3. Homepage — Projects Preview

- [ ] 3.1 Create `app/components/sections/home/ProjectsPreview.vue` with 3 project image cards + "View All Projects" NuxtLink to `/projects`

## 4. Team Restructure

- [ ] 4.1 Add team member cards (reuse TeamCard) to `app/components/sections/about/AboutUs.vue` below the differentiators grid
- [ ] 4.2 Replace `app/pages/team.vue` content with "Coming Soon" placeholder (centered, min-h-[60vh], header + subtitle)

## 5. HeroButton → /projects

- [ ] 5.1 Change `<a :href="path">` to `<NuxtLink :to="path">` in `app/components/hero/HeroButton.vue`
- [ ] 5.2 Update `path="#projects"` → `path="/projects"` in `app/components/hero/Hero.vue`

## 6. Verification

- [ ] 6.1 Run `npm run build` and fix any TypeScript or build errors
- [ ] 6.2 Run `npm run generate` to verify static generation
- [ ] 6.3 Start dev server and confirm: homepage shows Hero → CompanyDescription → Process → ProjectsPreview; About Us shows team cards; /team shows Coming Soon; all pages have dark background