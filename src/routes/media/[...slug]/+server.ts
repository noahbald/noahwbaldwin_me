import type { RequestHandler } from './$types';
export const GET: RequestHandler = (request) => {
	let mediaPath = request.url.pathname.replace(/^\/*media\//, '');
	const cloudinaryOptions = request.url.searchParams.get('cloudinary');
	const source =
		mediaPath.endsWith('.svg') || mediaPath.endsWith('.md')
			? import.meta.env.VITE_BUCKET
			: import.meta.env.VITE_CLOUDINARY;
	if (cloudinaryOptions) {
		mediaPath = `${cloudinaryOptions}/${mediaPath}`;
	}
	return fetch(`${source}/${mediaPath}`);
};
