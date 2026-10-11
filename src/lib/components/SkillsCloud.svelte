<script lang="ts">
	import Card from './Card.svelte';
	import { techStack } from '$lib/profile';
	import { siReact, siTailwindcss, siMysql, siNodedotjs } from 'simple-icons';

	const icons: Record<string, { path: string }> = {
		react: siReact,
		tailwindcss: siTailwindcss,
		mysql: siMysql,
		nodedotjs: siNodedotjs
	};

	const categories = Array.from(new Set(techStack.map((t) => t.category)));
</script>

<Card>
	<h2 class="text-lg font-bold text-text">Tech Stack</h2>
	<div class="mt-3 space-y-4">
		{#each categories as category}
			<div>
				<h3 class="text-xs font-semibold tracking-wider text-muted uppercase">
					{category}
				</h3>
				<ul class="mt-2 space-y-2">
					{#each techStack.filter((t) => t.category === category) as tech}
						<li class="flex items-start gap-2.5 text-sm text-text">
							{#if tech.icon && icons[tech.icon]}
								<svg
									viewBox="0 0 24 24"
									class="mt-0.5 size-4 shrink-0 fill-current text-muted"
									aria-hidden="true"
								>
									<path d={icons[tech.icon].path} />
								</svg>
							{/if}
							<div class="min-w-0 flex-1 leading-snug">
								<span class="font-medium text-text">{tech.name}</span>
								<span class="text-muted"> — </span>
								<span class="text-xs break-words text-muted">{tech.evidence}</span>
							</div>
						</li>
					{/each}
				</ul>
			</div>
		{/each}
	</div>
</Card>
