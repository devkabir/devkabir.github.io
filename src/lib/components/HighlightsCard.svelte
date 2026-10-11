<script lang="ts">
	import Card from './Card.svelte';
	import { highlights } from '$lib/profile';
	import { ExternalLink } from '@lucide/svelte';

	const activeHighlights = highlights.filter((h) => Boolean(h.source));
</script>

{#if activeHighlights.length > 0}
	<Card>
		<h2 class="text-lg font-bold text-text">Highlights</h2>
		<ul class="mt-3 space-y-2.5 text-sm text-text">
			{#each activeHighlights as item}
				<li class="flex items-start justify-between gap-3">
					<span class="break-words">{item.label}</span>
					<a
						href={item.source}
						target="_blank"
						rel="noopener noreferrer"
						aria-label="Source for: {item.label}"
						class="inline-flex min-h-11 min-w-11 shrink-0 items-center justify-center rounded-sm text-accent hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
					>
						<ExternalLink class="size-4" aria-hidden="true" />
					</a>
				</li>
			{/each}
		</ul>
	</Card>
{/if}
