<script lang="ts">
	import Card from './Card.svelte';
	import { site } from '$lib/site';
	import { track } from '$lib/track';
	import { Mail, Copy, Check, CalendarDays, Globe, Link } from '@lucide/svelte';

	let copied = $state(false);
	let timeoutId: ReturnType<typeof setTimeout> | undefined;

	function copyEmail() {
		track('copy_email');
		try {
			navigator.clipboard.writeText(site.email);
			copied = true;
			if (timeoutId) clearTimeout(timeoutId);
			timeoutId = setTimeout(() => {
				copied = false;
			}, 2000);
		} catch {}
	}
</script>

<Card>
	<h2 id="contact-heading" class="text-lg font-bold text-text">Contact</h2>

	<div class="mt-3 space-y-3 text-sm text-text">
		{#if site.email}
			<div class="flex min-w-0 flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
				<div class="flex min-w-0 items-center gap-2.5">
					<Mail class="size-4 shrink-0 text-muted" aria-hidden="true" />
					<div class="flex min-w-0 flex-wrap items-center gap-x-2">
						<span class="font-medium break-all text-text select-all">{site.email}</span>
						<a
							href="mailto:{site.email}"
							onclick={() => track('contact_click')}
							class="inline-flex min-h-11 items-center font-medium text-accent hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
						>
							Send email
						</a>
					</div>
				</div>
				<button
					type="button"
					onclick={copyEmail}
					aria-label={copied ? 'Email address copied' : 'Copy email address'}
					class="inline-flex min-h-11 min-w-11 shrink-0 cursor-pointer items-center justify-center gap-1.5 rounded-md bg-hover px-3 py-1.5 text-xs font-semibold text-text transition-colors hover:bg-line/40 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
				>
					{#if copied}
						<Check class="size-4 text-accent" aria-hidden="true" />
						<span>Copied</span>
					{:else}
						<Copy class="size-4 text-muted" aria-hidden="true" />
						<span>Copy</span>
					{/if}
				</button>
			</div>
			<div aria-live="polite" class="sr-only">
				{copied ? 'Email address copied to clipboard' : ''}
			</div>
		{/if}

		{#if site.meeting}
			<div class="flex items-center gap-2.5">
				<CalendarDays class="size-4 shrink-0 text-muted" aria-hidden="true" />
				<a
					href={site.meeting}
					target="_blank"
					rel="noopener noreferrer"
					onclick={() => track('meeting_click')}
					class="inline-flex min-h-11 items-center font-medium text-accent hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
				>
					Book a Meeting
				</a>
			</div>
		{/if}

		{#if site.socials.some((s) => s.url)}
			<ul class="space-y-2 border-t border-line/60 pt-1">
				{#each site.socials as social}
					{#if social.url}
						<li class="flex items-center gap-2.5">
							{#if social.label.toLowerCase() === 'github'}
								<Globe class="size-4 shrink-0 text-muted" aria-hidden="true" />
							{:else}
								<Link class="size-4 shrink-0 text-muted" aria-hidden="true" />
							{/if}
							<a
								href={social.url}
								target="_blank"
								rel="noopener noreferrer"
								onclick={() => {
									if (social.label.toLowerCase() === 'github') track('github_click');
								}}
								class="inline-flex min-h-11 items-center font-medium text-accent hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
							>
								{social.label}
							</a>
						</li>
					{/if}
				{/each}
			</ul>
		{/if}
	</div>
</Card>
