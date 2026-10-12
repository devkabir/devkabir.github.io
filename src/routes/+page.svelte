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
	import {
		ChevronLeft,
		ChevronRight,
		ChevronUp,
		ChevronDown,
		MapPin,
		Briefcase
	} from '@lucide/svelte';

	let isProjectsExpanded = $state(true);

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

	$effect(() => {
		if (page.url.hash === '#projects') {
			isProjectsExpanded = true;
		}
	});

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

<div class="w-full border-b border-line bg-card shadow-xs">
	<div class="mx-auto md:max-w-[1200px]">
		<!-- Cover Photo -->
		<div
			class="relative aspect-[138/77] w-full overflow-hidden rounded-b-lg sm:aspect-auto sm:h-[20rem] md:h-[22rem]"
		>
			<img
				src="/images/cover.png"
				alt=""
				width="1376"
				height="768"
				fetchpriority="high"
				class="h-full w-full object-cover"
			/>
		</div>

		<!-- Identity & Actions Section -->
		<div class="px-4">
			<div
				class="flex flex-col items-center text-center md:flex-row md:items-center md:gap-6 md:text-left"
			>
				<!-- Avatar: overlaps cover on mobile/sm, normal flow (no overlap) on md+ -->
				<div class="relative z-10 -mt-20 shrink-0 sm:-mt-24 md:mt-4 md:mb-0">
					<img
						src="/images/avatar.png"
						alt={site.name}
						width="168"
						height="168"
						fetchpriority="high"
						class="h-[140px] w-[140px] rounded-full object-cover ring-4 ring-card sm:h-[168px] sm:w-[168px]"
					/>
				</div>

				<!-- Identity Text & Actions Container -->
				<div
					class="mt-3 flex w-full max-w-2xl flex-col items-center md:mt-0 md:max-w-none md:flex-1 md:items-start"
				>
					<!-- Top Row: Name on the left, Actions on the right on md+ -->
					<div
						class="flex w-full flex-col items-center gap-3 md:flex-row md:items-center md:justify-between"
					>
						<div>
							<!-- Name -->
							<h1 class="text-2xl font-bold tracking-tight text-text sm:text-3xl">
								{site.name}
							</h1>

							<!-- Title / Subtitle -->
							<p class="mt-0.5 text-sm font-medium text-text">{site.title}</p>
						</div>

						<!-- Action Buttons Row -->
						<div
							class="mt-3 flex flex-wrap items-center justify-center gap-2 md:mt-0 md:shrink-0 md:justify-end"
						>
							{#if site.email}
								<Button
									href="mailto:{site.email}"
									onclick={() => track('contact_click')}
									class="px-4"
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
									class="px-4"
								>
									Download Resume
								</Button>
							{/if}

							<button
								type="button"
								onclick={() => (isProjectsExpanded = !isProjectsExpanded)}
								aria-expanded={isProjectsExpanded}
								aria-controls="projects"
								aria-label={isProjectsExpanded
									? 'Collapse Featured Projects'
									: 'Expand Featured Projects'}
								class="inline-flex min-h-11 min-w-11 cursor-pointer items-center justify-center rounded-md bg-hover px-3 py-2 text-sm font-semibold text-text transition-colors hover:bg-line/40 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
							>
								{#if isProjectsExpanded}
									<ChevronUp class="size-5" />
								{:else}
									<ChevronDown class="size-5" />
								{/if}
							</button>
						</div>
					</div>

					<!-- Tagline -->
					<p class="mt-2 text-sm text-text">{site.tagline}</p>

					<!-- Location & Workplace Details -->
					<div
						class="mt-2 flex flex-wrap items-center justify-center gap-x-3 gap-y-1 text-xs font-medium text-text md:justify-start"
					>
						{#if site.location}
							<span class="inline-flex items-center gap-1">
								<MapPin class="size-3.5 text-text" aria-hidden="true" />
								{site.location}
							</span>
						{/if}
						{#if site.workplace}
							<span class="inline-flex items-center gap-1">
								<Briefcase class="size-3.5 text-text" aria-hidden="true" />
								{site.workplace}
							</span>
						{/if}
						{#if site.availability}
							<span class="text-accent">{site.availability}</span>
						{/if}
					</div>
				</div>
			</div>

			<!-- Featured Projects Section (Collapsible) -->
			<section
				id="projects"
				aria-labelledby="projects-heading"
				class="mt-4"
				class:hidden={!isProjectsExpanded}
			>
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
						class="no-scrollbar flex snap-x snap-mandatory gap-4 overflow-x-auto pb-2"
					>
						{#each featuredProjects as project (project.slug)}
							<li class="w-[17rem] shrink-0 snap-start">
								<a
									href="/projects/{project.slug}"
									class="group flex h-full flex-col overflow-hidden rounded-md border border-line bg-card transition-colors hover:border-accent/40 hover:bg-hover/30 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
								>
									<img
										src={project.thumb}
										alt=""
										width="272"
										height="208"
										loading="lazy"
										class="h-[13rem] w-full object-cover"
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
<div class="mx-auto w-full px-4 py-4 md:max-w-[1200px]">
	<div class="grid grid-cols-1 gap-4 md:grid-cols-[2fr_3fr]">
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
