<script lang="ts">
	import Button from '$lib/components/Button/Button.svelte';
	import ExternalLinks from '$lib/components/ExternalLinks/ExternalLinks.svelte';
	import ExternalLink from '$lib/components/ExternalLinks/ExternalLink.svelte';
	import './Footer.css';

	export let homeButton = false;
</script>

<footer class="footer">
	{#if homeButton}
		<Button tag="a" href="/" variant="text">Return Home</Button>
	{/if}
	<h2 class="highlight primary h1">Say Hi,</h2>
	<div class="links of-footer">
		<h3 id="email">
			<a href="mailto:hi@noahwbaldwin.me">hi@noahwbaldwin.me</a>
		</h3>
		<ExternalLinks>
			<ExternalLink href="https://github.com/noahbald" icon="github">GitHub</ExternalLink>
			<ExternalLink href="https://mastodon.social/@noahbald" rel="me" icon="mastodon">
				Mastodon
			</ExternalLink>
			<ExternalLink href="https://www.linkedin.com/in/noahwbaldwin/" icon="linkedin">
				LinkedIn
			</ExternalLink>
			<ExternalLink href="https://www.instagram.com/noahbald/" icon="instagram">
				Instagram
			</ExternalLink>
			<ExternalLink href="spotify:user:12101435749" icon="spotify">Spotify</ExternalLink>
		</ExternalLinks>
	</div>
</footer>
