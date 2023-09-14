import { error } from '@sveltejs/kit';
import type Blogs from '$lib/types/Blogs';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ fetch }) => {
	const blogsResponse = await fetch('/api/blogs');
	if (blogsResponse.status >= 400) {
		throw error(blogsResponse.status, blogsResponse.url);
	}

	const blogsData = (await blogsResponse.json()) as Blogs;

	return {
		blogsData,
	};
};
