<script lang="ts">
	import { page } from '$app/state';
	import { site } from '$lib/site';
	import { track } from '$lib/track';
	import { projects } from '$lib/content';
	import Badge from '$lib/components/Badge.svelte';
	import Button from '$lib/components/Button.svelte';
	import Card from '$lib/components/Card.svelte';
	import IntroCard from '$lib/components/IntroCard.svelte';
	import HighlightsCard from '$lib/components/HighlightsCard.svelte';
	import SkillsCloud from '$lib/components/SkillsCloud.svelte';
	import ExperienceCard from '$lib/components/ExperienceCard.svelte';
	import EducationCard from '$lib/components/EducationCard.svelte';
	import ContactCard from '$lib/components/ContactCard.svelte';
	import StatusCard from '$lib/components/StatusCard.svelte';
	import ProjectPost from '$lib/components/ProjectPost.svelte';
	import Seo from '$lib/components/Seo.svelte';
	import { env } from '$env/dynamic/public';
	import { ChevronLeft, ChevronRight } from '@lucide/svelte';

	const siteUrl = (env.PUBLIC_SITE_URL || '').replace(/\/+$/, '');
	const personSchema = JSON.stringify({
		'@context': 'https://schema.org',
		'@type': 'Person',
		name: site.name,
		jobTitle: site.title,
		description: site.tagline,
		url: siteUrl ? `${siteUrl}/` : undefined,
		image: siteUrl ? `${siteUrl}/images/avatar.png` : undefined,
		email: `mailto:${site.email}`,
		address: {
			'@type': 'PostalAddress',
			addressLocality: site.location
		},
		worksFor: {
			'@type': 'Organization',
			name: site.workplace
		},
		sameAs: site.socials.map((s) => s.url)
	});

	const tabs = [
		{ label: 'Posts', href: '/#feed' },
		{ label: 'About', href: '/#about' },
		{ label: 'Projects', href: '/#projects' },
		{ label: 'Experience', href: '/#experience' }
	];

	let activeTab = $derived(
		tabs.some((t) => t.href === '/' + page.url.hash) ? page.url.hash : '#feed'
	);

	let menu = $state<HTMLDetailsElement>();

	function closeMenu(e: MouseEvent) {
		if (menu?.open && !menu.contains(e.target as Node)) menu.open = false;
	}

	function copyEmail() {
		track('copy_email');
		try {
			navigator.clipboard.writeText(site.email);
		} catch {}
		if (menu) menu.open = false;
	}

	const featuredProjects = projects.filter((p) => p.featured);

	let carouselEl = $state<HTMLElement>();
	let canScrollPrev = $state(false);
	let canScrollNext = $state(false);
	let isOverflowing = $state(false);

	function updateScrollState() {
		if (!carouselEl) return;
		const { scrollLeft, scrollWidth, clientWidth } = carouselEl;
		isOverflowing = scrollWidth > clientWidth + 1;
		canScrollPrev = scrollLeft > 1;
		canScrollNext = scrollLeft < scrollWidth - clientWidth - 1;
	}

	$effect(() => {
		if (!carouselEl) return;
		updateScrollState();

		const ro = new ResizeObserver(() => updateScrollState());
		ro.observe(carouselEl);
		return () => ro.disconnect();
	});

	function scrollCarousel(direction: 'prev' | 'next') {
		if (!carouselEl) return;
		const distance = carouselEl.clientWidth * 0.75;
		const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
		carouselEl.scrollBy({
			left: direction === 'next' ? distance : -distance,
			behavior: reducedMotion ? 'auto' : 'smooth'
		});
	}
</script>

<Seo />

<svelte:head>
	{@html `<script type="application/ld+json">${personSchema}<\/script>`}
</svelte:head>

<svelte:window onclick={closeMenu} />

