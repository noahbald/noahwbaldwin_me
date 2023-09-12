<script lang="ts">
	import type ExternalLink from './ExternalLink.svelte';
	import './ExternalLinks.css';

	interface $$Slots {
		default: typeof ExternalLink;
	}
</script>

<div class="external-links">
	<slot />
</div>
