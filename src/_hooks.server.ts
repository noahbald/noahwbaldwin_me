import type { HandleFetch } from '@sveltejs/kit';

export const handleFetch: HandleFetch = async ({ request, fetch }) => {
	const url = new URL(request.url);
	if (request.url.startsWith('/api/projects')) {
		console.log('Projects URL:', import.meta.env.VITE_JSON_BIN_PROJECTS);
		request.headers.set('X-Access-Key', import.meta.env.VITE_JSON_BIN_KEY);
		request.headers.set('Content-Type', 'application/json');
		request = new Request(import.meta.env.VITE_JSON_BIN_PROJECTS, request);
	} else if (request.url.startsWith('/api/resume')) {
		request.headers.set('X-Access-Key', import.meta.env.VITE_JSON_BIN_KEY);
		request.headers.set('Content-Type', 'application/json');
		request = new Request(import.meta.env.REACT_JSON_BIN_RESUME, request);
	} else if (request.url.startsWith('/media')) {
		const bucketURL = new URL(import.meta.env.VITE_BUCKET);
		// url.host = bucketURL.host;
		// url.pathname = bucketURL.pathname + url.pathname;
		url.host = 'https://placehold.co';
		url.pathname = '/100x100';
		request = new Request(url.href, request);
	}

	return fetch(request);
};
