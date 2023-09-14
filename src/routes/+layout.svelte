<script lang="ts">
	import { onNavigate } from '$app/navigation';
	import { page } from '$app/stores';
	import clsx from 'clsx';
	import 'sanitize.css';
	import './layout.css';
	import '@fontsource/lato';
	import '@fontsource/lato/700.css';
	import '@fontsource/lato/900.css';
	import '@fontsource/jetbrains-mono';

	$: path = $page.url.pathname.split('/').slice(1).join(' ');

	onNavigate((navigation) => {
		if (!document.startViewTransition) {
			return;
		}

		return new Promise((resolve) => {
			document.startViewTransition(async () => {
				resolve();
				await navigation.complete;
			});
		});
	});
</script>

<svelte:head>
	<title>Noah Baldwin | Frontend Engineer</title>
</svelte:head>

<main
	class={clsx('page', {
		[`${path}-page`]: path,
		'index-page': !path,
	})}
>
	<div class="inner of-page">
		<slot />
	</div>
</main>
