<script lang="ts">
	import type { HTMLAnchorAttributes } from 'svelte/elements';

	interface $$Props extends Omit<HTMLAnchorAttributes, 'rel' | 'target'> {
		icon: string;
	}

	export let icon: $$Props.icon;
	export let href: $$Props.href;
</script>

<a class="link" {...$$props} {href} style:--icon={`url(/icons/${icon}.svg)`}>
	<span class="sr-only"><slot /></span>
</a>
