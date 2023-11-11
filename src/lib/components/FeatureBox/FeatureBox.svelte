<script lang="ts">
	import { writable } from 'svelte/store';
	import Button from '$lib/components/Button/Button.svelte';
	import Image from '$lib/components/Image/Image.svelte';
	import type Resume from '$lib/types/Resume';

	import './FeatureBox.css';

	export let items: Resume['record']['items'];

	let currentItemIndex = writable(0);
	$: ({ title, image, imageAlt, contents } = items[$currentItemIndex] || { contents: [] });
	$: prevItemIndex = $currentItemIndex === 0 ? items.length - 1 : $currentItemIndex - 1;
	$: nextItemIndex = $currentItemIndex === items.length - 1 ? 0 : $currentItemIndex + 1;
</script>

<div class="feature-box">
	<div class="image">
		<Image src={image} alt={imageAlt} width={620} height={620} />
	</div>
	<div class="content">
		<div class="titlebar">
			<Button softShadow on:click={() => ($currentItemIndex = prevItemIndex)}>
				{items?.[prevItemIndex]?.title}
			</Button>
			<h3 class="h2">{title}</h3>
			<Button softShadow on:click={() => ($currentItemIndex = nextItemIndex)}>
				{items?.[nextItemIndex]?.title}
			</Button>
		</div>
		{#each contents as { icon, title, body, uid }, i (uid)}
			<img
				class="icon highlight secondary"
				class:primary={i + ($currentItemIndex % 3) === 0}
				class:secondary={i + ($currentItemIndex % 3) === 1}
				class:tertiary={i + ($currentItemIndex % 3) === 2}
				src={icon}
				alt={title}
			/>
			<p class="h4">
				<strong>{title}</strong>
				&nbsp;&mdash;&nbsp;
				{body}
			</p>
		{/each}
	</div>
</div>
