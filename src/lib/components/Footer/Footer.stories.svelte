<script lang="ts">
	import { Meta, Story, Template } from '@storybook/addon-svelte-csf';
	import Footer from './Footer.svelte';
</script>

<Meta title="Components/Footer" component={Footer} />

<Template let:args>
	<Footer {...args} />
</Template>

<Story name="Default" args={{ homeButton: true }} />
