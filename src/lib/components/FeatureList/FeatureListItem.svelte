<script lang="ts">
	import { goto } from '$app/navigation';
	import Card from '$lib/components/Card/Card.svelte';

	export let src: string;
	export let alt: string;
	export let href: string;
	export let hrefDescription: string;

	$: handleClickOutsideLink = () => goto(href);
</script>

<div class="item of-feature-list" on:click={handleClickOutsideLink}>
	<img class="image of-feature-list" {src} {alt} />
	<Card {href} title={hrefDescription}>
		<slot />
	</Card>
</div>
