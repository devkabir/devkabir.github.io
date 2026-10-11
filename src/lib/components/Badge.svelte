<script lang="ts">
	import type { Snippet } from 'svelte';
	import type { HTMLAttributes } from 'svelte/elements';

	interface Props extends HTMLAttributes<HTMLSpanElement> {
		children?: Snippet;
	}

	let { class: className = '', children, ...restProps }: Props = $props();
</script>

<span
	class="inline-flex items-center rounded-full bg-hover px-2.5 py-0.5 text-xs font-medium text-text {className}"
	{...restProps}
>
	{@render children?.()}
</span>
