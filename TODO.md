# Dev Kabir Portfolio — Development TODO

Tech Stack: SvelteKit 2, Svelte 5, TypeScript, Tailwind CSS v4
Deployment: adapter-static
Design: Facebook Profile Experience — visitors should feel they are browsing a familiar Facebook profile, where the posts are projects, achievements and technical work

---

## Design Direction — Facebook Profile Experience

**Principle:** Make the visitor feel they're exploring a familiar Facebook profile, while discovering a developer's work instead of social posts.

**Target visitor experience**

1. First impression: "This feels like Facebook."
2. After a few seconds: "This is his developer profile. These posts are projects."
3. After exploring: "I already know how to navigate this."

### Starting Visual Spec (light theme — verify against reference screenshots)

| Element            | Starting value |
| ------------------ | -------------- |
| Page background    | `#F0F2F5`      |
| Card background    | `#FFFFFF`      |
| Primary text       | `#050505`      |
| Secondary text     | `#65676B`      |
| Accent blue        | `#0866FF`      |
| Header height      | ~56px          |
| Profile avatar     | ~168px desktop |
| Card radius        | ~8px           |
| Main content width | ~1100px        |
| Card spacing       | ~16px          |
| Sidebar / feed     | ~40% / 60%     |

### Fidelity Rules

- [ ] Capture one desktop and one mobile Facebook profile reference (light + dark) and keep them in the repo for comparison
- [ ] Match layout proportions, content density, card surfaces, radii, spacing and text hierarchy
- [ ] Use a system font stack similar to Facebook's (no web font needed for body text)
- [ ] Derive dark theme tokens from the dark-mode reference
- [ ] Keep the feed plain: no gradients, glassmorphism, oversized cards or unusual navigation
- [ ] Use own name, avatar, cover artwork and content throughout
- [ ] No Facebook/Meta logo, "f" mark, wordmark or Facebook's own icon assets — use Lucide equivalents
- [ ] Nothing on the page suggests the site is operated by Facebook
- [ ] No fake likes, comments, shares, follower counts or non-functional controls

---

## Definition of Done (applies to every component)

Instead of separate Responsive / Accessibility phases, every component is "done" only when:

- [ ] Works at 320px, 375px, tablet, laptop and wide desktop — no horizontal overflow
- [ ] Uses semantic HTML and correct heading level
- [ ] Icon-only buttons have `aria-label`; images have alt text
- [ ] Visible keyboard focus state; fully keyboard operable
- [ ] Works in light and dark theme
- [ ] Respects `prefers-reduced-motion`
- [ ] Touch targets ≥ 44px
- [ ] Images have reserved dimensions (no layout shift) and are lazy-loaded below the fold

---

## Final Decisions

- [x] Framework: SvelteKit 2 (pinned), Svelte 5, TypeScript
- [x] Styling: Tailwind CSS v4
- [x] Deployment: `adapter-static` for initial launch; add a third-party form service later if needed
- [x] Navigation: global header = site-level (Home + future dedicated pages); profile tabs = profile sections
- [x] Profile tab anchors (absolute, work from every route): Posts `/#feed`, About `/#about`, Projects `/#projects` (Featured Projects carousel), Experience `/#experience`; dedicated routes in Phase 2
- [x] Project routes: prerendered with explicit `entries`
- [x] Icons: `@lucide/svelte` for UI icons; Simple Icons or approved SVGs for brand/technology logos
- [x] Content: mdsvex + `import.meta.glob`, frontmatter validation, draft exclusion, 404 for unknown slugs
- [x] Carousel: Featured Projects only; Tech Stack lives in the sidebar Skills Cloud
- [x] Cross-tab theme sync: not included
- [x] CSP handling: only if a CSP header is configured
- [x] JavaScript-disabled check: pre-launch smoke check, not a development task
- [x] Analytics: Google Analytics 4 + Google Search Console (both in Initial Launch)
- [x] Visual design: Facebook profile look and feel (see Design Direction), with Facebook-style blue accent
- [x] Featured projects (3): Defender (WordPress security plugin — professional contribution, WPMU DEV), Beehive (WordPress analytics plugin — professional contribution, WPMU DEV), CORS Plugin (WordPress utility plugin — independent development)
- [x] Optional 4th: WooCommerce API Integration — only with client permission to publish technical details and screenshots; no generic filler projects
- [x] Images: curated 4:3 thumbnails for carousel cards; original aspect ratio (no cropping) for feed posts and case studies
- [x] Attribution for company-owned products: follow the Publication Rules below until written approval

