<script lang="ts">
	import Gallery from '$lib/components/Gallery/Gallery.svelte';
	import Button from '$lib/components/Button/Button.svelte';
	import type { Projects } from '$lib/types/Projects';

	import './Projects.css';

	export let projects: Projects['record'];
</script>

<section class="projects">
	<h2 class="highlight secondary h1">Projects</h2>
	<Button tag="a" variant="text" href="/projects">View More</Button>
	<Gallery {projects} />
</section>
