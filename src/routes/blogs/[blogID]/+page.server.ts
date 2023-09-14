import { error } from '@sveltejs/kit';
import { load as blogsLoad } from '../+page.server';
import type { PageServerLoad } from './$types';
import type { PageData as BlogsPageData } from '../$types';

export const load: PageServerLoad = async (event) => {
	const { params, fetch } = event;
	const { blogsData } = (await blogsLoad(
		event as unknown as Parameters<typeof blogsLoad>[0]
	)) as BlogsPageData;
	const blog = blogsData.record.find((item) => item.href.endsWith(params.blogID));
	if (!blog) {
		throw error(404, 'Blog not found');
	}

	const markdownResponse = await fetch(blog?.markdown);
	if (markdownResponse.status >= 400) {
		throw error(markdownResponse.status, markdownResponse.statusText);
	}
	const markdown = await markdownResponse.text();

	return {
		blog,
		markdown,
	};
};
