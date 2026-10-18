<script lang="ts">
	import { page } from '$app/state';
	import { dev } from '$app/environment';
	import { site, toAbsolute } from '$lib/site';

	interface Props {
		title?: string;
		description?: string;
		image?: string;
		type?: 'website' | 'article';
		noindex?: boolean;
	}

	let {
		title,
		description = site.tagline,
		image = '/images/cover.avif',
		type = 'website',
		noindex = false
	}: Props = $props();

	let fullTitle = $derived(
		!title || title === `${site.name} — ${site.title}`
			? `${site.name} — ${site.title}`
			: `${title} | ${site.name}`
	);

	let pathname = $derived(
		page.url.pathname.endsWith('/') ? page.url.pathname : `${page.url.pathname}/`
	);
	let canonicalUrl = $derived(toAbsolute(pathname));
	let imageUrl = $derived(toAbsolute(image));
	let shouldNoindex = $derived(noindex || dev || !site.url);
</script>

<svelte:head>
	<title>{fullTitle}</title>
	<meta name="description" content={description} />
	{#if canonicalUrl}
		<link rel="canonical" href={canonicalUrl} />
	{/if}

	{#if shouldNoindex}
		<meta name="robots" content="noindex, nofollow" />
	{/if}

	<!-- Open Graph -->
	<meta property="og:site_name" content={site.name} />
	<meta property="og:title" content={fullTitle} />
	<meta property="og:description" content={description} />
	<meta property="og:type" content={type} />
	{#if canonicalUrl}
		<meta property="og:url" content={canonicalUrl} />
	{/if}
	{#if imageUrl}
		<meta property="og:image" content={imageUrl} />
	{/if}

	<!-- Twitter -->
	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:title" content={fullTitle} />
	<meta name="twitter:description" content={description} />
	{#if imageUrl}
		<meta name="twitter:image" content={imageUrl} />
	{/if}
</svelte:head>
