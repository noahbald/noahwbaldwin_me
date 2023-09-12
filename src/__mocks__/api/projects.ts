import type Projects from '$lib/types/Projects';

const projects: Projects = {
	record: [
		{
			title: 'Project 1',
			subtitle: 'Lorem ipsum dolor sit amet.',
			type: 'Personal Project',
			src: 'https://placehold.co/1080x1080',
			markdown: '',
			href: '#',
			uid: '1',
			metadata: {
				year: 2021,
				topics: ['Web Development'],
				client: 'Personal Project',
				featured: true,
			},
			externalLinks: {
				project: 'https://github.com/',
			},
		},
		{
			title: 'Project 2',
			subtitle: 'Consectetur adipiscing elit',
			type: 'Work Project',
			src: 'https://placehold.co/1920x1080',
			markdown: '',
			href: '#',
			uid: '2',
			metadata: {
				year: 2020,
				topics: ['Design', 'Copy'],
				client: 'Employer',
				featured: true,
			},
			externalLinks: {
				figma: 'https://www.figma.com/',
				project: 'https://www.monash.edu/',
			},
		},
		{
			title: 'Project 3',
			subtitle: 'Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua',
			type: 'Personal Website',
			src: 'https://placehold.co/1080x1920',
			markdown: '',
			href: '#',
			uid: '3',
			metadata: {
				year: 2020,
				topics: ['Programming', 'Design'],
				client: 'Personal Project',
				featured: true,
			},
		},
	],
	metadata: {
		id: '2',
		private: true,
		createdAt: '2023-03-15T11:22:48.190Z',
		collectionId: '2',
		name: 'projects.json',
	},
};
export default projects;
