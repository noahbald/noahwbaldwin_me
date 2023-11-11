<script lang="ts">
	import type { SvelteHTMLElements } from 'svelte/elements';

	type $$Props<T extends keyof SvelteHTMLElements = 'img'> = SvelteHTMLElements[T] & {
		src: SvelteHTMLElements['img']['src'];
		tag?: T;
		fallbackQuality?: number;
		dataURLFallback?: string;
	};

	/** Appearance of button */
	export let tag: $$Props['tag'] = 'img';

	/** Icon path */
	export let fallbackQuality: $$Props['fallbackQuality'] = undefined;

	/** Rendered tag */
	export let dataURLFallback: $$Props['dataURLFallback'] = undefined;

	let backgroundImage = '';
	let fallbackImage = '';
	let mainImage = '';
	$: {
		const options: string[] = [];
		($$props.width || $$props.height) && options.push('c_fill');
		$$props.width && options.push(`w_${$$props.width}`);
		$$props.height && options.push(`h_${$$props.height}`);
		mainImage = `${$$props.src}?cloudinary=${options.join(',')}`;
		fallbackQuality && options.push(`q_${fallbackQuality}`);
		fallbackImage = `${$$props.src}?cloudinary=${options.join(',')}`;

		const urls: string[] = [];
		tag !== 'img' && urls.push(`url(${mainImage})`);
		urls.push(`url(${fallbackImage})`);
		dataURLFallback && urls.push(`url(${dataURLFallback})`);
		backgroundImage = urls.join(',');
	}
</script>

<svelte:head>
	<link rel="preload" as="image" href={fallbackImage} fetchpriority="high" />
</svelte:head>

<svelte:element
	this={tag || 'img'}
	style:background-image={backgroundImage}
	{...$$restProps}
	src={mainImage}
>
	<slot />
</svelte:element>