### Publication Rules — Company-Owned Products (Defender, Beehive)

| Content                                 | Until approval                                   |
| --------------------------------------- | ------------------------------------------------ |
| Job title and employment history        | Generally acceptable if not confidential         |
| Public product descriptions             | Use verified public information only             |
| Publicly available screenshots          | Check company branding and reuse policy first    |
| Internal architecture or source code    | Do not publish                                   |
| Internal metrics or performance results | Do not publish                                   |
| Specific personal contributions         | Describe only what you're authorized to disclose |

Safe starting description (use only if it accurately reflects the work):

> **Defender — WordPress Security Plugin**
> Professional contribution at WPMU DEV. Worked on plugin development, maintenance, and improvements as part of the engineering team.

All decisions are final; nothing left to decide before implementation.

---

## Phase 0 — Content (before any UI work)

### Identity

- [x] Write professional designation
- [x] Write short tagline
- [x] Write intro summary (3–4 sentences)
- [x] Write long bio for About page
- [x] Decide availability status text
- [x] Prepare profile photo (square, high-res)
- [x] Prepare cover banner artwork
- [x] Update resume PDF

### Projects

- [x] Write Defender and Beehive entries using the safe starting description format
- [x] Expand Defender and Beehive case studies only to the extent approved
- [x] For each featured project, write case study: problem → role → approach → result
- [x] For each featured project, capture full screenshots at original aspect ratio
- [x] For each featured project, prepare one hand-cropped 4:3 thumbnail (key UI visible, not auto-cropped)
- [x] For each featured project, collect links: live demo / plugin page / repo
- [x] Mark which links are private and should be hidden

### Proof & Validation

- [x] Verify every statistic with a source (e.g. 38+ plugins, CORS plugin installs)
- [x] Verify current CORS plugin installation/adoption statistics
- [x] Don't call adoption counts "active installs" without evidence
- [x] Verify public attribution for company-owned products
- [x] Distinguish personal projects from professional contributions
- [x] Verify experience durations against actual start dates
- [x] Prepare fallback content where metrics or testimonials are unavailable
- [x] Write experience entries: WPMU DEV, independent plugin development, Fiverr
- [x] Write education entries: IDB-BISEW IT Scholarship, Web Application Development diploma
- [x] Write tech stack entries with evidence (years used / projects used in), not proficiency levels
- [x] Only list technologies with demonstrable project usage

---

## Phase 1 — Initial Launch

### 1.1 Project Setup

- [x] Initialize SvelteKit 2 project with TypeScript
- [x] Pin SvelteKit 2 and commit the dependency lockfile
- [x] Install Tailwind CSS v4 (`@tailwindcss/vite`, CSS-first config with `@theme`)
- [x] Install and configure `adapter-static`
- [x] Install `@lucide/svelte` for UI icons
- [x] Add Simple Icons (or approved SVGs) for brand/technology logos
- [x] Configure ESLint and Prettier
- [x] Configure fonts (self-hosted or preloaded, `font-display: swap`)
- [x] Define theme tokens as CSS variables (light + dark)
- [x] Create `src/lib/site.ts` — single source for name, email, social links, resume URL, availability
- [x] Define production site URL and GA4 measurement ID as public env vars (`PUBLIC_SITE_URL`, `PUBLIC_GA_ID`)
- [x] Define TypeScript types: Project, Tech, Experience, Education
- [x] Create base UI components: Button, Card, Badge, Avatar

### 1.2 Content Pipeline

- [x] Configure mdsvex and verify it works with SvelteKit 2
- [x] Create `content/projects` directory
- [x] Create `content/blog` directory (empty until Phase 3)
- [x] Define required project frontmatter fields
- [x] Define required blog frontmatter fields
- [x] Implement content discovery with `import.meta.glob`
- [x] Validate required frontmatter and unique slugs (fail the build on error)
- [x] Exclude draft/unpublished content from production builds, generated routes and the sitemap
- [x] Generate project index from Markdown metadata

### 1.3 Theme

