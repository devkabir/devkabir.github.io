<script lang="ts">
	import Card from './Card.svelte';
	import { educations, formatPeriod } from '$lib/profile';
</script>

<Card>
	<h2 class="text-lg font-bold text-text">Education</h2>
	<div class="mt-3 space-y-3">
		{#each educations as edu}
			<div>
				<div class="flex flex-wrap items-baseline justify-between gap-x-2">
					<h3 class="font-semibold text-text">{edu.institution}</h3>
					<span class="text-xs text-muted">{formatPeriod(edu.start, edu.end)}</span>
				</div>
				<p class="mt-0.5 text-xs break-words text-muted">{edu.credential}</p>
			</div>
		{/each}
	</div>
</Card>
