<script lang="ts">
	import { Sun, Moon } from '@lucide/svelte';

	let theme = $state<'light' | 'dark'>(
		typeof document !== 'undefined' && document.documentElement.dataset.theme === 'dark'
			? 'dark'
			: 'light'
	);

	let chosen = false;

	$effect(() => {
		const mql = window.matchMedia('(prefers-color-scheme: dark)');
		const onChange = (e: MediaQueryListEvent) => {
			if (chosen) return;
			let saved: string | null = null;
			try {
				saved = localStorage.getItem('theme');
			} catch {}
			if (saved !== 'light' && saved !== 'dark') {
				const next = e.matches ? 'dark' : 'light';
				document.documentElement.dataset.theme = next;
				theme = next;
			}
		};

		mql.addEventListener('change', onChange);
		return () => mql.removeEventListener('change', onChange);
	});

	function toggle() {
		const next = theme === 'dark' ? 'light' : 'dark';
		chosen = true;
		document.documentElement.dataset.theme = next;
		theme = next;
		try {
			localStorage.setItem('theme', next);
		} catch {}
	}
</script>

<button
	type="button"
	onclick={toggle}
	class="inline-flex h-11 w-11 cursor-pointer items-center justify-center rounded-full bg-hover text-text transition-colors hover:bg-line/40 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
	aria-label={theme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme'}
	title={theme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme'}
>
	{#if theme === 'dark'}
		<Sun size={20} aria-hidden="true" />
	{:else}
		<Moon size={20} aria-hidden="true" />
	{/if}
</button>
