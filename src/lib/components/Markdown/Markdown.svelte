<script lang="ts">
	import { writable } from 'svelte/store';
	import Button from '$lib/components/Button/Button.svelte';
	import parseMarkdownSanitized from '$lib/utils/parseMarkdownSanitized';

	import './Markdown.css';

	export let markdown: string;
	export let disablePeek = false;

	let peek = writable(true);

	$: sanitizedHTML = parseMarkdownSanitized(markdown);
</script>

<div class="markdown" class:peek={!disablePeek && $peek}>
	<article class="content of-markdown">
		{@html sanitizedHTML}
	</article>
	{#if !disablePeek && $peek}
		<Button on:click={() => ($peek = false)} class="soft-shadow">Read More</Button>
	{/if}
</div>
