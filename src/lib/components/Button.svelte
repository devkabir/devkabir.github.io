<script lang="ts">
	import type { Snippet } from 'svelte';
	import type { HTMLButtonAttributes, HTMLAnchorAttributes } from 'svelte/elements';

	interface BaseProps {
		variant?: 'primary' | 'secondary';
		children?: Snippet;
	}

	type Props = BaseProps &
		(
			| ({ href: string } & Omit<HTMLAnchorAttributes, 'href'>)
			| ({ href?: never } & HTMLButtonAttributes)
		);

	let {
		variant = 'primary',
		href,
		class: className = '',
		children,
		...restProps
	}: Props = $props();

	let anchorProps = $derived(restProps as HTMLAnchorAttributes);
	let buttonProps = $derived(restProps as HTMLButtonAttributes);

	let variantClass = $derived(
		variant === 'secondary'
			? 'bg-hover text-text hover:bg-line/40'
			: 'bg-accent text-white hover:opacity-90'
	);
</script>

{#if href !== undefined}
	<a
		{href}
		class="inline-flex min-h-11 min-w-11 cursor-pointer items-center justify-center gap-2 rounded-md px-4 py-2 text-sm font-semibold transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent {variantClass} {className}"
		{...anchorProps}
	>
		{@render children?.()}
	</a>
{:else}
	<button
		type="button"
		class="inline-flex min-h-11 min-w-11 cursor-pointer items-center justify-center gap-2 rounded-md px-4 py-2 text-sm font-semibold transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent disabled:pointer-events-none disabled:opacity-50 {variantClass} {className}"
		{...buttonProps}
	>
		{@render children?.()}
	</button>
{/if}
