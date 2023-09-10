<script>
	import { Meta, Story, Template } from '@storybook/addon-svelte-csf';
	import Button from './Button.svelte';
</script>

<Meta
	title="Components/Button"
	component="Button"
	argTypes={{
		variant: {
			options: ['solid', 'outline', 'text'],
			control: { type: 'select' },
		},
		icon: { control: { type: 'text' } },
		tag: {
			options: ['button', 'a'],
			control: { type: 'radio' },
		},
		slot: { control: { type: 'text' } },
	}}
/>

<Template let:args>
	<Button {...args} on:click={() => console.log('Button clicked!')}>
		{args.slot}
	</Button>
</Template>

<Story name="Default" args={{ slot: 'Button' }} />
