<script lang="ts">
	import type FeatureListItem from './FeatureListItem.svelte';
	import './FeatureList.css';

	interface $$Slots {
		default: typeof FeatureListItem;
	}
</script>

<div class="feature-list">
	<slot />
</div>
