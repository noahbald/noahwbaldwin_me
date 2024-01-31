import type { HandleFetch } from '@sveltejs/kit';

export const handleFetch: HandleFetch = async ({ request, fetch }) => {
	const url = new URL(request.url);
	if (request.url.startsWith('/media')) {
		const bucketURL = new URL(import.meta.env.VITE_BUCKET);
		// url.host = bucketURL.host;
		// url.pathname = bucketURL.pathname + url.pathname;
		url.host = 'https://placehold.co';
		url.pathname = '/100x100';
		request = new Request(url.href, request);
	}

	return fetch(request);
};
