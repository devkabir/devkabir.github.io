<script lang="ts">
	import type { Snippet } from 'svelte';
	import type { HTMLAttributes } from 'svelte/elements';

	interface Props extends HTMLAttributes<HTMLDivElement> {
		children?: Snippet;
	}

	let { class: className = '', children, ...restProps }: Props = $props();
</script>

<div
	class="rounded-card border border-line bg-card p-4 text-text shadow-xs {className}"
	{...restProps}
>
	{@render children?.()}
</div>
