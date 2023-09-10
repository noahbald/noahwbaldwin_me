<script lang="ts">
	import { Meta, Story, Template } from '@storybook/addon-svelte-csf';
	import projects from '$lib/../__mocks__/api/projects';
	import Gallery from './Gallery.svelte';
</script>

<Meta title="Components/Gallery" component={Gallery} />

<Template let:args>
	<Gallery {...args} />
</Template>

<Story name="Default" args={{ projects: projects.record }} />