- [x] Use one `data-theme` attribute on the document root
- [x] Match the Tailwind `@custom-variant dark` to the `data-theme` selector
- [x] Inline script in `app.html` `<head>` to apply saved theme before render (prevents flash)
- [x] Theme toggle component
- [x] Persist choice in localStorage; handle access failures gracefully
- [x] Follow system color scheme changes when no override is saved
- [x] If a CSP header is configured: allow the theme init script (hash or nonce) — N/A (no CSP configured)

### 1.4 Header

- [x] Sticky Facebook-style header, ~56px (respect safe-area inset)
- [x] Left: brand name/logo (own mark)
- [x] Center: site-level tabs with Facebook-style active underline — Home now; dedicated pages added in Phase 2
- [x] Right: circular icon buttons (social, theme toggle) + small avatar
- [x] Header does not repeat profile section links
- [x] Hide unfinished routes (Blog) from navigation
- [x] No command palette trigger until that feature exists
- [x] Active link highlight with `aria-current`
- [x] Social icons (from `site.ts`, Simple Icons)
- [x] Theme toggle
- [x] Facebook-style mobile navigation
- [x] Mobile menu: Esc to close, restore focus to the toggle on close
- [x] Trap focus only if the mobile menu is a modal drawer/dialog

### 1.5 Profile Header

- [x] Cover at Facebook profile cover proportions (optimized image)
- [x] Circular avatar (~168px desktop) overlapping the cover bottom edge
- [x] Name, designation, tagline positioned like a Facebook profile identity block
- [x] Location: Barisal, Bangladesh
- [x] Current workplace: WPMU DEV
- [x] Availability status (from `site.ts`)
- [x] CTA: Hire Me / Contact
- [x] CTA: Download Resume
- [x] More Actions dropdown: Book a Meeting, Copy Email (accessible menu pattern)
- [x] Profile actions right-aligned on desktop, full-width row on mobile
- [x] Separator line, then profile tabs: Posts (`/#feed`), About (`/#about`), Projects (`/#projects`), Experience (`/#experience`)
- [x] Active profile tab highlight with `aria-current`
- [x] Facebook-style responsive profile behavior (centered avatar and name on mobile)

### 1.6 Featured Projects Carousel

- [x] Carousel wrapped in `<section id="projects">`
- [x] Carousel built with CSS scroll-snap (no JS library)
- [x] Compact Facebook-style horizontally scrolling preview cards: thumbnail, title, one-line description, status badge, View Details
- [ ] Card images use the curated 4:3 thumbnails; spacing matches reference
- [x] Keep carousel short; detailed content stays in the feed (no duplication)
- [x] Prev/next buttons, hidden when no overflow, disabled at scroll boundaries
- [x] Respect reduced motion for programmatic scrolling
- [ ] Usable without JavaScript (native horizontal scroll)
- [x] Keyboard and touch support with accessible names

### 1.7 Two-Column Layout

- [x] Centered container (~1100px); CSS Grid sidebar/feed ~40/60; stacks to one column on mobile like Facebook
- [x] Facebook-style section cards: white surface, ~8px radius, ~16px gaps, card heading spacing per reference
- [x] `min-width: 0` on columns to prevent overflow
- [x] Attach section IDs (`feed`, `about`, `projects`, `experience`) to actual DOM elements, not unforwarded component props

### 1.8 Sidebar

- [x] IntroCard (wrapped in `<section id="about">`): summary, specializations (WordPress/WooCommerce, Shopify Apps, Security, AI/Agent Integration), experience years, workplace, location, education, email, links
- [x] HighlightsCard: verified achievements only, each with source link
- [x] SkillsCloud: tech stack grouped by category, with logos and evidence labels: PHP, JavaScript, React, Vue 3, WordPress, WooCommerce, Node.js, MySQL, Tailwind CSS
- [x] ExperienceCard (wrapped in `<section id="experience">`): company, role, date range, expandable details
- [x] EducationCard

### 1.9 Main Feed

- [ ] Feed wrapped in `<section id="feed">`
- [ ] StatusCard styled like the Facebook post composer: small avatar + rounded surface showing current focus and tech tags (no manual timestamp, or pull at build time)
- [ ] StatusCard is clearly read-only — must not look like visitors can type or post
- [ ] ProjectPost styled as a timeline post: header with avatar, name, date and status indicator
- [ ] Post body: overview, problem, stack in Facebook-like post typography; media below the text
- [ ] Facebook-style single image / gallery layouts for post media, screenshots at natural aspect ratio (reserve width/height to avoid layout shift)
- [ ] Horizontal post-action row (Facebook action bar style): Live Demo / Read Case Study / GitHub — hide any that are missing or private
- [ ] Hover, press and focus feedback matching the reference
- [ ] Optional testimonial quote block
- [ ] External links use `rel="noopener noreferrer"`

