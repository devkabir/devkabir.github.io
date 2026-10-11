<script lang="ts">
	import type { HTMLImgAttributes } from 'svelte/elements';

	interface Props extends HTMLImgAttributes {
		src: string;
		alt: string;
		size?: number;
	}

	let {
		src,
		alt,
		size = 40,
		class: className = '',
		loading = 'lazy',
		...restProps
	}: Props = $props();
</script>

<img
	{src}
	{alt}
	width={size}
	height={size}
	{loading}
	class="rounded-full border border-line object-cover {className}"
	style:width="{size}px"
	style:height="{size}px"
	{...restProps}
/>
