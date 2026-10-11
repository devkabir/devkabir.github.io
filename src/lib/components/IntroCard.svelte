<script lang="ts">
	import Card from './Card.svelte';
	import Badge from './Badge.svelte';
	import { bio, specializations, experiences, educations } from '$lib/profile';
	import { site } from '$lib/site';
	import { track } from '$lib/track';
	import { Briefcase, GraduationCap, MapPin, Calendar, Mail, Globe, Link } from '@lucide/svelte';

	const earliestStart = experiences.reduce(
		(min, exp) => (exp.start < min ? exp.start : min),
		experiences[0]?.start ?? '2020-01'
	);
	const startYear = parseInt(earliestStart.split('-')[0], 10);
	const currentYear = new Date().getFullYear();
	const experienceYears = `${Math.max(1, currentYear - startYear)}+ years experience`;

	const firstEducation = educations[0];
</script>

<Card>
	<h2 id="about-heading" class="text-lg font-bold text-text">Intro</h2>
	<p class="mt-2 text-sm text-muted">{bio.intro}</p>

	{#if specializations.length > 0}
		<div class="mt-3 flex flex-wrap gap-1.5">
			{#each specializations as spec}
				<Badge>{spec}</Badge>
			{/each}
		</div>
	{/if}

	<ul class="mt-4 space-y-2 text-sm text-text">
		<li class="flex items-center gap-2.5">
			<Calendar class="size-4 shrink-0 text-muted" aria-hidden="true" />
			<span>{experienceYears}</span>
		</li>

		{#if site.workplace}
			<li class="flex items-center gap-2.5">
				<Briefcase class="size-4 shrink-0 text-muted" aria-hidden="true" />
				<span>Works at <strong class="font-semibold">{site.workplace}</strong></span>
			</li>
		{/if}

		{#if site.location}
			<li class="flex items-center gap-2.5">
				<MapPin class="size-4 shrink-0 text-muted" aria-hidden="true" />
				<span>Lives in <strong class="font-semibold">{site.location}</strong></span>
			</li>
		{/if}

		{#if firstEducation}
			<li class="flex items-center gap-2.5">
				<GraduationCap class="size-4 shrink-0 text-muted" aria-hidden="true" />
				<span class="break-words"
					>Studied at <strong class="font-semibold">{firstEducation.institution}</strong></span
				>
			</li>
		{/if}

		{#if site.email}
			<li class="flex items-center gap-2.5">
				<Mail class="size-4 shrink-0 text-muted" aria-hidden="true" />
				<a
					href="mailto:{site.email}"
					onclick={() => track('contact_click')}
					class="inline-flex min-h-11 items-center font-medium text-accent hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
				>
					{site.email}
				</a>
			</li>
		{/if}

		{#each site.socials as social}
			{#if social.url}
				<li class="flex items-center gap-2.5">
					{#if social.label.toLowerCase() === 'github'}
						<Globe class="size-4 shrink-0 text-muted" aria-hidden="true" />
					{:else}
						<Link class="size-4 shrink-0 text-muted" aria-hidden="true" />
					{/if}
					<a
						href={social.url}
						target="_blank"
						rel="noopener noreferrer"
						onclick={() => {
							if (social.label.toLowerCase() === 'github') track('github_click');
						}}
						class="inline-flex min-h-11 items-center font-medium text-accent hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
					>
						{social.label}
					</a>
				</li>
			{/if}
		{/each}
	</ul>
</Card>
