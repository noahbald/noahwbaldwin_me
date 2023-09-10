<script>
	import { Meta, Story, Template } from '@storybook/addon-svelte-csf';
	import Layout from './+layout.svelte';
</script>

<Meta title="Layout/Index" component={Layout} argTypes={{}} />

<Template let:args>
	<Layout {...args}>
		<h2>Example page</h2>
	</Layout>
</Template>

<Story name="Default" args={{ data: { url: '/' } }} />