### 1.10 Project Case Study Page

- [ ] `/projects/[slug]` route from mdsvex content
- [ ] `export const prerender = true` with explicit `entries` from the project index
- [ ] 404 for unknown slugs
- [ ] Hero, overview, role, problem, approach, technical details, stack
- [ ] Screenshot gallery at natural aspect ratio (no cropping)
- [ ] Results (only verified)
- [ ] Live Demo / Repo buttons
- [ ] Related projects
- [ ] Back to Projects link (to `/#projects`)
- [ ] Profile tab anchors reach the right homepage section from this page
- [ ] Per-project title, description, OG image

### 1.11 Contact

- [ ] Email shown as selectable text + Copy button
- [ ] Meeting booking link
- [ ] LinkedIn / GitHub links

### 1.12 Footer

- [ ] Brand, nav links, social links (from `site.ts`), email
- [ ] Copyright with dynamic year
- [ ] Back to Top

### 1.13 SEO

- [ ] Reusable SEO component for page metadata
- [ ] Global title template
- [ ] Unique title and meta description on every page (case studies generated from frontmatter)
- [ ] Canonical URLs built from `PUBLIC_SITE_URL` (decide trailing-slash behavior)
- [ ] Open Graph + X card metadata (absolute public URLs for images)
- [ ] Default social share image (1200×630) + per-project images
- [ ] Favicon
- [ ] `sitemap.xml` generated from all indexable public routes (homepage, published case studies, later pages), excluding drafts and error pages
- [ ] `robots.txt` with sitemap reference
- [ ] `noindex` on preview/staging deployments
- [ ] Person structured data on homepage (verified name, job title, URL, social profiles)
- [ ] Custom 404 page

### 1.14 Analytics (GA4)

- [ ] Create GA4 property and web data stream
- [ ] Load gtag only in production, from `PUBLIC_GA_ID`
- [ ] Analytics failure never blocks rendering or navigation
- [ ] Choose one page_view method for client-side navigation: GA4 Enhanced Measurement history-change tracking OR manual `page_view` in `afterNavigate` — not both
- [ ] Keep Enhanced Measurement outbound clicks and file downloads on for general reporting only — never mark them as key events
- [ ] Distinct custom events for important actions: `contact_click`, `copy_email`, `resume_download`, `meeting_click`, `live_demo_click`, `github_click`
- [ ] Mark `contact_click`, `copy_email`, `resume_download` and `meeting_click` as key events
- [ ] Event names describe clicks, not completed contacts or bookings
- [ ] Set data retention to the longest available option
- [ ] Exclude own traffic (internal traffic filter)
- [ ] Never send email addresses or other personal data in event parameters
- [ ] Decide on Consent Mode based on visitor regions; add a short privacy note to the site
- [ ] If a CSP header is configured: allow Google Analytics domains

### 1.15 Search Console & Bing

- [ ] Create Search Console domain property and verify via DNS
- [ ] Submit `sitemap.xml`
- [ ] Inspect homepage and featured project URLs
- [ ] Register in Bing Webmaster Tools (import from Search Console) and submit sitemap

### 1.16 Pre-Launch Checks

- [ ] `svelte-check` and lint pass
- [ ] Production build passes
- [ ] Every intended project URL exists in the static output
- [ ] Direct navigation to every prerendered project URL works
- [ ] One Playwright smoke test: home loads, theme toggles, project page opens, resume link works
- [ ] Smoke check with JavaScript disabled: core content and navigation readable
- [ ] No dark-theme flash on initial load
- [ ] Broken link check (internal + external)
- [ ] All contact links and resume download verified
- [ ] Lighthouse: Performance, Accessibility, SEO, Best Practices
- [ ] View source: metadata and primary content present in prerendered HTML
- [ ] Compare desktop and mobile builds side by side with the reference screenshots (light + dark)
- [ ] Profile hierarchy recognizable at a glance; project posts read as timeline posts
- [ ] Contrast check on secondary text and blue accent in both themes
- [ ] Quick usability check with 2–3 real people: can they find a project, the resume and contact without help?
- [ ] Validate Person JSON-LD with Schema Markup Validator (validator.schema.org) and Google Rich Results Test
- [ ] Manual check on a real phone

