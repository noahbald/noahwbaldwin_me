<script lang="ts">
	import Card from '$lib/components/Card/Card.svelte';
	import type Button from '$lib/components/Button/Button.svelte';

	import './Header.css';

	export interface $$Slots {
		'call-to-action': typeof Button;
	}

	export let heading: string;
	export let src: string;
	export let title: string;
	export let subtitle: string;
</script>

<header class="header h1">
	<div class="image soft-shadow">
		{#if src.endsWith('.webm')}
			<video {src} autoplay loop muted>
				<source {src} alt="" />
			</video>
		{:else}
			<img {src} alt="" />
		{/if}
	</div>
	<h1 class="highlight grey-light">{heading}</h1>
	{#if title}
		<Card class="soft-shadow h4">
			<hgroup>
				<h2 class="h4">
					<strong>{title}</strong>
				</h2>
				<span class="fade delayed">&nbsp;&mdash;&nbsp;</span>
				<span class="fade delayed">
					{#if subtitle}
						<span class="blink">{subtitle}</span>
					{/if}
				</span>
			</hgroup>
			<slot name="call-to-action" />
		</Card>
	{/if}
</header>
