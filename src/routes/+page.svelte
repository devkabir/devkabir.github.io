<script lang="ts">
	import { page } from '$app/state';
	import { site } from '$lib/site';
	import { track } from '$lib/track';
	import Button from '$lib/components/Button.svelte';

	const tabs = [
		{ label: 'Posts', href: '/#feed' },
		{ label: 'About', href: '/#about' },
		{ label: 'Projects', href: '/#projects' },
		{ label: 'Experience', href: '/#experience' }
	];

	let activeTab = $derived(
		tabs.some((t) => t.href === '/' + page.url.hash) ? page.url.hash : '#feed'
	);

	let menu = $state<HTMLDetailsElement>();

	function closeMenu(e: MouseEvent) {
		if (menu?.open && !menu.contains(e.target as Node)) menu.open = false;
	}

	function copyEmail() {
		track('copy_email');
		try {
			navigator.clipboard.writeText(site.email);
		} catch {}
		if (menu) menu.open = false;
	}
</script>

<svelte:window onclick={closeMenu} />

<div class="border-b border-line bg-card shadow-xs">
	<div class="mx-auto max-w-[1100px]">
		<!-- Cover Photo -->
		<div class="relative h-48 w-full overflow-hidden sm:h-80 sm:rounded-b-lg md:h-96">
			<img
				src="/images/cover.png"
				alt=""
				width="1100"
				height="384"
				fetchpriority="high"
				class="h-full w-full object-cover"
			/>
		</div>

		<!-- Identity & Actions Section -->
		<div class="px-4 pb-4">
			<div class="flex flex-col items-center sm:flex-row sm:items-end sm:gap-6">
				<!-- Overlapping Avatar -->
				<div class="relative z-10 -mt-16 shrink-0 sm:-mt-20">
					<img
						src="/images/avatar.png"
						alt={site.name}
						width="168"
						height="168"
						fetchpriority="high"
						class="h-[120px] w-[120px] rounded-full object-cover ring-4 ring-card sm:h-[168px] sm:w-[168px]"
					/>
				</div>

				<!-- Identity Text -->
				<div class="mt-3 flex-1 text-center sm:mt-0 sm:text-left">
					<h1 class="text-2xl font-bold tracking-tight text-text sm:text-3xl">{site.name}</h1>
					<p class="font-medium text-text">{site.title}</p>
					<p class="mt-0.5 text-sm text-muted">{site.tagline}</p>
					<div
						class="mt-1 flex flex-wrap items-center justify-center gap-x-2 text-xs text-muted sm:justify-start"
					>
						<span>{site.location}</span>
						<span aria-hidden="true">·</span>
						<span>{site.workplace}</span>
						{#if site.availability}
							<span aria-hidden="true">·</span>
							<span class="text-accent">{site.availability}</span>
						{/if}
					</div>
				</div>

				<!-- Actions -->
				<div
					class="mt-4 flex w-full flex-wrap items-center justify-center gap-2 sm:mt-0 sm:w-auto sm:justify-end"
				>
					{#if site.email}
						<Button
							href="mailto:{site.email}"
							onclick={() => track('contact_click')}
							class="flex-1 sm:flex-none"
						>
							Hire Me
						</Button>
					{/if}

					{#if site.resume}
						<Button
							variant="secondary"
							href={site.resume}
							download
							onclick={() => track('resume_download')}
							class="flex-1 sm:flex-none"
						>
							Download Resume
						</Button>
					{/if}

					<details bind:this={menu} class="relative">
						<summary
							class="inline-flex min-h-11 min-w-11 cursor-pointer list-none items-center justify-center rounded-md bg-hover px-4 py-2 text-sm font-semibold text-text transition-colors hover:bg-line/40 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
							aria-label="More actions"
						>
							•••
						</summary>
						<div
							class="absolute right-0 z-20 mt-1 min-w-44 rounded-md border border-line bg-card p-1 shadow-lg"
						>
							{#if site.meeting}
								<a
									href={site.meeting}
									target="_blank"
									rel="noreferrer"
									onclick={() => {
										track('meeting_click');
										if (menu) menu.open = false;
									}}
									class="flex min-h-11 items-center rounded px-3 py-2 text-sm font-medium text-text hover:bg-hover"
								>
									Book a Meeting
								</a>
							{/if}
							{#if site.email}
								<button
									type="button"
									onclick={copyEmail}
									class="flex min-h-11 w-full items-center rounded px-3 py-2 text-left text-sm font-medium text-text hover:bg-hover"
								>
									Copy Email
								</button>
							{/if}
						</div>
					</details>
				</div>
			</div>

			<hr class="mt-4 border-line" />

			<!-- Profile Navigation Tabs -->
			<nav aria-label="Profile navigation" class="flex gap-1 overflow-x-auto pt-1">
				{#each tabs as tab}
					{@const isActive = tab.href === '/' + activeTab}
					<a
						href={tab.href}
						aria-current={isActive ? 'page' : undefined}
						class="flex min-h-11 items-center border-b-4 px-4 py-2 text-sm font-semibold whitespace-nowrap transition-colors {isActive
							? 'border-accent text-accent'
							: 'border-transparent text-muted hover:bg-hover hover:text-text'}"
					>
						{tab.label}
					</a>
				{/each}
			</nav>
		</div>
	</div>
</div>