### 1.17 Deploy

- [ ] Prerender all routes
- [ ] Test on a deployment preview before production
- [ ] Verify the actual 404 HTTP response on the host
- [ ] Verify canonical URLs and trailing-slash behavior on the host
- [ ] Custom domain + HTTPS
- [ ] Cache headers for static assets
- [ ] Git-based auto deploy
- [ ] Verify social share previews in production
- [ ] Preview deployment is not indexable
- [ ] GA4 Realtime: initial pageview recorded once; client-side route change recorded once
- [ ] GA4 DebugView: every key event fires in production

### Launch Completion Criteria

Header, hero, featured carousel, sidebar, feed, case study pages, contact actions and resume download all work in production, anchor navigation reaches every section, every published number is verified, GA4 records pageviews and key events, and the sitemap is submitted in Search Console.

---

## Phase 2 — Depth Pages

### 2.1 About Page

- [ ] `/about` route
- [ ] Bio, career background, specializations, current focus
- [ ] Technical philosophy
- [ ] Tools and technologies
- [ ] Achievements, education
- [ ] Contact CTA
- [ ] Add `/about` to global header navigation; profile About tab keeps `/#about`

### 2.2 Experience Page

- [ ] `/experience` route
- [ ] Reusable timeline component
- [ ] WPMU DEV, independent development, Fiverr entries
- [ ] Responsibilities, achievements, tech tags, project links
- [ ] Add `/experience` to global header navigation; profile Experience tab keeps `/#experience`

### 2.3 Contact Form (if still needed)

- [ ] Integrate a third-party form service (keeps the site static)
- [ ] Fields: name, email, subject, message
- [ ] Client-side validation
- [ ] Service-side validation
- [ ] Spam protection (Turnstile or honeypot)
- [ ] Success and error states
- [ ] Privacy note on what happens to submitted data
- [ ] Track form submission success as a GA4 key event

### 2.4 SEO & Analytics Review (monthly)

- [ ] Search Console: indexing coverage, pages missing from the index
- [ ] Search Console: queries with impressions but low CTR → improve titles/descriptions
- [ ] GA4: most-visited project pages and which sources lead to key events
- [ ] Check 404 traffic and broken inbound links
- [ ] Check Core Web Vitals report

---

## Phase 3 — Blog & Discovery

### 3.1 Blog (start only after 3 posts are written)

- [ ] Write first 3 posts
- [ ] `/blog` listing with cards: title, excerpt, date, reading time, tags, cover
- [ ] `/blog/[slug]` with article typography, prerendered with `entries`
- [ ] Syntax highlighting + copy-code button
- [ ] Table of contents
- [ ] Related posts
- [ ] Unique metadata per article + BlogPosting structured data
- [ ] Published and modified dates
- [ ] Published posts in sitemap; drafts excluded
- [ ] Internal links between related articles and project case studies
- [ ] RSS feed
- [ ] Show Blog in nav

### 3.2 Project Feed Features (when 15+ projects)

- [ ] `/projects` listing route
- [ ] Category filters: All, WordPress Plugins, WooCommerce, Shopify Apps, Web Apps, AI/Integrations
- [ ] Search
- [ ] Sort by date; featured first
- [ ] Load More
- [ ] Empty result message
- [ ] Sync filters with URL query params

### 3.3 Command Palette

- [ ] Cmd/Ctrl + K shortcut
- [ ] Modal with focus management
- [ ] Search pages, projects, posts
- [ ] Arrow-key navigation
- [ ] Show trigger in header

---

## Phase 4 — Optional Enhancements

- [ ] GitHub activity / contribution graph (fetched at build time)
- [ ] Repository statistics
- [ ] Dynamic "currently building" status
- [ ] Bangla/English language toggle
- [ ] Page transitions (respect reduced motion)
- [ ] Image lightbox
- [ ] Terminal-style component
- [ ] Now page
- [ ] GA4 explorations/funnels (project view → key event) if traffic justifies it
- [ ] Headless CMS (only if markdown editing becomes painful)
- [ ] Expanded test coverage (Vitest for logic like filtering/search)
