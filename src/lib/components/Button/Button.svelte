<script lang="ts">
	import type { ComponentProps } from 'svelte';
	import type { HTMLAnchorAttributes, HTMLButtonAttributes } from 'svelte/elements';
	import clsx from 'clsx';
	import './Button.css';
	import ButtonIcon from './ButtonIcon.svelte';

	interface BaseProps {
		variant?: 'solid' | 'outline' | 'text' | undefined;
		icon: ComponentProps<ButtonIcon>['icon'];
	}

	interface ButtonProps extends HTMLButtonAttributes {
		tag?: 'button';
	}

	interface AnchorProps extends HTMLAnchorAttributes {
		tag: 'a';
	}

	type $$Props = (ButtonProps | AnchorProps) & BaseProps;

	/** Appearance of button */
	export let variant: $$Props.variant;

	/** Icon path */
	export let icon: $$Props.icon;

	/** Rendered tag */
	export let tag: $$Props.tag;

	export let href: $$Props.href;
</script>

{#if !tag || tag === 'button'}
	<button {...$$props} on:click class={clsx('button', { [variant]: variant })}>
		<ButtonIcon {icon} />
		<slot />
	</button>
{:else if tag === 'a'}
	<a {...$$props} {href} class={clsx('button', { [variant]: variant })}>
		<ButtonIcon {icon} />
		<slot />
	</a>
{/if}
