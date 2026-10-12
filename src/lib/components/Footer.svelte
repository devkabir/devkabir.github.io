<script lang="ts">
	import { site } from '$lib/site';

	const currentYear = new Date().getFullYear();
</script>

<footer class="mt-8 border-t border-line bg-card">
	<div class="mx-auto max-w-[1100px] p-2 sm:p-4">
		<!-- Copyright & Privacy -->
		<div
			class="flex flex-col gap-1 text-xs text-muted sm:flex-row sm:items-center sm:justify-between"
		>
			<p>© {currentYear} {site.name}. All rights reserved.</p>
			<p>
				Uses Google Analytics for anonymous usage statistics. No personal data or email addresses
				are collected.
			</p>
		</div>
	</div>
</footer>
