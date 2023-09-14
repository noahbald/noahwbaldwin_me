<script lang="ts">
	import type { PageData } from './$types';
	import PageList from '$lib/molecules/PageList/PageList.svelte';
	import Footer from '$lib/components/Footer/Footer.svelte';

	export let data: PageData;

	$: blogs = data.blogsData.record || [];
</script>

<svelte:head>
	<title>Noah Baldwin | PageList</title>
</svelte:head>

<PageList pages={blogs} heading="Blogs" ctaText="Return Home" ctaHref="/" />
<Footer homeButton={true} />
