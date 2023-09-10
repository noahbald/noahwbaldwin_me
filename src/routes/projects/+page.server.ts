import { error } from '@sveltejs/kit';
import type Projects from '$lib/types/Projects';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ fetch }) => {
	const projectResponse = await fetch('/api/projects');
	if (projectResponse.status >= 400) {
		throw error(projectResponse.status, projectResponse.statusText);
	}

	const projectData = (await projectResponse.json()) as Projects;

	return {
		projectData,
	};
};
