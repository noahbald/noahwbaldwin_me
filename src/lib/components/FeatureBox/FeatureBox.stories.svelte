<script lang="ts">
	import { Meta, Story, Template } from '@storybook/addon-svelte-csf';
	import { mockResume } from '$lib/../__mocks__/api/';
	import FeatureBox from './FeatureBox.svelte';
</script>

<Meta title="Components/Feature Box" component={FeatureBox} />

<Template let:args>
	<FeatureBox {...args} />
</Template>

<Story name="Default" args={{ items: mockResume.record.items }} />
