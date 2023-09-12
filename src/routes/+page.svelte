<script lang="ts">
	import type { PageData } from './$types';
	import Header from '$lib/components/Header/Header.svelte';
	import Footer from '$lib/components/Footer/Footer.svelte';
	import Button from '$lib/components/Button/Button.svelte';
	import Projects from '$lib/molecules/Projects/Projects.svelte';
	import Resume from '$lib/molecules/Resume/Resume.svelte';

	import './page.css';

	export let data: PageData;

	$: intro = data.resumeData.record.intro;
	$: projects = data.projectData.record;
	$: resume = data.resumeData.record;
</script>

<svelte:head>
    <meta name="Description" content={intro} />
</svelte:head>

<Header src="/media/profile.jpg" heading="Noah Baldwin" title="Hello!" subtitle={intro}>
	<Button slot="call-to-action" tag="a" href="/projects" class="shoft-shadow">Show me more!</Button>
</Header>
<Projects {projects} />
<Resume {resume} />
<Footer />
