import { error } from '@sveltejs/kit';
import type Projects from '$lib/types/Projects';
import type Resume from '$lib/types/Resume';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ fetch }) => {
	const projectResponse = await fetch('/api/projects');
	if (projectResponse.status >= 400) {
		throw error(projectResponse.status, `/api/projects: ${projectResponse.statusText}`);
	}
	const projectData = (await projectResponse.json()) as Projects;

	const resumeResponse = await fetch('/api/resume');
	if (resumeResponse.status >= 400) {
		throw error(resumeResponse.status, `/api/resume: ${resumeResponse.statusText}`);
	}
	const resumeData = (await resumeResponse.json()) as Resume;

	return {
		projectData,
		resumeData,
	};
};
