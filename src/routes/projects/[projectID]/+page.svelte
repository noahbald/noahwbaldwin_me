<script lang="ts">
	import type { PageData } from './$types';
	import Header from '$lib/components/Header/Header.svelte';
	import Button from '$lib/components/Button/Button.svelte';
	import ExternalLinks from '$lib/components/ExternalLinks/ExternalLinks.svelte';
	import ExternalLink from '$lib/components/ExternalLinks/ExternalLink.svelte';
	import Markdown from '$lib/components/Markdown/Markdown.svelte';
	import Footer from '$lib/components/Footer/Footer.svelte';

	import './page.css';

	export let data: PageData;

	$: externalLinks = Object.entries(data.project.externalLinks || {}).map(([type, href]) => ({
		icon: type,
		href,
	}));
</script>

<Header
	heading={data.project.type}
	title={data.project.title}
	subtitle={data.project.subtitle}
	src={data.project.src}
>
	<Button tag="a" href="/" slot="call-to-action">Return Home</Button>
</Header>
<section class="project-page">
	<ExternalLinks>
		{#each externalLinks as { icon, href } (href)}
			<ExternalLink {icon} {href} />
		{/each}
	</ExternalLinks>
	<Markdown markdown={data.markdown} />
</section>
<Footer homeButton={true} />
