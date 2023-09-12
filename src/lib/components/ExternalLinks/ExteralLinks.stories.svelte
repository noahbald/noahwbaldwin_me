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
		<ExternalLink href="#">Example Link</ExternalLink>
		<ExternalLink href="#">Example Link 1</ExternalLink>
		<ExternalLink href="#">Example Link 2</ExternalLink>
	</ExternalLinks>
</Story>
