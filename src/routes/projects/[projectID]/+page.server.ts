import { error } from '@sveltejs/kit';
import { load as projectsLoad } from '../+page.server';
import type { PageServerLoad } from './$types';
import type { PageData as ProjectsPageData } from '../$types';

export const load: PageServerLoad = async (event) => {
	const { params, fetch } = event;
	const { projectData } = (await projectsLoad(
		event as unknown as Parameters<typeof projectsLoad>[0]
	)) as ProjectsPageData;
	const project = projectData.record.find((item) => item.href.endsWith(params.projectID));
	if (!project) {
		throw error(404, 'Project not found');
	}

	const markdownResponse = await fetch(project?.markdown);
	if (markdownResponse.status >= 400) {
		throw error(markdownResponse.status, markdownResponse.statusText);
	}
	const markdown = await markdownResponse.text();

	return {
		project,
		markdown,
	};
};
