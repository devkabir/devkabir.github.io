<script lang="ts">
	import Card from './Card.svelte';
	import { experiences, formatPeriod } from '$lib/profile';
</script>

<Card>
	<h2 id="experience-heading" class="text-lg font-bold text-text">Experience</h2>
	<div class="mt-3 space-y-4">
		{#each experiences as exp}
			<div class="border-b border-line/60 pb-3 last:border-b-0 last:pb-0">
				<div class="flex flex-col gap-0.5">
					<div class="flex flex-wrap items-baseline justify-between gap-x-2">
						<span class="font-semibold text-text">{exp.role}</span>
						<span class="text-xs text-muted">{formatPeriod(exp.start, exp.end)}</span>
					</div>
					<span class="text-sm font-medium text-muted">{exp.company}</span>
				</div>

				{#if exp.details && exp.details.length > 0}
					<details class="group mt-2">
						<summary
							class="flex min-h-11 cursor-pointer items-center text-xs font-medium text-accent hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
						>
							<span class="group-open:hidden">View details</span>
							<span class="hidden group-open:inline">Hide details</span>
						</summary>
						<ul class="mt-2 list-disc space-y-1 pl-4 text-xs leading-relaxed text-muted">
							{#each exp.details as detail}
								<li>{detail}</li>
							{/each}
						</ul>
					</details>
				{/if}
			</div>
		{/each}
	</div>
</Card>
