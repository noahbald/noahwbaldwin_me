import type { RequestHandler } from './$types';
export const GET: RequestHandler = (request) => {
	const mediaPath = request.url.pathname.replace(/^\/*media\//, '');
	return fetch(`${import.meta.env.VITE_BUCKET}/${mediaPath}`);
};
