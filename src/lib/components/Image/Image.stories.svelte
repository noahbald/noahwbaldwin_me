<script lang="ts">
	import { Meta, Story, Template } from '@storybook/addon-svelte-csf';
	import projects from '$lib/../__mocks__/api/projects';
	import Image from './Image.svelte';

	const project = projects[0];
</script>

<Meta title="Components/Image" component={Image} />

<Template let:args>
	<Image {...args} />
</Template>

<Story
	name="Default"
	args={{
		src: project.src,
	}}
/>
