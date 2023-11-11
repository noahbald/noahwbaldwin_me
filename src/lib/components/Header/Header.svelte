<script lang="ts">
	import Card from '$lib/components/Card/Card.svelte';
	import Image from '$lib/components/Image/Image.svelte';

	import './Header.css';

	export let heading: string;
	export let src: string;
	export let srcTiny: string | undefined = undefined;
	export let title: string;
	export let subtitle: string;
	export let transitionName = 'header';
</script>

<header class="header h1">
	<div class="image soft-shadow">
		{#if src.endsWith('.webm')}
			<video {src} autoplay loop muted>
				<source {src} />
			</video>
		{:else}
			<Image
				{src}
				alt=""
				width={1920}
				height={1080}
				fallbackQuality={10}
				dataURLFallback={srcTiny}
				{transitionName}
			/>
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
