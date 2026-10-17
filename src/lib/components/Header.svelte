<script lang="ts">
	import { page } from '$app/state';
	import { site } from '$lib/site';
	import ThemeToggle from '$lib/components/ThemeToggle.svelte';
	import Avatar from '$lib/components/Avatar.svelte';
	import { House, Menu, X } from '@lucide/svelte';
	import { siGithub } from 'simple-icons';

	// Simple Icons provides siGithub; LinkedIn is not in Simple Icons (removed in v14), using approved brand SVG path
	const brandIcons: Record<string, { path: string }> = {
		GitHub: { path: siGithub.path },
		LinkedIn: {
			path: 'M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z'
		}
	};

	let validSocials = $derived(site.socials.filter((s) => s.url && s.url.trim() !== ''));

	let mobileOpen = $state(false);
	let menuButton: HTMLButtonElement | undefined = $state();

	function toggleMobile() {
		mobileOpen = !mobileOpen;
	}

	function closeMobile() {
		if (mobileOpen) {
			mobileOpen = false;
			menuButton?.focus();
		}
	}

	function onKeydown(e: KeyboardEvent) {
		if (e.key === 'Escape' && mobileOpen) {
			e.preventDefault();
			closeMobile();
		}
	}
	const navItems = [{ label: 'Home', href: '/', icon: House }];
</script>

<svelte:window onkeydown={onKeydown} />

<header
	class="sticky top-0 z-50 flex min-h-14 w-full items-center justify-between border-b border-line bg-card px-4 pt-[env(safe-area-inset-top)] shadow-xs transition-colors"
>
	<!-- Left: Brand mark -->
	<div class="flex items-center gap-2">
		<a
			href="/"
			class="flex items-center gap-2 font-bold text-accent transition-opacity hover:opacity-90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
			aria-label="{site.name} Home"
		>
			<img src="/favicon.svg" alt="" width="40" height="40" class="h-10 w-10 rounded-full" />
			<span class="hidden text-lg font-bold text-text sm:inline">{site.name}</span>
		</a>
	</div>

	<!-- Center: Site tabs (rendered only when there is more than 1 nav item) -->
	{#if navItems.length > 1}
		<nav class="hidden items-center self-stretch md:flex" aria-label="Primary">
			{#each navItems as item (item.href)}
				{@const Icon = item.icon}
				<a
					href={item.href}
					class="relative flex h-full items-center px-10 transition-colors hover:bg-hover {page.url
						.pathname === item.href
						? 'border-b-3 border-accent text-accent'
						: 'text-muted'}"
					aria-label={item.label}
					aria-current={page.url.pathname === item.href ? 'page' : undefined}
				>
					<Icon class="size-6 stroke-[2.25]" />
				</a>
			{/each}
		</nav>
	{/if}

	<!-- Right: Socials, ThemeToggle, Avatar & Mobile Toggle -->
	<div class="flex items-center gap-2">
		{#each validSocials as social (social.label)}
			{#if brandIcons[social.label]}
				<a
					href={social.url}
					target="_blank"
					rel="noreferrer noopener"
					class="inline-flex h-11 w-11 items-center justify-center rounded-full bg-hover text-text transition-colors hover:bg-line/40 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
					aria-label={social.label}
				>
					<svg viewBox="0 0 24 24" class="h-4 w-4 fill-current" aria-hidden="true">
						<path d={brandIcons[social.label].path} />
					</svg>
				</a>
			{/if}
		{/each}

		<ThemeToggle />

		<a
			href="/"
			aria-label="Profile"
			class="inline-flex h-11 w-11 items-center justify-center rounded-full focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
		>
			<Avatar src={site.avatar} alt={site.name} size={36} loading="eager" />
		</a>

		{#if navItems.length > 1}
			<button
				type="button"
				bind:this={menuButton}
				onclick={toggleMobile}
				class="inline-flex h-11 w-11 cursor-pointer items-center justify-center rounded-full bg-hover text-text transition-colors hover:bg-line/40 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent md:hidden"
				aria-expanded={mobileOpen}
				aria-controls="mobile-nav"
				aria-label={mobileOpen ? 'Close navigation menu' : 'Open navigation menu'}
			>
				{#if mobileOpen}
					<X size={20} aria-hidden="true" />
				{:else}
					<Menu size={20} aria-hidden="true" />
				{/if}
			</button>
		{/if}
	</div>
</header>

<!-- Mobile Navigation Panel (plain panel, no modal dialog) -->
{#if navItems.length > 1 && mobileOpen}
	<div
		class="fixed inset-0 z-40 bg-black/40 backdrop-blur-xs md:hidden"
		onclick={closeMobile}
		aria-hidden="true"
	></div>

	<nav
		id="mobile-nav"
		aria-label="Mobile Navigation"
		class="fixed inset-y-0 right-0 z-50 flex w-64 flex-col gap-4 border-l border-line bg-card p-4 shadow-xl md:hidden"
	>
		<div class="flex items-center justify-between border-b border-line pb-3">
			<span class="font-bold text-text">Navigation</span>
			<button
				type="button"
				onclick={closeMobile}
				class="inline-flex h-9 w-9 items-center justify-center rounded-full bg-hover text-text hover:bg-line/40 focus-visible:outline-2 focus-visible:outline-accent"
				aria-label="Close menu"
			>
				<X size={18} aria-hidden="true" />
			</button>
		</div>

		<div class="flex flex-col gap-1">
			{#each navItems as item (item.href)}
				{@const Icon = item.icon}
				<a
					href={item.href}
					onclick={closeMobile}
					class="flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-hover {page
						.url.pathname === item.href
						? 'bg-hover font-semibold text-accent'
						: 'text-text'}"
					aria-current={page.url.pathname === item.href ? 'page' : undefined}
				>
					<Icon class="size-5" />
					<span>{item.label}</span>
				</a>
			{/each}
		</div>
	</nav>
{/if}
