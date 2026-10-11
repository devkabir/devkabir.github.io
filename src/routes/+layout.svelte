<script lang="ts">
	import '../app.css';
	import Header from '$lib/components/Header.svelte';
	import Footer from '$lib/components/Footer.svelte';
	import { dev } from '$app/environment';
	import { PUBLIC_GA_ID } from '$env/static/public';
	import type { Snippet } from 'svelte';

	let { children }: { children: Snippet } = $props();

	// Load GA4 only in production when PUBLIC_GA_ID is present
	const shouldTrack = !dev && Boolean(PUBLIC_GA_ID);
</script>

<svelte:head>
	{#if shouldTrack}
		<!-- Page views are tracked automatically by GA4 Enhanced Measurement history-change tracking -->
		{@html `<script async src="https://www.googletagmanager.com/gtag/js?id=${PUBLIC_GA_ID}"></script>`}
		{@html `<script>
			window.dataLayer = window.dataLayer || [];
			function gtag(){dataLayer.push(arguments);}
			gtag('js', new Date());
			gtag('config', '${PUBLIC_GA_ID}');
		</script>`}
	{/if}
</svelte:head>

<div class="min-h-screen bg-page font-sans text-text">
	<Header />
	{@render children()}
	<Footer />
</div>
