<script lang="ts">
	import { page } from '$app/state';
	import Seo from '$lib/components/Seo.svelte';
	import Button from '$lib/components/Button.svelte';
	import Card from '$lib/components/Card.svelte';
	import { Home } from '@lucide/svelte';

	let status = $derived(page.status || 404);
	let message = $derived(
		page.error?.message || (status === 404 ? 'Page not found' : 'An error occurred')
	);
</script>

<Seo title="{status}: {message}" description={message} noindex={true} />

<div class="mx-auto flex max-w-[600px] flex-col items-center justify-center px-4 py-16 text-center">
	<Card class="flex w-full flex-col items-center gap-4 p-8">
		<span class="text-6xl font-black text-accent">{status}</span>
		<h1 class="text-2xl font-bold text-text">{message}</h1>
		<p class="max-w-md text-sm text-muted">
			The page you are looking for might have been moved, removed, or never existed.
		</p>
		<div class="pt-2">
			<Button href="/">
				<Home class="size-4 shrink-0" aria-hidden="true" />
				<span>Back to Home</span>
			</Button>
		</div>
	</Card>
</div>
