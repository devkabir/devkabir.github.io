<script lang="ts">
	import { site } from '$lib/site';

	const currentYear = new Date().getFullYear();

	const navLinks = [
		{ label: 'Home', href: '/' },
		{ label: 'Posts', href: '/#feed' },
		{ label: 'About', href: '/#about' },
		{ label: 'Projects', href: '/#projects' },
		{ label: 'Experience', href: '/#experience' }
	];

	let validSocials = $derived(site.socials.filter((s) => s.url && s.url.trim() !== ''));
</script>

<footer class="mt-8 border-t border-line bg-card">
	<div class="mx-auto max-w-[1100px] px-4 py-8">
		<div class="flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
			<!-- Brand mark and designation -->
			<div class="flex flex-col gap-1">
				<a
					href="/"
					class="flex min-h-11 items-center gap-2 font-bold text-accent transition-opacity hover:opacity-90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
				>
					<span
						class="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-accent text-lg font-black text-white"
						aria-hidden="true"
					>
						{site.name[0]}
					</span>
					<span class="text-lg font-bold text-text">{site.name}</span>
				</a>
				<p class="text-sm text-muted">{site.title}</p>
			</div>

			<!-- Navigation & Socials -->
			<div class="flex flex-wrap gap-8 sm:gap-12">
				<!-- Navigation Links -->
				<nav aria-label="Footer navigation">
					<p class="text-xs font-semibold tracking-wider text-muted uppercase">Navigation</p>
					<ul class="mt-2 flex flex-col gap-1">
						{#each navLinks as link}
							<li>
								<a
									href={link.href}
									class="inline-flex min-h-11 items-center text-sm text-muted transition-colors hover:text-text hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
								>
									{link.label}
								</a>
							</li>
						{/each}
					</ul>
				</nav>

				<!-- Social Links -->
				{#if validSocials.length > 0}
					<div>
						<p class="text-xs font-semibold tracking-wider text-muted uppercase">Connect</p>
						<ul class="mt-2 flex flex-col gap-1">
							{#each validSocials as social}
								<li>
									<a
										href={social.url}
										target="_blank"
										rel="noopener noreferrer"
										class="inline-flex min-h-11 items-center text-sm text-muted transition-colors hover:text-text hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
									>
										{social.label}
									</a>
								</li>
							{/each}
						</ul>
					</div>
				{/if}

				<!-- Contact & Actions -->
				<div class="flex flex-col gap-2">
					<p class="text-xs font-semibold tracking-wider text-muted uppercase">Contact</p>
					{#if site.email}
						<a
							href="mailto:{site.email}"
							class="inline-flex min-h-11 items-center text-sm break-all text-muted transition-colors hover:text-text hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
						>
							{site.email}
						</a>
					{/if}

					<div>
						<a
							href="#top"
							class="inline-flex min-h-11 items-center text-sm font-semibold text-accent transition-colors hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
						>
							Back to Top
						</a>
					</div>
				</div>
			</div>
		</div>

		<!-- Copyright -->
		<div class="mt-8 border-t border-line pt-4 text-xs text-muted">
			<p>© {currentYear} {site.name}. All rights reserved.</p>
		</div>
	</div>
</footer>
