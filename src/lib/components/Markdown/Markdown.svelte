<script lang="ts">
	import { writable } from 'svelte/store';
	import { marked } from 'marked';
	import sanitizeHTML from 'sanitize-html';
	import Button from '$lib/components/Button/Button.svelte';

	import './Markdown.css';

	export let markdown: string;

	let peek = writable(true);

	$: dangerousHTML = markdown && marked.parse(markdown);
	$: sanitizedHTML = sanitizeHTML(dangerousHTML, {
		allowedTags: sanitizeHTML.defaults.allowedTags.concat('img', 'h1', 'h2', 'h3'),
		allowedAttributes: {
			img: ['src', 'alt'],
			a: ['href', 'name', 'target', 'title'],
		},
		selfClosing: ['img'],
	});
</script>

<div class="markdown" class:peek>
	<article class="content of-markdown">
		{@html sanitizedHTML}
	</article>
	{#if peek}
		<Button on:click={() => (peek = false)} class="soft-shadow">Read More</Button>
	{/if}
</div>
