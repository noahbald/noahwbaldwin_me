<script lang="ts">
	import { Meta, Story, Template } from '@storybook/addon-svelte-csf';
	import projects from '$lib/../__mocks__/api/projects';
	import Button from '$lib/components/Button/Button.svelte';
	import Header from './Header.svelte';

	const project = projects.record[0];
</script>

<Meta title="Components/Header" component={Header} />

<Template let:args>
	<Header {...args} />
</Template>

<Story
	name="Default"
	args={{
		heading: project.type,
		title: project.title,
		subtitle: project.subtitle,
		src: project.src,
	}}
>
	<Button slot="call-to-action" class="soft-shadow">Return Home</Button>
</Story>
