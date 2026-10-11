<script lang="ts">
	import Card from './Card.svelte';
	import Avatar from './Avatar.svelte';
	import Badge from './Badge.svelte';
	import { site } from '$lib/site';
	import { specializations } from '$lib/profile';
</script>

<Card>
	<div class="flex items-start gap-3">
		<Avatar src="/images/avatar.png" alt={site.name} size={40} class="shrink-0" />
		<div class="min-w-0 flex-1">
			<div class="rounded-xl border border-line bg-page px-3.5 py-2.5">
				<p class="text-sm font-medium text-text">
					{site.title}
				</p>
				{#if site.availability}
					<p class="mt-1 text-xs text-muted">
						{site.availability}
					</p>
				{/if}
			</div>

			{#if specializations.length > 0}
				<div class="mt-3 flex flex-wrap gap-1.5" aria-label="Core specializations">
					{#each specializations as tag}
						<Badge>{tag}</Badge>
					{/each}
				</div>
			{/if}
		</div>
	</div>
</Card>
