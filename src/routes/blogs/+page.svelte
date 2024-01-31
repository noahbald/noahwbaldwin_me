<script lang="ts">
	import type { PageData } from './$types';
	import PageList from '$lib/molecules/PageList/PageList.svelte';
	import Footer from '$lib/components/Footer/Footer.svelte';

	export let data: PageData;

	$: blogs = data.blogsData || [];
</script>

<svelte:head>
	<title>Noah Baldwin | PageList</title>
	<meta
		name="Description"
		content="Blogs of Noah Baldwin around the front-end tech space and any other interesting tid-bits"
	/>
</svelte:head>

<PageList pages={blogs} heading="Blogs" ctaText="Return Home" ctaHref="/" />
<Footer homeButton={true} />
