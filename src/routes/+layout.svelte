<script lang="ts">
	import '../app.css';
	import { theme } from '$lib/theme';
	import { get } from 'svelte/store';

	let { children } = $props();

	function toggleTheme() {
		theme.set(get(theme) === 'dark' ? 'light' : 'dark');
	}
</script>

<main class="min-h-dvh overflow-y-hidden transition-colors duration-300">
	<!-- Переключатель темы -->
	<button
		on:click={toggleTheme}
		class="fixed top-4 right-4 z-50 flex items-center gap-2 rounded-lg border border-border bg-background/70 px-3 py-2 text-sm text-foreground backdrop-blur transition hover:bg-accent hover:text-accent-foreground"
	>
		{#if $theme === 'dark'}
			☀️ <span class="hidden sm:inline">Light</span>
		{:else}
			🌙 <span class="hidden sm:inline">Dark</span>
		{/if}
	</button>

	{@render children()}
</main>
