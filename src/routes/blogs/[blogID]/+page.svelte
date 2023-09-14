<script lang="ts">
	import type { PageData } from './$types';
	import Header from '$lib/components/Header/Header.svelte';
	import Button from '$lib/components/Button/Button.svelte';
	import Markdown from '$lib/components/Markdown/Markdown.svelte';
	import Footer from '$lib/components/Footer/Footer.svelte';

	import './page.css';

	export let data: PageData;
</script>

<svelte:head>
	<title>Noah Baldwin | Blog - ${data.blog.title}</title>
	<meta name="Description" content={data.blog.subtitle} />
</svelte:head>

<Header
	heading={data.blog.type}
	title={data.blog.title}
	subtitle={data.blog.subtitle}
	src={data.blog.src}
>
	<Button tag="a" href="/" slot="call-to-action">Return Home</Button>
</Header>
<section class="blog-page">
	<Markdown markdown={data.markdown} disablePeek={true} />
</section>
<Footer homeButton={true} />
