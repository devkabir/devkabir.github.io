<script lang="ts">
	import type { Project } from '$lib/types';
	import Card from './Card.svelte';
	import Avatar from './Avatar.svelte';
	import Badge from './Badge.svelte';
	import { site } from '$lib/site';
	import { formatPeriod } from '$lib/profile';
	import { track } from '$lib/track';
	import { ExternalLink, BookOpen, GitFork } from '@lucide/svelte';

	interface Props {
		project: Project;
		isFirst?: boolean;
	}

	let { project, isFirst = false }: Props = $props();

	// Format project.date (e.g. "2024-03-01" -> "Mar 2024")
	let formattedDate = $derived(
		project.date ? formatPeriod(project.date.slice(0, 7)).replace(' – Present', '') : ''
	);
</script>

<article>
	<Card class="overflow-hidden p-0">
		<!-- Post Header -->
		<div class="flex items-center gap-3 p-4 pb-3">
			<Avatar src="/images/avatar.png" alt={site.name} size={40} class="shrink-0" />
			<div class="min-w-0 flex-1">
				<div class="flex flex-wrap items-center gap-x-2 gap-y-1">
					<span class="text-sm font-semibold text-text">{site.name}</span>
					<Badge class="shrink-0">{project.status}</Badge>
				</div>
				<div class="mt-0.5 text-xs text-muted">
					{#if project.date}
						<time datetime={project.date}>{formattedDate}</time>
					{/if}
				</div>
			</div>
		</div>

		<!-- Post Body -->
		<div class="space-y-3 px-4 pb-3">
			<h3 class="text-base font-semibold text-text">
				{project.title}
			</h3>

			<p class="text-sm leading-relaxed text-text">
				{project.summary}
			</p>

			{#if project.problem}
				<div class="text-sm leading-relaxed text-text">
					<strong class="font-medium text-muted">Problem: </strong>
					<span>{project.problem}</span>
				</div>
			{/if}

			{#if project.tech && project.tech.length > 0}
				<div class="flex flex-wrap gap-1.5 pt-1" aria-label="Technologies used">
					{#each project.tech as tag}
						<Badge>{tag}</Badge>
					{/each}
				</div>
			{/if}
		</div>

		<!-- Media: natural aspect ratio (1376x768), full-bleed -->
		<div class="border-y border-line bg-page">
			<img
				src="/images/projects/{project.slug}-full.png"
				alt="Screenshot of {project.title} interface"
				width="1376"
				height="768"
				loading={isFirst ? 'eager' : 'lazy'}
				class="h-auto w-full object-contain"
			/>
		</div>

		<!-- Action Row -->
		<div class="flex flex-wrap items-center divide-x divide-line text-sm">
			{#if project.demo}
				<a
					href={project.demo}
					target="_blank"
					rel="noopener noreferrer"
					onclick={() => track('live_demo_click')}
					class="inline-flex min-h-11 min-w-[7.5rem] flex-1 items-center justify-center gap-2 px-3 py-2 font-medium text-text transition-colors hover:bg-hover focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent active:bg-line/40"
				>
					<ExternalLink class="size-4 shrink-0 text-muted" aria-hidden="true" />
					<span>Live Demo</span>
				</a>
			{/if}

			<a
				href="/projects/{project.slug}"
				class="inline-flex min-h-11 min-w-[7.5rem] flex-1 items-center justify-center gap-2 px-3 py-2 font-medium text-text transition-colors hover:bg-hover focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent active:bg-line/40"
			>
				<BookOpen class="size-4 shrink-0 text-muted" aria-hidden="true" />
				<span>Read Case Study</span>
			</a>

			{#if project.repo}
				<a
					href={project.repo}
					target="_blank"
					rel="noopener noreferrer"
					onclick={() => track('github_click')}
					class="inline-flex min-h-11 min-w-[7.5rem] flex-1 items-center justify-center gap-2 px-3 py-2 font-medium text-text transition-colors hover:bg-hover focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent active:bg-line/40"
				>
					<GitFork class="size-4 shrink-0 text-muted" aria-hidden="true" />
					<span>GitHub</span>
				</a>
			{/if}
		</div>
	</Card>
</article>
