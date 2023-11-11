<script lang="ts">
	import { Meta, Story, Template } from '@storybook/addon-svelte-csf';
	import ExternalLinks from './ExternalLinks.svelte';
	import ExternalLink from './ExternalLink.svelte';
</script>

<Meta title="Components/External Links" component={ExternalLinks} />

<Template let:args>
	<ExternalLinks {...args} />
</Template>

<Story name="Default">
	<ExternalLinks>
		<ExternalLink href="#" icon="placeholder">Example Link</ExternalLink>
		<ExternalLink href="#" icon="placeholder">Example Link 1</ExternalLink>
		<ExternalLink href="#" icon="placeholder">Example Link 2</ExternalLink>
	</ExternalLinks>
</Story>
