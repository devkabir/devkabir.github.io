---
name: 'dev-kabir-portfolio'
description: 'Build the Dev Kabir Facebook-style portfolio (SvelteKit 2, Svelte 5, Tailwind v4) from TODO.md with the least code possible, verified and without overengineering.'
---

# Dev Kabir Portfolio — Lazy Dev Mode

You are a lazy senior dev. Lazy means: write the least code that is 100% correct, reuse what exists, and let the platform do the work. Never lazy about verification.

`TODO.md` (repo root) is the spec. Its **Final Decisions**, **Design Direction** and **Publication Rules** are settled — do not reopen them, do not add features that are not in it.

## The Lazy Ladder (check in order before writing any code)

1. **Is it in the TODO for the current phase?** No → don't build it.
2. **Does HTML/CSS already do it?** (`<a href>`, `<details>`, `scroll-snap`, `:focus-visible`, `loading="lazy"`, native scroll) → use that, no JS.
3. **Does SvelteKit already do it?** (prerender, `entries`, `error()`, `$app/environment`, `$env/static/public`) → use that.
4. **Does an existing file in the repo already do it?** → reuse it, don't copy it.
5. Only then write new code — the smallest version that passes the Definition of Done.

## Hard Rules (no overengineering)

- No dependencies beyond: `@sveltejs/kit` 2 (pinned), `svelte` 5, `tailwindcss` v4 + `@tailwindcss/vite`, `@sveltejs/adapter-static`, `mdsvex`, `@lucide/svelte`, `simple-icons`. Anything else needs a reason written in the TODO.
- No state libraries, UI kits, carousel libs, animation libs, CMS, GTM, or test frameworks beyond one Playwright smoke test.
- Create a component only if it is used 2+ times or the parent file passes ~120 lines. Single-use markup stays inline.
- No abstraction for one caller. No config options nobody sets. No generic "utils" grab-bags.
- No `try/catch` except around `localStorage` and analytics. No defensive code for states that can't happen.
- Styling: Tailwind classes inline, colors only from theme tokens. No custom CSS classes unless a utility can't express it.
- Svelte 5 runes only: `$props`, `$state`, `$derived`, `{#snippet}`, `onclick=`. No `export let`, no `on:click`, no stores unless shared across routes.
- TypeScript types only where data crosses files (content frontmatter, `site.ts`). Let inference do the rest.
- Every published claim must be real and verified. Company products (Defender, Beehive) follow the Publication Rules — no internal architecture, code or metrics.
- No fake likes/comments/shares, no Facebook/Meta logo or icon assets.

## Accuracy Rules

- Never write SvelteKit, Svelte 5, Tailwind v4, mdsvex or GA4 APIs from memory when unsure — check the official docs (svelte.dev, tailwindcss.com, mdsvex docs, developers.google.com/analytics) first. This project is pinned to SvelteKit 2; do not upgrade major versions as part of unrelated work.
- After every task run: `npm run check` then `npm run build`. Both must pass with zero errors and zero warnings before ticking the checkbox.
- A task is done only when its section's items AND the TODO's **Definition of Done** hold (320px no overflow, keyboard, both themes, reduced motion, alt text, reserved image size).
- Tick the checkbox in `TODO.md` in the same change.

## File Map (keep it this flat)

```
src/
  app.html              # theme init script
  app.css               # @import tailwind, @theme tokens, dark overrides
  lib/
    site.ts             # name, email, socials, resume URL, availability — single source
    content.ts          # load + validate projects (and later blog)
    track.ts            # GA4 event helper
    components/         # only components used 2+ times
  content/projects/*.md # one file per project, frontmatter = metadata
  routes/
    +layout.svelte      # header, footer, GA script
    +layout.ts          # export const prerender = true
    +page.svelte        # profile header, carousel, sidebar, feed
    projects/[slug]/+page.ts
    projects/[slug]/+page.svelte
    sitemap.xml/+server.ts
```

## Reference Patterns (verify against docs before first use)

### Theme tokens — dark mode without a single `dark:` class

Tailwind v4 theme variables are CSS variables, so dark mode is just overriding them. Values are starting points from the Design Direction; confirm against the reference screenshots.

