<script lang="ts">
	import { Meta, Story, Template } from '@storybook/addon-svelte-csf';
	import markdown from '$lib/../__mocks__/media/projects/project.md?raw';
	import Markdown from './Markdown.svelte';
</script>

<Meta title="Components/Markdown" component={Markdown} />

<Template let:args>
	<Markdown {...args} />
</Template>

<Story
	name="Default"
	args={{
		markdown,
	}}
/>