<div class="border-b border-line bg-card shadow-xs">
	<div class="mx-auto max-w-[1100px]">
		<!-- Cover Photo -->
		<div class="relative h-48 w-full overflow-hidden sm:h-80 sm:rounded-b-lg md:h-96">
			<img
				src="/images/cover.png"
				alt=""
				width="1100"
				height="384"
				fetchpriority="high"
				class="h-full w-full object-cover"
			/>
		</div>

		<!-- Identity & Actions Section -->
		<div class="px-4 pb-4">
			<div class="flex flex-col items-center sm:flex-row sm:items-end sm:gap-6">
				<!-- Overlapping Avatar -->
				<div class="relative z-10 -mt-16 shrink-0 sm:-mt-20">
					<img
						src="/images/avatar.png"
						alt={site.name}
						width="168"
						height="168"
						fetchpriority="high"
						class="h-[120px] w-[120px] rounded-full object-cover ring-4 ring-card sm:h-[168px] sm:w-[168px]"
					/>
				</div>

				<!-- Identity Text -->
				<div class="mt-3 flex-1 text-center sm:mt-0 sm:text-left">
					<h1 class="text-2xl font-bold tracking-tight text-text sm:text-3xl">{site.name}</h1>
					<p class="font-medium text-text">{site.title}</p>
					<p class="mt-0.5 text-sm text-muted">{site.tagline}</p>
					<div
						class="mt-1 flex flex-wrap items-center justify-center gap-x-2 text-xs text-muted sm:justify-start"
					>
						<span>{site.location}</span>
						<span aria-hidden="true">·</span>
						<span>{site.workplace}</span>
						{#if site.availability}
							<span aria-hidden="true">·</span>
							<span class="text-accent">{site.availability}</span>
						{/if}
					</div>
				</div>

				<!-- Actions -->
				<div
					class="mt-4 flex w-full flex-wrap items-center justify-center gap-2 sm:mt-0 sm:w-auto sm:justify-end"
				>
					{#if site.email}
						<Button
							href="mailto:{site.email}"
							onclick={() => track('contact_click')}
							class="flex-1 sm:flex-none"
						>
							Hire Me
						</Button>
					{/if}

					{#if site.resume}
						<Button
							variant="secondary"
							href={site.resume}
							download
							onclick={() => track('resume_download')}
							class="flex-1 sm:flex-none"
						>
							Download Resume
						</Button>
					{/if}

					<details bind:this={menu} class="relative">
						<summary
							class="inline-flex min-h-11 min-w-11 cursor-pointer list-none items-center justify-center rounded-md bg-hover px-4 py-2 text-sm font-semibold text-text transition-colors hover:bg-line/40 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
							aria-label="More actions"
						>
							•••
						</summary>
						<div
							class="absolute right-0 z-20 mt-1 min-w-44 rounded-md border border-line bg-card p-1 shadow-lg"
						>
							{#if site.meeting}
								<a
									href={site.meeting}
									target="_blank"
									rel="noreferrer"
									onclick={() => {
										track('meeting_click');
										if (menu) menu.open = false;
									}}
									class="flex min-h-11 items-center rounded px-3 py-2 text-sm font-medium text-text hover:bg-hover"
								>
									Book a Meeting
								</a>
							{/if}
							{#if site.email}
								<button
									type="button"
									onclick={copyEmail}
									class="flex min-h-11 w-full items-center rounded px-3 py-2 text-left text-sm font-medium text-text hover:bg-hover"
								>
									Copy Email
								</button>
							{/if}
						</div>
					</details>
				</div>
			</div>

			<hr class="mt-4 border-line" />

			<!-- Profile Navigation Tabs -->
			<nav aria-label="Profile navigation" class="flex gap-1 overflow-x-auto pt-1">
				{#each tabs as tab}
					{@const isActive = tab.href === '/' + activeTab}
					<a
						href={tab.href}
						aria-current={isActive ? 'page' : undefined}
						class="flex min-h-11 items-center border-b-4 px-4 py-2 text-sm font-semibold whitespace-nowrap transition-colors {isActive
							? 'border-accent text-accent'
							: 'border-transparent text-muted hover:bg-hover hover:text-text'}"
					>
						{tab.label}
					</a>
				{/each}
			</nav>
		</div>
	</div>
</div>

<!-- 1.7 Two-Column Layout -->
<div class="mx-auto max-w-[1100px] px-4 py-4">
	<div class="grid grid-cols-1 gap-4 lg:grid-cols-[2fr_3fr]">
		<!-- Sidebar Column (~40%) -->
		<div class="flex min-w-0 flex-col gap-4">
			<section id="about" aria-labelledby="about-heading">
				<IntroCard />
			</section>

			<HighlightsCard />

			<SkillsCloud />

			<section id="experience" aria-labelledby="experience-heading">
				<ExperienceCard />
			</section>

			<EducationCard />

			<section id="contact" aria-labelledby="contact-heading">
				<ContactCard />
			</section>
		</div>

		<!-- Feed Column (~60%) -->
		<div class="flex min-w-0 flex-col gap-4">
			<!-- 1.6 Featured Projects Carousel -->
			<section id="projects" aria-labelledby="projects-heading">
				<Card>
					<div class="mb-3 flex items-center justify-between">
						<h2 id="projects-heading" class="text-lg font-bold text-text">Featured Projects</h2>
						{#if isOverflowing}
							<div class="flex gap-2">
								<button
									type="button"
									onclick={() => scrollCarousel('prev')}
									disabled={!canScrollPrev}
									aria-label="Previous projects"
									class="inline-flex min-h-11 min-w-11 cursor-pointer items-center justify-center rounded-full bg-hover text-text transition-colors hover:bg-line/40 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent disabled:pointer-events-none disabled:opacity-40"
								>
									<ChevronLeft class="size-5" />
								</button>
								<button
									type="button"
									onclick={() => scrollCarousel('next')}
									disabled={!canScrollNext}
									aria-label="Next projects"
									class="inline-flex min-h-11 min-w-11 cursor-pointer items-center justify-center rounded-full bg-hover text-text transition-colors hover:bg-line/40 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent disabled:pointer-events-none disabled:opacity-40"
								>
									<ChevronRight class="size-5" />
								</button>
							</div>
						{/if}
					</div>

					<ul
						bind:this={carouselEl}
						onscroll={updateScrollState}
						class="flex snap-x snap-mandatory gap-4 overflow-x-auto pb-2"
					>
						{#each featuredProjects as project (project.slug)}
							<li class="w-56 shrink-0 snap-start">
								<a
									href="/projects/{project.slug}"
									class="group flex h-full flex-col overflow-hidden rounded-md border border-line bg-card transition-colors hover:border-accent/40 hover:bg-hover/30 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
								>
									<img
										src={project.thumb}
										alt=""
										width="224"
										height="168"
										loading="lazy"
										class="aspect-[4/3] w-full object-cover"
									/>
									<div class="flex flex-1 flex-col p-3">
										<Badge class="mb-1.5 self-start">{project.status}</Badge>
										<h3 class="font-semibold text-text group-hover:text-accent">
											{project.title}
										</h3>
										<p class="mt-1 line-clamp-1 text-xs text-muted">
											{project.summary}
										</p>
										<span class="mt-auto pt-3 text-xs font-semibold text-accent">
											View Details &rarr;
										</span>
									</div>
								</a>
							</li>
						{/each}
					</ul>
				</Card>
			</section>

			<section id="feed" aria-labelledby="feed-heading" class="space-y-4">
				<h2 id="feed-heading" class="sr-only">Posts</h2>
				<StatusCard />
				{#each projects as project, i (project.slug)}
					<ProjectPost {project} isFirst={i === 0} />
				{/each}
			</section>
		</div>
	</div>
</div>
