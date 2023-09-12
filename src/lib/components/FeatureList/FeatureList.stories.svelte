<script lang="ts">
	import { Meta, Story, Template } from '@storybook/addon-svelte-csf';
	import projects from '$lib/../__mocks__/api/projects';
	import FeatureList from './FeatureList.svelte';
	import FeatureListItem from './FeatureListItem.svelte';
</script>

<Meta title="Components/Feature List" component={FeatureList} />

<Template let:args>
	<FeatureList {...args} />
</Template>

<Story name="Default">
	<FeatureList>
		{#each projects.record as { href, title, src, alt, uid } (uid)}
			<FeatureListItem {href} hrefDescription={title} {src} {alt}>
				<p>{title}</p>
			</FeatureListItem>
		{/each}
	</FeatureList>
</Story>
