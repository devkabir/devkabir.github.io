<script lang="ts">
	import type { Snippet } from 'svelte';
	import type { HTMLAttributes } from 'svelte/elements';

	type PaddingVariant = 'none' | 'normal' | 'p-0' | 'p-4';

	interface Props extends HTMLAttributes<HTMLDivElement> {
		padding?: PaddingVariant;
		children?: Snippet;
	}

	let { padding = 'normal', class: className = '', children, ...restProps }: Props = $props();

	const paddingClasses: Record<PaddingVariant, string> = {
		normal: 'p-4',
		'p-4': 'p-4',
		none: 'p-0',
		'p-0': 'p-0'
	};
</script>

<div
	class="rounded-card border border-line bg-card text-text shadow-xs {paddingClasses[
		padding
	]} {className}"
	{...restProps}
>
	{@render children?.()}
</div>
