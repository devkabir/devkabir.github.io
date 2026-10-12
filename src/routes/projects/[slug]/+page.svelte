<script lang="ts">
	import type { PageData } from './$types';
	import { projects } from '$lib/content';
	import { formatPeriod } from '$lib/profile';
	import { track } from '$lib/track';
	import Badge from '$lib/components/Badge.svelte';
	import Button from '$lib/components/Button.svelte';
	import Card from '$lib/components/Card.svelte';
	import Seo from '$lib/components/Seo.svelte';
	import { ChevronLeft, ExternalLink, GitFork } from '@lucide/svelte';

	let { data }: { data: PageData } = $props();
	let project = $derived(data.project);

	let formattedDate = $derived(
		project.date ? formatPeriod(project.date.slice(0, 7)).replace(' – Present', '') : ''
	);

	let relatedProjects = $derived(projects.filter((p) => p.slug !== project.slug));

	const tabs = [
		{ label: 'Posts', href: '/#feed' },
		{ label: 'About', href: '/#about' },
		{ label: 'Projects', href: '/#projects' },
		{ label: 'Experience', href: '/#experience' }
	];
</script>

<Seo
	title={project.title}
	description={project.summary}
	image="/images/projects/{project.slug}-full.png"
	type="article"
/>

<div class="mx-auto max-w-[1200px] px-4 py-4">
	<!-- Profile tab navigation anchors -->
	<nav
		aria-label="Profile navigation"
		class="mb-4 flex gap-1 overflow-x-auto rounded-card border-b border-line bg-card px-2 pt-1"
	>
		{#each tabs as tab}
			<a
				href={tab.href}
				class="flex min-h-11 items-center border-b-4 border-transparent px-4 py-2 text-sm font-semibold whitespace-nowrap text-muted transition-colors hover:bg-hover hover:text-text"
			>
				{tab.label}
			</a>
		{/each}
	</nav>

	<!-- Back to Projects link -->
	<div class="mb-4">
		<a
			href="/#projects"
			class="inline-flex min-h-11 items-center gap-1 text-sm font-semibold text-accent transition-colors hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
		>
			<ChevronLeft class="size-4 shrink-0" aria-hidden="true" />
			<span>Back to Projects</span>
		</a>
	</div>

	<div class="flex flex-col gap-4">
		<!-- Hero Card -->
		<Card class="flex flex-col gap-4 p-4 sm:p-6">
			<div class="flex flex-wrap items-center gap-2">
				<Badge>{project.status}</Badge>
				{#if project.date}
					<time datetime={project.date} class="text-xs text-muted">{formattedDate}</time>
				{/if}
			</div>

			<h1 class="text-2xl font-bold tracking-tight text-text sm:text-3xl">
				{project.title}
			</h1>

			<p class="text-base leading-relaxed text-muted">
				{project.summary}
			</p>

			{#if project.tech && project.tech.length > 0}
				<div class="flex flex-wrap gap-1.5" aria-label="Technologies used">
					{#each project.tech as tag}
						<Badge>{tag}</Badge>
					{/each}
				</div>
			{/if}

			{#if project.demo || project.repo}
				<div class="flex flex-wrap gap-3 pt-2">
					{#if project.demo}
						<Button
							href={project.demo}
							target="_blank"
							rel="noopener noreferrer"
							onclick={() => track('live_demo_click')}
						>
							<ExternalLink class="size-4 shrink-0" aria-hidden="true" />
							<span>Live Demo</span>
						</Button>
					{/if}
					{#if project.repo}
						<Button
							variant="secondary"
							href={project.repo}
							target="_blank"
							rel="noopener noreferrer"
							onclick={() => track('github_click')}
						>
							<GitFork class="size-4 shrink-0" aria-hidden="true" />
							<span>Repository</span>
						</Button>
					{/if}
				</div>
			{/if}

			<!-- Hero image -->
			<div class="overflow-hidden rounded-md border border-line bg-page">
				<img
					src="/images/projects/{project.slug}-full.png"
					alt="Full screenshot of {project.title} interface"
					width="1376"
					height="768"
					loading="eager"
					fetchpriority="high"
					class="h-auto w-full object-contain"
				/>
			</div>
		</Card>

		<!-- Case Study Content: styled without typography plugin -->
		<Card
			class="p-4 sm:p-6 [&>h3]:mt-6 [&>h3]:mb-2 [&>h3]:text-lg [&>h3]:font-bold [&>h3]:text-text [&>h3:first-child]:mt-0 [&>p]:mb-4 [&>p]:text-sm [&>p]:leading-relaxed [&>p]:text-text [&>ul]:mb-4 [&>ul]:list-disc [&>ul]:pl-5 [&>ul]:text-sm [&>ul]:leading-relaxed [&>ul]:text-text [&>ul>li]:mb-1.5"
		>
			<project.component />
		</Card>

		<!-- Related Projects -->
		{#if relatedProjects.length > 0}
			<section aria-labelledby="related-projects-heading">
				<Card class="p-4 sm:p-6">
					<h2 id="related-projects-heading" class="mb-4 text-lg font-bold text-text">
						Related Projects
					</h2>
					<div class="grid grid-cols-1 gap-4 sm:grid-cols-2">
						{#each relatedProjects as rel (rel.slug)}
							<a
								href="/projects/{rel.slug}"
								class="group flex flex-col overflow-hidden rounded-md border border-line bg-card transition-colors hover:border-accent/40 hover:bg-hover/30 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
							>
								<img
									src={rel.thumb}
									alt="Thumbnail preview of {rel.title}"
									width="224"
									height="168"
									loading="lazy"
									class="aspect-[4/3] w-full object-cover"
								/>
								<div class="flex flex-1 flex-col p-3">
									<Badge class="mb-1.5 self-start">{rel.status}</Badge>
									<h3 class="font-semibold text-text group-hover:text-accent">
										{rel.title}
									</h3>
									<p class="mt-1 line-clamp-2 text-xs text-muted">
										{rel.summary}
									</p>
									<span class="mt-auto pt-3 text-xs font-semibold text-accent">
										View Details &rarr;
									</span>
								</div>
							</a>
						{/each}
					</div>
				</Card>
			</section>
		{/if}
	</div>
</div>
