<script lang="ts">
	import type { ComponentProps } from 'svelte';
	import type { SvelteHTMLElements } from 'svelte/elements';
	import clsx from 'clsx';
	import './Button.css';
	import ButtonIcon from './ButtonIcon.svelte';

	type $$Props = SvelteHTMLElements[keyof SvelteHTMLElements] & {
		variant?: 'solid' | 'outline' | 'text' | undefined;
		icon?: ComponentProps<ButtonIcon>['icon'];
		tag: keyof SvelteHTMLElements;
	};

	/** Appearance of button */
	export let variant: $$Props['variant'] = undefined;

	/** Icon path */
	export let icon: $$Props['icon'] = undefined;

	/** Rendered tag */
	export let tag: $$Props['tag'] = 'button';

	$: role = tag !== 'button' && tag !== 'a' ? 'button' : undefined;
</script>

<svelte:element
	this={tag}
	{...$$restProps}
	class={clsx('button', { [variant || '']: variant })}
	on:click
	{role}
>
	<ButtonIcon {icon} />
	<slot />
</svelte:element>
