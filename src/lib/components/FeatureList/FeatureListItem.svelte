<script lang="ts">
	import { goto } from '$app/navigation';
	import Card from '$lib/components/Card/Card.svelte';

	export let src: string;
	export let alt: string;
	export let href: string;
	export let hrefDescription: string;

	$: handleClickOutsideLink = () => goto(href);
</script>

<!-- NOTE: Intentionally ignoring a11y warnings -->
<!-- The div is not intended to be keyboard-interactive -->
<!-- Keyboard interaction is provided by nested anchor -->
<!-- svelte-ignore a11y-click-events-have-key-events -->
<!-- svelte-ignore a11y-no-static-element-interactions -->
<div class="item of-feature-list" on:click={handleClickOutsideLink}>
	<img class="image of-feature-list" {src} {alt} />
	<Card {href} title={hrefDescription}>
		<slot />
	</Card>
</div>
