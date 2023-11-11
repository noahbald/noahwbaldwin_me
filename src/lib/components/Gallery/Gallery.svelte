<script lang="ts">
	import { writable } from 'svelte/store';
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';
	import Button from '$lib/components/Button/Button.svelte';
	import Image from '$lib/components/Image/Image.svelte';
	import Card from '$lib/components/Card/Card.svelte';
	import type Projects from '$lib/../__mocks__/api/projects';

	import './Gallery.css';

	// FIXME: This isn't very flexible, but it's not like we need it to be right now
	export let projects: (typeof Projects)['record'];

	const INTERVAL_TIMEOUT = 3000;

	let position = writable(0);
	let dragging = writable(false);
	let dragInitialX = writable(0);
	let dragDeltaX = writable(0);
	let interval = writable(-1);

	$: visibleProjects = projects.length
		? Array.from({ length: 4 }, (_, i) =>
				projects.at(((($position + i - 1) % projects.length) + projects.length) % projects.length)
		  ).filter((project): project is (typeof projects)[number] => !!project)
		: [];

	type TouchOrMouseEvent = MouseEvent | TouchEvent;

	function isTouchEvent(event: TouchOrMouseEvent): event is TouchEvent {
		return event instanceof TouchEvent;
	}

	function handleDragStart(event: TouchOrMouseEvent) {
		const { pageX, button } = isTouchEvent(event)
			? { pageX: event.touches[0]?.pageX, button: 0 }
			: event;

		if ($dragging || button !== 0) {
			return;
		}
		clearInterval($interval);
		$dragging = true;
		$dragInitialX = pageX;
		$dragDeltaX = pageX;
	}

	function handleDrag(event: TouchOrMouseEvent) {
		const { pageX } = isTouchEvent(event) ? { pageX: event.touches[0]?.pageX } : event;

		if (!$dragging) {
			return;
		}
		$dragDeltaX = pageX;
		event.preventDefault();
		event.stopPropagation();
	}

	function handleDragStop(event: TouchOrMouseEvent, href: string) {
		if (!$dragging) {
			return href;
		}

		const finalDragDeltaX = $dragInitialX - $dragDeltaX;
		const finalDragDeltaXAbs = Math.abs(finalDragDeltaX);
		const direction = Math.sign(finalDragDeltaX);

		$dragging = false;
		$dragInitialX = 0;
		$dragDeltaX = 0;
		if (finalDragDeltaXAbs < 64) {
			goto(href);
			return;
		} else if (finalDragDeltaXAbs < 128) {
			return;
		}

		$position += direction;
		event.preventDefault();
		event.stopPropagation();
	}

	onMount(() => {
		const newInterval = setInterval(() => ($position += 1), INTERVAL_TIMEOUT);
		$interval = Number(newInterval);

		return () => clearInterval($interval);
	});
</script>

<div class="gallery h4">
	<Button
		variant="text"
		icon="arrow-left"
		on:click={() => {
			clearInterval($interval);
			$position -= 1;
		}}
	>
		<span class="sr-only">Previous item in gallery<span /></span></Button
	>
	{#each visibleProjects as { href, title, subtitle, src, alt, uid }, i (`${uid}-${Math.floor(($position + i) / projects.length)}`)}
		{@const iPosition = i - 1}
		{@const opacity = 0 > iPosition || iPosition > 1 ? 0 : 1}

		<!-- FIXME: Looks like button, role is presentation -->
		<div
			class="content of-gallery soft-shadow"
			class:in={opacity || ($dragging && $dragInitialX - $dragDeltaX !== 0)}
			class:dragging={$dragging}
			style:--drag-distance={`${$dragDeltaX - $dragInitialX}px`}
			style:--i-position={iPosition}
			on:click={() => goto(href)}
			on:touchstart={handleDragStart}
			on:mousedown={handleDragStart}
			on:touchmove={handleDrag}
			on:mousemove={handleDrag}
			on:touchend={(e) => handleDragStop(e, href)}
			on:mouseup={(e) => handleDragStop(e, href)}
			on:keydown={(e) => (e.key === 'Enter' || e.key === ' ') && goto(href)}
			role="presentation"
			tabindex={opacity - 1}
		>
			<Image {src} {alt} class="image of-gallery" width={624} height={256} />
			<Card {href} {title}>
				<hgroup class="h4">
					<h3 class="h4"><strong>{title}</strong></h3>
					<span>
						<strong>&nbsp;&mdash;&nbsp;</strong>
						{subtitle}
					</span>
				</hgroup>
			</Card>
		</div>
	{/each}
	<Button
		variant="text"
		icon="arrow-right"
		on:click={() => {
			clearInterval($interval);
			$position += 1;
		}}
	>
		<span class="sr-only">Next item in gallery</span>
	</Button>
</div>
