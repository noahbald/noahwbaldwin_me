<script lang="ts">
	import { page } from '$app/stores';
	import Header from '$lib/components/Header/Header.svelte';
	import Footer from '$lib/components/Footer/Footer.svelte';
	import Button from '$lib/components/Button/Button.svelte';
</script>

<svelte:head>
    <title>Noah Baldwin | 404 ${page.error.message}</title>
    <meta name="Description" content={page.error.message} />
</svelte:head>

<Header
	src="/404.webm"
	heading="404 Error"
	title={$page.error.message || 'Page not found'}
	subtitle="I don't trust like that."
>
	<Button slot="call-to-action" tag="a" href="/">Let me in!</Button>
</Header>
<Footer homeButton={true} />
