<script lang="ts">
	import clsx from 'clsx';
	import './Card.css';

	/** Navigation link for the card */
	export let href: string | undefined = undefined;

	/** Accessible title for card link */
	export let title: string | undefined = undefined;

	let className: string | undefined = undefined;
	export { className as class };
</script>

<div class={clsx('card', className)}>
	<slot />
	{#if href && title}
		<a class="underline" {href}><span class="sr-only">{title}</span></a>
	{/if}
</div>
