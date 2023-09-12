<script lang="ts">
	export let icon: string | undefined;
</script>

{#if icon}
	<div class="icon" style:--icon={`url(/icons/${icon}.svg)`} />
{/if}
