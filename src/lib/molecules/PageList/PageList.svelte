<script lang="ts">
	import FeatureList from '$lib/components/FeatureList/FeatureList.svelte';
	import FeatureListItem from '$lib/components/FeatureList/FeatureListItem.svelte';
	import Button from '$lib/components/Button/Button.svelte';
	import type { Blogs } from '$lib/types/Blogs';
	import type { Projects } from '$lib/types/Projects';

	import './PageList.css';

	export let pages: Blogs['record'] | Projects['record'];
	export let heading: string;
	export let ctaText: string;
	export let ctaHref: string;
</script>

<section class="page-list">
	<h2 class="highlight secondary h1">{heading}</h2>
	<Button tag="a" variant="text" href={ctaHref}>{ctaText}</Button>
	<FeatureList>
		{#each pages as { src, alt, href, title, subtitle, type, metadata, uid } (uid)}
			<FeatureListItem {src} {alt} {href} hrefDescription={title}>
				<h2 class="h4"><strong>{title}</strong></h2>
				<p class="subtitle of-blog-list">{subtitle}</p>
				<p class="type of-blog-list">{type}</p>
				<span class="metadata of-blog-list">
					<p>{metadata.year}</p>
					<p>{metadata.topics.join(', ')}</p>
				</span>
			</FeatureListItem>
		{/each}
	</FeatureList>
</section>
