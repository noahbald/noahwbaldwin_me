<script lang="ts">
	import FeatureBox from '$lib/components/FeatureBox/FeatureBox.svelte';
	import Button from '$lib/components/Button/Button.svelte';
	import type Resume from '$lib/types/Resume';

	import './Resume.css';

	export let resume: Resume;
</script>

<section class="resume">
	<h2 class="highlight tertiary h1">Résumé</h2>
	<Button
		tag="a"
		variant="text"
		href="https://docs.google.com/document/d/15GdJKS1wCaYaHCohnCSZ1wRDol4p8ACvuRvPh2PIhho/export?format=pdf"
		rel="external"
	>
		Download Résumé
	</Button>
	<FeatureBox items={resume.items} />
</section>
