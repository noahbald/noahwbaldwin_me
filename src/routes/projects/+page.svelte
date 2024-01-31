<script lang="ts">
	import type { PageData } from './$types';
	import PageList from '$lib/molecules/PageList/PageList.svelte';
	import Footer from '$lib/components/Footer/Footer.svelte';

	export let data: PageData;

	$: projects = data.projectData.filter((project) => !project.metadata.hidden) || [];
</script>

<svelte:head>
	<title>Noah Baldwin | Projects</title>
	<meta
		name="Description"
		content="Projects of Noah Baldwin, from those which are technical front-end focused to creative endeavours"
	/>
</svelte:head>

<PageList pages={projects} heading="Projects" ctaText="Return Home" ctaHref="/" />
<Footer homeButton={true} />
