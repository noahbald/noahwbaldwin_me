<script lang="ts">
	import type { PageData } from './$types';
	import FeatureList from '$lib/components/FeatureList/FeatureList.svelte';
	import FeatureListItem from '$lib/components/FeatureList/FeatureListItem.svelte';
	import Footer from '$lib/components/Footer/Footer.svelte';
	import Button from '$lib/components/Button/Button.svelte';

	import './page.css';

	export let data: PageData;

	$: projects = data.projectData.record || [];
</script>

<svelte:head>
    <title>Noah Baldwin | Projects</title>
</svelte:head>

<section class="project-list">
	<h1 class="highlight secondary">Projects</h1>
	<Button tag="a" variant="text" href="/">Return Home</Button>
	<FeatureList>
		{#each projects as { src, alt, href, title, subtitle, type, metadata, uid } (uid)}
			<FeatureListItem {src} {alt} {href} hrefDescription={title}>
				<h4><strong>{title}</strong></h4>
				<p class="subtitle of-project-list">{subtitle}</p>
				<p class="type of-project-list">{type}</p>
				<span class="metadata of-project-list">
					<p>{metadata.year}</p>
					<p>{metadata.topics.join(', ')}</p>
				</span>
			</FeatureListItem>
		{/each}
	</FeatureList>
</section>
<Footer homeButton={true} />