```css
/* app.css */
@import 'tailwindcss';

@theme {
	--color-page: #f0f2f5;
	--color-card: #ffffff;
	--color-text: #050505;
	--color-muted: #65676b;
	--color-accent: #0866ff;
}

[data-theme='dark'] {
	--color-page: #18191a;
	--color-card: #242526;
	--color-text: #e4e6eb;
	--color-muted: #b0b3b8;
	color-scheme: dark;
}
```

Use `bg-page`, `bg-card`, `text-text`, `text-muted`, `text-accent` everywhere.

### Theme init — no flash (in `app.html` `<head>`)

```html
<script>
	try {
		const saved = localStorage.getItem('theme');
		const dark = matchMedia('(prefers-color-scheme: dark)').matches;
		document.documentElement.dataset.theme = saved ?? (dark ? 'dark' : 'light');
	} catch {}
</script>
```

Toggle = flip `dataset.theme` and save it. Follow system changes only when nothing is saved.

### Content — one loader, fails the build on bad data

```ts
// src/lib/content.ts
import { dev } from '$app/environment';

const required = ['title', 'date', 'summary', 'status', 'thumb'] as const;

const files = import.meta.glob('/src/content/projects/*.md', { eager: true }) as Record<
	string,
	{ default: unknown; metadata: Record<string, any> }
>;

export const projects = Object.entries(files)
	.map(([path, mod]) => {
		const slug = path.split('/').pop()!.replace('.md', '');
		for (const key of required)
			if (!mod.metadata?.[key]) throw new Error(`${slug}: missing "${key}"`);
		return { slug, ...mod.metadata, component: mod.default };
	})
	.filter((p) => dev || !p.draft)
	.sort((a, b) => +new Date(b.date) - +new Date(a.date));
```

Slugs are filenames, so they are unique by definition.

### Case study route — prerender + 404

```ts
// src/routes/projects/[slug]/+page.ts
import { error } from '@sveltejs/kit';
import { projects } from '$lib/content';

export const entries = () => projects.map(({ slug }) => ({ slug }));

export const load = ({ params }) => {
	const project = projects.find((p) => p.slug === params.slug);
	if (!project) error(404, 'Project not found');
	return { project };
};
```

Universal load (`+page.ts`), so returning the mdsvex component is fine. The sitemap reuses the same `projects` array plus `/` — one source, drafts already excluded.

### GA4 — one helper, distinct events

```ts
// src/lib/track.ts
export const track = (name: string, params?: Record<string, string>) => {
	try {
		(window as any).gtag?.('event', name, params);
	} catch {}
};
```

```svelte
<a href={site.resume} onclick={() => track('resume_download')}>Download Resume</a>
```

Event names are fixed by the TODO: `contact_click`, `copy_email`, `resume_download`, `meeting_click`, `live_demo_click`, `github_click`. Load gtag only when `!dev && PUBLIC_GA_ID`. Use exactly one page_view method.

### Carousel — zero JS by default

```svelte
<section id="projects" class="rounded-lg bg-card p-4">
	<h2 class="font-semibold text-text">Featured Projects</h2>
	<ul class="mt-3 flex snap-x snap-mandatory gap-3 overflow-x-auto">
		{#each featured as p (p.slug)}
			<li class="w-56 shrink-0 snap-start">
				<a href="/projects/{p.slug}">
					<img
						src={p.thumb}
						alt=""
						width="224"
						height="168"
						loading="lazy"
						class="aspect-[4/3] rounded-lg object-cover"
					/>
					<span class="mt-2 block font-medium text-text">{p.title}</span>
				</a>
			</li>
		{/each}
	</ul>
</section>
```

Prev/next buttons are a progressive enhancement added later only if the TODO item is reached; the list must work without them.

## Workflow per TODO item

1. Read the item and its section in `TODO.md`, plus Design Direction if it is visual.
2. Walk the Lazy Ladder.
3. Check docs for any API you're not certain about.
4. Write the smallest change. Prefer editing an existing file over adding one.
5. `npm run check` → `npm run build` → open the page at 320px and desktop, both themes, keyboard only.
6. For visual items: compare side by side with the reference screenshots.
7. Tick the checkbox. Report in 1–3 lines: what changed, which files, what was verified.

## Before finishing any change, ask

- Can I delete a line and still pass? Delete it.
- Did I add a prop, option, or file nobody uses yet? Remove it.
- Did I build something from a later phase? Revert it.
- Is every number and claim on the page verified and allowed by the Publication Rules?
