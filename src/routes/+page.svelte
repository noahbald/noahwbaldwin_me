<script lang="ts">
	import type { PageData } from './$types';
	import Header from '$lib/components/Header/Header.svelte';
	import Footer from '$lib/components/Footer/Footer.svelte';
	import Button from '$lib/components/Button/Button.svelte';
	import PageList from '$lib/molecules/PageList/PageList.svelte';
	import Projects from '$lib/molecules/Projects/Projects.svelte';
	import Resume from '$lib/molecules/Resume/Resume.svelte';

	import './page.css';

	export let data: PageData;

	$: intro = data.resumeData.record.intro;
	$: blogs = data.blogsData.record.filter((record) => record.metadata.featured).slice(0, 3);
	$: projects = data.projectData.record.filter((record) => record.metadata.featured).slice(0, 3);

	$: resume = data.resumeData.record;
</script>

<svelte:head>
	<meta name="Description" content={intro} />
</svelte:head>

<Header
	src="/media/profile.jpg"
	heading="Noah Baldwin"
	title="Hello!"
	subtitle={intro}
	srcTiny={'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQEASABIAAD/2wBDAAgGBgcGBQgHBwcJCQgKDBQNDAsLDBkSEw8UHRofHh0aHBwgJC4nICIsIxwcKDcpLDAxNDQ0Hyc5PTgyPC4zNDL/2wBDAQkJCQwLDBgNDRgyIRwhMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjL/wAARCAAJABADASIAAhEBAxEB/8QAFwAAAwEAAAAAAAAAAAAAAAAAAQIDBv/EACEQAAIBAwMFAAAAAAAAAAAAAAECAAMEERIysTM0QXOD/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAT/xAAYEQACAwAAAAAAAAAAAAAAAAAAAQIRQf/aAAwDAQACEQMRAD8AzFqUZlplwVJGcnxBVwa7acaRtUSNp1fm3BjjuR614EaWJ3FH/9k='}
	transitionName="header-main"
>
	<Button slot="call-to-action" tag="a" href="/projects" class="shoft-shadow">Show me more!</Button>
</Header>
{#if blogs.length}
	<PageList pages={blogs} heading="Blogs" ctaText="View More" ctaHref="/blogs" />
{/if}
{#if projects.length}
	<Projects {projects} />
{/if}
<Resume {resume} />
<Footer />
