import { error } from '@sveltejs/kit';
import type Blogs from '$lib/types/Blogs';
import type Projects from '$lib/types/Projects';
import type Resume from '$lib/types/Resume';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ fetch }) => {
	let blogsResponse: Promise<Response> | Response = fetch('/api/blogs');
	let projectResponse: Promise<Response> | Response = fetch('/api/projects');
	let resumeResponse: Promise<Response> | Response = fetch('/api/resume');
	await Promise.allSettled([blogsResponse, projectResponse, resumeResponse]);

	blogsResponse = await blogsResponse;
	if (blogsResponse.status >= 400) {
		throw error(blogsResponse.status, `/api/blogs: ${blogsResponse.statusText}`);
	}
	let blogsData: Promise<unknown> | Blogs = blogsResponse.json();

	projectResponse = await projectResponse;
	if (projectResponse.status >= 400) {
		throw error(projectResponse.status, `/api/projects: ${projectResponse.statusText}`);
	}
	let projectData: Promise<unknown> | Projects = await projectResponse.json();

	resumeResponse = await resumeResponse;
	if (resumeResponse.status >= 400) {
		throw error(resumeResponse.status, `/api/resume: ${resumeResponse.statusText}`);
	}
	let resumeData: Promise<unknown> | Resume = resumeResponse.json();

	await Promise.all([blogsData, projectData, resumeData]);
	blogsData = (await blogsData) as Blogs;
	projectData = (await projectData) as Projects;
	resumeData = (await resumeData) as Resume;

	return {
		blogsData,
		projectData,
		resumeData,
	};
};
