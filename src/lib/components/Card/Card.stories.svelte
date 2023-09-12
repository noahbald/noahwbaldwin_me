<script>
	import { Meta, Story, Template } from '@storybook/addon-svelte-csf';
	import Card from './Card.svelte';
</script>

<Meta
	title="Components/Card"
	component={Card}
	argTypes={{
		href: { control: { type: 'text' } },
		title: { control: { type: 'text' } },
		slot: { control: { type: 'text' } },
	}}
/>

<Template let:args>
	<Card {...args}>
		<hgroup class="h4">
			<h2 class="h4">
				<strong>Title</strong>
			</h2>
			&nbsp;&mdash;&nbsp; Subtitle
		</hgroup>
	</Card>
</Template>

<Story name="Default" args={{ href: '#', title: 'Example link' }} />
